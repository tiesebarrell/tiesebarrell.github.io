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

These views are predicated on a perceived distinction between the "business model" and the "execution model". I'm sorry to say, but that distinction is moot. To me, **there is no execution model**. There is an execut*able* model, yes, but there is and should be no distinction between our functional view of the way the process operates and the way it is executed in a BPMS. Why? because we are automating *business processes*, not executing technical models that attempt to capture the way the business works.

## Models

As we know, to model is to create abstractions and [all models are wrong, but some are useful][models-wrong-useful]. Business process models are no exceptions. They describe an abstract and often simplified version of the reality of performing a business process. Although simplified and inherently wrong, they are extremely useful as they allow us to reason about the way work is done. Reasoning about processes is valuable because they are everywhere and are the cornerstone of the operations of most organisations.

Many of these processes today are highly automated or at the least supported by automated systems. Just as the software itself meticulously takes into account [how the actual business domain works][domain-driven-design], to best reflect it in the system, so does our model of the business process describe the way work is organised to the best of our (current) knowledge. Our understanding of the functional business the system is supporting is the primary input for all technical design. A system that closely follows the domain it supports, fits naturally into its place when used for that domain.

## Towards execution

We wish to power our automation of business processes with software that is not only specialised in this TODO niche, but is also driven by actual process models we can reason about and design. To truly create a system that matches the business process, we should execute the models of the business processes.

This does not magically happen, of course. The fallacy of zero-code business process management has not TODO disappeared, so we have real work to do to make things work. Good, hard, technical work. At the same time, we must keep in mind we are automating the TODO business process. So, the business model *is* the execution model; it's the model we turn into working software.


ADD: at certain level of abstraction, the business model is not executable. That's what the abstraction is for: not worrying about all of the details. But the levels should be linked and consistent!
* The business process might be wider, becuase there's more going on than in the system. You might want to document that.

* We don't program in BPMN. If the power goes out, the transaction does not commmit. Simple as that - techncal error - rely on default behavior.

* We don't want to see technical stuff in the model. -> add bahviour with execution listeners for instance

* Execute a technical state flow in a separate subprocess, in the business process it's one logical activity and as a whole, that's how it's executed. In the details of an activity, you can also leverage the state machine of the process engine to deal with the idiosyncracies of some systems. These are exceptions rather than the rule.

* The executable model is just the model with some execution details added to the mix, which are, for 99% of the cases, invisible.

* Exeception flows that you want to handle in some way ARE functional paths - model them. Maybe not at every level of abstraction to talk with different stakeholders, but at the 2nd level (Bruce 
Silver), for sure. We need to know about that detail, because it is important for what we do and how and when we do it.


? No, we don't need the user to be able to cancel the flow at any point. Either it's an execution path and modelled explicitly, or it's adminsitrative intervention 

* Grab back to the statements from the introduction to retort them based on the rest of the post.




[executable-model]: /assets/images/posts/process-automation.jpg  "Executable model"
[models-wrong-useful]: https://www.quotes.net/quote/58494 "Essentially, all models are wrong, but some are useful."
[domain-driven-design]: http://dddcommunity.org/learning-ddd/what_is_ddd/ "What is Domain-Driven Design?"