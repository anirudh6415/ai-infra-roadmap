---
title: "P6 · Post-training & fleet health lab"
---

# P6 · Post-training & fleet health lab

**Phase 6 · Weeks 66–78** · Repo: `post-training-fleet-lab` _(add link)_

## Goal

Two linked questions: **"What does an RL post-training job need from a GPU fleet?"** and **"How do you keep that fleet healthy and buy its capacity well?"**

## Why it matters

- RL post-training (GRPO, PPO) mixes inference and training in one job, which makes it one of the hardest workloads to plan capacity for.
- Fleet health, spares and purchasing decide how much of the capacity you pay for is actually usable.

## Setup

| Item | Choice |
|---|---|
| GPUs | 1–2 rented GPUs (FP8-capable for Week 66) |
| Training | Transformer Engine, Megatron-Core or DeepSpeed, torchtitan, PEFT, TRL (GRPO) with vLLM generation |
| Fleet | DCGM / `nvidia-smi`, Kubernetes node problem detector (reading), SkyPilot (reading) |

## Experiments

1. BF16 vs FP8 training (W66).
2. Two training frameworks on the same model (W67).
3. QLoRA fine-tune sizing (W69).
4. GRPO run: generation vs training time (W71) and the optimal GPU split (W72).
5. GPU health classification and runbook (W73); spares model (W74).
6. Cloud purchasing TCO (W75).

## Milestones

| Week | Milestone |
|---|---|
| 66–68 | FP8, frameworks, big-model memory planner |
| 69–70 | Fine-tuning sizer, data loading |
| 71–72 | GRPO run and RL capacity model |
| 73–75 | Health checker, spares, cloud TCO |
| 76–77 | TPUs and JAX; AMD and other accelerators |
| 78 | README, post, share |

## Deliverables

- [ ] `train-memory-planner`, `finetune-sizer`, `rl-capacity-model`, `spares-calc`, `cloud-gpu-tco`
- [ ] `gpu-health-checker` and runbook
- [ ] Post: *"What an RL post-training run really needs from a GPU fleet."*

## Interview story

> "I ran a small GRPO job and found _(x)_% of GPU time went to generation, not training. Using that, I built a model for splitting a GPU budget between rollout and training, and paired it with a fleet-health runbook and a spares model so planned capacity turns into usable capacity."

## Results & lessons

_(Fill in at Week 78.)_
