---
title: "Phase 3 · Scale out"
---

# Phase 3 · Scale out

**Weeks 27–39 · 12 Apr – 11 Jul 2027**

!!! abstract "Outcome"
    You can explain and run DDP, FSDP and tensor parallelism, predict their memory and communication costs, read a GPU topology and pick a layout from it, and design checkpointing and fault tolerance using goodput numbers, on both Slurm and Ray.

**Project:** [P3 · Fault-tolerant FSDP](../projects/p3-fault-tolerant-fsdp.md) · **Post:** *"What a GPU failure really costs: checkpointing, recovery and goodput on a small cluster."*

**Hardware:** Kaggle's free "GPU T4 ×2" is enough for DDP, FSDP and TP=2 experiments. Rent a 4-GPU node with NVLink for one final run if you want topology effects. Budget for this one.

**Main references:** Hugging Face's *Ultra-Scale Playbook* and Stas Bekman's *Machine Learning Engineering Open Book*.

---

### Week 27 · Why distribute: training memory math and DDP

- **Learn:** training memory per parameter (weights + gradients + Adam states ≈ 16 bytes in mixed precision, before activations). Data parallelism and gradient all-reduce. Ultra-Scale Playbook: first sections.
- **Build:** train nanoGPT (or a small torchtitan config) with DDP on Kaggle 2×T4 using `torchrun`.
- **Ship:** single-GPU vs 2-GPU throughput and memory, with your prediction vs the measurement.
- **Mini-project:** `ddp-2gpu`: a DDP run on two GPUs with predicted vs measured memory.

**Done when**

- [ ] Memory predicted before the run and compared after
- [ ] DDP run on 2 GPUs with throughput measured

### Week 28 · Collective communication and NCCL

- **Learn:** all-reduce, all-gather, reduce-scatter; ring vs tree algorithms; algorithm vs bus bandwidth. NCCL basics.
- **Build:** benchmark `torch.distributed.all_reduce` across message sizes (or build and run `nccl-tests`). Compute bus bandwidth.
- **Ship:** bandwidth vs message size chart, compared with the link's theoretical bandwidth (PCIe on Kaggle).
- **Mini-project:** `allreduce-bench`: a bus-bandwidth vs message-size chart.

**Done when**

- [ ] All-reduce benchmark across message sizes
- [ ] Bus bandwidth computed and compared with theory

### Week 29 · FSDP and ZeRO

- **Learn:** ZeRO stages 1–3 (ZeRO paper); FSDP / FSDP2 in PyTorch; sharding vs communication trade-offs.
- **Build:** run the same model with FSDP; compare memory and throughput with DDP. Find a model size that fits with FSDP but not DDP.
- **Ship:** DDP vs FSDP comparison table.
- **Mini-project:** `ddp-vs-fsdp`: a memory/throughput comparison and a model that only fits with FSDP.

**Done when**

- [ ] FSDP run working
- [ ] A model that only fits with FSDP demonstrated
- [ ] Comparison table written

### Week 30 · Tensor and pipeline parallelism

- **Learn:** Megatron-style tensor parallelism (split matmuls, all-reduce per layer); pipeline parallelism and bubbles (GPipe); 3D parallelism.
- **Build:** run vLLM inference with `--tensor-parallel-size 2` on Kaggle 2×T4. Compare latency and throughput with TP=1 for a model that fits on one GPU.
- **Ship:** note on why TP helps latency but costs communication, and why PCIe vs NVLink matters here.
- **Mini-project:** `tp-inference`: a TP=1 vs TP=2 vLLM benchmark.

**Done when**

- [ ] TP=2 inference benchmarked vs TP=1
- [ ] Communication overhead explained

### Week 31 · Expert parallelism and MoE inference (light week)

- **Learn:** expert parallelism, all-to-all communication, load balancing across experts; why MoE serving is a capacity problem of its own.
- **Build:** catch up.
- **Ship:** a note on sizing an MoE deployment vs a dense model of the same quality.
- **Mini-project:** `moe-sizing`: a sizing note for an MoE vs a dense deployment.

**Done when**

- [ ] MoE sizing note written

### Week 32 · GPU topology and networking

- **Learn:** PCIe, NVLink, NVSwitch, InfiniBand and RoCE, GPUDirect RDMA, rail-optimized network designs. Stas Bekman's book: network chapter.
- **Build:** run `nvidia-smi topo -m` on every machine you can reach (Kaggle, rented, or any cluster you're allowed to use). Map each link type to its bandwidth.
- **Ship:** a "topology → parallelism layout" note: what goes inside a node (TP) vs across nodes (DP/PP), and why.
- **Mini-project:** `topology-reader`: a script that reads `nvidia-smi topo -m` and suggests a parallelism layout.

**Done when**

- [ ] Topology output read and explained for at least 2 machines
- [ ] Layout decision note written

### Week 33 · Checkpointing

- **Learn:** PyTorch Distributed Checkpoint (DCP), sharded and async checkpoints; choosing a checkpoint interval (Young/Daly formula: interval ≈ √(2 × checkpoint cost × MTBF)).
- **Build:** add DCP checkpointing to your FSDP run. Measure save and load time.
- **Ship:** checkpoint interval calculation for a hypothetical 1,000-GPU job.
- **Mini-project:** `dcp-checkpoint`: DCP save/resume with timings and an interval calculation.

**Done when**

- [ ] DCP save and resume working
- [ ] Save/load time measured
- [ ] Interval calculated with the Young/Daly formula

### Week 34 · Fault tolerance and goodput

- **Learn:** `torchrun` elastic training, failure detection, restarts; training goodput (useful work ÷ total time).
- **Build:** kill a worker mid-run, resume from the latest checkpoint, measure lost time. Repeat with two checkpoint intervals.
- **Ship:** goodput vs checkpoint interval chart.
- **Mini-project:** `failure-injector`: a kill-a-rank script and a goodput chart.

**Done when**

- [ ] Failure injected and recovered
- [ ] Lost time measured for 2 checkpoint intervals
- [ ] Goodput chart

### Week 35 · Slurm

- **Learn:** `sbatch`, `srun`, partitions, `--gres=gpu`, job arrays, fair share. Slurm quickstart.
- **Build:** run a small Slurm cluster in Docker (e.g. `slurm-docker-cluster`) and submit a CPU job array and a `torchrun` job.
- **Ship:** a Slurm cheat sheet in Notes.
- **Mini-project:** `slurm-lab`: a local Slurm cluster running batch, array and torchrun jobs.

**Done when**

- [ ] Slurm cluster running locally
- [ ] Batch job and job array submitted
- [ ] Cheat sheet written

### Week 36 · Ray

- **Learn:** Ray Core (tasks, actors), Ray Train, Ray Serve, KubeRay. Many GPU platforms run Ray; learn it from the inside.
- **Build:** run your training script with Ray Train on Kaggle's 2 GPUs.
- **Ship:** Slurm vs Ray vs Kubernetes comparison: who uses which, and why.
- **Mini-project:** `ray-train-lab`: the same training job on Ray Train, with a comparison table.

**Done when**

- [ ] Ray Train run working
- [ ] Comparison note written

### Week 37 · Distributed storage and data loading

- **Learn:** object storage vs parallel file systems (Lustre, WEKA, etc.) for datasets and checkpoints; data loader bottlenecks. Stas Bekman's book: storage chapter.
- **Build:** measure checkpoint save time vs size; profile your data loader with different `num_workers`.
- **Ship:** a short note on storage requirements for a training cluster.
- **Mini-project:** `ckpt-io-bench`: a checkpoint I/O and data-loader benchmark.

**Done when**

- [ ] Checkpoint I/O measured
- [ ] Data loader bottleneck test done

### Week 38 · Training capacity math

- **Learn:** training FLOPs ≈ 6 × parameters × tokens; turning that into GPU-hours using MFU.
- **Build:** a `training_capacity.py` that estimates GPU-hours, GPU count for a deadline, and checkpoint storage. You'll reuse it in P4.
- **Ship:** sanity-check it against a published training run.
- **Mini-project:** `training_capacity.py`: a GPU-hours and GPU-count estimator.

**Done when**

- [ ] Training capacity calculator built
- [ ] Checked against at least one published number

### Week 39 · Ship Project 3

- **Build:** finish the P3 repo README with charts and reproduction steps.
- **Ship:** publish the Phase 3 post and share it.
- **Mini-project:** `P3 release`: tag v1.0 of fault-tolerant-fsdp and publish the post.

**Done when**

- [ ] P3 repo complete
- [ ] Post published and shared
- [ ] Skill statuses updated
- [ ] Phase 3 retro written
