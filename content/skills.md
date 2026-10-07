---
title: Master skill list
---

# Master skill list

Every skill on the roadmap, how deep it needs to go, which weeks teach it, what "done" means and where to learn it. All **Learn from** links are also on the [Resources](resources.md) page. Update the **Status** column as you go: ⬜ not started → 🟨 in progress → ✅ done. The README progress block counts these automatically.

**Depth levels**

- <span class="badge deep">Deep</span> **Career spine.** You can explain it, measure it and change it. Interviewers will go deep here.
- <span class="badge working">Working</span> **Hands-on.** You've run it yourself at least once and can size it, debug it and reason about trade-offs.
- <span class="badge aware">Awareness</span> **Just enough.** Learn it when a project or work task needs it; a weekend each.

!!! warning "Keep the status column last"
    `scripts/update_readme.py` reads the status emoji from the **last column** of each table row. Add columns before it, not after.

## Foundations: containers, Kubernetes & delivery

| Skill | Depth | Weeks | Done looks like | Learn from | Status |
|---|---|---|---|---|---|
| Containers (Docker) | <span class="badge working">Working</span> | W04 | Run a model server from an image with volumes, ports and GPU access | [Docker: Get started](https://docs.docker.com/get-started/) · [vLLM: Using Docker](https://docs.vllm.ai/en/latest/deployment/docker.html) | ⬜ |
| Kubernetes fundamentals (Pods, Deployments, Services, rollouts) | <span class="badge working">Working</span> | W08, W10 | Deploy, scale, update and debug a model server on a local cluster | [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/) · [kind](https://kind.sigs.k8s.io/docs/user/quick-start/) · [vLLM: Using Kubernetes](https://docs.vllm.ai/en/latest/deployment/k8s.html) | ⬜ |
| CI/CD with GitHub Actions | <span class="badge working">Working</span> | W13 | Tests and lint run on every push; this site deploys itself | [GitHub Actions docs](https://docs.github.com/en/actions) | ⬜ |
| Experiment tracking & model registry (MLflow) | <span class="badge aware">Awareness</span> | W24 | Benchmark runs logged and compared in MLflow | [MLflow docs](https://mlflow.org/docs/latest/) | ⬜ |
| Helm | <span class="badge aware">Awareness</span> | W43 | Install a chart and explain what its templates create | [Helm docs](https://helm.sh/docs/) | ⬜ |
| GitOps (Argo CD) | <span class="badge aware">Awareness</span> | W43 | Explain how a cluster's desired state is kept in Git | [Argo CD](https://github.com/argoproj/argo-cd) | ⬜ |
| Multi-tenant isolation & security | <span class="badge aware">Awareness</span> | W42 | Say what MIG, time-slicing, namespaces and RBAC each protect | [Kubernetes multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/) | ⬜ |

## Inference & serving

| Skill | Depth | Weeks | Done looks like | Learn from | Status |
|---|---|---|---|---|---|
| Prefill vs decode, arithmetic intensity | <span class="badge deep">Deep</span> | W01–W02 | Explain why decode is memory-bandwidth bound and predict tokens/s from bandwidth | [Inference Arithmetic](https://kipp.ly/transformer-inference-arithmetic/) · [Scaling Book](https://jax-ml.github.io/scaling-book/) | ⬜ |
| KV cache sizing & PagedAttention | <span class="badge deep">Deep</span> | W03 | Compute KV bytes/token for any model and match vLLM's reported cache size | [PagedAttention](https://arxiv.org/abs/2309.06180) · [GQA](https://arxiv.org/abs/2305.13245) | ⬜ |
| Batching: static, continuous, chunked prefill | <span class="badge deep">Deep</span> | W04 | Plot the throughput/latency knee and explain where it comes from | [Orca](https://www.usenix.org/conference/osdi22/presentation/yu) · [Sarathi-Serve](https://arxiv.org/abs/2403.02310) | ⬜ |
| Quantization (INT8/INT4/FP8, AWQ, GPTQ) | <span class="badge deep">Deep</span> | W06 | Benchmark speed *and* quality loss of 3 precisions on one model | [AWQ](https://arxiv.org/abs/2306.00978) · [GPTQ](https://arxiv.org/abs/2210.17323) | ⬜ |
| vLLM operation & tuning | <span class="badge deep">Deep</span> | W01–W04, W25 | Tune `max-num-seqs`, `gpu-memory-utilization`, chunked prefill, prefix caching with evidence | [vLLM docs](https://docs.vllm.ai/) · [Databricks guide](https://www.databricks.com/blog/llm-inference-performance-engineering-best-practices) | ⬜ |
| Serving techniques: prefix caching, speculative decoding, P/D disaggregation | <span class="badge deep">Deep</span> | W25, W59 | Benchmark two of them and explain when the third pays off | [Speculative decoding](https://arxiv.org/abs/2211.17192) · [DistServe](https://arxiv.org/abs/2401.09670) | ⬜ |
| Multi-GPU inference: tensor & expert parallelism | <span class="badge working">Working</span> | W30–W31 | Run TP=2 inference and explain the communication cost | [Megatron-LM](https://arxiv.org/abs/1909.08053) · [Scaling Book](https://jax-ml.github.io/scaling-book/) | ⬜ |
| SGLang / TensorRT-LLM / Dynamo landscape | <span class="badge working">Working</span> | W25 | One-page comparison of when to use which | [SGLang](https://github.com/sgl-project/sglang) · [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM) · [Dynamo](https://github.com/ai-dynamo/dynamo) | ⬜ |
| Autoscaling & cold starts for inference | <span class="badge working">Working</span> | W10, W43 | Measure model load time; design a scale-to-zero policy | [KEDA](https://keda.sh/) · [llm-d](https://llm-d.ai/) | ⬜ |
| LLM gateways, routing, rate limits, semantic caching | <span class="badge working">Working</span> | W11 | Diagram a gateway with provisioned vs pay-per-token backends | [LiteLLM](https://github.com/BerriAI/litellm) · [Envoy AI Gateway](https://github.com/envoyproxy/ai-gateway) · [Gateway API Inference Ext.](https://gateway-api-inference-extension.sigs.k8s.io/) | ⬜ |
| Token economics (cost per 1M tokens, break-even) | <span class="badge deep">Deep</span> | W11, W45 | Self-host vs API break-even calculator built on your own benchmarks | [Databricks guide](https://www.databricks.com/blog/llm-inference-performance-engineering-best-practices) · [Scaling Book](https://jax-ml.github.io/scaling-book/) | ⬜ |
| Model architecture literacy: MoE, GQA, MLA, long context | <span class="badge working">Working</span> | W05 | Explain how each changes memory and compute per token | [Mixtral](https://arxiv.org/abs/2401.04088) · [DeepSeek-V2 (MLA)](https://arxiv.org/abs/2405.04434) | ⬜ |

## GPU & performance

| Skill | Depth | Weeks | Done looks like | Learn from | Status |
|---|---|---|---|---|---|
| GPU architecture & memory hierarchy | <span class="badge deep">Deep</span> | W14 | Draw SM → warp → registers/shared/L2/HBM with sizes and bandwidths | [GPU Glossary](https://modal.com/gpu-glossary) · [Go Brrrr](https://horace.io/brrr_intro.html) | ⬜ |
| CUDA fundamentals (threads, blocks, coalescing, shared memory) | <span class="badge deep">Deep</span> | W15–W16 | Write and speed up a tiled matmul in CUDA | [CUDA guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/) · [GPU Puzzles](https://github.com/srush/GPU-Puzzles) · [Modern GPU Programming](https://mlc.ai/modern-gpu-programming-for-mlsys/) | ⬜ |
| Triton kernels | <span class="badge deep">Deep</span> | W21–W23 | A fused kernel that beats PyTorch eager, with a write-up | [Triton tutorials](https://triton-lang.org/main/getting-started/tutorials/index.html) · [Triton Puzzles](https://github.com/gpu-mode/Triton-Puzzles) | ⬜ |
| Roofline model | <span class="badge deep">Deep</span> | W17 | Place your kernels and an LLM layer on your GPU's roofline | [NVIDIA perf guide](https://docs.nvidia.com/deeplearning/performance/dl-performance-gpu-background/index.html) · [Scaling Book](https://jax-ml.github.io/scaling-book/) | ⬜ |
| Profiling: PyTorch profiler, Nsight Systems, Nsight Compute | <span class="badge deep">Deep</span> | W19–W20 | Find and explain the top 5 kernels of a model forward pass | [PyTorch profiler](https://docs.pytorch.org/tutorials/recipes/recipes/profiler_recipe.html) · [Nsight Systems](https://developer.nvidia.com/nsight-systems) · [Nsight Compute](https://developer.nvidia.com/nsight-compute) | ⬜ |
| PyTorch GPU memory optimization | <span class="badge deep">Deep</span> | W07 | Read a memory snapshot; cut peak memory with mixed precision / checkpointing | [CUDA memory docs](https://docs.pytorch.org/docs/stable/torch_cuda_memory.html) | ⬜ |
| torch.compile & CUDA Graphs | <span class="badge working">Working</span> | W24 | Measure the speedup and explain where it comes from | [torch.compile tutorial](https://docs.pytorch.org/tutorials/intermediate/torch_compile_tutorial.html) | ⬜ |
| MFU, goodput & efficiency metrics | <span class="badge deep">Deep</span> | W24, W34 | Compute MFU by hand for a training and an inference run | [PaLM (MFU)](https://arxiv.org/abs/2204.02311) · [Scaling Book](https://jax-ml.github.io/scaling-book/) | ⬜ |
| GPU hardware generations (Hopper, Blackwell, FP8/FP4, MIG, NVL72, power) | <span class="badge working">Working</span> | W18 | One-page tech-refresh comparison you'd show a director | [GPU Glossary](https://modal.com/gpu-glossary) · [SemiAnalysis](https://semianalysis.com/) | ⬜ |
| Linux performance (NUMA, CPU pinning, `perf`, USE method) | <span class="badge aware">Awareness</span> | W26 | Diagnose a CPU-bound data loader | [USE method](https://www.brendangregg.com/usemethod.html) | ⬜ |

## Distributed training & reliability

| Skill | Depth | Weeks | Done looks like | Learn from | Status |
|---|---|---|---|---|---|
| Training memory math (weights, grads, optimizer, activations) | <span class="badge working">Working</span> | W27, W38 | Predict peak memory before launching | [Ultra-Scale Playbook](https://huggingface.co/spaces/nanotron/ultrascale-playbook) · [ZeRO](https://arxiv.org/abs/1910.02054) | ⬜ |
| DDP | <span class="badge working">Working</span> | W27 | Run multi-GPU DDP and explain the all-reduce | [DDP tutorial](https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html) | ⬜ |
| FSDP / ZeRO | <span class="badge working">Working</span> | W29 | Compare memory & throughput vs DDP on the same model | [FSDP2 tutorial](https://docs.pytorch.org/tutorials/intermediate/FSDP_tutorial.html) · [ZeRO](https://arxiv.org/abs/1910.02054) | ⬜ |
| Tensor & pipeline parallelism | <span class="badge working">Working</span> | W30 | Explain when to use each and what it costs in communication | [Megatron-LM](https://arxiv.org/abs/1909.08053) · [GPipe](https://arxiv.org/abs/1811.06965) | ⬜ |
| Collective communication & NCCL | <span class="badge working">Working</span> | W28 | Measure all-reduce bus bandwidth and compare to theory | [nccl-tests](https://github.com/NVIDIA/nccl-tests) · [Ultra-Scale Playbook](https://huggingface.co/spaces/nanotron/ultrascale-playbook) | ⬜ |
| GPU topology & networking (NVLink, NVSwitch, PCIe, InfiniBand/RoCE, GPUDirect) | <span class="badge working">Working</span> | W32 | Read `nvidia-smi topo -m` and choose a parallelism layout from it | [ML Engineering book](https://github.com/stas00/ml-engineering) | ⬜ |
| Checkpointing (DCP, async, frequency math) | <span class="badge working">Working</span> | W33 | Pick a checkpoint interval from failure rate and save cost | [Distributed Checkpoint](https://docs.pytorch.org/docs/stable/distributed.checkpoint.html) | ⬜ |
| Fault tolerance & elastic training | <span class="badge working">Working</span> | W34 | Kill a worker, resume, measure lost goodput | [torchrun](https://docs.pytorch.org/docs/stable/elastic/run.html) · [ML Engineering book](https://github.com/stas00/ml-engineering) | ⬜ |
| Distributed storage & data loading | <span class="badge aware">Awareness</span> | W37 | Explain object storage vs parallel FS for checkpoints | [ML Engineering book](https://github.com/stas00/ml-engineering) | ⬜ |

## Scheduling & platform

| Skill | Depth | Weeks | Done looks like | Learn from | Status |
|---|---|---|---|---|---|
| Slurm | <span class="badge working">Working</span> | W35 | Submit GPU jobs with `sbatch`/`srun`, partitions, `--gres` | [Slurm quick start](https://slurm.schedmd.com/quickstart.html) · [slurm-docker-cluster](https://github.com/giovtorres/slurm-docker-cluster) | ⬜ |
| Ray (Core, Train, Serve, KubeRay) | <span class="badge working">Working</span> | W36 | Run a distributed job on Ray; compare to Slurm | [Ray docs](https://docs.ray.io/en/latest/index.html) · [KubeRay](https://github.com/ray-project/kuberay) | ⬜ |
| Kubernetes GPU scheduling (device plugin, GPU Operator, labels) | <span class="badge working">Working</span> | W40 | Explain the path from pod spec to GPU on a node | [GPU Operator](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html) · [fake-gpu-operator](https://github.com/run-ai/fake-gpu-operator) | ⬜ |
| GPU sharing: MIG, time-slicing, MPS | <span class="badge working">Working</span> | W41 | Decision matrix for which to use when | [GPU Operator](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html) | ⬜ |
| Batch scheduling & multi-tenancy (Kueue, quotas, preemption, gang scheduling, DRA) | <span class="badge working">Working</span> | W42 | Kueue demo with quotas and preemption | [Kueue](https://kueue.sigs.k8s.io/) · [DRA](https://kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/) · [KAI Scheduler](https://github.com/NVIDIA/KAI-Scheduler) | ⬜ |
| Inference on Kubernetes (KServe, llm-d, Gateway API Inference Extension, KEDA) | <span class="badge working">Working</span> | W43 | Design doc for LLM serving on K8s with autoscaling | [KServe](https://kserve.github.io/website/) · [Gateway API Inference Ext.](https://gateway-api-inference-extension.sigs.k8s.io/) · [KEDA](https://keda.sh/) | ⬜ |
| Terraform / IaC | <span class="badge aware">Awareness</span> | W44 | Provision and destroy a GPU VM with Terraform | [Terraform tutorials](https://developer.hashicorp.com/terraform/tutorials) | ⬜ |

## Observability & reliability

| Skill | Depth | Weeks | Done looks like | Learn from | Status |
|---|---|---|---|---|---|
| GPU observability (DCGM metrics, why "utilization" lies) | <span class="badge deep">Deep</span> | W08 | Explain SM active vs occupancy vs tensor active vs DRAM active | [dcgm-exporter](https://github.com/NVIDIA/dcgm-exporter) · [GPU Glossary](https://modal.com/gpu-glossary) | ⬜ |
| SLI / SLO / SLA for LLM serving | <span class="badge working">Working</span> | W09 | Define TTFT/TPOT SLOs and compute goodput against them | [SRE book: SLOs](https://sre.google/sre-book/service-level-objectives/) · [Implementing SLOs](https://sre.google/workbook/implementing-slos/) | ⬜ |
| Distributed tracing (OpenTelemetry) | <span class="badge aware">Awareness</span> | W43 | Trace a request through gateway → model server | [OpenTelemetry](https://opentelemetry.io/docs/) | ⬜ |

## Capacity math & economics

| Skill | Depth | Weeks | Done looks like | Learn from | Status |
|---|---|---|---|---|---|
| Queueing theory (Little's law, utilization vs latency) | <span class="badge deep">Deep</span> | W12, W47 | Predict p95 latency from load using a queueing model | [Harchol-Balter](https://www.cs.cmu.edu/~harchol/) | ⬜ |
| Forecasting (time series for demand) | <span class="badge working">Working</span> | W47 | Forecast GPU demand with uncertainty bands | [FPP3](https://otexts.com/fpp3/) | ⬜ |
| Linear & mixed-integer programming (OR-Tools, PuLP) | <span class="badge deep">Deep</span> | W46, W49–W50 | Formulate and solve a GPU allocation MIP | [OR-Tools](https://developers.google.com/optimization) · [PuLP](https://coin-or.github.io/pulp/) | ⬜ |
| Discrete-event simulation (SimPy) | <span class="badge working">Working</span> | W47 | Simulate a GPU cluster under bursty load | [SimPy](https://simpy.readthedocs.io/) | ⬜ |
| FinOps for AI (unit economics, OpenCost, showback) | <span class="badge working">Working</span> | W45 | Cost allocation per team / model / 1M tokens | [FinOps Framework](https://www.finops.org/framework/) · [OpenCost](https://www.opencost.io/) | ⬜ |
| Agentic workload capacity modeling | <span class="badge deep">Deep</span> | W48, W50 | Workload profile for an agent loop: steps, context growth, tool latency, burstiness | [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | ⬜ |
| MCP (Model Context Protocol) | <span class="badge aware">Awareness</span> | W48, W51 | Build a small MCP server and observe its traffic | [MCP](https://modelcontextprotocol.io/) | ⬜ |

## Serving at scale (Phase 5)

| Skill | Depth | Weeks | Done looks like | Learn from | Status |
|---|---|---|---|---|---|
| Prefill/decode disaggregation | <span class="badge deep">Deep</span> | W53–W54 | Predict and measure when disaggregation beats colocation | [DistServe](https://arxiv.org/abs/2401.09670) · [Splitwise](https://arxiv.org/abs/2311.18677) · [vLLM disagg prefill](https://docs.vllm.ai/en/latest/features/disagg_prefill.html) | ⬜ |
| KV-cache-aware routing | <span class="badge working">Working</span> | W55 | Simulate prefix-aware vs round-robin routing with real costs | [llm-d](https://llm-d.ai/) · [Dynamo](https://github.com/ai-dynamo/dynamo) | ⬜ |
| KV cache offloading & tiering | <span class="badge working">Working</span> | W56 | Find the break-even between loading and recomputing KV | [LMCache](https://github.com/LMCache/LMCache) · [Mooncake](https://arxiv.org/abs/2407.00079) | ⬜ |
| Multi-LoRA serving | <span class="badge working">Working</span> | W57 | Size a fleet for one base model with many adapters | [S-LoRA](https://arxiv.org/abs/2311.03285) · [vLLM LoRA](https://docs.vllm.ai/en/latest/features/lora.html) | ⬜ |
| Long-context serving & context parallelism | <span class="badge working">Working</span> | W58 | Plot capacity vs context length; know when CP is needed | [Ring Attention](https://arxiv.org/abs/2310.01889) | ⬜ |
| Embedding & non-LLM model serving | <span class="badge working">Working</span> | W60–W61 | Cost per 1M embeddings; one model on 2 backends | [TEI](https://github.com/huggingface/text-embeddings-inference) · [Triton Inference Server](https://github.com/triton-inference-server/server) · [TensorRT](https://developer.nvidia.com/tensorrt) | ⬜ |
| Benchmarking methodology (open-loop load, tail latency) | <span class="badge deep">Deep</span> | W62 | A benchmark checklist you trust | [MLPerf Inference](https://mlcommons.org/benchmarks/inference-datacenter/) · [AIPerf](https://github.com/ai-dynamo/aiperf) | ⬜ |
| Local / edge inference | <span class="badge aware">Awareness</span> | W63 | Explain when CPU or on-device inference changes the plan | [llama.cpp](https://github.com/ggml-org/llama.cpp) | ⬜ |
| Model compression: distillation, pruning, 2:4 sparsity | <span class="badge working">Working</span> | W63 | Explain when each beats quantization, with a measured example | [Distillation](https://arxiv.org/abs/1503.02531) · [SparseGPT](https://arxiv.org/abs/2301.00774) · [2:4 sparsity](https://arxiv.org/abs/2104.08378) | ⬜ |
| Model routing & cascades | <span class="badge working">Working</span> | W63 | Simulate small/large routing with quality and cost | [FrugalGPT](https://arxiv.org/abs/2305.05176) · [RouteLLM](https://github.com/lm-sys/RouteLLM) | ⬜ |
| Multimodal (vision-language) serving | <span class="badge working">Working</span> | W58 | Convert image inputs to token cost and capacity | [vLLM multimodal inputs](https://docs.vllm.ai/en/latest/features/multimodal_inputs.html) | ⬜ |
| Batch / offline inference & priority tiers | <span class="badge working">Working</span> | W64 | Plan a batch tier that fills idle capacity | [vLLM offline inference](https://docs.vllm.ai/en/latest/serving/offline_inference.html) · [Ray Data batch inference](https://docs.ray.io/en/latest/data/batch_inference.html) | ⬜ |

## Training & fleet operations (Phase 6)

| Skill | Depth | Weeks | Done looks like | Learn from | Status |
|---|---|---|---|---|---|
| FP8 / mixed-precision training | <span class="badge working">Working</span> | W66 | Compare BF16 vs FP8 step time and loss | [FP8 formats](https://arxiv.org/abs/2209.05433) · [Transformer Engine](https://github.com/NVIDIA/TransformerEngine) | ⬜ |
| Large-scale training frameworks (Megatron-Core, DeepSpeed) | <span class="badge working">Working</span> | W67 | Run one model on two frameworks; pick between them | [Megatron-LM](https://github.com/NVIDIA/Megatron-LM) · [DeepSpeed](https://github.com/deepspeedai/DeepSpeed) | ⬜ |
| Big-model memory techniques (recompute, sequence/context/expert parallelism) | <span class="badge working">Working</span> | W68 | Memory plan for a 70B dense and an MoE model | [Ultra-Scale Playbook](https://huggingface.co/spaces/nanotron/ultrascale-playbook) | ⬜ |
| Fine-tuning infrastructure (LoRA, QLoRA) | <span class="badge working">Working</span> | W69 | A sizing table for fine-tuning requests | [LoRA](https://arxiv.org/abs/2106.09685) · [QLoRA](https://arxiv.org/abs/2305.14314) · [PEFT](https://github.com/huggingface/peft) | ⬜ |
| RL post-training infrastructure (GRPO, rollouts) | <span class="badge deep">Deep</span> | W71–W72 | Measure generation vs training time; plan the GPU split | [TRL GRPO](https://huggingface.co/docs/trl/main/en/grpo_trainer) · [HybridFlow](https://arxiv.org/abs/2409.19256) | ⬜ |
| Data loading at scale | <span class="badge aware">Awareness</span> | W70 | Keep GPUs fed with sharded streaming data | [WebDataset](https://github.com/webdataset/webdataset) · [Ray Data](https://docs.ray.io/en/latest/data/data.html) | ⬜ |
| GPU health, failures & spares | <span class="badge deep">Deep</span> | W73–W74 | Runbook from XID/DCGM signal to action; spares model | [DCGM Diagnostics](https://docs.nvidia.com/datacenter/dcgm/latest/user-guide/dcgm-diagnostics.html) · [XID errors](https://docs.nvidia.com/deploy/xid-errors/index.html) | ⬜ |
| Energy efficiency (tokens per joule, power capping) | <span class="badge working">Working</span> | W08, W75 | Report tokens per joule next to tokens/s | [ML.ENERGY](https://ml.energy/) · [Zeus](https://github.com/ml-energy/zeus) | ⬜ |
| Cloud GPU purchasing & TCO | <span class="badge working">Working</span> | W75 | Recommend on-demand vs reserved vs spot per workload | [SkyPilot](https://github.com/skypilot-org/skypilot) | ⬜ |
| TPUs & JAX | <span class="badge working">Working</span> | W76 | Run JAX on a TPU and explain when TPUs beat GPUs | [Scaling Book](https://jax-ml.github.io/scaling-book/) · [Cloud TPU intro](https://docs.cloud.google.com/tpu/docs/intro-to-tpu) · [JAX](https://github.com/jax-ml/jax) | ⬜ |
| AMD GPUs, ROCm & other accelerators | <span class="badge working">Working</span> | W77 | An accelerator matrix you'd defend in a hardware review | [AMD Instinct](https://www.amd.com/en/products/accelerators/instinct.html) · [ROCm](https://rocm.docs.amd.com/) · [vLLM on ROCm](https://docs.vllm.ai/en/latest/getting_started/installation/gpu.html) | ⬜ |
| Kernel libraries (CUTLASS, FlashInfer) | <span class="badge aware">Awareness</span> | W77 | Know which library a serving engine uses for what | [CUTLASS](https://github.com/NVIDIA/cutlass) · [FlashInfer](https://github.com/flashinfer-ai/flashinfer) | ⬜ |

## Data infrastructure

| Skill | Depth | Weeks | Done looks like | Learn from | Status |
|---|---|---|---|---|---|
| Vector DB & embedding infrastructure (HNSW, IVF-PQ, memory math, recall vs latency) | <span class="badge working">Working</span> | W60, ongoing | Size an index's memory and plot recall vs latency | [FAISS](https://github.com/facebookresearch/faiss) · [HNSW](https://arxiv.org/abs/1603.09320) · [ANN-Benchmarks](https://ann-benchmarks.com/) · [Milvus](https://github.com/milvus-io/milvus) | ⬜ |

## Career skills

| Skill | Depth | Weeks | Done looks like | Learn from | Status |
|---|---|---|---|---|---|
| Coding fluency in Python (without AI help) | <span class="badge working">Working</span> | W26 onward | Solve medium problems in 30–40 min, cleanly | [NeetCode](https://neetcode.io/) | ⬜ |
| Inference / ML system design interviews | <span class="badge deep">Deep</span> | W53 onward | Talk through "serve 10K RPS under 500 ms" end to end | [Scaling Book](https://jax-ml.github.io/scaling-book/) · [Chip Huyen](https://huyenchip.com/) | ⬜ |
| Open-source contribution | <span class="badge working">Working</span> | Ongoing | One merged PR per phase in a project you use | [Contributing to vLLM](https://docs.vllm.ai/en/latest/contributing/) | ⬜ |
| Technical writing in public | <span class="badge working">Working</span> | W13, W26, W39, W52, W65, W78 | One solid post per phase | [Go Brrrr](https://horace.io/brrr_intro.html) · [Simon Boehm](https://siboehm.com/) | ⬜ |
| Quality evals for serving trade-offs | <span class="badge working">Working</span> | W06 | Measure accuracy loss from quantization with a proper eval harness | [lm-eval-harness](https://github.com/EleutherAI/lm-evaluation-harness) | ⬜ |
