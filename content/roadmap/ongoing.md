---
title: Ongoing tracks
---

# Ongoing tracks

Things that run alongside the phases instead of getting their own weeks.

## 0 · Foundations: containers, Kubernetes & delivery

Six short **Foundations** steps sit inside regular weeks, so the basics of shipping software are covered without extra weekends. Each adds one task to its week.

| Week | Foundations step | Why it's there |
|---|---|---|
| [W04](phase-1.md#w04) | Run vLLM from its official Docker image | Every serving stack ships as a container |
| [W08](phase-1.md#w08) | `kind` cluster + Learn Kubernetes Basics | Pods, Deployments, Services, rollouts |
| [W10](phase-1.md#w10) | Deploy a small model with vLLM on `kind` | Same week as autoscaling and cold starts |
| [W13](phase-1.md#w13) | GitHub Actions CI for `llm-capacity-bench` | Tests on every push; this site already deploys this way |
| [W24](phase-2.md#w24) | Track runs in MLflow | Compare benchmark runs instead of loose CSVs |
| [W43](phase-4.md#w43) | Install a serving stack with Helm | How real clusters package deployments |

Kubernetes then goes deeper in Phase 4 (GPU scheduling, MIG, Kueue, DRA, KServe, KEDA), and Terraform in Week 44.

**Deliberately left out:** model training pipelines and feature stores (Kubeflow, feature-store tooling). They matter for ML platform roles but don't change how many GPUs a model needs. Add them to the parking lot if your target role asks for them.

## 1 · Learn through the job

If your job already touches GPUs, Kubernetes or ML platforms, several topics can be learned there. Learn them when work raises a question, not on weekends.

| Topic | How to use work for it |
|---|---|
| Vector DB & embedding infrastructure | Formalize what you already run: index memory math (HNSW vs IVF-PQ), recall vs latency, sharding and replicas. Write one generic note per quarter. |
| GPU observability | Every time you build or change a dashboard, check it against what you learned in Phase 1 Week 8. |
| Hardware tech refresh | Use Phase 2 Week 18 and your benchmark skills to test new hardware on real workloads, not vendor numbers. |
| Ray | If your platform runs Ray, Phase 3 Week 36 teaches the inside. |
| Kubernetes, quotas, reclamation | Phase 4 gives you the vocabulary (Kueue, DRA, preemption) to propose improvements. |
| Terraform, storage | Learn when a work task requires it. |

**Ideas that also help your next promotion** (they save money, which is how to get them prioritized):

- A cost-per-token / GPU-efficiency report for your top LLM workloads.
- Benchmarking new hardware on your actual workloads during tech refresh.
- Feeding your weekend benchmark methods into capacity planning.

!!! danger "Keep internal details private"
    Nothing employer-internal goes in this public repo: no internal names, numbers, costs, architecture or screenshots. Keep your **impact log** (e.g. "reclaimed X GPUs, saved $Y/year") in a private doc. Update it monthly; it feeds your resume, promotion packet and interview stories.

## 2 · Coding practice (from month 6)

Starting around Week 26, use **two of the five** weekday 30-minute slots for coding instead of reading.

- 2–3 medium problems a week, in Python, **without AI help**. Time yourself.
- Follow a structured list (e.g. NeetCode 150) so you're not choosing problems.
- Focus areas for infra roles: arrays and hashing, heaps (scheduling!), graphs, intervals, binary search, and simple concurrency.
- Keep a log of mistakes, not solutions.

## 3 · Writing in public

- **One solid post per phase** (four in the year). Publish on your profile site's blog and share on LinkedIn.
- **One short LinkedIn post per month** on something you measured.
- Convert good notes into posts; don't write from scratch.

## 4 · Contribute upstream

From Phase 2 on, aim for **one small upstream contribution per phase** to a project you're already using (vLLM, SGLang, llm-d, GuideLLM, a Kubernetes SIG tool). Start with docs fixes, benchmark scripts, or a bug you hit yourself; read the project's contributing guide first (e.g. [Contributing to vLLM](https://docs.vllm.ai/en/latest/contributing/)). Merged PRs in serving or kernel projects are one of the strongest signals for AI infrastructure roles. Log each one.

## 5 · Paper habit

One systems paper every two weeks, read in a weekday slot: the papers linked from each phase first, then new MLSys / OSDI work. Write a five-line note in `content/notes/`: problem, key idea, the number that matters, what it changes for capacity, and whether you'd use it.

## 6 · Community

- Join **GPU MODE** (Discord + lectures) and the **vLLM** community. Ask one question or answer one per month.
- Get back in touch with past collaborators; some may now work at the companies you're aiming for.

## 7 · Monthly retro

Last Sunday of each month, 15 minutes, as a progress-log entry: what shipped, what slipped and why, whether the next month's plan still fits your life.
