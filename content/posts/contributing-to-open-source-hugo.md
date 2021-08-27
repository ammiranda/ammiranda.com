+++ 
date = "2021-08-27"
title = "Contributing to Open Source (Hugo Theme)"
description = "Documenting the process for adding CSP policy functionality to an open source hugo theme"
tags = ["open source", "software", "git", "github", "hugo"]
type = "posts"
+++

## Background

When creating this site (ammiranda.com) I needed to pick an existing theme (or create my own). I chose the [Hugo](https://gohugo.io/) static site generator as the technology backing the site so I looked at available [Hugo Themes](https://themes.gohugo.io/). After a quick review, I picked the [Hugo Coder](https://github.com/luizdepra/hugo-coder/) theme. I ran a security scan via [Mozilla Observatory](https://observatory.mozilla.org/) once I deployed my website. The results revealed a shocking hole because the generated HTML lacked a [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP). This post will detail my process adding CSP functionality to the theme as well as [upstreaming](https://reflectoring.io/upstream-downstream/) the change to the theme project's repository by opening a pull request on [Github](https://github.com).

## Adding a CSP to the Hugo Coder Theme

In order to edit the theme's source code I needed to [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the project's [repository](https://github.com/luizdepra/hugo-coder/) which added a local [copy](https://github.com/ammiranda/hugo-coder) to my repositories. I referenced my repository in the `.gitmodules` file in order to validate my changes though inspecting my website's generated markup.

```
[submodule "themes/hugo-coder"]
	path = themes/hugo-coder
	url = https://github.com/ammiranda/hugo-coder.git
```

Thankfully I found a [blog post](https://blog.jeremylikness.com/blog/create-content-security-policy-csp-in-hugo/) instructing on how to add a CSP to a Hugo project. Please read the post to get a detailed explanation of the changes. Otherwise, the TL;DR was I added a meta tag template that defines the CSP and renders it into the head tag of the base template (`bashof.html`). The values added to the CSP are defined in the `config.toml`'s `params.csp` section.

## Contributing CSP Changes to the Original Repository

I prepared the changes to be given back to the original project's repository after confirming my fork generated the configured CSP for my site. On Github upstreaming changes to the original repo from a fork is very straightforward and easy. I opened a pull request (PR) in the original project specifying the target branch as my fork's master branch `ammiranda:master` and the destination branch as the master branch of the host repository (`luizdepra:master`). The maintainer defined a [PR template](https://github.com/luizdepra/hugo-coder/blob/master/.github/pull_request_template.md) which provided guidelines on how they will accept contributions. I answered all relevant questions, opened the [PR](https://github.com/luizdepra/hugo-coder/pull/504) and waited patiently for the maintainer to give feedback.

The maintainer responded to my PR with a small [request](https://github.com/luizdepra/hugo-coder/pull/504#issuecomment-764776718) to move the location of the `csp.html` template up one level in its current directory. I updated PR with the change and notified the reviewer. They acknowledged my update and merged the PR.

I changed the `.gitmodules` file in the [ammiranda.com repo](https://github.com/ammiranda/ammiranda.com) to reference the original theme's repository so my site can benefit from the CSP feature **and** any other future improvements without needing to manually update my fork.

```
[submodule "themes/hugo-coder"]
	path = themes/hugo-coder
	url = https://github.com/luizdepra/hugo-coder.git
```

## Final Thoughts

I found it really rewarding to improve a project I personally benefit from and plan to make many more contributions to open source in the future!

## References

- [Adding CSP to Hugo Blog Post](https://blog.jeremylikness.com/blog/create-content-security-policy-csp-in-hugo/)
- [CSP Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Mozilla Observatory](https://observatory.mozilla.org/)
