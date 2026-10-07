---
title: "P2 · Kernel lab"
---

# P2 · Kernel lab

**Phase 2 · Weeks 14–26** · Repo: `kernel-lab` _(add link)_

## Goal

Show **where the time goes** in an LLM layer, explain it with the roofline model, and **make one part faster** with your own kernel, in CUDA and in Triton.

## Why it matters

- Moves you from "the GPU is busy" to "this kernel is memory-bound at 70% of peak bandwidth, so batching won't help it but fusion will."
- Kernel-level work is the clearest signal for GPU performance roles at NVIDIA and the labs.
- MFU and roofline thinking feed straight back into capacity: they tell you how much headroom a fleet really has.

## Setup

| Item | Choice |
|---|---|
| GPU | Colab T4 for CUDA/Triton; rented GPU for Nsight Compute sessions |
| Tools | `nvcc`, PyTorch profiler, Nsight Systems, Nsight Compute, Triton |
| Target | One decoder layer of a small Llama-style model |

## Milestones

| Week | Milestone |
|---|---|
| 14–15 | GPU Puzzles done; first CUDA kernels timed |
| 16 | Naive vs tiled matmul vs cuBLAS |
| 17 | Roofline chart with your kernels and LLM decode |
| 19 | Profile of prefill and decode; top 5 kernels |
| 20 | Nsight Compute–guided optimization |
| 21–22 | Triton softmax and matmul |
| 23 | Fused RMSNorm (+ residual) in Triton |
| 24 | torch.compile speedup; MFU by hand |
| 25 | Prefix caching and speculative decoding benchmarks |
| 26 | README, post, share |

## Deliverables

- [ ] `cuda/`: vector add, naive and tiled matmul, with timings
- [ ] `triton/`: softmax, matmul, fused RMSNorm with tests (`torch.allclose`) and benchmarks
- [ ] `profiling/`: annotated traces and a "where the time goes" write-up
- [ ] Roofline chart with every kernel placed
- [ ] Post: *"Where the time goes: profiling an LLM layer and speeding up one kernel."*

## Stretch goals

- A fused SwiGLU or rotary-embedding kernel.
- Try your Triton kernel inside a real model's forward pass and measure end-to-end change.
- Submit to a GPU MODE kernel competition, if one is running.

## Interview story

> "I profiled a decoder layer and found decode time was dominated by memory-bound ops, not matmuls. On the roofline, RMSNorm sat far left of the ridge point, so I fused it with the residual add in Triton, which cut _(x)_% of its time. Then I computed MFU for decode, _(y)_%, which explains why decode-heavy workloads need more GPUs than FLOP counts suggest."

## Results & lessons

_(Fill in at Week 26.)_
