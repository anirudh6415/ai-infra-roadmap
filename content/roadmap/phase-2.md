---
title: "Phase 2 · Down to the GPU"
---

# Phase 2 · Down to the GPU

**Weeks 14–26 · 11 Jan – 11 Apr 2027**

!!! abstract "Outcome"
    You can profile a model, say where the time goes and why (compute, memory bandwidth, launch overhead), place it on a roofline, and write a kernel that makes part of it faster, first in CUDA, then in Triton.

**Project:** [P2 · Kernel lab](../projects/p2-kernel-lab.md) · **Post:** *"Where the time goes: profiling an LLM layer and speeding up one kernel."*

**Hardware:** Colab T4 works for CUDA and Triton basics (`nvcc` is available). Nsight Compute may be blocked on shared notebooks; rent a GPU for those sessions.

**Use CS149 as a reference, not a course.** Each week names the lecture topic that explains what you're doing; watch only that one.

---

### Week 14 · GPU architecture

- **Learn:** SMs, warps (32 threads), registers, shared memory, L2, HBM, and the bandwidth at each level. Horace He's *Making Deep Learning Go Brrrr From First Principles*. CS149: GPU architecture lecture.
- **Build:** Sasha Rush's GPU Puzzles 1–6 (in Colab, no CUDA install needed).
- **Ship:** a hand-drawn or diagrammed memory hierarchy with sizes and bandwidths for the GPU you use most (e.g. A100 or H100).
- **Mini-project:** `gpu-memory-map`: a diagram of your GPU's memory hierarchy with real numbers.

**Done when**

- [ ] GPU Puzzles 1–6 solved
- [ ] Memory hierarchy diagram with real numbers
- [ ] Mini-project shipped: `gpu-memory-map`

### Week 15 · CUDA basics

- **Learn:** kernels, threads, blocks, grids; host vs device memory; `cudaMemcpy`; timing with CUDA events. *Programming Massively Parallel Processors* (PMPP) chapters 2–3.
- **Build:** vector add and a simple element-wise kernel in CUDA C++ on Colab. Time the kernel vs the memory copies. Finish the remaining GPU Puzzles.
- **Ship:** a `kernel-lab` repo with your first kernels and timings.
- **Mini-project:** `cuda-basics`: vector-add and element-wise kernels with timings.

**Done when**

- [ ] Vector add in CUDA, timed
- [ ] Kernel time vs copy time explained
- [ ] All GPU Puzzles solved
- [ ] Mini-project shipped: `cuda-basics`

### Week 16 · Memory coalescing, shared memory, tiling

- **Learn:** coalesced access, shared memory, tiling, bank conflicts. PMPP chapters 4–6. Simon Boehm's *How to Optimize a CUDA Matmul Kernel*.
- **Build:** naive matmul vs tiled shared-memory matmul in CUDA. Compare both with cuBLAS (`torch.matmul`).
- **Ship:** a speedup table: naive → tiled → cuBLAS, in GFLOP/s.
- **Mini-project:** `matmul-ladder`: naive → tiled matmul vs cuBLAS, with a GFLOP/s table.

**Done when**

- [ ] Naive and tiled matmul both correct
- [ ] GFLOP/s table vs cuBLAS
- [ ] Mini-project shipped: `matmul-ladder`

### Week 17 · The roofline model

- **Learn:** arithmetic intensity (FLOPs ÷ bytes), the ridge point, compute-bound vs memory-bound. NVIDIA's *GPU Performance Background* guide; the original roofline paper.
- **Build:** draw your GPU's roofline (peak FLOP/s and bandwidth from the spec sheet). Plot your kernels, an element-wise op, a big matmul and an LLM decode step on it.
- **Ship:** the roofline chart with each point explained.
- **Mini-project:** `roofline.py`: a roofline plot of your GPU with four or more operations on it.

**Done when**

- [ ] Roofline chart for your GPU
- [ ] At least 4 operations plotted, including LLM decode
- [ ] Mini-project shipped: `roofline.py`

### Week 18 · GPU hardware generations (light week)

- **Learn:** Ampere → Hopper → Blackwell: tensor cores, FP8/FP4, Transformer Engine, HBM capacity and bandwidth, NVLink generations, MIG, rack-scale systems (NVL72), power and cooling. Vendor architecture whitepapers; SemiAnalysis for context.
- **Build:** nothing new: catch up.
- **Ship:** a one-page tech-refresh comparison: for LLM inference, what changes per generation, and what it means for GPUs-per-workload. (Keep employer-specific numbers out of the public repo.)
- **Mini-project:** `tech-refresh-brief`: a one-page Ampere → Hopper → Blackwell comparison.

**Done when**

- [ ] Tech-refresh comparison page written (in [Notes](../notes/index.md))
- [ ] Mini-project shipped: `tech-refresh-brief`

### Week 19 · Profiling with PyTorch profiler and Nsight Systems

- **Learn:** `torch.profiler`, trace viewing (Perfetto / Chrome trace), Nsight Systems timelines: kernel launches, gaps, CPU overhead, memcpy.
- **Build:** profile one decoder layer (or a small model's `generate`) during prefill and during decode. List the top kernels by time.
- **Ship:** annotated timeline screenshots: "here's where the time goes."
- **Mini-project:** `where-time-goes`: an annotated prefill/decode trace with the top five kernels.

**Done when**

- [ ] Profile captured for prefill and decode
- [ ] Top 5 kernels listed with % of time and whether each is compute- or memory-bound
- [ ] Mini-project shipped: `where-time-goes`

### Week 20 · Nsight Compute

- **Learn:** occupancy, achieved memory throughput, warp stall reasons, the speed-of-light section.
- **Build:** analyze your Week 16 tiled matmul with `ncu`. Change one thing (tile size, block size) based on what it tells you and measure again.
- **Ship:** before/after numbers with the `ncu` evidence.
- **Mini-project:** `ncu-tuning`: one Nsight Compute–guided optimization, before and after.

**Done when**

- [ ] `ncu` report captured and explained
- [ ] One evidence-based optimization measured
- [ ] Mini-project shipped: `ncu-tuning`

### Week 21 · Triton basics

- **Learn:** Triton's programming model (blocks, not threads), `tl.load`/`tl.store`, masks. Official tutorials 1–2 (vector add, fused softmax). Sasha Rush's Triton Puzzles.
- **Build:** run both tutorials; solve the first half of Triton Puzzles.
- **Ship:** your own fused softmax in Triton benchmarked against PyTorch.
- **Mini-project:** `triton-softmax`: a fused softmax in Triton benchmarked against PyTorch.

**Done when**

- [ ] Tutorials 1–2 running
- [ ] Half of Triton Puzzles solved
- [ ] Fused softmax benchmarked
- [ ] Mini-project shipped: `triton-softmax`

### Week 22 · Triton matmul and autotuning

- **Learn:** official Triton matmul tutorial; block sizes, `num_warps`, `num_stages`, `@triton.autotune`.
- **Build:** run the matmul tutorial with autotuning; compare with your CUDA matmul and cuBLAS.
- **Ship:** a three-way comparison: your CUDA vs Triton vs cuBLAS.
- **Mini-project:** `triton-matmul`: an autotuned Triton matmul vs your CUDA kernel vs cuBLAS.

**Done when**

- [ ] Triton matmul autotuned
- [ ] Three-way comparison chart
- [ ] Mini-project shipped: `triton-matmul`

### Week 23 · Your fused kernel

- **Learn:** kernel fusion: why fusing memory-bound ops removes round-trips to HBM.
- **Build:** write a fused RMSNorm (or RMSNorm + residual add) in Triton. Check correctness vs PyTorch; benchmark vs PyTorch eager and `torch.compile`.
- **Ship:** the kernel, tests and benchmark in `kernel-lab`.
- **Mini-project:** `fused-rmsnorm`: a Triton RMSNorm (+ residual) with tests and a benchmark.

**Done when**

- [ ] Fused kernel matches PyTorch output (allclose test)
- [ ] Benchmarked vs eager and torch.compile across input sizes
- [ ] Placed on your roofline
- [ ] Mini-project shipped: `fused-rmsnorm`

### Week 24 · torch.compile, CUDA Graphs and MFU

- **Learn:** what `torch.compile` does (graph capture, fusion, Triton codegen); CUDA Graphs and launch overhead; MFU = achieved FLOP/s ÷ peak FLOP/s (PaLM paper appendix).
- **Build:** compile a small model; measure the speedup; compute MFU for a training step and for inference decode.
- **Ship:** a note on why decode MFU is low and what that means for capacity.
- **Foundations:** track your benchmark and torch.compile runs in MLflow (parameters, metrics, charts as artifacts) instead of loose CSVs. Compare runs in the MLflow UI.
- **Mini-project:** `mfu-calc`: a torch.compile speedup and MFU worked out by hand.

**Done when**

- [ ] torch.compile speedup measured
- [ ] MFU computed by hand for training and decode
- [ ] Benchmark runs tracked and compared in MLflow
- [ ] Mini-project shipped: `mfu-calc`

### Week 25 · Serving techniques deep dive

- **Learn:** FlashAttention (why it's fast), prefix caching (and SGLang's RadixAttention), speculative decoding, prefill/decode disaggregation (DistServe, llm-d, NVIDIA Dynamo; hands-on in [Weeks 53–54](phase-5.md)). Skim the SGLang and TensorRT-LLM docs.
- **Build:** in vLLM, benchmark with and without prefix caching on a shared-prefix workload, and with and without speculative decoding.
- **Ship:** results plus a one-page "when to use which serving engine and technique."
- **Mini-project:** `serving-tricks`: prefix-caching and speculative-decoding benchmarks.

**Done when**

- [ ] Prefix caching benchmarked on a shared-prefix workload
- [ ] Speculative decoding benchmarked
- [ ] Serving-engine comparison note
- [ ] Mini-project shipped: `serving-tricks`

### Week 26 · Ship Project 2 + Linux performance basics

- **Learn:** Brendan Gregg's USE method; NUMA, CPU pinning, `perf`, `htop`, `iostat`; spotting a CPU-bound data loader or tokenizer.
- **Build:** finish the `kernel-lab` README.
- **Ship:** publish the Phase 2 post; share it.
- **Mini-project:** `P2 release`: tag v1.0 of kernel-lab and publish the post.

**Done when**

- [ ] P2 repo README complete
- [ ] Post published and shared
- [ ] Skill statuses updated
- [ ] Phase 2 retro written
- [ ] Coding practice started (see [ongoing tracks](ongoing.md))
- [ ] Mini-project shipped: `P2 release`
