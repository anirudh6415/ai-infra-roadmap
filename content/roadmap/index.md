---
title: Roadmap
---

# Roadmap

Six phases of 13 weeks each (78 weeks, about 18 months). Interview prep can start alongside Phase 5. Every week has the same shape:

- **Learn** (weekday mornings, 30 min): one concept, with a named resource.
- **Build** (Saturday, 2 h): an experiment or code.
- **Ship** (Sunday, 2 h): finish, write it up, push, log it.
- **Mini-project**: one small, named thing you ship that week.
- **Done when**: checkboxes you tick (or tick through the log form). They feed every progress bar.

## Calendar

Week 1 starts **Monday, 12 October 2026**. Dates are a guide, not a deadline; if life happens, slide the whole plan, don't cram.

| Phase | Weeks | Dates (approx.) | Project | Buffer weeks |
|---|---|---|---|---|
| [1 · Inference & GPU memory](phase-1.md) | 1–13 | 12 Oct 2026 – 10 Jan 2027 | [P1 · LLM capacity bench](../projects/p1-llm-capacity-bench.md) | 5 (light), 11–12 (holidays, light) |
| [2 · Down to the GPU](phase-2.md) | 14–26 | 11 Jan – 11 Apr 2027 | [P2 · Kernel lab](../projects/p2-kernel-lab.md) | 18 (light) |
| [3 · Scale out](phase-3.md) | 27–39 | 12 Apr – 11 Jul 2027 | [P3 · Fault-tolerant FSDP](../projects/p3-fault-tolerant-fsdp.md) | 31 (light) |
| [4 · Platform & economics](phase-4.md) | 40–52 | 12 Jul – 10 Oct 2027 | [P4 · GPU capacity planner](../projects/p4-capacity-planner.md) | 44 (light) |
| [5 · Serving at scale](phase-5.md) | 53–65 | 11 Oct 2027 – 9 Jan 2028 | [P5 · Disaggregated serving lab](../projects/p5-disaggregated-serving-lab.md) | 63 (light), 64 (holidays, light) |
| [6 · Training & fleet operations](phase-6.md) | 66–78 | 10 Jan – 9 Apr 2028 | [P6 · Post-training & fleet health lab](../projects/p6-post-training-fleet-lab.md) | 70 (light) |
| [Interview prep](interview-prep.md) | 53+ (light), full focus when applying | Oct 2027 → | System design + coding | |

Alongside the phases: [ongoing tracks](ongoing.md) (Foundations: containers, Kubernetes and CI/CD; vector DB infra; coding practice from month 6; writing) and the [tool radar](../radar.md).

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
| Prefix caching, speculative decoding, P/D disaggregation | 2 · W25 (reading), 5 · W53–W54 (hands-on), 5 · W59 |
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
| KV-cache-aware routing, KV offloading | 5 · W55–W56 |
| Multi-LoRA serving, long context | 5 · W57–W58 |
| Embedding and non-LLM serving (TEI, Triton Inference Server, TensorRT) | 5 · W60–W61 |
| Benchmarking methodology (open-loop load, MLPerf) | 5 · W62 |
| Distillation, pruning, sparsity, model routing | 5 · W63 |
| Multimodal (vision-language) serving | 5 · W58 |
| Batch / offline inference and priority tiers | 5 · W64 |
| Energy efficiency (tokens per joule, power capping) | 1 · W8, 6 · W75 |
| Multi-tenant isolation and security, GitOps | 4 · W42–W43 |
| Open-source contribution, paper habit | Ongoing |
| All optimization levers in one place | [Optimization playbook](../playbook.md) |
| FP8 training, Megatron-Core / DeepSpeed | 6 · W66–W67 |
| Activation recompute, sequence/context/expert parallelism | 6 · W68 |
| Fine-tuning infra (LoRA, QLoRA) | 6 · W69 |
| Data loading at scale | 6 · W70 |
| RL post-training infra (GRPO, rollouts) | 6 · W71–W72 |
| GPU health, failures, spares | 6 · W73–W74 |
| Cloud GPU purchasing and TCO | 6 · W75 |
| TPUs and JAX | 6 · W76 |
| AMD GPUs, cloud chips, kernel libraries | 6 · W77 |
| LLM gateways (LiteLLM, Envoy AI Gateway) | 1 · W11 |
| Containers, Kubernetes basics, CI/CD, MLflow, Helm | Foundations: W4, W8, W10, W13, W24, W43 |
| Vector DB / embedding infra | Ongoing, 5 · W60 |

## Compute you'll need

| Need | Free option | Paid option |
|---|---|---|
| 1 GPU for inference & kernels (Phases 1–2) | Google Colab (T4), Kaggle (T4 / P100) | Hourly rental of an L4, A10, A100 or H100 from a GPU cloud |
| 2 GPUs for DDP / FSDP / TP (Phase 3) | Kaggle "GPU T4 ×2" | 2–4× A100/H100 node by the hour |
| FP8, FlashAttention-2/3, newer kernels | ✗ (T4 is too old) | Ampere (A100/A10/L4) or newer; FP8 needs Ada/Hopper or newer |
| Kubernetes experiments (Phase 4) | `kind` on your laptop + fake GPU operator | A single rented GPU VM with k3s |
| Disaggregation and RL experiments (Phases 5–6) | ✗ | 2–4 GPUs by the hour for a few sessions; FP8-capable GPU for Week 66 |

!!! tip "Keep rentals cheap"
    Write and debug on free GPUs, then rent only for the final measurement run. Always set an auto-shutdown and delete volumes when done. Budget a small fixed amount per phase and log what you spend.

## Parking lot

Ideas that came up mid-phase. Don't start them now; revisit at the next phase boundary.

**Deferred on purpose** (add as new weeks or a Phase 7 when the time comes):

- **Agent infrastructure in depth:** agent runtimes, tool sandboxes, long-running task execution, memory stores, evaluating agents at scale (W48 covers only capacity modeling and MCP basics).
- **Image, video and audio generation serving:** diffusion models, video generation, speech-to-text and text-to-speech have very different cost shapes from LLMs.
- **LLM application observability:** tracing prompts, evals in production, cost per feature.
- **Security in depth:** confidential computing, model-weight protection, supply-chain security for images and models.
- **Data center power and cooling:** rack power density, liquid cooling, and site planning beyond W18 and W75.
- **ML platform pipelines:** Kubeflow, feature stores, training pipelines.
- **Edge and on-device deployment** beyond the W63 aside.

**Your ideas:**

- _(add ideas here)_
