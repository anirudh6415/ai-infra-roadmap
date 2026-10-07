---
title: About this roadmap
---

I work on AI infrastructure and GPU capacity at eBay: GPU fleets, node hardware, demand planning, commercial and open-source LLM capacity, reclamation and tech refresh. This roadmap is about the layer underneath that work: **why a model needs a certain number of GPUs, and how to make it need fewer.**

!!! abstract "The goal in 3 years"
    Be the person who knows how to make LLMs run fast and cheap on GPUs, down to the hardware, and who can still ship a working solution in six weeks.

## Why this path

- **Capacity is the starting advantage.** Most people who learn vLLM or CUDA have never seen a real GPU fleet, real demand or real cost pressure. I have.
- **The missing piece is the mechanism.** Being able to explain and *change* how much GPU a workload needs is what turns capacity work into performance engineering.
- **Research background helps.** Four papers on multimodal benchmarks (EMNLP, IJCNLP-AACL, ACL, NeurIPS) mean I can measure quality, not just speed. That matters for quantization and serving trade-offs.

## How I work through it

| When | Time | What |
|---|---|---|
| Weekday mornings (before work) | 30 min | **Learn**: read or watch one concept. A 10-minute day still counts. |
| Saturday | 2 h | **Build**: run the experiment, write the code. |
| Sunday | 2 h | **Ship**: finish, write it up, push, post. |

## Three rules

1. **Every week ends with something visible**: a commit, a chart, a note or a post.
2. **Only one *Deep* topic in progress at a time.** New ideas go in the [parking lot](roadmap/index.md#parking-lot).
3. **Buffer weeks are part of the plan.** Missing a week isn't failing. Skipping the log is.
