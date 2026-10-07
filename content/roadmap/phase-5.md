---
title: "Phase 5 · Serving at scale"
---

# Phase 5 · Serving at scale

**Weeks 53–65 · 11 Oct 2027 – 9 Jan 2028**

!!! abstract "Outcome"
    You can design a production LLM serving fleet beyond a single engine: when prefill/decode disaggregation pays off, how KV-cache-aware routing and offloading change capacity, how to serve many LoRA adapters and long contexts, and how to benchmark all of it credibly. Non-LLM and embedding workloads are part of the same plan.

**Project:** [P5 · Disaggregated serving lab](../projects/p5-disaggregated-serving-lab.md) · **Post:** *"When does prefill/decode disaggregation pay off? Measured."*

**Hardware:** 2–4 GPUs by the hour for the disaggregation weeks (53–56); a single GPU or CPU for the rest. Interview prep starts in parallel at a light pace (see [interview prep](interview-prep.md)).

---

### Week 53 · Prefill/decode disaggregation: the theory

- **Learn:** why prefill and decode interfere when they share GPUs, and what splitting them costs (KV transfer). DistServe, Splitwise and Mooncake papers.
- **Build:** a small analytical model: given prompt/output lengths, TTFT/TPOT SLOs and your P1 measurements, estimate goodput for colocated vs disaggregated layouts and the KV bytes to move per request.
- **Ship:** a chart of where disaggregation wins and where it loses.
- **Mini-project:** `pd-model.py`: an analytical colocated vs disaggregated goodput model.

**Done when**

- [ ] KV transfer size per request computed for 2 models
- [ ] Goodput model compares colocated vs disaggregated
- [ ] Note: three conditions where disaggregation is worth it

### Week 54 · Prefill/decode disaggregation: hands-on

- **Learn:** vLLM's disaggregated prefilling (experimental), and how llm-d and NVIDIA Dynamo package the same idea.
- **Build:** on 2 rented GPUs, run one prefill instance and one decode instance with KV transfer. Benchmark against two colocated instances on the same hardware.
- **Ship:** TTFT, TPOT and goodput for both layouts, compared with your Week 53 model.
- **Mini-project:** `pd-lab`: a reproducible disaggregated vs colocated benchmark.

**Done when**

- [ ] Disaggregated setup serving requests
- [ ] Same workload benchmarked on both layouts
- [ ] Measured results compared with the analytical model

### Week 55 · KV-cache-aware routing

- **Learn:** prefix-aware and KV-cache-aware load balancing: why round-robin wastes cache hits. How llm-d's scheduler, Dynamo's router and SGLang's router decide where a request goes.
- **Build:** simulate a shared-prefix workload (chat with a system prompt, RAG with shared documents) across 4 replicas with round-robin vs prefix-aware routing.
- **Ship:** cache-hit rate and TTFT for both policies.
- **Mini-project:** `kv-router-sim`: a routing simulator using your measured prefill costs.

**Done when**

- [ ] Simulator runs both routing policies
- [ ] Cache-hit rate and TTFT compared
- [ ] Note: what a capacity planner should assume about cache hits

### Week 56 · KV cache offloading and tiering

- **Learn:** moving KV cache to CPU memory, local SSD or remote storage; when recomputing is cheaper than loading. LMCache and Mooncake's KV store.
- **Build:** run vLLM with LMCache on a long shared-context workload; compare with recompute.
- **Ship:** TTFT and GPU memory with and without offloading.
- **Mini-project:** `kv-offload-bench`: offload vs recompute on long contexts.

**Done when**

- [ ] Offloading configured and working
- [ ] TTFT and memory compared with recompute
- [ ] Break-even context length estimated

### Week 57 · Serving many LoRA adapters

- **Learn:** multi-LoRA serving: adapter paging, batching requests that use different adapters. S-LoRA paper; vLLM's LoRA support.
- **Build:** serve one base model with 1, 8 and 32 adapters; measure throughput and memory as the number of active adapters grows.
- **Ship:** a capacity rule for "one base model, many fine-tunes".
- **Mini-project:** `multi-lora-bench`: throughput vs number of active adapters.

**Done when**

- [ ] Multiple adapters served from one base model
- [ ] Throughput and memory measured at 3 adapter counts
- [ ] Sizing rule written

### Week 58 · Long context and multimodal inputs

- **Learn:** what long prompts do to KV cache, TTFT and batch size; chunked prefill revisited; context parallelism and Ring Attention. Vision-language models: images become hundreds to thousands of tokens plus an encoder pass (vLLM *Multimodal Inputs*).
- **Build:** sweep prompt length from 1K to the model's limit; record TTFT, max concurrency and memory. Then serve a small vision-language model and compare TTFT for text-only vs image + text requests.
- **Ship:** "cost of context" curves: GPUs per RPS as context grows, with images converted to their token cost.
- **Mini-project:** `long-context-curves`: capacity vs context length, including image inputs.

**Done when**

- [ ] Sweep run to the model's context limit
- [ ] Max concurrency per GPU plotted vs context length
- [ ] Image + text request cost measured on a vision-language model
- [ ] Note on when context parallelism is needed

### Week 59 · Speculative decoding in depth

- **Learn:** draft models, n-gram/prompt-lookup drafting, acceptance rate, and why speculation helps latency more than throughput under load.
- **Build:** sweep concurrency with and without speculation; record acceptance rate and TPOT.
- **Ship:** where speculation stops paying off as load rises.
- **Mini-project:** `spec-decode-sweep`: speedup vs concurrency.

**Done when**

- [ ] Speculation configured with at least one method
- [ ] Speedup measured across concurrency levels
- [ ] Crossover point identified

### Week 60 · Embedding and reranker serving

- **Learn:** serving non-generative models: dynamic batching by token count, sequence-length bucketing, CPU vs GPU trade-offs. Hugging Face Text Embeddings Inference (TEI).
- **Build:** serve an embedding model with TEI; measure throughput vs batch size and sequence length; compute cost per 1M embeddings.
- **Ship:** an embedding capacity table, linked to your vector DB track.
- **Mini-project:** `embedding-bench`: throughput and cost per 1M embeddings.

**Done when**

- [ ] Embedding model served and load-tested
- [ ] Cost per 1M embeddings computed
- [ ] GPU vs CPU recommendation written

### Week 61 · Non-LLM model serving

- **Learn:** NVIDIA Triton Inference Server (model repository, dynamic batching, concurrent model execution), TensorRT and ONNX Runtime for vision and recommendation models.
- **Build:** serve a small vision or ranking model with Triton Inference Server; compare PyTorch vs ONNX Runtime vs TensorRT backends.
- **Ship:** latency and throughput per backend, and a note on packing several small models on one GPU.
- **Mini-project:** `triton-server-lab`: one model, three backends, measured.

**Done when**

- [ ] Model served by Triton Inference Server
- [ ] At least 2 backends benchmarked
- [ ] GPU-packing note written

### Week 62 · Benchmarking methodology

- **Learn:** closed-loop vs open-loop load, Poisson arrivals, warm-up, tail latency, coordinated omission; how MLPerf Inference defines scenarios. Tools: GuideLLM, NVIDIA AIPerf, Kubernetes inference-perf.
- **Build:** run the same benchmark closed-loop and open-loop; compare p99 latency.
- **Ship:** a one-page benchmarking checklist you'll use from now on.
- **Mini-project:** `loadgen-compare`: closed vs open-loop results on one server.

**Done when**

- [ ] Both load patterns run on the same setup
- [ ] Tail latency differences explained
- [ ] Benchmarking checklist written

### Week 63 · Smaller models: compression and routing (light week)

- **Learn:** the levers beyond quantization: knowledge distillation, pruning (SparseGPT) and 2:4 structured sparsity on Ampere+ tensor cores; model cascades and routers that send easy requests to small models (FrugalGPT, RouteLLM). Aside: llama.cpp and GGUF for CPU and on-device inference.
- **Build:** using your Week 6 eval setup, score a small and a large model from the same family on one task; simulate a router that sends requests to the small model when it's likely good enough. Compute quality and cost per 1M requests.
- **Ship:** catch up.
- **Mini-project:** `model-cascade-sim`: quality vs cost for small/large routing.

**Done when**

- [ ] Small vs large model scored on the same task
- [ ] Cascade simulation with cost and quality
- [ ] Note: when distillation or sparsity would beat routing

### Week 64 · Batch tiers and the planner (holiday week, light)

- **Learn:** offline / batch inference (vLLM's offline `LLM` API, Ray Data batch inference) and priority tiers: interactive vs batch, preemption, and moving batch work to off-peak hours to fill idle GPUs.
- **Build:** extend the P4 planner with disaggregated layouts, cache-hit assumptions, LoRA/long-context workloads, and an interactive vs batch tier that soaks up idle capacity.
- **Ship:** planner output for one workload: colocated vs disaggregated, with and without a batch tier.
- **Mini-project:** `planner-pd`: the planner extended with Phase 5 layouts and batch tiers.

**Done when**

- [ ] Planner models disaggregated layouts
- [ ] Batch tier fills idle capacity in the plan
- [ ] One comparison plan generated

### Week 65 · Ship Project 5

- **Build:** finish the P5 repo README with charts and reproduction steps.
- **Ship:** publish the Phase 5 post and share it.
- **Mini-project:** `P5 release`: tag v1.0 of the serving lab and publish the post.

**Done when**

- [ ] P5 repo complete
- [ ] Post published and shared
- [ ] Skill statuses updated
- [ ] Phase 5 retro written
