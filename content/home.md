---
title: About this roadmap
---

Most people who plan GPU capacity work from dashboards and vendor numbers. This roadmap is about the layer underneath: **why a model needs a certain number of GPUs, and how to make it need fewer.** It starts from capacity planning (fleets, demand, quotas, cost) and works down to serving engines, kernels and hardware, then back up to scheduling, economics and planning tools.

!!! abstract "The goal"
    Know how to make LLMs run fast and cheap on GPUs, down to the hardware, and still be able to ship a working solution in six weeks.

## Why this path

- **Capacity is a strong starting point.** Real fleets, real demand and real cost pressure give context most kernel and serving tutorials skip.
- **The missing piece is the mechanism.** Being able to explain and *change* how much GPU a workload needs is what turns capacity work into performance engineering.
- **Measure quality, not just speed.** Quantization and serving shortcuts cost accuracy. Every speed result on this site comes with an evaluation.

## How the weeks work

| When | Time | What |
|---|---|---|
| Weekday mornings | 30 min | **Learn**: read or watch one concept. A 10-minute day still counts. |
| Saturday | 2 h | **Build**: run the experiment, write the code. |
| Sunday | 2 h | **Ship**: finish the week's mini-project, write it up, push, post. |

## Three rules

1. **Every week ends with something visible**: the week's mini-project, plus a short log entry.
2. **Only one *Deep* topic in progress at a time.** New ideas go in the [parking lot](roadmap/index.md#parking-lot).
3. **Buffer weeks are part of the plan.** Missing a week isn't failing. Skipping the log is.
