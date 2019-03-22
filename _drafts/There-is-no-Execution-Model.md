---
layout: post
title: There is no Execution Model
redirect_from:
 - /2018/12/19/There-is-no-Execution-Model.html
tags: [bpm]
location: "'s-Hertogenbosch"
excerpt: "TODO"
tldr: "TODO"
---
![Executable model][executable-model]

When business processes are to be executed by automated software components, there is an interesting notion that tends to pop up in the conversations around the design of the process models. It takes various forms, such as this statement:

> "I'm sure this model will look different when we move to the execution model."

or:
 
> "We will not get the business models to the level we need to make them executable."

My response to the first is almost always: "Why?". Similarly, I react to the second with "Why not?"

These views are predicated on a perceived distinction between the "business model" and the "execution model". I'm sorry to say, but that distinction is moot. To me, **there is no execution model**. There is an execut*able* model when we move towards automating the process, for sure, but there is and should be no distinction between our functional view of the way the process operates and the way it is executed in a BPMS. The reason for that is that we are automating *business processes*, not executing technical models that attempt to capture the way the business works.

## Models

As we know, to model is to create abstractions and [all models are wrong, but some are useful][models-wrong-useful]. Business process models are no exceptions. They describe an abstract and often simplified version of the reality of performing a business process. Although simplified and inherently wrong, they are extremely useful as they allow us to reason about the way work is done. Reasoning about processes is valuable because they are everywhere and are the cornerstone of the operations of most organisations. They are an important part of the design of the organisation.

Many of these processes today are highly automated or at the least supported by automated systems. Just as the software itself meticulously takes into account [how the actual business domain works][domain-driven-design], to best reflect it in the system, so does our model of the business process describe the way work is organised to the best of our (current) knowledge. Our understanding of the functional business that the system supports is the primary input for all technical design to automate it. A system that closely follows the domain it supports, fits naturally into its place when used for that domain. An executable process model that closely follows the business process model enjoys the same natural fit. More importantly, the model changes for the right reasons as well: when the business process itself is changed, the executable model follows suit.

## Towards execution

We wish to power our automation of business processes with software that is not only specialised in this TODO niche, but is also driven by actual process models we can reason about and design. To truly create a system that matches the business process, we should execute the models of the business processes.

This does not magically happen, of course. Because zero-code business process management is mainly a fallacy, we have real work to do to make things work. Good, straight up, technical work. At the same time, we must keep in mind we are automating the *business process*. So, the business model *is* the execution model; it's the model we turn into working software. The model that is executed is an enrichment of the business process model with the technical configuration to make it work in software.

## Levels of abstraction

It's not that simple, of course. In many cases, the business model is not executable. This happens when the model has a different abstraction level. These kinds of abstract models are often created in the exploratory or experimental phase, where they are extremely useful. They're not meant to deal with all of the details needed for execution, but instead focus on the bigger picture. That's what the abstraction is for: not having to worry about the details, **yet**. The *yet* in that sentence is essential. Referring to the remark above that the business models will never get to the level that's needed for execution, ....





[executable-model]: /assets/images/posts/process-automation.jpg  "Executable model"
[models-wrong-useful]: https://www.quotes.net/quote/58494 "Essentially, all models are wrong, but some are useful."
[domain-driven-design]: http://dddcommunity.org/learning-ddd/what_is_ddd/ "What is Domain-Driven Design?"