---
title: "Month 12+ · Interview prep"
---

# Month 12+ · Interview prep

**Target roles:** LLM inference engineer, AI infrastructure / performance engineer, GPU capacity & efficiency engineer, ML platform engineer, at AI labs, GPU makers and GPU clouds.

**Plan:** 8–12 weeks, same time budget as the roadmap.

## What these interviews usually cover

| Round | What it tests | How the roadmap prepares you |
|---|---|---|
| Coding | Clean Python, data structures, sometimes concurrency | Coding track from month 6 |
| Inference / ML system design | "Serve model X at N RPS under latency SLO Y," "Design a GPU scheduler" | P1 + P4: you've measured and planned this |
| Performance deep dive | Roofline, memory bandwidth, KV cache, batching, profiling | Phases 1–2 |
| Distributed systems | Parallelism, collectives, failures, checkpointing | Phase 3 |
| Project deep dive | Walk through one project, trade-offs and numbers | Your four projects |
| Behavioral | Influence without authority, negotiation, ambiguity | Your capacity negotiations with developers |

## Weekly shape

- **Weekdays (30 min):** 1 coding problem or 1 system design concept.
- **Saturday (2 h):** one full system design mock, written or spoken out loud and recorded.
- **Sunday (2 h):** review mistakes; refine stories.

## System design practice prompts

- [ ] Serve a 70B model at 10K RPS with TTFT p95 < 500 ms. How many GPUs, which type, what config?
- [ ] Design a multi-tenant GPU platform for training and inference with fair sharing and preemption.
- [ ] Design an LLM gateway that routes across self-hosted and commercial models with cost controls.
- [ ] Design capacity planning for an agent product whose traffic doubles every quarter.
- [ ] Design checkpointing and recovery for a 4,096-GPU training job.
- [ ] Design reclamation for idle GPUs without hurting teams' SLOs.
- [ ] Design a vector search service for 1B embeddings with p99 < 50 ms.

## Stories to prepare (STAR format)

- [ ] A capacity negotiation where you got a team to accept a different latency/cost trade-off
- [ ] Building the reclamation tool: problem, approach, impact (with numbers from your private impact log)
- [ ] Starting capacity office hours: influence without authority
- [ ] A research result you're proud of, and what you'd do differently
- [ ] A time you were wrong and changed your mind based on data

## Before applying

- [ ] Resume rewritten around measurable impact and the four projects
- [ ] Profile site updated with projects and posts
- [ ] Referrals asked for from co-authors and community contacts
- [ ] Three mock interviews done with someone else
