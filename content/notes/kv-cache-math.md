---
title: KV cache math
---

# KV cache math

**Phase / week:** 1 · W3 **Status:** starter. Verify the numbers against vLLM and add your own measurements.

## In one sentence

During decoding, every token in every active sequence keeps its keys and values in GPU memory, and that memory, not compute, usually caps how many requests one GPU can serve at once.

## Why it matters for capacity

GPU memory is split three ways: **model weights**, **KV cache** and **activations/overhead**. Weights are fixed. Whatever's left for KV cache decides the maximum number of concurrent tokens, and therefore the batch size, and therefore throughput per GPU.

## The math

KV bytes per token:

```formula
KV bytes/token = 2 × layers × kv_heads × head_dim × bytes_per_value
```

The **2** is for K and V. With grouped-query attention (GQA), `n_kv_heads` is smaller than the number of query heads, which is the whole point.

Maximum tokens in cache:

```formula
max tokens ≈ (GPU memory × utilization − weights − overhead) ÷ KV bytes/token
```

Maximum concurrent sequences ≈ max tokens ÷ average (prompt + output) length.

## Worked examples

| Model | Layers | KV heads | Head dim | Precision | KV per token |
|---|---|---|---|---|---|
| Llama-2-7B (no GQA) | 32 | 32 | 128 | FP16 | 2·32·32·128·2 = **512 KiB** |
| Llama-3.1-8B (GQA) | 32 | 8 | 128 | FP16 | 2·32·8·128·2 = **128 KiB** |
| Llama-3.1-8B, FP8 KV cache | 32 | 8 | 128 | FP8 | **64 KiB** |

**Llama-3.1-8B on one 80 GB GPU (rough):**

- Weights in FP16: 8B × 2 bytes ≈ 16 GB
- Usable at 90% memory utilization: ≈ 72 GB, so ≈ 56 GB left after weights (minus a few GB for activations and CUDA graphs)
- ≈ 56 GB ÷ 128 KiB ≈ **~430K tokens** in cache
- At 8K tokens per sequence: **~50 concurrent sequences**; at 2K: **~200**

Same GPU with Llama-2-7B (no GQA) holds about **4× fewer** tokens. That's why GQA was such a big deal for serving.

## Decode speed from bandwidth (bonus)

At batch size 1, each new token reads every weight once:

```formula
time per token ≳ weight bytes ÷ memory bandwidth
```

| Setup | Weights | Bandwidth | Lower bound per token | Max tokens/s at batch 1 |
|---|---|---|---|---|
| 1.5B model FP16 on T4 | ~3 GB | ~320 GB/s | ~9.4 ms | ~100 |
| 8B model FP16 on H100 SXM | ~16 GB | ~3.35 TB/s | ~4.8 ms | ~200 |

Larger batches reuse the same weight read for many sequences, so throughput rises almost for free, until the KV cache runs out. That's the link between this note and the batching knee in Week 4.

## What I measured

- [ ] vLLM's reported KV cache capacity at startup for my model: _(fill in)_
- [ ] My calculator's prediction: _(fill in)_
- [ ] Difference and why: _(fill in)_

## Gotchas

- vLLM allocates KV cache in **blocks** (pages), so capacity is rounded to block size.
- `gpu_memory_utilization` is the fraction of *total* GPU memory vLLM may use, not of free memory.
- Sliding-window and MLA attention change the formula; check the model's config.

## Sources

- [PagedAttention paper](https://arxiv.org/abs/2309.06180)
- [Transformer Inference Arithmetic](https://kipp.ly/transformer-inference-arithmetic/)
- Model `config.json` files on Hugging Face (`num_hidden_layers`, `num_key_value_heads`, `head_dim` or `hidden_size / num_attention_heads`)
