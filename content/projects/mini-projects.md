---
title: Extra mini-projects
---

# Extra mini-projects

Every roadmap week already has its own [weekly mini-project](../weekly/). These are small, optional builds for a spare weekend or a buffer week. Each should take one or two sessions and end with a short note or post.

| Mini-project | Skills | Hardware | Status |
|---|---|---|---|
| **Vector index capacity math**: build HNSW and IVF-PQ indexes in FAISS on 1M vectors; plot memory, recall and latency; write a sizing formula | Vector DB infra | CPU (laptop) | ⬜ |
| **GPU metrics exporter**: tiny Python exporter (pynvml → Prometheus) plus a Grafana dashboard with the "real utilization" metrics | Observability | Any GPU | ⬜ |
| **KV cache calculator web page**: turn `kv_calc.py` into a one-page tool anyone can use | Inference, writing | None | ⬜ |
| **Cold-start shootout**: compare model load time with safetensors on local disk vs object storage vs pre-baked image | Autoscaling, storage | Rented GPU | ⬜ |
| **Little's law dashboard**: live concurrency, arrival rate and latency from a load test, with Little's law checked in real time | Queueing | Any GPU | ⬜ |
| **Kueue fair-share game**: simulate three teams competing for quota and show borrowing/preemption outcomes | Multi-tenancy | Laptop (`kind`) | ⬜ |
| **Embedding throughput bench**: batch size vs throughput for an embedding model; cost per 1M embeddings | Inference, FinOps | Colab T4 | ⬜ |
| **Spot/preemptible strategy**: simulate checkpoint interval vs spot interruption rate for a training job | Fault tolerance, FinOps | None (SimPy) | ⬜ |

**Rule:** a mini-project never replaces the current week's plan. Only do one in a buffer week or when you're ahead.
