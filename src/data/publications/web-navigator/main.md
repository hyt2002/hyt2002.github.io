---
title: "WebNavigator: Global Web Navigation via Interaction Graph Retrieval"
authors:
  - "Xuanwang Zhang"
  - "Yuteng Han"
  - "Jinnan Qi"
  - "Mulong Xie"
  - "Zhen Wu"
  - "Xinyu Dai"
venue: "arXiv Preprint"
pubDate: 2026-03-20
tldr: "WebNavigator resolves Topological Blindness in web navigation via offline Interaction Graph construction and online retrieval-augmented navigation, achieving 72.9% on WebArena multi-site tasks and doubling enterprise-level agent performance."
abstract: "Despite significant advances in autonomous web navigation, current methods remain far from human-level performance in complex web environments. We argue that this limitation stems from Topological Blindness, where agents are forced to explore via trial-and-error without access to the global topological structure of the environment. To overcome this limitation, we introduce WebNavigator, which reframes web navigation from probabilistic exploration into deterministic retrieval and pathfinding. WebNavigator constructs Interaction Graphs via zero-token cost heuristic exploration offline and implements a Retrieve-Reason-Teleport workflow for global navigation online. WebNavigator achieves state-of-the-art performance on WebArena and Online-Mind2Web. On WebArena multi-site tasks, WebNavigator achieves a 72.9% success rate, more than doubling the performance of enterprise-level agents. This work reveals that Topological Blindness, rather than model reasoning capabilities alone, is an underestimated bottleneck in autonomous web navigation."

keywords:
  - "Autonomous agent"
  - "Web navigation"
  - "Multimodal retrieval"
  - "Multi-site task"
links:
  pdf: "https://arxiv.org/pdf/2603.20366"
  arxiv: "https://arxiv.org/abs/2603.20366"
  code: "https://github.com/fate-ubw/webNavigator"
  project: "https://fate-ubw.github.io/webNavigator_homepage/"
highlight: false
highlightLabel: "Oral"
featured: true
---

## The Problem: Topological Blindness

Current web agents navigate like tourists without a map — they can only see the current page and must guess where to click next. We call this **Topological Blindness**: agents lack access to the global structure of websites, forcing inefficient trial-and-error exploration.

![Overview of WebNavigator](./fig1-v19.svg)
*Figure 1: WebNavigator's two-phase paradigm. Offline: build an Interaction Graph via zero-token heuristic exploration. Online: Retrieve-Reason-Teleport workflow for global navigation.*

## Our Solution: WebNavigator

WebNavigator transforms web navigation from **probabilistic exploration** into **deterministic retrieval and pathfinding**.

### Phase 1: Offline Interaction Graph Construction

Before any task, we build a complete map of the website:

- **Heuristic auto-exploration** discovers all reachable pages via BFS — no LLM needed, zero token cost
- Each page is captured with screenshots, DOM trees, and accessibility trees
- All pages are embedded and indexed into a vector database

### Phase 2: Online Retrieval-Augmented Navigation

During task execution, the agent uses a **Retrieve-Reason-Teleport** workflow:

1. **Retrieve**: Given a navigation query, find top-k relevant pages from the pre-built graph
2. **Reason**: A multimodal LLM selects the best target from candidates
3. **Teleport**: Compute shortest path and execute — zero token cost

![Trajectory comparison](./fig2-v10.svg)
*Figure 2: On a multi-site task requiring cross-domain knowledge (CMS → Map), WebNavigator achieves human-level planning in 2 actions, while ReAct fails due to Topological Blindness.*

## Key Results

| Benchmark | WebNavigator | Previous SOTA | Improvement |
|-----------|-------------|---------------|-------------|
| WebArena (overall) | 63.3% | 45.7% | +38% |
| WebArena (multi-site) | **72.9%** | 35.4% | **+106%** |
| Online-Mind2Web | 52.7% | 41.0% | +29% |

## Why It Works

1. **Complete environmental knowledge** — The Interaction Graph captures the full observation space
2. **Compact action space** — Only 6 actions needed (vs. 15+ in prior work)
3. **Task simplification** — Transforms trajectory generation into candidate selection

