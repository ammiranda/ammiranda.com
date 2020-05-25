---
title: Securing Cloudfront backed Gatsbyjs website with AWS Lambda@Edge
date: 2020-05-24
cover: cover.jpg
tags: [aws, s3, cloudfront, security]
---

### Summary

I have set up my portfolio site (the one you are on) to be served via s3 fronted by the Cloudfront CDN.
One downside when using Cloudfront is that it strips most headers prior to delivering the content to the end user.
Several of the headers stripped or surpressed ensure greater browser security. This post will go over the steps I took
to get an A+ grade from <a href="https://observatory.mozilla.org/analyze/ammiranda.com" rel="nofollow" target="_blank">Mozilla's Observatory</a> security auditing tool.

### All About Security Headers

A selection of the headers which prompt browsers to prevent <a href="https://en.wikipedia.org/wiki/Downgrade_attack" rel="nofollow" target="_blank">downgrade attacks</a>, <a href="https://infosec.mozilla.org/guidelines/web_security#content-security-policy" rel="nofollow" target="_blank">XSS attacks</a>, and
other attack vectors are listed below:

<ul>
    <li>X-Content-Security-Policy</li>
    <li>Strict-Transport-Security</li>
    <li>X-Content-Type-Options</li>
    <li>X-XSS-Protection</li>
    <li>Referrer-Policy</li>
    <li>X-Frame-Options</li>
</ul>

### The Solution

Cloudfront strips these vital headers no matter how we configure our Gatsby.js site. The workaround I found for this limitation
is to use AWS [Lambda@Edge](). which is a lambda function that can be invoked at Cloudfront edges so the headers will be
provided between the Cloudfront edge and the end user.

### References