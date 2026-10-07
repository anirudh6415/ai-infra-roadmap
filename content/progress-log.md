---
title: Progress log
---

# Progress log

Newest first. One short entry per week (or per session) using **did / learned / next**.

- **Fastest way to add one:** press **+ log progress** on the site (owner only, after unlocking with your token).
- **By hand:** copy the template below to just under the `LOG:START` marker in `content/progress-log.md`.

??? example "Entry template"
    ```markdown
    ## 2026-10-10 · Week 1

    **Did:** Got vLLM running on a Colab T4 and measured tokens/s for a 1.5B model.  
    **Learned:** Decode is memory-bandwidth bound, so larger batches raise throughput almost for free until the KV cache runs out.  
    **Next:** Sweep concurrency 1→64 and plot throughput vs latency.  
    **Hours:** 2
    ```

!!! tip "Monthly retro (last Sunday of the month, 15 minutes)"
    What shipped? What slipped and why? Is the next month's plan still right? Write it as a normal entry titled `Retro · <Month>`.

---

<!-- LOG:START -->

## 2026-10-07 · Week 0

**Did:** Set up the roadmap repo, skill list and 12-month plan.  
**Learned:** A plan only works if every week ends with something visible.  
**Next:** Week 1: get vLLM running on a free GPU and measure tokens per second.

<!-- LOG:END -->
