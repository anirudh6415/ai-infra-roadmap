---
title: "Phase 6 · Training & fleet operations"
---

# Phase 6 · Training & fleet operations

**Weeks 66–78 · 10 Jan – 9 Apr 2028**

!!! abstract "Outcome"
    You can size and run modern training and post-training (fine-tuning, RL) jobs, keep a GPU fleet healthy, and buy GPU capacity well: reservations vs on-demand vs spot, NVIDIA vs other accelerators. This completes the picture from a single kernel to a whole fleet.

**Project:** [P6 · Post-training & fleet health lab](../projects/p6-post-training-fleet-lab.md) · **Post:** *"What an RL post-training run really needs from a GPU fleet."*

**Hardware:** 1–2 GPUs by the hour for Weeks 66–72; laptop for the fleet and cost weeks.

---

### Week 66 · FP8 training

- **Learn:** FP8 formats (E4M3, E5M2), scaling factors, and what NVIDIA Transformer Engine automates. Which layers stay in higher precision and why.
- **Build:** train a small transformer with BF16 vs FP8 via Transformer Engine on an FP8-capable GPU; compare step time, memory and loss curves.
- **Ship:** results and a note on when FP8 training is worth the risk.
- **Mini-project:** `fp8-train-bench`: BF16 vs FP8 step time and loss.

**Done when**

- [ ] Same model trained in BF16 and FP8
- [ ] Step time, memory and loss compared
- [ ] Recommendation written
- [ ] Mini-project shipped: `fp8-train-bench`

### Week 67 · Large-scale training frameworks

- **Learn:** Megatron-Core, DeepSpeed and torchtitan: what each is best at, how they express parallelism, and what teams actually run.
- **Build:** run the same small model with two of the frameworks; compare config effort, memory and throughput.
- **Ship:** a framework decision matrix.
- **Mini-project:** `framework-matrix`: two frameworks, same model, measured.

**Done when**

- [ ] Model trained with 2 frameworks
- [ ] Decision matrix written
- [ ] Mini-project shipped: `framework-matrix`

### Week 68 · Memory techniques for big models

- **Learn:** activation recomputation, sequence and context parallelism, expert parallelism for MoE training, and CPU/NVMe offload.
- **Build:** extend `training_capacity.py` (Week 38) with recompute, sequence parallelism and MoE.
- **Ship:** a memory plan for a 70B dense model and an MoE model on 8 GPUs.
- **Mini-project:** `train-memory-planner`: memory and GPU-count planner for big models.

**Done when**

- [ ] Planner covers recompute, sequence parallelism and MoE
- [ ] Two example plans produced
- [ ] Mini-project shipped: `train-memory-planner`

### Week 69 · Fine-tuning infrastructure

- **Learn:** LoRA and QLoRA; full fine-tuning vs adapters; PEFT and Accelerate. GPU sizing for fine-tuning requests.
- **Build:** fine-tune a small model with QLoRA on one GPU; record memory, time and cost.
- **Ship:** a fine-tuning sizing table teams could use to request GPUs.
- **Mini-project:** `finetune-sizer`: GPU and hours estimate for a fine-tuning request.

**Done when**

- [ ] QLoRA fine-tune completed
- [ ] Memory, time and cost recorded
- [ ] Sizing table written
- [ ] Mini-project shipped: `finetune-sizer`

### Week 70 · Data loading at scale (light week)

- **Learn:** streaming datasets, sharded formats (WebDataset), Ray Data for preprocessing and batch inference; keeping GPUs fed.
- **Build:** compare a naive data loader with a sharded streaming one on the same training job.
- **Ship:** catch up.
- **Mini-project:** `dataloader-bench`: naive vs sharded streaming input pipeline.

**Done when**

- [ ] Both data pipelines benchmarked
- [ ] GPU idle time compared
- [ ] Mini-project shipped: `dataloader-bench`

### Week 71 · RL post-training infrastructure

- **Learn:** how GRPO/PPO-style post-training works as a system: rollout generation (inference), reward computation, policy update (training), and weight sync. TRL's GRPOTrainer; veRL (HybridFlow); OpenRLHF.
- **Build:** a small GRPO run with TRL on a 0.5B model, using vLLM for generation; profile time spent generating vs training.
- **Ship:** a timeline of one RL step with where the GPU time goes.
- **Mini-project:** `grpo-mini`: a small GRPO run with a generation vs training time breakdown.

**Done when**

- [ ] GRPO run completed on a small model
- [ ] Generation vs training time measured
- [ ] Note on colocated vs separate generation GPUs
- [ ] Mini-project shipped: `grpo-mini`

### Week 72 · Capacity for RL post-training

- **Learn:** why RL jobs are inference-heavy; balancing rollout GPUs against training GPUs; off-policy and asynchronous designs.
- **Build:** a model that splits a GPU budget between rollout and training to maximise RL steps per hour, using your Week 71 measurements.
- **Ship:** the optimal split for two scenarios.
- **Mini-project:** `rl-capacity-model`: rollout vs training GPU split optimiser.

**Done when**

- [ ] Split model built from measured numbers
- [ ] Two scenarios planned
- [ ] Mini-project shipped: `rl-capacity-model`

### Week 73 · GPU health and failures

- **Learn:** DCGM diagnostics levels, XID errors, ECC and row remapping, thermal and power throttling; Kubernetes node problem detection.
- **Build:** a health checker that runs DCGM diagnostics (or reads `nvidia-smi` and DCGM fields), classifies findings and decides drain / reset / RMA.
- **Ship:** a runbook: symptom → check → action.
- **Mini-project:** `gpu-health-checker`: health classification and actions.

**Done when**

- [ ] Health checker runs on at least one GPU machine
- [ ] Common XID errors mapped to actions
- [ ] Runbook written
- [ ] Mini-project shipped: `gpu-health-checker`

### Week 74 · Fleet reliability and spares

- **Learn:** failure rates at scale, MTBF, spare capacity, maintenance windows; fleet-level goodput (Week 34 at fleet scale).
- **Build:** a spares calculator: given fleet size, failure rate and repair time, how many hot spares keep a job's goodput above target.
- **Ship:** spares recommendation for three fleet sizes.
- **Mini-project:** `spares-calc`: hot-spare sizing for training fleets.

**Done when**

- [ ] Spares model built
- [ ] Three fleet sizes analysed
- [ ] Mini-project shipped: `spares-calc`

### Week 75 · Buying GPU capacity, and power

- **Learn:** on-demand vs reservations/capacity blocks vs spot; total cost of ownership vs on-prem; running across clouds and clusters with SkyPilot. Power as the binding constraint: tokens per joule, power capping, and energy measurement (ML.ENERGY leaderboard, Zeus).
- **Build:** a TCO comparison for one steady inference workload and one bursty training workload.
- **Ship:** a purchasing recommendation for each.
- **Mini-project:** `cloud-gpu-tco`: cost comparison across purchasing options.

**Done when**

- [ ] TCO model built for two workloads, including power cost
- [ ] Effect of a power cap on tokens/s and tokens per joule estimated or measured
- [ ] Recommendation written for each
- [ ] Mini-project shipped: `cloud-gpu-tco`

### Week 76 · TPUs and JAX

- **Learn:** how a TPU differs from a GPU: systolic matrix units, HBM per chip, the inter-chip interconnect (ICI) and pod topologies. The TPU chapters of *How to Scale Your Model*; Google's *Introduction to Cloud TPU*. JAX basics: `jit`, sharding across devices; PyTorch/XLA and vLLM's TPU plugin as the PyTorch-side options.
- **Build:** on a TPU runtime (a free notebook TPU if one is available to you, otherwise a small Cloud TPU VM by the hour), run a JAX matmul benchmark and a small model forward pass. Place both on a TPU roofline next to your GPU roofline.
- **Ship:** a note on when TPUs are the better buy and what moving a serving stack to them would take.
- **Mini-project:** `tpu-first-steps`: JAX on a TPU, with a TPU vs GPU roofline.

**Done when**

- [ ] JAX code running on a TPU
- [ ] TPU roofline plotted next to your GPU's
- [ ] TPU vs GPU note written
- [ ] Mini-project shipped: `tpu-first-steps`

### Week 77 · AMD GPUs and other accelerators

- **Learn:** AMD Instinct GPUs (CDNA architecture, large HBM capacity), ROCm and HIP vs CUDA, and running vLLM on ROCm. AWS Trainium/Inferentia as an example of cloud-provider chips. Skim the kernel libraries serving engines rely on (CUTLASS, FlashInfer, FlashAttention, ThunderKittens) and which hardware each supports.
- **Build:** if you can rent an AMD GPU, rerun one P1 benchmark with vLLM on ROCm; otherwise build the comparison from published specs and your rooflines.
- **Ship:** an accelerator matrix for LLM inference and training: memory, bandwidth, FLOP/s by precision, interconnect, software maturity and how you'd get capacity.
- **Mini-project:** `accelerator-matrix`: NVIDIA vs AMD vs TPU vs cloud chips for your workloads.

**Done when**

- [ ] Accelerator matrix covers at least 4 platforms
- [ ] Software-maturity notes per platform (serving engine and kernel support)
- [ ] One measured run on non-NVIDIA hardware, or a written reason why not
- [ ] Mini-project shipped: `accelerator-matrix`

### Week 78 · Ship Project 6 and look back

- **Ship:** publish the P6 post; update your profile site, resume and LinkedIn; write the 18-month retro.
- **Plan:** decide what comes next: deeper specialisation, open-source contribution, or full-time interview prep.
- **Mini-project:** `P6 release`: tag v1.0 of the lab and publish the post.

**Done when**

- [ ] P6 repo complete
- [ ] Post published and shared
- [ ] Profile site, resume and LinkedIn updated
- [ ] 18-month retro written
- [ ] Mini-project shipped: `P6 release`
