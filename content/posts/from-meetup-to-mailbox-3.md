+++
date = "2025-08-07"
title = "From Meetup to Mailbox: A Kubernetes-Powered AI Workflow (Part 3)"
description = "How OpenAI and Go turn scraped event data into professional, personalized tech event emails"
tags = ["openai", "gpt", "email", "golang", "automation", "smtp"]
type = "posts"
+++

# Turning Event Data into Action: How I Built an AI-Powered Email Digest with Go and OpenAI

In [Part 2](https://your-blog.com/posts/k8s-meetup-scraper) of this series, I shared how I built a respectful, containerized web scraper to collect dynamic event data from Meetup.com using Python and Selenium. But scraping data is only half the journey.

In this post, I’ll break down the second half of the pipeline: the **Meetup Emailer**, a Go-based service that transforms raw event JSON into a **professional, friendly HTML email digest** using OpenAI’s GPT API—then sends it to a configurable list of recipients over SMTP.

This service is designed for one thing: **helping engineers stay in the loop** on local tech and networking events with zero manual effort.

---

## The Goal: From Structured JSON to Readable Email

I wanted to automate the task of curating upcoming tech events from the JSON output of the scraper and present them in an email that feels handcrafted—not robotic. This meant:

- Parsing and filtering raw event data
- Composing natural language summaries
- Formatting an HTML email for readability
- Sending it reliably via SMTP
- Keeping the setup flexible for dev/prod environments

The result is a self-contained Go application with Docker support that can be plugged into any pipeline.

---

## Architecture Overview

The Emailer is built around a clear 4-stage flow:

1. **Configuration Loading**
2. **Data Ingestion (from JSON)**
3. **AI-Powered Email Generation**
4. **SMTP Delivery**

Each stage is isolated and testable, and environment variables drive all configuration.

---

## 1. Configuration with `.env`

The app uses `github.com/joho/godotenv` to load environment variables. This makes it easy to switch between local testing and Docker deployments.

Example `.env` file:

```
JSON_FILE_PATH=/app/data/events.json
OPENAI_API_KEY=sk-...
SMTP_HOST=smtp.mailprovider.com
SMTP_PORT=587
SMTP_USER=myemail@example.com
SMTP_PASSWORD=secret
SMTP_RECEIPENTS=alex@example.com,jane@example.com
```

These control the location of input data, email destination, and credentials for OpenAI and your SMTP server.

---

## 2. Ingesting Event Data

The scraper’s JSON output (typically saved as `events.json`) is the single input to this tool.

An example event looks like this:

```json
{
  "event_id": "309051093",
  "title": "Celebrating 1000 Members! - JULY MEETUP",
  "url": "https://www.meetup.com/austin-film-social/events/309051093/",
  "date": "2025-07-25T00:00:00-05:00",
  "date_display": "Thu, Jul 24 · 7:00 PM CDT",
  "group_name": "Austin Film Social",
  "rating": "4.7",
  "attendees": 0,
  "image_url": "https://secure.meetupstatic.com/photos/event/a/e/a/9/highres_529004713.jpeg"
}
```

The Go code reads this file and parses it using `encoding/json` and `github.com/tidwall/gjson`, which makes it easy to filter, sort, and slice the data before composing a prompt.

---

## 3. Email Generation with OpenAI

The core of the Emailer is the function: 

`GenerateEmailBody(ctx context.Context, data string) (string, error)`

This function:

* Constructs a prompt tailored to the style I want (professional, helpful, enthusiastic)
* Passes the prompt and event data to OpenAI’s GPT-4 API
* Receives back a full HTML-formatted email body

Example prompt snippet (simplified):

“You are an assistant writing a weekly tech events email for software engineers. Summarize the following events in a friendly, professional tone with links and times...”

The result is a clean, human-like newsletter

Since the formatting is done by the model, I can keep the Go code simple and focused on logic and plumbing—not content styling.

---

## 4. Sending Email via SMTP

Once the HTML body is generated, the program uses Go’s `net/smtp` to connect to the configured SMTP server and send the message.

Key features:

* Multi-recipient support via comma-separated list
* HTML email support using MIME multipart headers
* Error logging with retries disabled to avoid spammy behavior
* The SMTP connection details (host, port, credentials) are injected via environment variables, making it easy to switch email providers.

---

## Running the Emailer

### Docker Deployment

You can build and run the image using:

```bash
docker build --no-cache -t amiranda/meetup-emailer .
docker run --rm \
  -v "$(pwd)/data:/app/data" \
  --env-file .env \
  amiranda/meetup-emailer
```

This approach works well inside Kubernetes, where the scraper and emailer are separate containers managed by CronJobs or Argo Workflows.

### Local Dev with Go

To run locally:

* Install Go 1.24+
* Set up your .env file

Run:

```bash
go run ./cmd/main.go
```

This is perfect for rapid testing with mock data.

Why Go?

Go was a natural fit for this task:

* Fast startup and low memory usage
* Great for SMTP and HTTP APIs
* Simple concurrency model (though not needed here)
* Strong Docker support

It also pairs nicely with JSON pipelines, making it ideal for downstream services in my Kubernetes-based workflow.

---

Lessons Learned

* Let LLMs handle formatting. You don’t need to hand-code HTML if the model can generate usable markup.
* Environment-driven configs make switching between dev and prod trivial.
* Build loosely coupled tools. JSON contracts between scraper and emailer made development faster and testing easier.
* Go is excellent for glue tools like this, especially in pipelines.

---

Source code available here: [Meetup Emailer on GitHub](https://github.com/ammiranda/meetup_event_emailer)