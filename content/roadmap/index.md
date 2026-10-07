---
title: Roadmap
---

# Roadmap

Four phases of 13 weeks each, then interview prep. Every week has the same shape:

- **Learn** (weekday mornings, 30 min): one concept, with a named resource.
- **Build** (Saturday, 2 h): an experiment or code.
- **Ship** (Sunday, 2 h): finish, write it up, push, log it.
- **Done when**: checkboxes you tick on the phase page. They feed the README progress bars.

## Calendar

Week 1 starts **Monday, 12 October 2026**. Dates are a guide, not a deadline; if life happens, slide the whole plan, don't cram.

| Phase | Weeks | Dates (approx.) | Project | Buffer weeks |
|---|---|---|---|---|
| [1 · Inference & GPU memory](phase-1.md) | 1–13 | 12 Oct 2026 – 10 Jan 2027 | [P1 · LLM capacity bench](../projects/p1-llm-capacity-bench.md) | 5 (light), 11–12 (holidays, light) |
| [2 · Down to the GPU](phase-2.md) | 14–26 | 11 Jan – 11 Apr 2027 | [P2 · Kernel lab](../projects/p2-kernel-lab.md) | 18 (light) |
| [3 · Scale out](phase-3.md) | 27–39 | 12 Apr – 11 Jul 2027 | [P3 · Fault-tolerant FSDP](../projects/p3-fault-tolerant-fsdp.md) | 31 (light) |
| [4 · Platform & economics](phase-4.md) | 40–52 | 12 Jul – 10 Oct 2027 | [P4 · GPU capacity planner](../projects/p4-capacity-planner.md) | 44 (light) |
| [Interview prep](interview-prep.md) | 53+ | Oct 2027 → | System design + coding | |

Alongside the phases: [ongoing tracks](ongoing.md) (vector DB infra, work-driven topics, coding practice from month 6, writing).

## Where each topic lives

| Topic from the master list | Phase · Week |
|---|---|
| LLM inference serving | 1 · W1–W4, 2 · W25 |
| Quantization + quality evals | 1 · W6 |
| PyTorch GPU memory optimization | 1 · W7 |
| GPU observability | 1 · W8 |
| SLI / SLO / SLA | 1 · W9 |
| Autoscaling & cold starts | 1 · W10, 4 · W43 |
| LLM gateways & token economics | 1 · W11 |
| Queueing theory | 1 · W12, 4 · W47 |
| Model architecture literacy | 1 · W5 |
| GPU architecture | 2 · W14 |
| CUDA fundamentals | 2 · W15–W16 |
| Roofline | 2 · W17 |
| GPU hardware generations | 2 · W18 |
| Profiling (PyTorch, Nsight) | 2 · W19–W20 |
| Triton | 2 · W21–W23 |
| torch.compile, CUDA Graphs, MFU | 2 · W24 |
| Prefix caching, speculative decoding, P/D disaggregation | 2 · W25 |
| Linux performance | 2 · W26 |
| Distributed training: DDP → FSDP → TP/PP | 3 · W27–W30 |
| Collective communication / NCCL | 3 · W28 |
| Expert parallelism / MoE inference | 3 · W31 |
| Networking & GPU topology | 3 · W32 |
| Checkpointing & fault tolerance | 3 · W33–W34 |
| Slurm + Ray | 3 · W35–W36 |
| Distributed storage | 3 · W37 |
| Training capacity math | 3 · W38 |
| Kubernetes GPU scheduling, MIG, time-slicing | 4 · W40–W41 |
| Multi-tenancy, Kueue, DRA | 4 · W42 |
| Inference on K8s, KEDA, distributed tracing | 4 · W43 |
| Terraform / IaC | 4 · W44 |
| FinOps | 4 · W45 |
| OR-Tools, LP / MIP | 4 · W46 |
| Forecasting + simulation | 4 · W47 |
| Agentic workload modeling + MCP | 4 · W48 |
| Vector DB / embedding infra | Ongoing |

## Compute you'll need

| Need | Free option | Paid option |
|---|---|---|
| 1 GPU for inference & kernels (Phases 1–2) | Google Colab (T4), Kaggle (T4 / P100) | Hourly rental of an L4, A10, A100 or H100 from a GPU cloud |
| 2 GPUs for DDP / FSDP / TP (Phase 3) | Kaggle "GPU T4 ×2" | 2–4× A100/H100 node by the hour |
| FP8, FlashAttention-2/3, newer kernels | ✗ (T4 is too old) | Ampere (A100/A10/L4) or newer; FP8 needs Ada/Hopper or newer |
| Kubernetes experiments (Phase 4) | `kind` on your laptop + fake GPU operator | A single rented GPU VM with k3s |

!!! tip "Keep rentals cheap"
    Write and debug on free GPUs, then rent only for the final measurement run. Always set an auto-shutdown and delete volumes when done. Budget a small fixed amount per phase and log what you spend.

## Parking lot

Ideas that came up mid-phase. Don't start them now; revisit at the next phase boundary.

- _(add ideas here)_
