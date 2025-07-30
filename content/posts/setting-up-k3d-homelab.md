+++
date = "2025-07-29"
title = "From Dust to Clusters: Building a $0/Month Kubernetes Lab on Apple Silicon"
description = "How I turned an idle MacBook Air into a local Kubernetes playground using k3d and k3s."
tags = ["homelab", "k3d", "k3s", "kubernetes", "devops", "m1", "arm"]
type = "posts"
+++

## From Cloud Bills to Homelab: Why I Repurposed My M1 MacBook Air

I wanted to experiment with [Kubernetes](https://kubernetes.io/) but quickly ran into a common roadblock: cloud costs. For something as hands-on and experimental as Kubernetes, paying by the hour for clusters I wasn't using 24/7 didn’t make sense.

That's when I discovered the homelab community—and realized my unused M1 MacBook Air could become a zero-cost Kubernetes sandbox.

Rather than wipe the machine or dual boot, I used [k3d](https://k3d.io/stable/) to spin up a lightweight [k3s](https://k3s.io/) cluster inside Docker. This let me keep macOS as-is while deploying real Kubernetes workloads—ideal for development, experimentation, and learning.

---

## Setting Up the Cluster on macOS

Setting up `k3d` on macOS (especially Apple Silicon) is surprisingly painless. Here's what you’ll need:

- [Docker Desktop](https://docs.docker.com/desktop/) for running containerized workloads  
- [Homebrew](https://brew.sh/) for easy package installation  
- An M1 or M2 Mac with at least 8 GB of RAM (more is better)

Since I already had Docker and Homebrew installed, the install was a one-liner:

```bash
brew install k3d
```

Once installed, I verified the installation:

```bash
k3d version
```

Then, I created my first cluster:

```bash
k3d cluster create homelab
```

The defaults spin up:
- 1 control-plane node (running k3s)
- a built-in load balancer
- all running inside Docker containers

Now I had a fully functioning Kubernetes cluster—all running locally on my MacBook.

---

## Remote Access & Workflow

Because my MacBook Air stays on my home network, I can SSH into it from my main development machine and use `kubectl` remotely. This separation keeps my local dev environment clean while still giving me a real cluster to deploy to.

This setup has already saved me hours of YAML iteration and CI testing. And unlike cloud clusters, it’s *always on*—no cold starts or surprise charges.

---

## What’s Next

In a future post, I’ll go into how I deployed real workloads to this setup, including:

- a web scraper and email workflow
- a locally running [n8n](https://n8n.io/) instance
- and maybe even some distributed AI agents (👀)

If you're interested in running Kubernetes at home—especially on Apple Silicon—k3d is a lightweight, no-cost way to get started.

---

## ✨ TL;DR

- Don’t let your old M1 MacBook collect dust.
- Install Docker + Homebrew.
- `brew install k3d` and you're running Kubernetes locally.
- Save money, learn faster.
