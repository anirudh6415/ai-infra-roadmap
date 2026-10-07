---
title: Resources
---

# Resources

Curated by phase. **Free** unless marked 💲. Use these as references to look things up when a week needs them, not as courses to finish front to back.

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
| | [Stanford CS149: Parallel Computing](https://gfxcourses.stanford.edu/cs149/fall25) | 🎓 | Pick lectures that match the week; skip the rest |
| | [GPU MODE lectures](https://github.com/gpu-mode/lectures) + Discord | 🎥 | Community lectures on CUDA, Triton, profiling, kernels |

## Phase 1 · Inference & GPU memory

| | Resource | Type | Week |
|---|---|---|---|
| | [Transformer Inference Arithmetic](https://kipp.ly/transformer-inference-arithmetic/) (kipply) | ✍️ | 1–2 |
| | [LLM Inference Performance Engineering: Best Practices](https://www.databricks.com/blog/llm-inference-performance-engineering-best-practices) (Databricks) | ✍️ | 2–4 |
| | [vLLM documentation](https://docs.vllm.ai/) and [vLLM blog](https://blog.vllm.ai/) | 📚 | 1–6 |
| | [Efficient Memory Management for LLM Serving with PagedAttention](https://arxiv.org/abs/2309.06180) | 📄 | 3 |
| | [GQA: Training Generalized Multi-Query Transformer Models](https://arxiv.org/abs/2305.13245) | 📄 | 3, 5 |
| | [Orca: A Distributed Serving System for Transformer-Based Generative Models](https://www.usenix.org/conference/osdi22/presentation/yu) (continuous batching) | 📄 | 4 |
| | [Sarathi-Serve](https://arxiv.org/abs/2403.02310) (chunked prefill) | 📄 | 4 |
| | [GuideLLM](https://github.com/vllm-project/guidellm) (load testing) | 🧑‍💻 | 4 |
| | [Mixtral of Experts](https://arxiv.org/abs/2401.04088) · [DeepSeek-V2 (MLA)](https://arxiv.org/abs/2405.04434) | 📄 | 5 |
| | [AWQ](https://arxiv.org/abs/2306.00978) · [GPTQ](https://arxiv.org/abs/2210.17323) · [SmoothQuant](https://arxiv.org/abs/2211.10438) | 📄 | 6 |
| | [lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) | 🧑‍💻 | 6 |
| | [MIT 6.5940 Efficient ML](https://efficientml.ai/) (Song Han): quantization lectures | 🎓 | 6 |
| | [Understanding CUDA Memory Usage](https://pytorch.org/docs/stable/torch_cuda_memory.html) + [memory_viz](https://pytorch.org/memory_viz) | 📚 | 7 |
| | [DCGM exporter](https://github.com/NVIDIA/dcgm-exporter) + DCGM field docs | 📚 | 8 |
| | [Google SRE book: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) | 📘 | 9 |
| | [SRE Workbook: Implementing SLOs](https://sre.google/workbook/implementing-slos/) | 📘 | 9 |
| | [KEDA](https://keda.sh/) docs | 📚 | 10 |
| | *Performance Modeling and Design of Computer Systems* (Mor Harchol-Balter) 💲 | 📘 | 12 |
| | [Efficiently Serving LLMs](https://www.deeplearning.ai/short-courses/efficiently-serving-llms/) (DeepLearning.AI short course) | 🎓 | 1–6 |

## Phase 2 · Down to the GPU

| | Resource | Type | Week |
|---|---|---|---|
| | [Making Deep Learning Go Brrrr From First Principles](https://horace.io/brrr_intro.html) (Horace He) | ✍️ | 14 |
| | [GPU Puzzles](https://github.com/srush/GPU-Puzzles) (Sasha Rush) | 🧑‍💻 | 14–15 |
| | *Programming Massively Parallel Processors*, 4th ed. (Hwu, Kirk, El Hajj) 💲 | 📘 | 15–16 |
| | [CUDA C++ Programming Guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/) · [Best Practices Guide](https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/) | 📚 | 15–16 |
| | [How to Optimize a CUDA Matmul Kernel](https://siboehm.com/articles/22/CUDA-MMM) (Simon Boehm) | ✍️ | 16 |
| | [GPU Performance Background User's Guide](https://docs.nvidia.com/deeplearning/performance/dl-performance-gpu-background/index.html) (NVIDIA) | 📚 | 17 |
| | Roofline: An Insightful Visual Performance Model (Williams, Waterman, Patterson, 2009) | 📄 | 17 |
| | NVIDIA Hopper and Blackwell architecture technical briefs (nvidia.com) | 📄 | 18 |
| | [PyTorch profiler recipe](https://pytorch.org/tutorials/recipes/recipes/profiler_recipe.html) | 📚 | 19 |
| | [Nsight Systems](https://developer.nvidia.com/nsight-systems) · [Nsight Compute](https://developer.nvidia.com/nsight-compute) | 📚 | 19–20 |
| | [Triton tutorials](https://triton-lang.org/main/getting-started/tutorials/index.html) | 📚 | 21–22 |
| | [Triton Puzzles](https://github.com/gpu-mode/Triton-Puzzles) | 🧑‍💻 | 21 |
| | [torch.compile tutorial](https://pytorch.org/tutorials/intermediate/torch_compile_tutorial.html) | 📚 | 24 |
| | [PaLM paper](https://arxiv.org/abs/2204.02311) (appendix: MFU definition) | 📄 | 24 |
| | [FlashAttention](https://arxiv.org/abs/2205.14135) | 📄 | 25 |
| | [Fast Inference via Speculative Decoding](https://arxiv.org/abs/2211.17192) | 📄 | 25 |
| | [DistServe](https://arxiv.org/abs/2401.09670) (prefill/decode disaggregation) | 📄 | 25 |
| | [SGLang](https://github.com/sgl-project/sglang) · [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM) · [NVIDIA Dynamo](https://github.com/ai-dynamo/dynamo) · [llm-d](https://llm-d.ai/) | 🧑‍💻 | 25 |
| | [USE Method](https://www.brendangregg.com/usemethod.html) + *Systems Performance*, 2nd ed. (Brendan Gregg) 💲 | 📘 | 26 |
| | [CMU Deep Learning Systems](https://dlsyscourse.org/) (Tianqi Chen, Zico Kolter) | 🎓 | Optional |
| | NVIDIA DLI: *Fundamentals of Accelerated Computing with CUDA C/C++* 💲 | 🎓 | Optional |

## Phase 3 · Scale out

| | Resource | Type | Week |
|---|---|---|---|
| | [PyTorch DDP tutorial](https://pytorch.org/tutorials/intermediate/ddp_tutorial.html) | 📚 | 27 |
| | [nanoGPT](https://github.com/karpathy/nanoGPT) · [torchtitan](https://github.com/pytorch/torchtitan) | 🧑‍💻 | 27–34 |
| | [nccl-tests](https://github.com/NVIDIA/nccl-tests) | 🧑‍💻 | 28 |
| | [ZeRO](https://arxiv.org/abs/1910.02054) | 📄 | 29 |
| | [PyTorch FSDP tutorial](https://pytorch.org/tutorials/intermediate/FSDP_tutorial.html) | 📚 | 29 |
| | [Megatron-LM](https://arxiv.org/abs/1909.08053) · [GPipe](https://arxiv.org/abs/1811.06965) | 📄 | 30 |
| | ML Engineering Open Book: network and storage chapters | 📘 | 32, 37 |
| | [PyTorch Distributed Checkpoint](https://pytorch.org/docs/stable/distributed.checkpoint.html) | 📚 | 33 |
| | [torchrun (elastic launch)](https://pytorch.org/docs/stable/elastic/run.html) | 📚 | 34 |
| | [Slurm quick start](https://slurm.schedmd.com/quickstart.html) · [slurm-docker-cluster](https://github.com/giovtorres/slurm-docker-cluster) | 📚 | 35 |
| | [Ray docs](https://docs.ray.io/) · [KubeRay](https://github.com/ray-project/kuberay) | 📚 | 36 |

## Phase 4 · Platform & economics

| | Resource | Type | Week |
|---|---|---|---|
| | [NVIDIA GPU Operator](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html) (incl. MIG and time-slicing) | 📚 | 40–41 |
| | [fake-gpu-operator](https://github.com/run-ai/fake-gpu-operator) (Run:ai) | 🧑‍💻 | 40 |
| | [Kueue](https://kueue.sigs.k8s.io/) | 📚 | 42 |
| | [Dynamic Resource Allocation](https://kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/) | 📚 | 42 |
| | [KAI Scheduler](https://github.com/NVIDIA/KAI-Scheduler) · [Volcano](https://volcano.sh/) | 🧑‍💻 | 42 |
| | [Gateway API Inference Extension](https://gateway-api-inference-extension.sigs.k8s.io/) · [KServe](https://kserve.github.io/website/) | 📚 | 43 |
| | [OpenTelemetry](https://opentelemetry.io/docs/) | 📚 | 43 |
| | [Terraform tutorials](https://developer.hashicorp.com/terraform/tutorials) | 📚 | 44 |
| | [FinOps Framework](https://www.finops.org/framework/) · [OpenCost](https://www.opencost.io/) | 📚 | 45 |
| | [Google OR-Tools](https://developers.google.com/optimization) · [PuLP](https://coin-or.github.io/pulp/) · [Pyomo](https://www.pyomo.org/) | 📚 | 46 |
| | [Gurobi modeling examples](https://github.com/Gurobi/modeling-examples) | 🧑‍💻 | 46 |
| | *Model Building in Mathematical Programming* (H. P. Williams) 💲 | 📘 | 46 |
| | [Forecasting: Principles and Practice, 3rd ed.](https://otexts.com/fpp3/) (Hyndman & Athanasopoulos) | 📘 | 47 |
| | [SimPy](https://simpy.readthedocs.io/) | 📚 | 47 |
| | [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (Anthropic) | ✍️ | 48 |
| | [Model Context Protocol](https://modelcontextprotocol.io/) (spec + SDKs) | 📚 | 48 |

## Ongoing · Vector DB & embedding infrastructure

| | Resource | Type |
|---|---|---|
| | [FAISS](https://github.com/facebookresearch/faiss) + its wiki on index types | 🧑‍💻 |
| | [HNSW paper](https://arxiv.org/abs/1603.09320) | 📄 |
| | [ANN-Benchmarks](https://ann-benchmarks.com/) | 🧑‍💻 |
| | [VectorDBBench](https://github.com/zilliztech/VectorDBBench) | 🧑‍💻 |

## Interview prep & system design

| | Resource | Type |
|---|---|---|
| | *Designing Machine Learning Systems* (Chip Huyen) 💲 | 📘 |
| | *AI Engineering* (Chip Huyen) 💲 | 📘 |
| | *Designing Data-Intensive Applications* (Martin Kleppmann) 💲 | 📘 |
| | [NeetCode](https://neetcode.io/) (NeetCode 150 list) | 🧑‍💻 |

## Paid courses (Udemy and others)

Add courses you buy here, with a note on whether they were worth it.

| | Course | Platform | Topic | Worth it? |
|---|---|---|---|---|
| | _e.g. a CKA (Certified Kubernetes Administrator) prep course_ | Udemy / KodeKloud | Kubernetes | |
| | | | | |

## AI help: prompts that work

Use AI as a tutor, not a ghostwriter. Prompts worth reusing:

- *"Explain [concept] to someone who knows GPU capacity planning but not CUDA. Then give me 3 questions to check I understood."*
- *"Here's my benchmark result and setup. What could make this number misleading?"*
- *"Review this kernel for correctness and performance. Don't rewrite it; point out problems and let me fix them."*
- *"Quiz me on this week's topic with 5 questions, increasing in difficulty."*
- *"I think [X] because [Y]. Argue against me."*
