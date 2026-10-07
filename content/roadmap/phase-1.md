---
title: "Phase 1 · Inference & GPU memory"
---

# Phase 1 · Inference & GPU memory

**Weeks 1–13 · 12 Oct 2026 – 10 Jan 2027**

!!! abstract "Outcome"
    You can look at any LLM and workload and say, with numbers you measured yourself, how many GPUs it needs, what limits it (compute, memory bandwidth or KV cache), what it costs per million tokens, and what quantization does to speed and quality.

**Project:** [P1 · LLM capacity bench](../projects/p1-llm-capacity-bench.md) · **Post:** *"How many GPUs does this LLM actually need? A first-principles benchmark."*

**Hardware:** Colab or Kaggle T4 for most weeks. Rent an L4/A100 for one or two final runs (FP8 needs Ada/Hopper or newer).

---

### Week 1 · Setup and your first tokens

- **Learn:** kipply's *Transformer Inference Arithmetic* (first half). What a forward pass costs in FLOPs and bytes.
- **Build:** deploy this repo. Open Colab with a T4, `pip install vllm`, run offline inference on a ~1–1.5B instruct model (e.g. Qwen2.5-1.5B-Instruct or Llama-3.2-1B-Instruct). Record tokens/s.
- **Ship:** create the `llm-capacity-bench` repo with a README and your first number.
- **Mini-project:** `first-tokens`: a Colab notebook that serves a 1.5B model with vLLM and prints tokens/s.

**Done when**

- [ ] Roadmap site is live on GitHub Pages
- [ ] First Quick update logged from the site
- [ ] vLLM generates text on a free GPU and you've written down tokens/s
- [ ] `llm-capacity-bench` repo created

### Week 2 · Prefill vs decode

- **Learn:** prefill (compute-bound, processes the whole prompt at once) vs decode (one token at a time, memory-bandwidth bound). Arithmetic intensity. The inference chapter of *How to Scale Your Model*.
- **Build:** measure time-to-first-token (TTFT) as prompt length grows (128 → 4K tokens), and time-per-output-token (TPOT) at batch size 1.
- **Ship:** two charts plus a short explanation of why they look the way they do.
- **Mini-project:** `prefill-vs-decode`: a script and two charts (TTFT vs prompt length, TPOT at batch 1).

**Done when**

- [ ] TTFT vs prompt length chart
- [ ] TPOT at batch 1 measured, and compared with *(model bytes ÷ GPU memory bandwidth)*
- [ ] Note written: "Why decode is memory-bandwidth bound"

### Week 3 · KV cache math and PagedAttention

- **Learn:** KV cache size per token = `2 × layers × kv_heads × head_dim × bytes_per_value`. How GQA shrinks it. The PagedAttention paper (vLLM).
- **Build:** a small `kv_calc.py` that computes KV bytes/token and max concurrent sequences for 4–5 models given GPU memory. Check it against the KV cache size vLLM prints at startup.
- **Ship:** add the calculator to the repo; fill in the [KV cache math](../notes/kv-cache-math.md) note.
- **Mini-project:** `kv_calc.py`: a KV-cache calculator for any Hugging Face model config, checked against vLLM.

**Done when**

- [ ] `kv_calc.py` works for at least 4 models
- [ ] Your number matches vLLM's reported KV cache capacity (within ~10%)
- [ ] You can explain why GQA matters for capacity

### Week 4 · Batching and the throughput/latency knee

- **Learn:** static vs continuous batching (Orca paper), chunked prefill (Sarathi-Serve). vLLM's scheduler settings: `max-num-seqs`, `max-num-batched-tokens`.
- **Build:** start `vllm serve`, run a load test at concurrency 1, 2, 4 … 64 with `vllm bench serve` or GuideLLM. Record throughput, TTFT and TPOT p50/p95.
- **Ship:** the throughput vs latency chart: find the knee and explain it.
- **Foundations:** run `vllm serve` from vLLM's official Docker image instead of `pip install` (on a rented GPU or any Docker host with a GPU). Learn images, containers, volumes for the model cache, port mapping.
- **Mini-project:** `batching-knee`: a concurrency-sweep CSV and the throughput/latency chart.

**Done when**

- [ ] Concurrency sweep results saved as CSV
- [ ] Throughput vs p95 latency chart with the knee marked
- [ ] One paragraph explaining what limits throughput beyond the knee
- [ ] vLLM served from its official Docker image

### Week 5 · Model architecture literacy (light week)

- **Learn:** how MoE, GQA, MLA (DeepSeek) and long context change memory and compute per token. Active vs total parameters.
- **Build:** extend `kv_calc.py` with an MoE model and an MLA model.
- **Ship:** catch up on anything unfinished; draft the outline of the Phase 1 post.
- **Mini-project:** `arch-table`: params, active params and KV bytes/token for five architectures.

**Done when**

- [ ] Table comparing 5 architectures: params, active params, KV bytes/token
- [ ] Post outline drafted

### Week 6 · Quantization: speed *and* quality

- **Learn:** weight-only INT8/INT4, AWQ, GPTQ, FP8 (weights and KV cache). What each saves in memory and bandwidth.
- **Build:** benchmark FP16 vs AWQ/GPTQ INT4 (and FP8 if you rent an Ada/Hopper GPU) on the same model. Then run `lm-evaluation-harness` on one or two small tasks for each version.
- **Ship:** a speed vs quality table. This is where your benchmark research background stands out.
- **Mini-project:** `quant-shootout`: a speed vs accuracy table for FP16, INT4 and FP8.

**Done when**

- [ ] Throughput and memory for at least 2 precisions
- [ ] Accuracy for the same precisions on at least 1 eval task
- [ ] Recommendation written: when you'd accept the quality loss

### Week 7 · PyTorch GPU memory

- **Learn:** where memory goes: weights, activations, gradients, optimizer state, fragmentation. `torch.cuda.memory_summary()`, memory snapshots, mixed precision, activation checkpointing.
- **Build:** record a memory snapshot of a forward+backward pass of a small model; view it at pytorch.org/memory_viz. Cut peak memory with autocast and activation checkpointing.
- **Ship:** before/after peak-memory numbers with screenshots.
- **Mini-project:** `memory-snapshot`: an annotated PyTorch memory snapshot with before/after peak memory.

**Done when**

- [ ] Memory snapshot captured and explained
- [ ] Peak memory reduced and measured with at least 2 techniques

### Week 8 · GPU observability: why "utilization" lies

- **Learn:** `nvidia-smi` utilization only means "a kernel was running." DCGM fields that matter: SM active, SM occupancy, tensor-core active, DRAM active, power, clocks.
- **Build:** log GPU metrics (pynvml or `nvidia-smi dmon`), including power draw, during your Week 4 load test. Compute **tokens per joule** at each concurrency level. If you have access to DCGM dashboards on a real cluster, compare.
- **Ship:** a chart showing "100% utilization" while real compute use is much lower, and an explanation.
- **Foundations:** Kubernetes basics. Create a local cluster with `kind`, then work through *Learn Kubernetes Basics*: Pods, Deployments, Services, scaling, rolling updates.
- **Mini-project:** `gpu-metrics-logger`: a pynvml logger that records GPU metrics during a load test.

**Done when**

- [ ] Metrics logged alongside a load test
- [ ] Note: which DCGM metrics you'd put on a capacity dashboard and why
- [ ] Tokens per joule computed at each concurrency level
- [ ] kind cluster running and the Kubernetes Basics modules done

### Week 9 · SLIs and SLOs for LLM serving

- **Learn:** SLIs vs SLOs vs SLAs (Google SRE book). LLM-specific SLIs: TTFT, TPOT/ITL, end-to-end latency, error rate. **Goodput** = requests per second that meet the SLO.
- **Build:** add an SLO definition (e.g. TTFT p95 < 500 ms, TPOT p95 < 50 ms) to your bench and compute goodput for each concurrency level.
- **Ship:** a chart of throughput vs goodput. The best operating point is often well below max throughput.
- **Mini-project:** `goodput-calc`: an SLO definition and goodput for every concurrency level.

**Done when**

- [ ] Goodput computed for every concurrency level
- [ ] Max goodput operating point identified

### Week 10 · Autoscaling and cold starts

- **Learn:** why LLM autoscaling is slow: image pull, weight download, weight load, CUDA graph capture, warm-up. Scale-to-zero trade-offs. KEDA concepts.
- **Build:** measure each part of startup time for 2–3 model sizes (time from `vllm serve` start to first successful request).
- **Ship:** a cold-start breakdown table and a short "how I'd autoscale this" design.
- **Foundations:** deploy a small model with vLLM's CPU image to your `kind` cluster as a Deployment + Service (vLLM's *Using Kubernetes* guide). Measure pod start time vs your Week 10 numbers.
- **Mini-project:** `cold-start-timer`: a startup-time breakdown for two or three model sizes.

**Done when**

- [ ] Cold-start time measured for at least 2 model sizes
- [ ] Autoscaling policy sketched (metric, thresholds, minimum replicas)
- [ ] Small model served from vLLM on kind, start time measured

### Week 11 · LLM gateways and token economics (holiday week, light)

- **Learn:** gateways: routing, rate limits, fallback, semantic caching. Look at how LiteLLM and Envoy AI Gateway do it. Commercial API pricing models: pay-per-token vs provisioned throughput.
- **Build:** `cost.py`: cost per 1M tokens for self-hosting (GPU $/h ÷ measured tokens/h, at your max-goodput point) vs a commercial API. Find the break-even traffic level.
- **Ship:** break-even chart.
- **Mini-project:** `cost.py`: cost per 1M tokens and a self-host vs API break-even chart.

**Done when**

- [ ] Cost per 1M input and output tokens computed from your own benchmarks
- [ ] Break-even point vs an API price written down

### Week 12 · Queueing basics (holiday week, light)

- **Learn:** Little's law (L = λW). Why latency rises sharply as utilization approaches 100%. Chapters 1–6 of Harchol-Balter's queueing book, or the Little's law section of any performance text.
- **Build:** use Little's law on your bench data: required concurrency = target RPS × latency. Turn it into "GPUs needed for N RPS under the SLO."
- **Ship:** the `gpus_needed()` function in your repo.
- **Mini-project:** `gpus_needed()`: a Little's-law sizing function with tests.

**Done when**

- [ ] Little's law check against measured data
- [ ] `gpus_needed(rps, prompt_len, output_len, slo)` implemented

### Week 13 · Ship Project 1

- **Learn:** re-read your notes from Weeks 1–12; fill gaps.
- **Build:** clean up the repo: README with results, charts, how to reproduce.
- **Ship:** publish the post. Share it on LinkedIn and in GPU MODE / vLLM communities. Add it to your profile site.
- **Foundations:** add a GitHub Actions workflow to `llm-capacity-bench` that runs your `kv_calc.py` / `cost.py` tests and a linter on every push.
- **Mini-project:** `P1 release`: tag v1.0 of llm-capacity-bench and publish the post.

**Done when**

- [ ] P1 repo README complete with charts and reproduction steps
- [ ] Post published
- [ ] Shared publicly
- [ ] Skill statuses updated in the [skill list](../skills.md)
- [ ] Phase 1 retro written in the progress log
- [ ] CI workflow running tests on every push
