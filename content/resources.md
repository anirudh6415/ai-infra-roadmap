---
title: Resources
---

# Resources

Curated by phase. **Free** unless marked 💲. For a map of tools by category, see the [tool radar](radar.md). Use these as references to look things up when a week needs them, not as courses to finish front to back.

**Legend:** 📘 book · 🎓 course · 📄 paper · 📚 docs · 🧑‍💻 repo / hands-on · ✍️ blog · 🎥 video

!!! tip "Adding your own"
    Add a row under the right section with the same columns. Mark anything you've finished with ✅ in the first column, and anything you'd recommend to others with ⭐.

## Start here (whole roadmap)

| | Resource | Type | Why |
|---|---|---|---|
| | [How to Scale Your Model](https://jax-ml.github.io/scaling-book/) (Google DeepMind) | 📘 | Rooflines, sharding, inference math. The best single reference for this roadmap |
| | [Machine Learning Engineering Open Book](https://github.com/stas00/ml-engineering) (Stas Bekman) | 📘 | Practical: hardware, networking, storage, training, debugging, fault tolerance |
| | [The Ultra-Scale Playbook](https://huggingface.co/spaces/nanotron/ultrascale-playbook) (Hugging Face) | 📘 | Distributed training from DP to 5D parallelism, with experiments |
| | [Machine Learning Systems](https://mlsysbook.ai/) (Harvard, V. J. Reddi) | 📘 | Broad ML systems textbook; good for filling gaps |
| | [Stanford CS149: Parallel Computing](https://gfxcourses.stanford.edu/cs149/fall25) | 🎓 | Pick lectures that match the week; skip the rest. The course page links last year's recorded lectures |
| | [aman.ai](https://aman.ai/) (Aman Chadha) | 📘 | Primers and course notes across ML, NLP, vision and RL. Good for refreshing model fundamentals behind the infrastructure |
| | [GPU Glossary](https://modal.com/gpu-glossary) (Modal) | 📚 | Every GPU term (SMs, warps, memory hierarchy, tensor cores) explained and cross-linked. Keep it open in a tab |
| | [Modern GPU Programming for MLSys](https://mlc.ai/modern-gpu-programming-for-mlsys/) (MLC community, from CMU's ML systems courses) | 📘 | Writing fast GEMM and FlashAttention kernels on modern NVIDIA GPUs |
| | [Recommended video](https://www.youtube.com/watch?v=dEZP1qUNTOk) _(channel name to add)_ | 🎥 | Hand-picked for this roadmap |
| | [GPU MODE lectures](https://github.com/gpu-mode/lectures) + Discord | 🎥 | Community lectures on CUDA, Triton, profiling, kernels |

## Phase 1 · Inference & GPU memory

| | Resource | Type | Week |
|---|---|---|---|
| | [Transformer Inference Arithmetic](https://kipp.ly/transformer-inference-arithmetic/) (kipply) | ✍️ | 1–2 |
| | [How to Scale Your Model: inference chapter](https://jax-ml.github.io/scaling-book/) | 📘 | 2, 12, 17 |
| | [LLM Inference Performance Engineering: Best Practices](https://www.databricks.com/blog/llm-inference-performance-engineering-best-practices) (Databricks) | ✍️ | 2–4 |
| | [vLLM documentation](https://docs.vllm.ai/) and [vLLM blog](https://vllm.ai/blog) | 📚 | 1–6 |
| | [Efficient Memory Management for LLM Serving with PagedAttention](https://arxiv.org/abs/2309.06180) | 📄 | 3 |
| | [GQA: Training Generalized Multi-Query Transformer Models](https://arxiv.org/abs/2305.13245) | 📄 | 3, 5 |
| | [Orca: A Distributed Serving System for Transformer-Based Generative Models](https://www.usenix.org/conference/osdi22/presentation/yu) (continuous batching) | 📄 | 4 |
| | [Sarathi-Serve](https://arxiv.org/abs/2403.02310) (chunked prefill) | 📄 | 4 |
| | [GuideLLM](https://github.com/vllm-project/guidellm) (load testing) | 🧑‍💻 | 4 |
| | [Mixtral of Experts](https://arxiv.org/abs/2401.04088) · [DeepSeek-V2 (MLA)](https://arxiv.org/abs/2405.04434) | 📄 | 5 |
| | [AWQ](https://arxiv.org/abs/2306.00978) · [GPTQ](https://arxiv.org/abs/2210.17323) · [SmoothQuant](https://arxiv.org/abs/2211.10438) | 📄 | 6 |
| | [lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) | 🧑‍💻 | 6 |
| | [EfficientML.ai](https://efficientml.ai/): efficient deep learning course, quantization lectures | 🎓 | 6 |
| | [Understanding CUDA Memory Usage](https://docs.pytorch.org/docs/stable/torch_cuda_memory.html) + [memory_viz](https://pytorch.org/memory_viz) | 📚 | 7 |
| | [DCGM exporter](https://github.com/NVIDIA/dcgm-exporter) + DCGM field docs | 📚 | 8 |
| | [ML.ENERGY](https://ml.energy/) (energy leaderboard) · [Zeus](https://github.com/ml-energy/zeus) (energy measurement) | 📚 | 8, 75 |
| | [Google SRE book: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) | 📘 | 9 |
| | [SRE Workbook: Implementing SLOs](https://sre.google/workbook/implementing-slos/) | 📘 | 9 |
| | [KEDA](https://keda.sh/) docs | 📚 | 10 |
| | [LiteLLM](https://github.com/BerriAI/litellm) · [Envoy AI Gateway](https://github.com/envoyproxy/ai-gateway) | 🧑‍💻 | 11 |
| | *Performance Modeling and Design of Computer Systems* (Mor Harchol-Balter) 💲 | 📘 | 12 |
| | [Efficiently Serving LLMs](https://www.deeplearning.ai/short-courses/efficiently-serving-llms/) (DeepLearning.AI short course) | 🎓 | 1–6 |

## Phase 2 · Down to the GPU

| | Resource | Type | Week |
|---|---|---|---|
| | [Making Deep Learning Go Brrrr From First Principles](https://horace.io/brrr_intro.html) (Horace He) | ✍️ | 14 |
| | [GPU Glossary](https://modal.com/gpu-glossary) (Modal) | 📚 | 14, 17, 18 |
| | [GPU Puzzles](https://github.com/srush/GPU-Puzzles) (Sasha Rush) | 🧑‍💻 | 14–15 |
| | *Programming Massively Parallel Processors*, 4th ed. (Hwu, Kirk, El Hajj) 💲 | 📘 | 15–16 |
| | [CUDA C++ Programming Guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/) · [Best Practices Guide](https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/) | 📚 | 15–16 |
| | [How to Optimize a CUDA Matmul Kernel](https://siboehm.com/articles/22/CUDA-MMM) (Simon Boehm) | ✍️ | 16 |
| | [Modern GPU Programming for MLSys](https://mlc.ai/modern-gpu-programming-for-mlsys/) | 📘 | 16, 22–23 |
| | [GPU Performance Background User's Guide](https://docs.nvidia.com/deeplearning/performance/dl-performance-gpu-background/index.html) (NVIDIA) | 📚 | 17 |
| | Roofline: An Insightful Visual Performance Model (Williams, Waterman, Patterson, 2009) | 📄 | 17 |
| | NVIDIA Hopper and Blackwell architecture technical briefs (nvidia.com) | 📄 | 18 |
| | [SemiAnalysis](https://semianalysis.com/) (industry context) · [Transformer Engine](https://github.com/NVIDIA/TransformerEngine) (FP8 in practice) | 📚 | 18 |
| | [PyTorch profiler recipe](https://docs.pytorch.org/tutorials/recipes/recipes/profiler_recipe.html) | 📚 | 19 |
| | [Nsight Systems](https://developer.nvidia.com/nsight-systems) · [Nsight Compute](https://developer.nvidia.com/nsight-compute) | 📚 | 19–20 |
| | [Triton tutorials](https://triton-lang.org/main/getting-started/tutorials/index.html) | 📚 | 21–24 |
| | [Triton Puzzles](https://github.com/gpu-mode/Triton-Puzzles) | 🧑‍💻 | 21 |
| | [torch.compile tutorial](https://docs.pytorch.org/tutorials/intermediate/torch_compile_tutorial.html) | 📚 | 24 |
| | [PaLM paper](https://arxiv.org/abs/2204.02311) (appendix: MFU definition) | 📄 | 24 |
| | [FlashAttention](https://arxiv.org/abs/2205.14135) | 📄 | 25 |
| | [Fast Inference via Speculative Decoding](https://arxiv.org/abs/2211.17192) | 📄 | 25 |
| | [DistServe](https://arxiv.org/abs/2401.09670) (prefill/decode disaggregation) | 📄 | 25 |
| | [SGLang](https://github.com/sgl-project/sglang) · [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM) · [NVIDIA Dynamo](https://github.com/ai-dynamo/dynamo) · [llm-d](https://llm-d.ai/) | 🧑‍💻 | 25 |
| | [USE Method](https://www.brendangregg.com/usemethod.html) + *Systems Performance*, 2nd ed. (Brendan Gregg) 💲 | 📘 | 26 |
| | [Deep Learning Systems](https://dlsyscourse.org/) (CMU course: algorithms and implementation) | 🎓 | Optional |
| | NVIDIA DLI: *Fundamentals of Accelerated Computing with CUDA C/C++* 💲 | 🎓 | Optional |

## Phase 3 · Scale out

| | Resource | Type | Week |
|---|---|---|---|
| | [The Ultra-Scale Playbook](https://huggingface.co/spaces/nanotron/ultrascale-playbook) | 📘 | 27–30, 38 |
| | [PyTorch DDP tutorial](https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html) | 📚 | 27 |
| | [nanoGPT](https://github.com/karpathy/nanoGPT) · [torchtitan](https://github.com/pytorch/torchtitan) | 🧑‍💻 | 27–34 |
| | [nccl-tests](https://github.com/NVIDIA/nccl-tests) · [NCCL documentation](https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/index.html) | 🧑‍💻 | 28 |
| | [ZeRO](https://arxiv.org/abs/1910.02054) | 📄 | 29 |
| | [PyTorch FSDP tutorial](https://docs.pytorch.org/tutorials/intermediate/FSDP_tutorial.html) | 📚 | 29 |
| | [Megatron-LM](https://arxiv.org/abs/1909.08053) · [GPipe](https://arxiv.org/abs/1811.06965) | 📄 | 30 |
| | ML Engineering Open Book: network and storage chapters | 📘 | 32, 37 |
| | [PyTorch Distributed Checkpoint](https://docs.pytorch.org/docs/stable/distributed.checkpoint.html) | 📚 | 33 |
| | [torchrun (elastic launch)](https://docs.pytorch.org/docs/stable/elastic/run.html) | 📚 | 27, 34–35 |
| | [Slurm quick start](https://slurm.schedmd.com/quickstart.html) · [slurm-docker-cluster](https://github.com/giovtorres/slurm-docker-cluster) | 📚 | 35–36 |
| | [How to Scale Your Model](https://jax-ml.github.io/scaling-book/) (training compute and FLOPs) · [PaLM (MFU)](https://arxiv.org/abs/2204.02311) | 📘 | 38 |
| | [Ray docs](https://docs.ray.io/en/latest/index.html) · [KubeRay](https://github.com/ray-project/kuberay) | 📚 | 36 |

## Phase 4 · Platform & economics

| | Resource | Type | Week |
|---|---|---|---|
| | [NVIDIA GPU Operator](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html) (incl. MIG and time-slicing) | 📚 | 40–41 |
| | [fake-gpu-operator](https://github.com/run-ai/fake-gpu-operator) (Run:ai) | 🧑‍💻 | 40 |
| | [Kueue](https://kueue.sigs.k8s.io/) | 📚 | 42 |
| | [Dynamic Resource Allocation](https://kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/) | 📚 | 42 |
| | [KAI Scheduler](https://github.com/NVIDIA/KAI-Scheduler) · [Volcano](https://volcano.sh/) | 🧑‍💻 | 42 |
| | [Kubernetes multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/) | 📚 | 42 |
| | [Argo CD](https://github.com/argoproj/argo-cd) (GitOps) | 🧑‍💻 | 43 |
| | [Gateway API Inference Extension](https://gateway-api-inference-extension.sigs.k8s.io/) · [KServe](https://kserve.github.io/website/) · [llm-d](https://llm-d.ai/) · [KEDA](https://keda.sh/) | 📚 | 43 |
| | [OpenTelemetry](https://opentelemetry.io/docs/) | 📚 | 43 |
| | [Terraform tutorials](https://developer.hashicorp.com/terraform/tutorials) | 📚 | 44 |
| | [FinOps Framework](https://www.finops.org/framework/) · [OpenCost](https://www.opencost.io/) | 📚 | 45 |
| | [Google OR-Tools](https://developers.google.com/optimization) · [PuLP](https://coin-or.github.io/pulp/) · [Pyomo](https://www.pyomo.org/) | 📚 | 46, 49 |
| | [Gurobi modeling examples](https://github.com/Gurobi/modeling-examples) | 🧑‍💻 | 46 |
| | *Model Building in Mathematical Programming* (H. P. Williams) 💲 | 📘 | 46 |
| | [Forecasting: Principles and Practice, 3rd ed.](https://otexts.com/fpp3/) (Hyndman & Athanasopoulos) | 📘 | 47 |
| | [SimPy](https://simpy.readthedocs.io/) | 📚 | 47 |
| | [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (Anthropic) | ✍️ | 48 |
| | [Model Context Protocol](https://modelcontextprotocol.io/) (spec + SDKs) | 📚 | 48, 51 |
| | [Streamlit documentation](https://docs.streamlit.io/) (planner UI) | 📚 | 50 |

## Phase 5 · Serving at scale

| | Resource | Type | Week |
|---|---|---|---|
| | [DistServe](https://arxiv.org/abs/2401.09670) · [Splitwise](https://arxiv.org/abs/2311.18677) · [Mooncake](https://arxiv.org/abs/2407.00079) | 📄 | 53 |
| | [vLLM: Disaggregated Prefilling](https://docs.vllm.ai/en/latest/features/disagg_prefill.html) · [llm-d](https://llm-d.ai/) · [NVIDIA Dynamo](https://github.com/ai-dynamo/dynamo) | 📚 | 54–55 |
| | [SGLang](https://github.com/sgl-project/sglang) (router) · [vLLM production stack](https://github.com/vllm-project/production-stack) | 🧑‍💻 | 55 |
| | [LMCache](https://github.com/LMCache/LMCache) · [Mooncake](https://github.com/kvcache-ai/Mooncake) | 🧑‍💻 | 56 |
| | [S-LoRA](https://arxiv.org/abs/2311.03285) · [vLLM: LoRA Adapters](https://docs.vllm.ai/en/latest/features/lora.html) | 📄 | 57 |
| | [Ring Attention](https://arxiv.org/abs/2310.01889) · [Sarathi-Serve](https://arxiv.org/abs/2403.02310) · [vLLM: Multimodal Inputs](https://docs.vllm.ai/en/latest/features/multimodal_inputs.html) | 📄 | 58 |
| | [Fast Inference via Speculative Decoding](https://arxiv.org/abs/2211.17192) | 📄 | 59 |
| | [Text Embeddings Inference](https://github.com/huggingface/text-embeddings-inference) | 🧑‍💻 | 60 |
| | [Triton Inference Server](https://github.com/triton-inference-server/server) · [TensorRT](https://developer.nvidia.com/tensorrt) · [ONNX Runtime](https://onnxruntime.ai/) | 🧑‍💻 | 61 |
| | [MLPerf Inference: Datacenter](https://mlcommons.org/benchmarks/inference-datacenter/) · [AIPerf](https://github.com/ai-dynamo/aiperf) · [GuideLLM](https://github.com/vllm-project/guidellm) · [inference-perf](https://github.com/kubernetes-sigs/inference-perf) | 📚 | 62 |
| | [Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531) · [SparseGPT](https://arxiv.org/abs/2301.00774) · [Accelerating Sparse DNNs (2:4)](https://arxiv.org/abs/2104.08378) | 📄 | 63 |
| | [FrugalGPT](https://arxiv.org/abs/2305.05176) · [RouteLLM](https://github.com/lm-sys/RouteLLM) | 📄 | 63 |
| | [llama.cpp](https://github.com/ggml-org/llama.cpp) · [Ollama](https://ollama.com/) (aside) | 🧑‍💻 | 63 |
| | [vLLM: Offline Inference](https://docs.vllm.ai/en/latest/serving/offline_inference.html) · [Ray Data: Offline Batch Inference](https://docs.ray.io/en/latest/data/batch_inference.html) | 📚 | 64 |

## Phase 6 · Training & fleet operations

| | Resource | Type | Week |
|---|---|---|---|
| | [FP8 Formats for Deep Learning](https://arxiv.org/abs/2209.05433) · [Transformer Engine](https://github.com/NVIDIA/TransformerEngine) | 📄 | 66 |
| | [Megatron-LM / Megatron Core](https://github.com/NVIDIA/Megatron-LM) · [DeepSpeed](https://github.com/deepspeedai/DeepSpeed) · [torchtitan](https://github.com/pytorch/torchtitan) | 🧑‍💻 | 67 |
| | [Ultra-Scale Playbook](https://huggingface.co/spaces/nanotron/ultrascale-playbook) (recompute, sequence/context/expert parallelism) | 📘 | 68 |
| | [LoRA](https://arxiv.org/abs/2106.09685) · [QLoRA](https://arxiv.org/abs/2305.14314) · [PEFT](https://github.com/huggingface/peft) · [Accelerate](https://github.com/huggingface/accelerate) | 📄 | 69 |
| | [WebDataset](https://github.com/webdataset/webdataset) · [Ray Data](https://docs.ray.io/en/latest/data/data.html) | 🧑‍💻 | 70 |
| | [TRL GRPO Trainer](https://huggingface.co/docs/trl/main/en/grpo_trainer) · [HybridFlow (veRL)](https://arxiv.org/abs/2409.19256) · [veRL](https://github.com/volcengine/verl) · [OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | 📚 | 71–72 |
| | [DCGM Diagnostics](https://docs.nvidia.com/datacenter/dcgm/latest/user-guide/dcgm-diagnostics.html) · [XID errors](https://docs.nvidia.com/deploy/xid-errors/index.html) · [Node Problem Detector](https://github.com/kubernetes/node-problem-detector) | 📚 | 73 |
| | [ML Engineering Open Book](https://github.com/stas00/ml-engineering) (fault tolerance, hardware) | 📘 | 74 |
| | [SkyPilot](https://github.com/skypilot-org/skypilot) · [Amazon EC2 P5](https://aws.amazon.com/ec2/instance-types/p5/) | 📚 | 75 |
| | [How to Scale Your Model](https://jax-ml.github.io/scaling-book/) (TPU chapters) · [Introduction to Cloud TPU](https://docs.cloud.google.com/tpu/docs/intro-to-tpu) | 📘 | 76 |
| | [JAX](https://github.com/jax-ml/jax) · [PyTorch/XLA](https://github.com/pytorch/xla) · [vLLM TPU plugin](https://github.com/vllm-project/tpu-inference) · [OpenXLA](https://openxla.org/) | 🧑‍💻 | 76 |
| | [AMD Instinct GPUs](https://www.amd.com/en/products/accelerators/instinct.html) · [AMD ROCm](https://rocm.docs.amd.com/) · [vLLM on ROCm](https://docs.vllm.ai/en/latest/getting_started/installation/gpu.html) · [AWS Trainium](https://aws.amazon.com/ai/machine-learning/trainium/) | 📚 | 77 |
| | [CUTLASS](https://github.com/NVIDIA/cutlass) · [FlashInfer](https://github.com/flashinfer-ai/flashinfer) · [FlashAttention](https://github.com/Dao-AILab/flash-attention) · [ThunderKittens](https://github.com/HazyResearch/ThunderKittens) | 🧑‍💻 | 77 |

## Foundations · containers, Kubernetes & delivery

| | Resource | Type | Week |
|---|---|---|---|
| | [Docker: Get started](https://docs.docker.com/get-started/) | 📚 | 4 |
| | [vLLM: Using Docker](https://docs.vllm.ai/en/latest/deployment/docker.html) | 📚 | 4 |
| | [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/) | 🎓 | 8 |
| | [kind quick start](https://kind.sigs.k8s.io/docs/user/quick-start/) | 📚 | 8, 10, 40, 42–43 |
| | [vLLM: Using Kubernetes](https://docs.vllm.ai/en/latest/deployment/k8s.html) | 📚 | 10 |
| | [GitHub Actions documentation](https://docs.github.com/en/actions) | 📚 | 13 |
| | [MLflow documentation](https://mlflow.org/docs/latest/) | 📚 | 24 |
| | [Helm documentation](https://helm.sh/docs/) | 📚 | 43 |

## Ongoing · Vector DB & embedding infrastructure

| | Resource | Type |
|---|---|---|
| | [FAISS](https://github.com/facebookresearch/faiss) + its wiki on index types | 🧑‍💻 |
| | [HNSW paper](https://arxiv.org/abs/1603.09320) | 📄 |
| | [ANN-Benchmarks](https://ann-benchmarks.com/) | 🧑‍💻 |
| | [VectorDBBench](https://github.com/zilliztech/VectorDBBench) | 🧑‍💻 |
| | [Milvus](https://github.com/milvus-io/milvus) · [Qdrant](https://github.com/qdrant/qdrant) · [pgvector](https://github.com/pgvector/pgvector) | 🧑‍💻 |

## Writing your posts

| | Resource | Type | Week |
|---|---|---|---|
| | Model your posts on these: [Making Deep Learning Go Brrrr](https://horace.io/brrr_intro.html) (explains a mechanism from first principles) · [CUDA matmul worklog](https://siboehm.com/articles/22/CUDA-MMM) (step-by-step measured progress) | ✍️ | 13, 26, 39, 52, 65, 78 |

## Interview prep & system design

| | Resource | Type |
|---|---|---|
| | *Designing Machine Learning Systems* (Chip Huyen) 💲 | 📘 |
| | *AI Engineering* (Chip Huyen) 💲 | 📘 |
| | *Designing Data-Intensive Applications* (Martin Kleppmann) 💲 | 📘 |
| | [NeetCode](https://neetcode.io/): structured interview problem lists | 🧑‍💻 |

## Paid courses (Udemy and others)

Add courses you buy here, with a note on whether they were worth it.

| | Course | Platform | Topic | Worth it? |
|---|---|---|---|---|
| | _e.g. a CKA (Certified Kubernetes Administrator) prep course_ | Udemy / KodeKloud | Kubernetes | |
| | | | | |

## AI study prompts

Use AI as a tutor, not a ghostwriter. Copy a prompt, replace the `[BRACKETS]`, and paste it into your assistant.

### 1 · Five-minute review sheet

Use after a lecture, paper or chapter, or before revisiting a topic.

```prompt
Act as my tutor for AI infrastructure. Summarize the key concepts of [TOPIC] as a
review sheet I can read in 5 minutes (1–2 pages).

My background: [e.g. I know GPU capacity planning and basic Kubernetes, but not CUDA].

Structure:
1. A 3-sentence overview: what it is, why it matters, where it shows up in practice.
2. The 5–7 key ideas as bullet points. Give each one a concrete example with real
   numbers where possible (GPU memory, bandwidth, tokens/s, latency).
3. At least one diagram (Mermaid or ASCII) showing how the pieces connect.
4. "Common mistakes": 3–5 things people get wrong.
5. 3 self-check questions, with the answers in a separate section at the end.

Keep it in Markdown. Be precise; if something depends on hardware or version,
say so instead of guessing.
```

### 2 · Teach it back until I get it (Feynman loop)

Use for anything you need to really understand, not just recognise.

```prompt
Teach me [LECTURE / TOPIC] using the Feynman technique. Follow these steps exactly.

1. Explain it in the simplest possible terms: under 300 words, one analogy,
   one concrete example.
2. Ask me to explain it back in my own words. Stop and wait for my answer.
3. Compare my explanation with the correct one. List what I got right, what is
   missing, and anything I got wrong.
4. Re-teach only the gaps, as simply as possible. Then ask me to explain the
   whole thing again.
5. Repeat steps 2–4 until my explanation is complete and accurate. Tell me
   clearly when it is.
6. Only then, write a Markdown note with these sections:
   - Summary (3 sentences)
   - Key ideas (bullets)
   - Diagram (Mermaid or ASCII)
   - My final explanation (in my words, lightly cleaned up)
   - Formulas or numbers worth remembering
   - 3 review questions with answers

Do not skip to step 6 early, even if I ask.
```

Save the final note as `content/notes/[topic].md` (start from the [note template](notes/template.md)) so it shows up on the site.

### 3 · Smaller prompts

```prompt
Explain [CONCEPT] to someone who knows GPU capacity planning but not CUDA.
Then give me 3 questions to check I understood.
```

```prompt
Here is my benchmark setup and result: [PASTE]. What could make this number
misleading? List the checks I should run before trusting it.
```

```prompt
Review this kernel for correctness and performance. Don't rewrite it; point out
the problems and let me fix them. [PASTE CODE]
```

```prompt
Quiz me on [THIS WEEK'S TOPIC] with 5 questions of increasing difficulty.
Ask one at a time and wait for my answer before the next.
```

```prompt
I think [CLAIM] because [REASON]. Argue against me as strongly as you can.
```
