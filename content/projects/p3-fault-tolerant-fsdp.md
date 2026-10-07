---
title: "P3 · Fault-tolerant FSDP"
---

# P3 · Fault-tolerant FSDP

**Phase 3 · Weeks 27–39** · Repo: `fault-tolerant-fsdp` _(add link)_

## Goal

Train a small model across multiple GPUs with DDP and FSDP, **inject failures**, recover from checkpoints, and measure what each failure costs in **goodput**. Add multi-GPU inference with tensor parallelism.

## Why it matters

- At scale, failures are routine. Checkpoint interval and recovery time are capacity decisions: they decide how many GPU-hours a job really needs.
- It gives you hands-on answers for distributed-training interview questions instead of textbook ones.

## Setup

| Item | Choice |
|---|---|
| GPUs | Kaggle "GPU T4 ×2" (free); optional rented 4-GPU NVLink node for one final run |
| Model | nanoGPT or a small torchtitan config (~50–350M parameters) |
| Frameworks | PyTorch DDP, FSDP2, Distributed Checkpoint (DCP), `torchrun` elastic |
| Orchestration | `torchrun` directly, then Slurm (local Docker cluster) and Ray Train |
| Inference | vLLM with `--tensor-parallel-size 2` |

## Experiments

1. **Memory prediction:** predict peak memory, then measure (DDP vs FSDP).
2. **Throughput scaling:** 1 → 2 GPUs (→ 4 on a rental); scaling efficiency.
3. **Collectives:** all-reduce bandwidth vs message size; compare to PCIe / NVLink theory.
4. **Failure injection:** kill a rank at a random step; resume from the latest DCP checkpoint; record lost time.
5. **Checkpoint interval:** repeat (4) with 2–3 intervals; plot goodput vs interval; compare with the Young/Daly formula.
6. **Tensor parallel inference:** TP=1 vs TP=2 latency and throughput.

## Milestones

| Week | Milestone |
|---|---|
| 27 | DDP on 2 GPUs; memory predicted vs measured |
| 28 | All-reduce bandwidth benchmark |
| 29 | FSDP; model that fits only with FSDP |
| 30 | TP=2 inference |
| 33 | DCP checkpointing; save/load time |
| 34 | Failure injection; goodput vs interval |
| 35–36 | Same job on Slurm and Ray |
| 38 | `training_capacity.py` |
| 39 | README, post, share |

## Deliverables

- [ ] Training scripts for DDP and FSDP with DCP checkpointing
- [ ] Failure-injection script and results
- [ ] Charts: memory, scaling, all-reduce bandwidth, goodput vs checkpoint interval, TP inference
- [ ] `training_capacity.py`
- [ ] Post: *"What a GPU failure really costs: checkpointing, recovery and goodput on a small cluster."*

## Stretch goals

- Async checkpointing and its effect on step time.
- Run the job on KubeRay in `kind` (CPU) to see the Kubernetes path.

## Interview story

> "I wanted to know what failures cost in GPU-hours, so I trained a model with FSDP, killed workers on purpose and measured recovery. With a _(x)_-minute checkpoint interval we lost _(y)_% goodput; the Young/Daly formula predicted _(z)_, close to what I saw. That's the same reasoning I'd use to size reserve capacity for a large training job."

## Results & lessons

_(Fill in at Week 39.)_
