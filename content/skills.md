---
title: Master skill list
---

# Master skill list

Every skill on the roadmap, how deep it needs to go, when it's covered and what "done" means. Update the **Status** column as you go: ⬜ not started → 🟨 in progress → ✅ done. The README progress block counts these automatically.

**Depth levels**

- <span class="badge deep">Deep</span> **Career spine.** You can explain it, measure it and change it. Interviewers will go deep here.
- <span class="badge working">Working</span> **Hands-on.** You've run it yourself at least once and can size it, debug it and reason about trade-offs.
- <span class="badge aware">Awareness</span> **Just enough.** Learn it when a project or work task needs it; a weekend each.

!!! warning "Keep the status column last"
    `scripts/update_readme.py` reads the status emoji from the **last column** of each table row. Add columns before it, not after.

## Inference & serving

| Skill | Depth | Phase | Done looks like | Status |
|---|---|---|---|---|
| Prefill vs decode, arithmetic intensity | <span class="badge deep">Deep</span> | 1 | Explain why decode is memory-bandwidth bound and predict tokens/s from bandwidth | ⬜ |
| KV cache sizing & PagedAttention | <span class="badge deep">Deep</span> | 1 | Compute KV bytes/token for any model and match vLLM's reported cache size | ⬜ |
| Batching: static, continuous, chunked prefill | <span class="badge deep">Deep</span> | 1 | Plot the throughput/latency knee and explain where it comes from | ⬜ |
| Quantization (INT8/INT4/FP8, AWQ, GPTQ) | <span class="badge deep">Deep</span> | 1 | Benchmark speed *and* quality loss of 3 precisions on one model | ⬜ |
| vLLM operation & tuning | <span class="badge deep">Deep</span> | 1–2 | Tune `max-num-seqs`, `gpu-memory-utilization`, chunked prefill, prefix caching with evidence | ⬜ |
| Serving techniques: prefix caching, speculative decoding, P/D disaggregation | <span class="badge deep">Deep</span> | 2 | Benchmark two of them and explain when the third pays off | ⬜ |
| Multi-GPU inference: tensor & expert parallelism | <span class="badge working">Working</span> | 3 | Run TP=2 inference and explain the communication cost | ⬜ |
| SGLang / TensorRT-LLM / TGI landscape | <span class="badge working">Working</span> | 2 | One-page comparison of when to use which | ⬜ |
| Autoscaling & cold starts for inference | <span class="badge working">Working</span> | 1, 4 | Measure model load time; design a scale-to-zero policy | ⬜ |
| LLM gateways, routing, rate limits, semantic caching | <span class="badge working">Working</span> | 1 | Diagram a gateway with provisioned vs pay-per-token backends | ⬜ |
| Token economics (cost per 1M tokens, break-even) | <span class="badge deep">Deep</span> | 1, 4 | Self-host vs API break-even calculator built on your own benchmarks | ⬜ |
| Model architecture literacy: MoE, GQA, MLA, long context | <span class="badge working">Working</span> | 1 | Explain how each changes memory and compute per token | ⬜ |

## GPU & performance

| Skill | Depth | Phase | Done looks like | Status |
|---|---|---|---|---|
| GPU architecture & memory hierarchy | <span class="badge deep">Deep</span> | 2 | Draw SM → warp → registers/shared/L2/HBM with sizes and bandwidths | ⬜ |
| CUDA fundamentals (threads, blocks, coalescing, shared memory) | <span class="badge deep">Deep</span> | 2 | Write and speed up a tiled matmul in CUDA | ⬜ |
| Triton kernels | <span class="badge deep">Deep</span> | 2 | A fused kernel that beats PyTorch eager, with a write-up | ⬜ |
| Roofline model | <span class="badge deep">Deep</span> | 2 | Place your kernels and an LLM layer on your GPU's roofline | ⬜ |
| Profiling: PyTorch profiler, Nsight Systems, Nsight Compute | <span class="badge deep">Deep</span> | 2 | Find and explain the top 5 kernels of a model forward pass | ⬜ |
| PyTorch GPU memory optimization | <span class="badge deep">Deep</span> | 1 | Read a memory snapshot; cut peak memory with mixed precision / checkpointing | ⬜ |
| torch.compile & CUDA Graphs | <span class="badge working">Working</span> | 2 | Measure the speedup and explain where it comes from | ⬜ |
| MFU, goodput & efficiency metrics | <span class="badge deep">Deep</span> | 2–3 | Compute MFU by hand for a training and an inference run | ⬜ |
| GPU hardware generations (Hopper, Blackwell, FP8/FP4, MIG, NVL72, power) | <span class="badge working">Working</span> | 2 | One-page tech-refresh comparison you'd show a director | ⬜ |
| Linux performance (NUMA, CPU pinning, `perf`, USE method) | <span class="badge aware">Awareness</span> | 2 | Diagnose a CPU-bound data loader | ⬜ |

## Distributed training & reliability

| Skill | Depth | Phase | Done looks like | Status |
|---|---|---|---|---|
| Training memory math (weights, grads, optimizer, activations) | <span class="badge working">Working</span> | 3 | Predict peak memory before launching | ⬜ |
| DDP | <span class="badge working">Working</span> | 3 | Run multi-GPU DDP and explain the all-reduce | ⬜ |
| FSDP / ZeRO | <span class="badge working">Working</span> | 3 | Compare memory & throughput vs DDP on the same model | ⬜ |
| Tensor & pipeline parallelism | <span class="badge working">Working</span> | 3 | Explain when to use each and what it costs in communication | ⬜ |
| Collective communication & NCCL | <span class="badge working">Working</span> | 3 | Measure all-reduce bus bandwidth and compare to theory | ⬜ |
| GPU topology & networking (NVLink, NVSwitch, PCIe, InfiniBand/RoCE, GPUDirect) | <span class="badge working">Working</span> | 3 | Read `nvidia-smi topo -m` and choose a parallelism layout from it | ⬜ |
| Checkpointing (DCP, async, frequency math) | <span class="badge working">Working</span> | 3 | Pick a checkpoint interval from failure rate and save cost | ⬜ |
| Fault tolerance & elastic training | <span class="badge working">Working</span> | 3 | Kill a worker, resume, measure lost goodput | ⬜ |
| Distributed storage & data loading | <span class="badge aware">Awareness</span> | 3 | Explain object storage vs parallel FS for checkpoints | ⬜ |

## Scheduling & platform

| Skill | Depth | Phase | Done looks like | Status |
|---|---|---|---|---|
| Slurm | <span class="badge working">Working</span> | 3 | Submit GPU jobs with `sbatch`/`srun`, partitions, `--gres` | ⬜ |
| Ray (Core, Train, Serve, KubeRay) | <span class="badge working">Working</span> | 3 | Run a distributed job on Ray; compare to Slurm | ⬜ |
| Kubernetes GPU scheduling (device plugin, GPU Operator, labels) | <span class="badge working">Working</span> | 4 | Explain the path from pod spec to GPU on a node | ⬜ |
| GPU sharing: MIG, time-slicing, MPS | <span class="badge working">Working</span> | 4 | Decision matrix for which to use when | ⬜ |
| Batch scheduling & multi-tenancy (Kueue, quotas, preemption, gang scheduling, DRA) | <span class="badge working">Working</span> | 4 | Kueue demo with quotas and preemption | ⬜ |
| Inference on Kubernetes (KServe, llm-d, Gateway API Inference Extension, KEDA) | <span class="badge working">Working</span> | 4 | Design doc for LLM serving on K8s with autoscaling | ⬜ |
| Terraform / IaC | <span class="badge aware">Awareness</span> | 4 | Provision and destroy a GPU VM with Terraform | ⬜ |

## Observability & reliability

| Skill | Depth | Phase | Done looks like | Status |
|---|---|---|---|---|
| GPU observability (DCGM metrics, why "utilization" lies) | <span class="badge deep">Deep</span> | 1 | Explain SM active vs occupancy vs tensor active vs DRAM active | ⬜ |
| SLI / SLO / SLA for LLM serving | <span class="badge working">Working</span> | 1 | Define TTFT/TPOT SLOs and compute goodput against them | ⬜ |
| Distributed tracing (OpenTelemetry) | <span class="badge aware">Awareness</span> | 4 | Trace a request through gateway → model server | ⬜ |

## Capacity math & economics

| Skill | Depth | Phase | Done looks like | Status |
|---|---|---|---|---|
| Queueing theory (Little's law, utilization vs latency) | <span class="badge deep">Deep</span> | 1, 4 | Predict p95 latency from load using a queueing model | ⬜ |
| Forecasting (time series for demand) | <span class="badge working">Working</span> | 4 | Forecast GPU demand with uncertainty bands | ⬜ |
| Linear & mixed-integer programming (OR-Tools, PuLP) | <span class="badge deep">Deep</span> | 4 | Formulate and solve a GPU allocation MIP | ⬜ |
| Discrete-event simulation (SimPy) | <span class="badge working">Working</span> | 4 | Simulate a GPU cluster under bursty load | ⬜ |
| FinOps for AI (unit economics, OpenCost, showback) | <span class="badge working">Working</span> | 4 | Cost allocation per team / model / 1M tokens | ⬜ |
| Agentic workload capacity modeling | <span class="badge deep">Deep</span> | 4 | Workload profile for an agent loop: steps, context growth, tool latency, burstiness | ⬜ |
| MCP (Model Context Protocol) | <span class="badge aware">Awareness</span> | 4 | Build a small MCP server and observe its traffic | ⬜ |

## Data infrastructure

| Skill | Depth | Phase | Done looks like | Status |
|---|---|---|---|---|
| Vector DB & embedding infrastructure (HNSW, IVF-PQ, memory math, recall vs latency) | <span class="badge working">Working</span> | Ongoing | Size an index's memory and plot recall vs latency | ⬜ |

## Career skills

| Skill | Depth | Phase | Done looks like | Status |
|---|---|---|---|---|
| Coding fluency in Python (without AI help) | <span class="badge working">Working</span> | Month 6+ | Solve medium problems in 30–40 min, cleanly | ⬜ |
| Inference / ML system design interviews | <span class="badge deep">Deep</span> | Month 12+ | Talk through "serve 10K RPS under 500 ms" end to end | ⬜ |
| Technical writing in public | <span class="badge working">Working</span> | Ongoing | One solid post per phase | ⬜ |
| Quality evals for serving trade-offs | <span class="badge working">Working</span> | 1–2 | Measure accuracy loss from quantization with a proper eval harness | ⬜ |
