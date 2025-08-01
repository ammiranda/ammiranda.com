+++
date = "2025-08-01"
title = "From Meetup to Mailbox: A Kubernetes-Powered AI Workflow (Part 1)"
description = "Automating workloads with Kubernetes CronJobs — the foundation for smarter, scheduled workflows."
tags = ["k3d", "k3s", "kubernetes", "devops", "cronjob"]
type = "posts"
+++

# From Meetup to Mailbox: A Kubernetes-Powered AI Workflow (Part 1)

> *Automating web scraping and email delivery with Kubernetes CronJobs, containerized tools, and shared data pipelines.*

This blog series documents a workflow I built to periodically scrape events from Meetup.com, summarize them using OpenAI, and send an email digest — all running on Kubernetes.  
This first post focuses on **scheduling and running the workflow** using a Kubernetes CronJob.

---

## Why Use Kubernetes CronJobs?

A Kubernetes CronJob lets you run containerized tasks on a recurring schedule. Unlike traditional `cron` on a single server, Kubernetes CronJobs are:

- **Portable** – run anywhere your cluster runs
- **Observable** – inspect logs, status, and history with `kubectl`
- **Isolated** – jobs run in fresh pods with clean environments
- **Composable** – build pipelines from multiple containers

In this case, I wanted to:
1. **Scrape Meetup.com** with a headless scraper.
2. **Pass the results** to a second container that generates and sends an email using OpenAI.

Let's take a look at how the CronJob is configured.

---

## The Actual CronJob YAML

Here’s the exact manifest used to schedule and execute the pipeline. It runs **daily at 5:00 AM Central Time**.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: meetup-pipeline
spec:
  schedule: "0 5 * * *"  # Every day at 5:00 AM
  timeZone: "America/Chicago"
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          volumes:
            - name: shared-data
              emptyDir: {}  # Ephemeral volume shared between containers (lives as long as the pod)

          # Step 1: Scrape Meetup.com
          initContainers:
            - name: scraper
              image: amiranda/meetup-scraper
              imagePullPolicy: Always
              args:
                - "https://www.meetup.com/find/?location=us--tx--Austin&source=EVENTS&dateRange=today&eventType=inPerson&distance=fiftyMiles"
                - "-e"
              volumeMounts:
                - name: shared-data
                  mountPath: /data

          # Step 2: Process and email results
          containers:
            - name: emailer
              image: amiranda/meetup-emailer
              imagePullPolicy: Always
              volumeMounts:
                - name: shared-data
                  mountPath: /data
              envFrom:
                - configMapRef:
                    name: meetup-env-vars     # Injects non-sensitive configuration
                - secretRef:
                    name: meetup-secrets      # Injects sensitive credentials
```

## How It Works

### 🧱 `initContainer`: Scraper

The scraper runs first as an `initContainer`. It crawls Meetup.com, parses event data, and writes output to `/data`, a shared ephemeral volume (`emptyDir`). The scraper finishes and exits before the main container starts.

### 📬 Main `container`: Emailer

The emailer container runs after the scraper has completed. It reads the generated data from `/data`, uses OpenAI to parse the data and generate the email body, and then sends the email.

Environment variables (like the OpenAI API key, and email configs) are injected using a `ConfigMap` and a `Secret`.

## How To Deploy It

1. Create your `ConfigMap` and `Secret` for environmental variables. You can create YAML files and apply them, or use `kubectl` directly like this:

```bash
kubectl create configmap meetup-env-vars --from-literal=SMTP_HOST="some host"
kubectl create secret generic meetup-secrets --from-literal=OPENAI_API_KEY="sk-..."
```

2. Apply the job:

```bash
kubectl apply -f meetup-cronjob.yaml
```

3. View job execution status:

```bash
kubectl get cronjob meetup-pipeline # Add -n <namespace> if needed
kubectl get jobs 
```

4. View logs from the most recent execution:

```bash
kubectl logs job/<job-name> -c emailer
```

## Tips for Local Development

You can test this pipeline using a local Kubernetes cluster like [k3d](https://k3d.io/stable/) or [kind](https://kind.sigs.k8s.io/). I opted to deploy it on my [homelab](https://ammiranda.com/posts/setting-up-k3d-homelab/) leveraging k3d.

To trigger a job from the CronJob config you would run:

```bash
kubectl create job --from=cronjob/meetup-pipeline test-job
```

## Recap & What's Next

This post focused on **scheduling a two-step pipeline with Kubernetes CronJobs**:

* We scheduled a daily job at 5:00 AM Central.
* We used `initContainers` to run a scraper before the emailer.
* We shared data between containers using `emptyDir`.

In the next post, we'll break down the **web scraper container**, covering:

* Headless scraping with Selenium
* Generating JSON for downstream use
* Containerizing the scraper image for reuse

_Up next: Building a Containerized Scraper for Meetup.com Events._

---

## Resources

* [k3d](https://k3d.io/stable/)
* [kind](https://kind.sigs.k8s.io/)
* [Kubernetes CronJobs Documentation](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)