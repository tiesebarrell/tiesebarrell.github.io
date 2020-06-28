---
layout: post
title: There is No Execution Model
tags: [bpm]
categories: group9
image:
  url: "/assets/images/posts/process-automation.jpg"
  title: "Executable model"
  x: -100
  y: -150
location: "Vught"
excerpt: "You will have abstractions. You will have different models for the same process. But there is no 'execution model'."
tldr: "It is unhelpful to distinguish between a 'business model' and an 'execution model' when working with business process models. We want to hide technical details from the model that is executed. It also doesn't make sense to define functional models only to an abstract level before they are implemented in software. We model to capture understanding. We should aim to implement models as closely as possible to our understanding. Having abstract models is useful, if they are complete and consistent with the detailed ones. Detail your models to include all of the activities, events and alternative paths that need to be handled. These details need to be known to implement the process, with or without software support. It is this business process model that is executed in the system."
---
When business processes are to be executed by automated software components, there is an interesting notion that tends to pop up in the conversations around the design of the process models. It takes various forms, such as this statement:

> "I'm sure this model will look different when we move to the execution model."

or:
 
> "We will never get the business models to the level we need to make them executable."

My response to the first is almost always: "Why?". Similarly, I react to the second with "Why not?"

These views are predicated on a perceived distinction between the "business model" and the "execution model". I'm sorry to say, but that distinction is moot. To me, **there is no execution model**. There is an execut*able* model when we move towards automating the process, for sure, but there is and should be no distinction between our functional view of the way the process operates and the way it is executed in a BPMS. The straightforward reason for that is that we are automating *business processes*, not executing technical models that attempt to capture the way the business works.

## Models

As we know, to model is to create abstractions and [all models are wrong, but some are useful][models-wrong-useful]. Business process models are no exceptions. They describe an abstract and often simplified version of the reality of performing a business process. Although simplified and inherently *wrong*, they are extremely useful as they allow us to reason about the way work is done. Reasoning about processes is valuable because they are everywhere and are the cornerstone of the operations of most organisations. They are an important part of the design of the organisation.

Many of these processes today are highly automated or at the least supported by automated systems. Just as the software itself meticulously takes into account [how the actual business domain works][domain-driven-design], to best reflect it in the system, so does our model of the business process describe the way work is organised to the best of our (current) knowledge. Our understanding of the functional business that the system supports is the primary input for all technical design to automate it. A system that closely follows the domain it supports, fits naturally into its place when used for that domain. An executable process model that closely follows the business process model enjoys the same natural fit. More importantly, the model changes for the right reasons as well: if the business process itself is changed, the executable model follows suit.

## Towards execution

We wish to power our automation of business processes with software that is not only specialised in this function, but is also driven by actual process models we can reason about and design. To truly create a system that matches the business process, we should execute the models of the business processes and change them when the business process also changes. This "[ensures the models you are discussing with your colleagues are 100% definitely the ones currently running in production][business-process-collaboration]".

This does not magically happen, of course. Because zero-code business process management is [mainly a fallacy][developer-friendly-bpm] or at least appropriate only to specific use cases, we have real work to do to make things work. Good, straight-up, technical work. At the same time, we must keep in mind we are automating the *business process*. So, the business model we have *is* the execution model; it's the model we turn into working software. The model that is executed is an enrichment of the business process model with the technical configuration to make it work in an automated way.

## Levels of abstraction

It's not that simple, of course. In many cases, the business model is not executable. This happens when the model has a different abstraction level. These kinds of abstract models are often created in the exploratory or experimental phase, where they are extremely useful because different audiences have different levels of interest in details. There is [scientific evidence that shows this][2019022001] (see pattern 9 - Omission and pattern 10 - Collapse).

These more abstract models are not meant to deal with all of the particulars (think of activities and events) needed for execution, but instead focus on conveying the big(ger) picture. That's what the abstraction is for: not having to worry about the details, **yet**. The *yet* in that sentence is essential. To be able to execute, the details are needed eventually. We need to know all of the activities that are performed, whether automatically or manually and the circumstances (events) that might occur along the way which we should account for. We also need to know about specific exceptional or alternative paths that are supported. Having business process models that never reach that level of detail is not sufficient and thus not acceptable. While we explore our options and the architecture of our process models at more abstract levels, it is helpful to omit some details, but to truly implement the process and make it executable (even without software!), the details are required. This is a functional requirement, not a technical one; it just so happens that implementation in software has the same requirement.

The notion of exploring the *process architecture* becomes even more important when using different levels of abstraction. A process architecture is [a hierarchical model of the business processes of an organisation][reimagining-management]. It describes how the process models [relate to each other and interact][modelling-tips]. The architecture captures the nature of orchestration and choreography (because you [need both][orchestration-and-choreography-need-both]) between processes. 

In abstract depictions, the milestones, important events and interactions are the focal point. But each of the processes identified in the architecture must also be detailed (for instance, in other views) to show the internal flow to its *full* extent. It's precisely in these detailed views that any inconsistencies or errors come to the forefront in relation to the abstract representations. The different levels of abstraction we create need to be linked and consistent, especially where the collaboration of the various processes is concerned. Without sufficient detail, we cannot hope to have a an effective execution towards the [intent of the process][the-value-of-intent], let alone an efficient one. This applies regardless of whether we implement processes in software or not.

As we delve deeper into the process architecture and move from more abstract depictions towards the ones that provide sufficient detail for implementation, we can still use the same kind of tools. [BPMN][bpmn] for instance allows you to create abstract models and fine-grained ones using a single palette. It's fine to have a separate tool where the business architecture (with the processes) is documented and use a different tool to execute processes, as long as you make sure the models are consistent and the business process models themselves contain the level of detail required for execution. As we saw, there's no reason why the models should differ anyway, so where you place the models is up to you. 

## Which level of detail is needed eventually?

This leaves us with the question of which detail level is needed for the process models. Following the above, the answer is straightforward. In order to move towards execution, we need a level of detail that shows us [all of the activities and relevant events][silver-level-2] for the individual processes and that contains all of the interactions that constitute the process architecture. This is the level we can complement with the execution specifics and that will reflect the business process directly in a technical system. 

Our technical execution might not span the entire business process. Where supporting systems are not yet involved in the process or no longer provide support, the business process may be wider than the models we use for execution. However, this is no different from the real world equivalent of the same process without system support: if the business itself is not yet aware of ongoing activities or no longer involved in further handling, the situation is similar. In these cases, we simply document the boundary of the scope the models cover.

Our process models should not abstract any of the relevant details. They should also not be polluted with technical concerns [(7PMG, G1)][7pmg]. We don't aim to replace programming by drawing process models. Just as there are [better ways][dmn] to express complex decisions in process models than by creating huge graphs of control flow, we don't want technical state management or the idiosyncracies of integrations with APIs showing up in our business processes. You might leverage the same technology to deal with these important concerns, but it has no place in the business process.

How about error handling? Consider the cases you need to account for. Are they handled in a specific way, flow wise? In other words: do we define a way to deal with them at the functional level, by specifying which activities are performed if they occur? If so, model them in your process (at least in the [fully detailed abstraction level][silver-level-2], depending on the audience and the importance). Functional handling of these cases belongs in the process model. If the power goes out in the data center, then what? Revert to the default behaviour of your process execution tooling, which should be: transaction cannot be committed, so roll back to last known correct state. Continue after resolution of the error by re-attempting. This has nothing to do with the process, we still want to handle our case in the same way. No alternative path is defined for this in the process.

## Execution, without execution model

We may need different views on our processes, showing different levels of abstraction. We require that these models are consistent, especially where they interact with other processes in the process architecture. Despite having different views, ultimately there is a business process model that can be traced from inception to technical execution.

Our models collectively detail all of the activities we recognise, including alternative paths that may be followed, any events we must respond to and how each model collaborates with others. We need that level of detail because it specifies how the process is handled: what we (don't) do and when we do it.

We aim for a close relationship between the execution of a process and the functional design thereof. There is no reason why the process models we execute should look any different from the business' perception of those processes - we are executing the business process. So even though there is no *execution model*, we will gladly take an appropriately designed model and execute it.

[models-wrong-useful]: https://www.quotes.net/quote/58494 "Essentially, all models are wrong, but some are useful."
[domain-driven-design]: http://dddcommunity.org/learning-ddd/what_is_ddd/ "What is Domain-Driven Design?"
[developer-friendly-bpm]: https://assets.contentful.com/vpidbgnakfvf/6p6BMD74WWEcGGGq2cS0AS/918c367d9ed94070ad95886b651c1cac/Developer-Friendly_BPM.pdf "Developer-friendly Business Process Management"
[orchestration-and-choreography-need-both]: https://blog.bernd-ruecker.com/why-service-collaboration-needs-choreography-and-orchestration-239c4f9700fa "Why service collaboration needs choreography AND orchestration"
[the-value-of-intent]: /2018/04/25/the-value-of-intent/ "The Value of Intent"
[modelling-tips]: http://www.bpminstitute.org/resources/articles/bpms-watch-ten-tips-effective-process-modeling "Ten Tips for Effective Process Modeling"
[reimagining-management]: https://info.leonardo.com.au/the-7-enablers-of-business-process-management-overview "Reimagining Management - Putting process at the center of business management"
[bpmn]: http://www.bpmn.org/ "Business Process Model and Notation"
[dmn]: http://www.dmn.org "https://www.omg.org/dmn/"
[silver-level-2]: https://methodandstyle.com/three-levels-of-process-modeling-with-bpmn/ "Three Levels of Process Modeling with BPMN"
[7pmg]: https://research.tue.nl/en/publications/seven-process-modeling-guidelines-7pmg "Seven process modeling guidelines (7PMG)"
[2019022001]: https://www.researchgate.net/publication/220366206_Managing_Process_Model_Complexity_Via_Abstract_Syntax_Modifications "Managing Process Model Complexity via Abstract Syntax Modifications"
[business-process-collaboration]: https://blog.camunda.com/post/2019/05/meet-cawemo-the-business-process-collaboration-hub/ "Please meet Cawemo - the Collaboration Hub for Business Process Automation"