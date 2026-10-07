---
title: "P5 · Disaggregated serving lab"
---

# P5 · Disaggregated serving lab

**Phase 5 · Weeks 53–65** · Repo: `disaggregated-serving-lab` _(add link)_ · Status: ⬜

## Goal

Answer, with measurements: **"For this workload, should prefill and decode run on the same GPUs or separate ones, and what do cache-aware routing, KV offloading and multi-LoRA change about the GPU count?"**

## Why it matters

- Disaggregated serving and KV-cache-aware routing are how the largest LLM services are being built (Mooncake, llm-d, Dynamo). Knowing when they pay off is a capacity question, not just an engine feature.
- It turns your P4 planner from single-engine to fleet-level.

## Setup

| Item | Choice |
|---|---|
| GPUs | 2–4 rented GPUs for Weeks 53–56; one GPU or CPU after |
| Serving | vLLM (disaggregated prefill, LoRA), LMCache; read llm-d and Dynamo for production designs |
| Load | GuideLLM or AIPerf, open-loop arrivals (Week 62) |
| Other | Text Embeddings Inference, Triton Inference Server for non-LLM weeks |

## Experiments

1. Analytical goodput model, colocated vs disaggregated (W53).
2. Measured disaggregated vs colocated on the same GPUs (W54).
3. Round-robin vs prefix-aware routing on shared-prefix traffic (W55).
4. KV offload vs recompute on long shared contexts (W56).
5. Throughput vs number of active LoRA adapters (W57).
6. Capacity vs context length (W58) and speculation vs load (W59).

## Milestones

| Week | Milestone |
|---|---|
| 53–54 | Disaggregation model + measured comparison |
| 55–56 | Routing simulator + offload benchmark |
| 57–59 | Multi-LoRA, long context, speculation |
| 60–61 | Embedding and non-LLM serving |
| 62 | Benchmarking checklist |
| 64 | Planner extended with Phase 5 layouts |
| 65 | README, post, share |

## Deliverables

- [ ] Reproducible scripts and raw results for every experiment
- [ ] Charts: disaggregation crossover, cache-hit vs TTFT, offload break-even, LoRA scaling, context curves
- [ ] Planner update (`planner-pd`)
- [ ] Post: *"When does prefill/decode disaggregation pay off? Measured."*

## Interview story

> "I measured when splitting prefill and decode across GPUs actually helps. For _(workload)_ it raised goodput by _(x)_; for _(other workload)_ it lost because KV transfer cost _(y)_. Prefix-aware routing lifted cache hits from _(a)_ to _(b)_, which cut the GPUs needed by _(c)_%."

## Results & lessons

_(Fill in at Week 65.)_
