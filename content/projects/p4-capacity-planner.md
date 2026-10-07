---
title: "P4 · GPU capacity planner (capstone)"
---

# P4 · GPU capacity planner (capstone)

**Phase 4 · Weeks 40–52** (core build Weeks 46–51) · Repo: `gpu-capacity-planner` _(add link)_ · Status: ⬜

## Goal

A tool that takes a description of workloads (LLM serving, agents, training) and recommends **which GPUs, how many, which serving config and where to place them**, at minimum cost while meeting SLOs. It shows its reasoning: capacity curves, queueing estimates, simulation and cost per million tokens.

## Why it matters

- It combines everything: your benchmarks (P1), performance understanding (P2), training math (P3), and optimization, queueing and FinOps (Phase 4).
- Agentic workload modeling is new territory; very few people can size it well.
- It's the "ship a solution in six weeks" half of your goal, and a project you can talk about for an hour in an interview.

## Inputs

```yaml
workloads:
  - name: chat-assistant
    type: llm_serving
    model: llama-3.1-8b-instruct
    rps_peak: 40
    prompt_tokens: {p50: 800, p95: 3000}
    output_tokens: {p50: 200, p95: 600}
    slo: {ttft_p95_ms: 800, tpot_p95_ms: 60}
  - name: support-agent
    type: agent
    model: llama-3.1-8b-instruct
    tasks_per_min_peak: 120
    steps_per_task: {p50: 6, p95: 15}
    context_growth_tokens_per_step: 900
    tool_latency_ms: {p50: 400, p95: 2000}
  - name: weekly-finetune
    type: training
    params_b: 8
    tokens_b: 2
    deadline_hours: 48

gpu_catalog:            # your benchmark-derived capacity curves + prices
  - {type: L4,   mem_gb: 24, price_hr: <fill>, curves: results/l4.csv}
  - {type: A100, mem_gb: 80, price_hr: <fill>, curves: results/a100.csv}
  - {type: H100, mem_gb: 80, price_hr: <fill>, curves: results/h100.csv}

constraints:
  budget_per_month: <fill>
  max_gpus_per_type: {H100: 16}
  sharing: [whole, mig, time_slicing]
```

## How it works

```text
workload specs ──▶ workload model (tokens/s, burstiness, agent step expansion) ─┐
P1 benchmark data ──▶ capacity curves per GPU / config ─────────────────────────┤
                                                                                ▼
                        per-config capacity = max goodput under SLO
                                                │
                                                ▼
                MIP (OR-Tools): min cost s.t. SLO, budget, GPU limits, placement
                                                │
                                                ▼
                     SimPy check: p95 latency under bursty load
                                                │
                                                ▼
     plan + cost report (GPUs, config, placement, $ per 1M tokens, idle cost)
                                                │
                                                ▼
                            Streamlit UI  +  MCP tool
```

**Optimization sketch** (refine in Week 46):

```formula
variables    x[g,c,w] = GPUs of type g running config c for workload w   (integer)

minimize     Σ x[g,c,w] · price[g]

subject to   Σ_g,c x[g,c,w] · goodput[g,c,w] ≥ demand[w] · (1 + headroom)   ∀ w
             Σ_c,w x[g,c,w] ≤ available[g]                                   ∀ g
             total cost ≤ budget
             x[g,c,w] = 0 where model + KV cache doesn't fit on g
             training GPU-hours ≥ 6·N·D ÷ (peak FLOP/s · MFU), before deadline
```

## Milestones

| Week | Milestone |
|---|---|
| 45 | Cost allocation module (FinOps) |
| 46 | Toy MIP working |
| 47 | SimPy simulation and queueing check |
| 48 | Agent workload profile from your MCP experiment |
| 49 | Planner core: data → curves → MIP |
| 50 | Agents, K8s placement, UI |
| 51 | MCP tool, write-up, demo video |
| 52 | Publish |

## Deliverables

- [ ] `planner/` package with tests
- [ ] Example workload files and a sample report
- [ ] Streamlit (or web) UI
- [ ] MCP server exposing `plan_capacity(workloads)`
- [ ] 3–5 minute demo video
- [ ] Post: *"Planning GPU capacity for LLM and agent workloads with optimization."*

## Stretch goals

- Forecast-driven planning: take a demand history, forecast with uncertainty, plan for the p90 forecast.
- Reclamation suggestions: flag allocations whose measured goodput is far below their reservation.
- Compare self-hosting with commercial APIs in the same plan.

## Interview story

> "I built a planner that turns workload descriptions into a hardware plan. It uses capacity curves I measured myself, a mixed-integer program for cost, and simulation to check tail latency under bursts. For agent workloads it models steps per task and context growth, which made the same traffic need _(x)_× the GPUs of plain chat. It's also an MCP tool, so you can ask an assistant for a plan."

## Results & lessons

_(Fill in at Week 52.)_
