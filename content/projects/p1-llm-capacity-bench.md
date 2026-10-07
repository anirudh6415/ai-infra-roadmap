---
title: "P1 · LLM capacity bench"
---

# P1 · LLM capacity bench

**Phase 1 · Weeks 1–13** · Repo: `llm-capacity-bench` _(add link)_

## Goal

Answer, with measured numbers: **"For this model and this workload, how many GPUs do I need to meet the SLO, and what does it cost per million tokens?"**

## Why it matters

- It's the question every GPU capacity plan has to answer, and it's usually answered from vendor numbers or guesswork.
- It shows you understand *why* the number is what it is (prefill vs decode, KV cache, batching), not just what the dashboard says.
- Adding a quality check for quantization uses your benchmark-research background, which most infra engineers don't have.

## Setup

| Item | Choice |
|---|---|
| GPU | Colab/Kaggle T4 for development; one rented L4 or A100 run for final numbers |
| Models | One ~1–3B model (fits on a T4), one ~7–8B model (needs ≥24 GB, rented run) |
| Serving | vLLM (OpenAI-compatible server) |
| Load generation | `vllm bench serve` or GuideLLM |
| Quality | `lm-evaluation-harness` on 1–2 small tasks |
| Analysis | pandas + matplotlib in a notebook; results as CSV |

## What to measure

| Metric | Why |
|---|---|
| TTFT p50/p95 | User-perceived responsiveness; driven by prefill and queueing |
| TPOT / ITL p50/p95 | Streaming speed; driven by decode and batch size |
| Output tokens/s (total) | Throughput: what capacity is bought for |
| Goodput (requests/s meeting SLO) | The number that should drive capacity |
| KV cache usage, preemptions | When you hit the memory wall |
| GPU metrics (SM active, DRAM active, power) | What "utilization" really means |
| Cold-start time | Autoscaling feasibility |
| Accuracy per precision | What quantization costs in quality |

## Sweep dimensions

- Concurrency: 1, 2, 4, 8, 16, 32, 64
- Prompt / output length: short chat (≈256/128), RAG (≈2K/256), long context (≈8K/256)
- Precision: FP16, INT4 (AWQ or GPTQ), FP8 (on Ada/Hopper rental)
- vLLM settings: `max-num-seqs`, chunked prefill on/off, prefix caching on/off

## Milestones

| Week | Milestone |
|---|---|
| 1 | Repo created; first tokens/s |
| 2 | TTFT and TPOT charts |
| 3 | `kv_calc.py` validated against vLLM |
| 4 | Concurrency sweep + throughput/latency knee |
| 6 | Quantization speed vs quality table |
| 8 | GPU metrics alongside load tests |
| 9 | Goodput under SLO |
| 10 | Cold-start breakdown |
| 11 | `cost.py`: cost per 1M tokens + API break-even |
| 12 | `gpus_needed()` using Little's law |
| 13 | README, post, share |

## Deliverables

- [ ] Repo with reproducible scripts, raw CSVs and charts
- [ ] `kv_calc.py`, `cost.py`, `gpus_needed()`
- [ ] Post: *"How many GPUs does this LLM actually need? A first-principles benchmark."*
- [ ] One summary chart that fits in a LinkedIn post

## Stretch goals

- Compare vLLM with SGLang on the same workload.
- Add a shared-prefix workload to show prefix caching gains.
- Package the calculator as a small web page.

## Interview story

> "Capacity requests usually arrive as 'we need 8 GPUs.' I built a benchmark that turns a workload description into a GPU count from first principles and measurement: KV cache limits, the batching knee and goodput under an SLO. On a T4 I found _(result)_. Quantizing to INT4 gave _(x)_ more throughput for _(y)_ accuracy loss, which changed my recommendation from _(a)_ to _(b)_."

## Results & lessons

_(Fill in at Week 13.)_
