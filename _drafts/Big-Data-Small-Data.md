---
layout: post
title: Big Data, Small Data
links: data, more on orch
tags: [agile,bpm]
location: "'s-Hertogenbosch"
excerpt: "TODO"
tldr: "TODO"
---

data stored in process engine is about state of the process. it's only maintained there to be able to execute the process

## Big on reporting?

there are better tools for the job for BI and KPI reporting. It can be a source, it can even create big data using hooks to siphon off lots of information about processes being executed, nbut it's not the tool to analyse and utilize taht data. nor should it be. it's a highly specialized piece of software and you should keep it that way. That's what makes lightweight frameworks embeddable in the first place. Just because can can, doesn't mean you SHOULD.

it can maintain a historic log for audit trail purposes and you should select a tool that does.

history will get cleared once it's served its purpose for analysis, brief history review, etc. Anything you need in permanence should already have been stored in the application(s). That's their job.

3rd party framework is not to build your business on. What if you want to swap it out? What if they change their format?