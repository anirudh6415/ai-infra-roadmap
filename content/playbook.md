---
title: Optimization playbook
---

# Optimization playbook

The roadmap teaches each lever separately. This page puts them in one place: how to find the bottleneck, which lever to pull, and where each lever is covered. Use it as the checklist for any "we need more GPUs" request.

## The method

```text
1. Measure      what the workload really does: tokens in/out, RPS, burstiness, SLO
2. Find the     bottleneck: compute, memory bandwidth, KV cache memory,
   limit        launch overhead, communication, queueing, or idle allocation
3. Pick the     cheapest lever that moves that limit (table below, top first)
   lever
4. Verify       goodput under the SLO, quality on an eval, and cost per
                1M tokens: before and after
5. Write it     down, so the next request starts from evidence
```

The rule behind step 3: **use what you already have before buying more**, then **change the configuration before changing the model**, and only then **change the hardware**.

## The levers

Roughly in the order to try them. Typical effects vary a lot by workload; measure them yourself.

| # | Lever | What it fixes | Where it's covered |
|---|---|---|---|
| 1 | **Reclaim idle and over-sized allocations** | Paid-for GPUs doing nothing | [W08](roadmap/phase-1.md#w08) real utilization · [W45](roadmap/phase-4.md#w45) idle cost |
| 2 | **Right-size against an SLO** (goodput, not peak throughput) | Over-provisioning for the wrong target | [W09](roadmap/phase-1.md#w09) · [W12](roadmap/phase-1.md#w12) |
| 3 | **Batching and scheduler settings** | Under-filled GPUs in decode | [W04](roadmap/phase-1.md#w04) |
| 4 | **Caching**: prefix caching, cache-aware routing, KV offload, semantic cache | Recomputing the same prompts | [W25](roadmap/phase-2.md#w25) · [W55](roadmap/phase-5.md#w55) · [W56](roadmap/phase-5.md#w56) · [W11](roadmap/phase-1.md#w11) |
| 5 | **Autoscaling and scale-to-zero** | Paying for peak all day | [W10](roadmap/phase-1.md#w10) · [W43](roadmap/phase-4.md#w43) |
| 6 | **Batch tiers and off-peak shifting** | Idle capacity at night, spiky daytime load | [W64](roadmap/phase-5.md#w64) |
| 7 | **Sharing GPUs**: MIG, time-slicing, packing small models | Small models wasting whole GPUs | [W41](roadmap/phase-4.md#w41) · [W61](roadmap/phase-5.md#w61) |
| 8 | **Quantization** (INT8/INT4/FP8 weights and KV cache) | Memory and bandwidth per token | [W06](roadmap/phase-1.md#w06) |
| 9 | **Smaller models**: distillation, pruning, sparsity, routing and cascades | Using a big model for easy requests | [W63](roadmap/phase-5.md#w63) |
| 10 | **Serving techniques**: speculative decoding, chunked prefill, FlashAttention | Latency and per-token cost | [W25](roadmap/phase-2.md#w25) · [W59](roadmap/phase-5.md#w59) |
| 11 | **Kernels and compilation**: fusion, torch.compile, CUDA Graphs | Memory-bound ops and launch overhead | [W21–W24](roadmap/phase-2.md#w23) |
| 12 | **Parallelism layout**: TP/PP/EP vs replicas, topology-aware placement | Communication cost | [W30](roadmap/phase-3.md#w30) · [W32](roadmap/phase-3.md#w32) |
| 13 | **Prefill/decode disaggregation** | Prefill and decode interfering | [W53–W54](roadmap/phase-5.md#w53) |
| 14 | **Hardware choice**: GPU generation, memory size, AMD, TPU | Wrong chip for the workload | [W18](roadmap/phase-2.md#w18) · [W76–W77](roadmap/phase-6.md#w76) |
| 15 | **How you buy**: reservations, spot, multi-cloud, power | Price per useful GPU-hour | [W75](roadmap/phase-6.md#w75) |
| 16 | **Reliability**: checkpoint interval, spares, health checks | Capacity lost to failures | [W33–W34](roadmap/phase-3.md#w33) · [W73–W74](roadmap/phase-6.md#w73) |

## Training-side levers

| Lever | Where |
|---|---|
| Mixed precision and FP8 | [W24](roadmap/phase-2.md#w24) · [W66](roadmap/phase-6.md#w66) |
| Memory techniques: FSDP/ZeRO, recompute, sequence and context parallelism | [W29](roadmap/phase-3.md#w29) · [W68](roadmap/phase-6.md#w68) |
| LoRA/QLoRA instead of full fine-tuning | [W69](roadmap/phase-6.md#w69) |
| Keeping GPUs fed (data loading) | [W37](roadmap/phase-3.md#w37) · [W70](roadmap/phase-6.md#w70) |
| Balancing rollout vs training GPUs in RL | [W72](roadmap/phase-6.md#w72) |

## Numbers to always report

| Metric | Why |
|---|---|
| Goodput (RPS meeting the SLO) | The number capacity should be planned on |
| TTFT and TPOT, p50 and p95 | What users feel |
| Cost per 1M tokens (or per 1M requests) | What the business pays |
| Tokens per joule | What the data center's power budget allows |
| Quality on an eval | Proof the optimization didn't break the model |
| Real GPU utilization (SM / tensor active) | Whether "busy" means useful |
