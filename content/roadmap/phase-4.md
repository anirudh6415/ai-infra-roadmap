---
title: "Phase 4 · Platform & economics"
---

# Phase 4 · Platform & economics

**Weeks 40–52 · 12 Jul – 10 Oct 2027**

!!! abstract "Outcome"
    You can design how GPUs are shared, scheduled and paid for on Kubernetes, model agentic workloads, and turn all of it into an optimization model that recommends what hardware to run and where. This becomes your capstone.

**Project:** [P4 · GPU capacity planner (capstone)](../projects/p4-capacity-planner.md) · **Post:** *"Planning GPU capacity for LLM and agent workloads with optimization."*

**Hardware:** mostly your laptop (`kind`, fake GPU operator, OR-Tools). A rented GPU VM with k3s is optional for Weeks 40–41.

---

### Week 40 · Kubernetes GPU scheduling basics

- **Learn:** the path from pod spec to GPU: device plugin, NVIDIA GPU Operator, GPU Feature Discovery labels, taints and tolerations, node selectors.
- **Build:** a `kind` cluster with Run:ai's fake GPU operator, so you can schedule "GPU" pods without real GPUs. (Optional: k3s + GPU Operator on a rented GPU VM.)
- **Ship:** diagram of the scheduling path with the YAML that drives each step.

**Done when**

- [ ] Cluster running with schedulable (fake or real) GPUs
- [ ] GPU pods scheduled using labels and tolerations
- [ ] Scheduling path diagram

### Week 41 · GPU sharing: MIG, time-slicing, MPS

- **Learn:** what each one isolates (memory, compute, faults) and what it doesn't. GPU Operator docs on MIG and time-slicing.
- **Build:** configure time-slicing (and MIG if on a supporting GPU); run two workloads on one GPU.
- **Ship:** a decision matrix: workload type → sharing method.

**Done when**

- [ ] Sharing configured and tested
- [ ] Decision matrix written

### Week 42 · Batch scheduling and multi-tenancy

- **Learn:** Kueue (ClusterQueues, LocalQueues, cohorts, borrowing), quotas, priority and preemption, gang scheduling (Volcano, NVIDIA KAI Scheduler), Dynamic Resource Allocation (DRA), noisy neighbors.
- **Build:** set up Kueue on `kind` with two teams, quotas and borrowing; demonstrate preemption.
- **Ship:** write-up mapping this to how you manage quotas at work (generic, no internal details).

**Done when**

- [ ] Kueue with 2 tenants and quotas working
- [ ] Preemption demonstrated
- [ ] DRA explained in a note

### Week 43 · Inference on Kubernetes and distributed tracing

- **Learn:** KServe, llm-d, Gateway API Inference Extension (model-aware routing), KEDA autoscaling on queue depth or custom metrics; OpenTelemetry tracing basics.
- **Build:** KEDA autoscaling a dummy service on a custom metric in `kind`; add an OpenTelemetry trace to a small FastAPI "gateway."
- **Ship:** a design doc: LLM serving on Kubernetes with routing, autoscaling, SLOs and tracing.

**Done when**

- [ ] KEDA scaling demo working
- [ ] One request traced end to end
- [ ] Serving design doc written

### Week 44 · Terraform (light week)

- **Learn:** Terraform basics: providers, resources, state, plan/apply/destroy.
- **Build:** provision a GPU VM (or a CPU VM if you want to stay free) with Terraform, then destroy it.
- **Ship:** catch up.

**Done when**

- [ ] VM created and destroyed with Terraform

### Week 45 · FinOps for AI

- **Learn:** FinOps Foundation framework; unit economics (cost per 1M tokens, cost per GPU-hour actually used); showback vs chargeback; OpenCost cost allocation.
- **Build:** a cost-allocation module for the planner: cost per team, model and 1M tokens, including idle GPU cost.
- **Ship:** a note on how idle capacity should be charged, and why it matters for reclamation.

**Done when**

- [ ] Cost allocation module working
- [ ] Idle-cost note written

### Week 46 · Linear and mixed-integer programming

- **Learn:** variables, constraints, objectives; LP vs MIP; OR-Tools (CP-SAT and linear solver) and PuLP.
- **Build:** a toy GPU allocation model: choose counts of each GPU type to serve a set of workloads at minimum cost, subject to SLO-based throughput limits and budget.
- **Ship:** the model in the P4 repo with a worked example.

**Done when**

- [ ] Toy allocation MIP solves correctly
- [ ] Results explained (which constraints bind)

### Week 47 · Forecasting and simulation

- **Learn:** time-series forecasting basics with uncertainty (Hyndman's *Forecasting: Principles and Practice*); discrete-event simulation with SimPy; M/M/c queues.
- **Build:** simulate a GPU pool under bursty load in SimPy; compare simulated p95 latency with the queueing formula.
- **Ship:** a chart showing why planning for the average fails under bursts.

**Done when**

- [ ] SimPy simulation of a GPU pool
- [ ] Simulated vs analytical latency compared

### Week 48 · Agentic workload modeling and MCP

- **Learn:** how agent traffic differs: multiple LLM calls per task, growing context, tool-call latency, fan-out, bursts. Anthropic's *Building effective agents*; the MCP specification.
- **Build:** a small MCP server (Python SDK) and a simple agent loop that uses it. Log tokens in/out, steps per task and wall time.
- **Ship:** an "agent workload profile" with parameters the planner can use.

**Done when**

- [ ] MCP server working with an agent loop
- [ ] Token and step distribution measured
- [ ] Agent workload profile defined

### Week 49 · Capstone build 1: planner core

- **Build:** load P1 benchmark data → per-GPU, per-config capacity curves → MIP that picks GPU type, count and serving config under SLO and budget.
- **Ship:** core planner with tests.

**Done when**

- [ ] Planner returns a plan for a sample workload
- [ ] Unit tests for the capacity curves and solver

### Week 50 · Capstone build 2: agents, Kubernetes placement, UI

- **Build:** add agentic workload profiles, MIG/time-slicing placement options and a Streamlit (or simple web) UI.
- **Ship:** demo-able app.

**Done when**

- [ ] Agentic workloads supported
- [ ] Placement recommendations included
- [ ] UI working

### Week 51 · Capstone build 3: MCP tool and write-up

- **Build:** expose the planner as an MCP tool so an assistant can ask "how many GPUs for this workload?"
- **Ship:** write-up draft and a 3–5 minute demo video.

**Done when**

- [ ] Planner available as an MCP tool
- [ ] Demo video recorded

### Week 52 · Ship the capstone and look back

- **Ship:** publish the capstone post; update your profile site, resume and LinkedIn; write the year retro.
- **Plan:** set up the [interview prep](interview-prep.md) schedule.

**Done when**

- [ ] Capstone post published
- [ ] Profile site, resume and LinkedIn updated
- [ ] Year retro written
- [ ] Interview prep plan started
