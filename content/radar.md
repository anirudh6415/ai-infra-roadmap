---
title: Tool radar
---

# Tool radar

The main tools in AI infrastructure, by category, so you can recognise them in job posts, papers and design reviews. **Where** says whether the roadmap uses a tool hands-on, mentions it in reading, or leaves it as awareness only. Every link goes to the project's own repository or documentation.

!!! tip "How to use this page"
    You don't need to learn everything here. When a tool comes up at work or in an interview, check its row: if it's *awareness*, read its README for 20 minutes and add a line to your notes. Add new tools as you meet them.

## Serving engines

| Tool | What it is | Where |
|---|---|---|
| [vLLM](https://docs.vllm.ai/) | High-throughput LLM serving engine (PagedAttention, continuous batching) | Hands-on: Phases 1, 2, 5 |
| [SGLang](https://github.com/sgl-project/sglang) | LLM serving framework with RadixAttention prefix caching | Reading: W25, W55 |
| [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM) | NVIDIA's optimized LLM inference library | Reading: W25 |
| [Triton Inference Server](https://github.com/triton-inference-server/server) | NVIDIA's multi-framework model server (dynamic batching, many backends) | Hands-on: W61 |
| [Text Embeddings Inference](https://github.com/huggingface/text-embeddings-inference) | Hugging Face server for embedding and reranker models | Hands-on: W60 |
| [TensorRT](https://developer.nvidia.com/tensorrt) | NVIDIA inference optimizer and runtime | Hands-on: W61 |
| [ONNX Runtime](https://onnxruntime.ai/) | Cross-platform inference and training engine | Hands-on: W61 |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | C/C++ LLM inference for CPUs, laptops and edge (GGUF) | Aside: W63 |
| [Ollama](https://ollama.com/) | Simple local model runner built for developers | Awareness: W63 |
| [MLC LLM](https://github.com/mlc-ai/mlc-llm) | LLM deployment engine using ML compilation | Awareness |

## Distributed serving, routing & KV cache

| Tool | What it is | Where |
|---|---|---|
| [llm-d](https://llm-d.ai/) | Kubernetes-native distributed LLM inference | Reading: W25, W54–W55 |
| [NVIDIA Dynamo](https://github.com/ai-dynamo/dynamo) | Distributed inference framework: disaggregated prefill/decode, KV-aware routing | Reading: W25, W54–W55 |
| [vLLM production stack](https://github.com/vllm-project/production-stack) | vLLM's reference cluster-wide Kubernetes deployment | Awareness: W54 |
| [LMCache](https://github.com/LMCache/LMCache) | KV cache layer for storing and reusing KV across requests | Hands-on: W56 |
| [Mooncake](https://github.com/kvcache-ai/Mooncake) | KV-cache-centric disaggregated serving platform | Reading: W53, W56 |
| [Gateway API Inference Extension](https://gateway-api-inference-extension.sigs.k8s.io/) | Model-aware routing for Kubernetes gateways | Reading: W43 |
| [KServe](https://kserve.github.io/website/) | Kubernetes-native model serving platform | Reading: W43 |
| [Ray](https://github.com/ray-project/ray) (Serve, Train, Data) | Distributed Python runtime used for serving, training and data | Hands-on: W36, W70 |

## Kernels, compilers & accelerators

| Tool | What it is | Where |
|---|---|---|
| [Triton](https://triton-lang.org/main/getting-started/tutorials/index.html) | Python DSL for writing GPU kernels | Hands-on: W21–W23 |
| [CUTLASS](https://github.com/NVIDIA/cutlass) | NVIDIA CUDA templates and Python DSLs for linear algebra | Reading: W77 |
| [FlashAttention](https://github.com/Dao-AILab/flash-attention) | Fast, memory-efficient exact attention kernels | Reading: W25, W77 |
| [FlashInfer](https://github.com/flashinfer-ai/flashinfer) | Kernel library and generator for LLM inference | Awareness: W77 |
| [ThunderKittens](https://github.com/HazyResearch/ThunderKittens) | Tile primitives for writing fast kernels | Awareness: W77 |
| [OpenXLA](https://openxla.org/) | Compiler ecosystem behind JAX and TPUs | Reading: W76 |

## Accelerators & their software

| Tool | What it is | Where |
|---|---|---|
| [GPU Glossary](https://modal.com/gpu-glossary) | NVIDIA GPU concepts explained and cross-linked | Reading: W14, W17–18 |
| [Cloud TPU](https://docs.cloud.google.com/tpu/docs/intro-to-tpu) | Google's TPU accelerators | Hands-on: W76 |
| [JAX](https://github.com/jax-ml/jax) | Array computation and transformations; the main TPU framework | Hands-on: W76 |
| [PyTorch/XLA](https://github.com/pytorch/xla) | Runs PyTorch on TPUs through XLA | Reading: W76 |
| [vLLM TPU plugin](https://github.com/vllm-project/tpu-inference) | TPU inference for vLLM | Reading: W76 |
| [AMD Instinct GPUs](https://www.amd.com/en/products/accelerators/instinct.html) | AMD's data center GPUs (CDNA) | Reading: W77 |
| [AMD ROCm](https://rocm.docs.amd.com/) | AMD's GPU software platform (HIP, libraries) | Hands-on if available: W77 |
| [AWS Trainium](https://aws.amazon.com/ai/machine-learning/trainium/) | Example of a cloud provider's own AI chip | Reading: W77 |

## Training & post-training

| Tool | What it is | Where |
|---|---|---|
| [torchtitan](https://github.com/pytorch/torchtitan) | PyTorch-native platform for training generative models | Hands-on: Phase 3, W67 |
| [Megatron-LM / Megatron Core](https://github.com/NVIDIA/Megatron-LM) | NVIDIA's large-scale training library | Hands-on: W67 |
| [DeepSpeed](https://github.com/deepspeedai/DeepSpeed) | Distributed training and inference optimization library (ZeRO) | Hands-on: W67 |
| [Transformer Engine](https://github.com/NVIDIA/TransformerEngine) | FP8/FP4 training and inference for Transformers on NVIDIA GPUs | Hands-on: W66 |
| [Accelerate](https://github.com/huggingface/accelerate) | Launch and scale PyTorch training on many setups | Hands-on: W69 |
| [PEFT](https://github.com/huggingface/peft) | Parameter-efficient fine-tuning (LoRA, QLoRA) | Hands-on: W69 |
| [TRL](https://github.com/huggingface/trl) | Post-training library, including the GRPO trainer | Hands-on: W71 |
| [veRL](https://github.com/volcengine/verl) | RL training library for LLMs (HybridFlow) | Reading: W71 |
| [OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Ray-based RL framework for LLMs | Reading: W71 |
| [WebDataset](https://github.com/webdataset/webdataset) | Sharded, streaming dataset format for PyTorch | Hands-on: W70 |

## Scheduling & orchestration

| Tool | What it is | Where |
|---|---|---|
| [Slurm](https://slurm.schedmd.com/quickstart.html) | HPC workload manager | Hands-on: W35 |
| [Slinky slurm-operator](https://github.com/SlinkyProject/slurm-operator) | Runs Slurm on Kubernetes | Awareness |
| [Kueue](https://kueue.sigs.k8s.io/) | Kubernetes job queueing and quotas | Hands-on: W42 |
| [Volcano](https://volcano.sh/) | Batch scheduling for Kubernetes | Reading: W42 |
| [KAI Scheduler](https://github.com/NVIDIA/KAI-Scheduler) | Kubernetes scheduler for AI workloads | Reading: W42 |
| [NVIDIA GPU Operator](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html) | GPU drivers, device plugin, MIG and time-slicing on Kubernetes | Hands-on: W40–W41 |
| [SkyPilot](https://github.com/skypilot-org/skypilot) | Run AI workloads across clouds, Kubernetes and Slurm | Reading: W75 |
| [Helm](https://helm.sh/docs/) | Kubernetes package manager | Hands-on: W43 |
| [Argo CD](https://github.com/argoproj/argo-cd) | GitOps continuous delivery for Kubernetes | Reading: W43 |

## Gateways & vector databases

| Tool | What it is | Where |
|---|---|---|
| [LiteLLM](https://github.com/BerriAI/litellm) | Open-source AI gateway: one API over many model providers, with cost tracking | Reading: W11 |
| [Envoy AI Gateway](https://github.com/envoyproxy/ai-gateway) | LLM gateway built on Envoy Gateway | Reading: W11 |
| [FAISS](https://github.com/facebookresearch/faiss) | Vector similarity search library | Ongoing track |
| [Milvus](https://github.com/milvus-io/milvus) | Cloud-native vector database | Ongoing track |
| [Qdrant](https://github.com/qdrant/qdrant) | Vector database and similarity search engine | Ongoing track |
| [pgvector](https://github.com/pgvector/pgvector) | Vector search inside Postgres | Ongoing track |

## Efficiency & cost levers

| Tool | What it is | Where |
|---|---|---|
| [RouteLLM](https://github.com/lm-sys/RouteLLM) | Framework for serving and evaluating LLM routers (small vs large model) | Reading: W63 |
| [SparseGPT](https://github.com/IST-DASLab/sparsegpt) | One-shot pruning for large language models | Reading: W63 |
| [vLLM structured outputs](https://docs.vllm.ai/en/latest/features/structured_outputs.html) | Constrained decoding (JSON, grammars) in the serving engine | Awareness |
| [Zeus](https://github.com/ml-energy/zeus) | Measure and optimize the energy use of deep learning | Hands-on: W08, W75 |
| [ML.ENERGY leaderboard](https://ml.energy/) | Energy use of generative AI inference, compared | Reading: W75 |

## GPU health, observability & cost

| Tool | What it is | Where |
|---|---|---|
| [DCGM](https://github.com/NVIDIA/DCGM) | NVIDIA datacenter GPU management, telemetry and [diagnostics](https://docs.nvidia.com/datacenter/dcgm/latest/user-guide/dcgm-diagnostics.html) | Hands-on: W73 |
| [dcgm-exporter](https://github.com/NVIDIA/dcgm-exporter) | Prometheus exporter for DCGM metrics | Reading: W8 |
| [XID errors](https://docs.nvidia.com/deploy/xid-errors/index.html) | NVIDIA's reference for GPU error codes | Hands-on: W73 |
| [Node Problem Detector](https://github.com/kubernetes/node-problem-detector) | Surfaces node problems to Kubernetes | Reading: W73 |
| [Prometheus](https://prometheus.io/) · [Grafana](https://grafana.com/docs/grafana/latest/) · [Thanos](https://thanos.io/) | Metrics, dashboards, long-term storage | Ongoing |
| [OpenTelemetry](https://opentelemetry.io/docs/) | Traces, metrics and logs standard | Hands-on: W43 |
| [OpenCost](https://www.opencost.io/) | Kubernetes cost monitoring and allocation | Reading: W45 |
| [MLflow](https://mlflow.org/docs/latest/) | Experiment tracking and model registry | Hands-on: W24 |

## Benchmarks & load testing

| Tool | What it is | Where |
|---|---|---|
| [GuideLLM](https://github.com/vllm-project/guidellm) | Load testing for LLM deployments | Hands-on: W4, W62 |
| [AIPerf](https://github.com/ai-dynamo/aiperf) | Benchmarking for generative AI serving | Hands-on: W62 |
| [inference-perf](https://github.com/kubernetes-sigs/inference-perf) | Kubernetes SIG tool for benchmarking GenAI inference deployments | Reading: W62 |
| [MLPerf Inference: Datacenter](https://mlcommons.org/benchmarks/inference-datacenter/) | Industry inference benchmark and its rules | Reading: W62 |
| [lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) | Model quality evaluation | Hands-on: W6 |
| [nccl-tests](https://github.com/NVIDIA/nccl-tests) | NCCL performance and correctness tests ([NCCL docs](https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/index.html)) | Hands-on: W28 |

## Cloud GPU capacity

| Tool | What it is | Where |
|---|---|---|
| [Amazon EC2 P5](https://aws.amazon.com/ec2/instance-types/p5/) | Example of a cloud H100/H200 instance family and its networking | Reading: W75 |
| [SkyPilot](https://github.com/skypilot-org/skypilot) | Multi-cloud job launching and spot handling | Reading: W75 |
