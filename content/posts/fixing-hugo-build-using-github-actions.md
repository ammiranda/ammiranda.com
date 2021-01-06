+++ 
date = "2021-01-06"
title = "Fixing Hugo Build Using Github Actions"
description = "The post explains how a hugo build process was fixed using Github actions"
tags = ["hugo", "themes", "ci", "github actions"]
type = "posts"
+++

## Background

I created this site using [Hugo](https://gohugo.io/) with the [Hugo-Coder](https://github.com/luizdepra/hugo-coder/) theme. I wanted to set up the site to build and deploy using a continuous integration pipeline provided with [Github Actions](https://docs.github.com/en/free-pro-team@latest/actions). However I ran into a thorny issue which I will explain below along with the solution I found.

## The Problem

I created a build workflow file in the repo to utilize Github Actions.

```yaml
name: build

on: push

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Build Hugo
        uses: lowply/build-hugo@v0.79.0
```

The build step would "succeed" but would emit several warnings that can be seen in the screenshot below:

{{< figure src="/images/github-action-screenshot.png" alt="github action build output showing hugo build warnings" >}}

The warnings show that the hugo build process does not have the page primitives defined by the theme I am using. Although the build ostensibly succeeds these warnings show that the html pages were not generated. Because the html pages do not exist after the build the subsequent s3 upload would lack the needed html pages thus killing the site. As a temporary workaround I removed the `public/` directory from the `gitignore` file so I could still deploy to s3 by commiting it to source so the s3 upload can use the existing directory rather than building it on the github action's box. This was less than ideal because I would always need to remember to run `hugo -v` locally and commit the new `public/` prior to pushing/pull requesting to the `main` branch (deploys are only triggered for the `main` branch). I was not satisfied with this reality so I arrived at the existing solution I will explain further.

## The Solution

First I had to determine why the hugo warnings happened. I installed the theme using [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) within my project's `themes` directory.
