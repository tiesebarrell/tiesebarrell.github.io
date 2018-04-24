---
layout: post
title: The Value of Intent
links:
 - link: ../../../2015/12/06/All-Beginnings-are-Hard.html
   name: All Beginnings are Hard
tags: [agile,bpm]
location: "'s-Hertogenbosch"
excerpt: "Define the intent of the process you are implementing. It will help you with design decisions."
tldr: "Before you start implementing a business process and even start *thinking* about automating it, define the intent of the process first. It will help scope the boundaries of the process and make clear which responsibilities the process has and doesn't have. It will help prevent aiming for a moving target during design and implementation and enable impacting change as business goals evolve."
---
![Determining intent][pushpins-and-threads]  

Having trouble defining the scope of a business process or making design decisions at functional or technical levels? Try formulating the process' **intent**. This post discusses the *Value of Intent*. [(1)](#footnotes)

## Of beginnings and endings

As eluded to by [Bruce Silver][bpmn-method-and-style] and probably many before and after him, when designing and/or automating business processes, one of the most often overlooked aspects is to clearly define the process' start(s) and possible outcomes (endings) [(2)](#footnotes). Getting off on the wrong foot by not having a clear definition of the start and end of the process will encumber the entire project. I [wrote about this a while ago][all-beginnings-are-hard]. As I put it there:

> [...] you determine what the process *is* and *is not* [...] Even a quick glance at your process’ scope will show what’s in and what’s outside the process when questions arise.

and...

> [...] it’s the primary input for further activities. Not just for technical implementation where a precise specification is required to make sure everything works as intended, but also as a means of facilitating discussions. [...] People forget things that were discussed and decided a week ago. What was decided and in some cases a brief description of the rationale behind the decisions help to remember what should be done and why it should be done that way.

So, determining the ways in which a process can begin and how it can end is essential for scoping the process. What's part of it and not will become obvious from these boundaries and they can be used to revisit decisions later on. The inevitable question in defining them therefore becomes: How should they be determined? What decides what the process *is* and *is not*? This is where the *intent* comes into play. 

## Of intent

For the purposes of this post, let's get our definitions laid down. In this context, I am referring to *intention* as "purpose or attitude toward the effect of one's actions or conduct" [[1]][1]. The shorter definition works too: "The end or object intended; purpose.". 

Put simply, the intent of the process is that which we are aiming to achieve as a result of executing it; it forms its reason for existing and helps us *understand* why it is here. The intent should cover the implementation of a particular logical part of the business as a whole. What goal does it serve and in which context is it executed? It describes why are we performing all the activities in the first place. It is tempting to zoom in to the activities straight away because a lot of people think in terms of things happening, but without the purpose, there's no way to determine if we are *doing the right things* and *doing the things right*.

When starting the implementation of a business process, we should start be asking what the purpose of having the process is. What intent is fulfilled by the process? Discuss the options and write it down - it will be useful throughout. Let's look at how.

## What do we gain?

There is much value in having a well-defined intent for the process. An example helps in explaining the benefits. Let's assume we have a process with a defined intent of:
 
**"Order replenishment stock items for garden products from suppliers with automated ordering within the order cycle."** 

### Scoping

As we already saw, the beginnings and endings of a process mark the boundaries of its scope. The scope itself is a direct result of the intent: the scope should be exactly broad enough to fulfill the entire intent, but no broader. 

From the example intent above, it becomes clear that this process does *not* cover suppliers where there is no automated ordering in place and that anything other than garden products is not part of it. That narrows down our scope quite a bit potentially. It also rules out any start events that aren't time-based from the order cycle. Note, that it doesn't define that cycle here, as the process may be run multiple times a week and change to daily as business requirements change - the intent remains stable.

The intent is useful to find out which activities are conducted after the process has started and which ones are before the process itself. For instance, deciding whether a process gets started or not, based on an incoming message can be aided by considering the intent: is it working towards fulfilling the intent or have we not yet figured out what our intention is for this message? Maybe some business object or aggregate is still determining if we need to do anything at all. In that sense formulating the the intent and the scope for the process also helps define triggers outside of the process.

We can also see that the intent is only to order the products. Presumably, once the orders have been made, the process ends. That helps figure out which possible outcomes the process may have and that for instance all activities related to ensuring the orders are delivered on time are not within the responsibility of this particular process - there may be another one whose intent covers such issues.

Now, in discussions about the end(s) of a process, we can use the intent to make decisions. By asking the simple question: "at this point, is the intent fulfilled?" we can determine if the process is ended. If the intent is not yet fulfilled, more has to happen. On the other hand, if the following activities are not required to fulfill the intent, they are out of scope for the process. Note that flows in the process that lead to an early termination (e.g. customer credit is insufficient, despite our best efforts) are still a valid ending of the process even though the intent may not have been fulfilled at that point. These are simply modelled as alternate or exceptional endings.

### Responsibility

Somewhat related to scoping but not so much in the sense of start and end boundaries is the notion of responsibility of a process. This addresses what is covered within a process' activities and what is left to others to fulfill. Having an intent helps in tackling design decisions in this regard. If activities being considered do not help or are not required in fulfilling the intent of the process, they are apparently not its responsibility. They may still be performed, but under the auspices of another process.

Design questions like this come up all the time: if we're ordering our replenishment stocks from the example above, how do we deal with the case where a supplier appears to be on a blacklist for being notoriously late on delivery? Do we handle it in a subprocess of the replenishment process? Probably not - our intention is not to re-evaluate the supplier relationships. We might start some other process at this point, but as it doesn't bring us any closer to reaching our intended outcome, it cannot become part of this process (without changing the process' intent). 

With other parts of our processes, which we model as a subprocess, we can ask whether they serve the same purpose as their parent - if the intent is the same, they become part of the process. They *may* be designed as a *re-usable* process, to enable their own concerns to evolve naturally. They can even be used as part of other processes. Still, here, they are fulfilling part of our original intent, so they are not a standalone business process in their own right. We model them as re-usable mainly to manage them more easily. 

Do we wait for some additional processing or is the action we triggered a fire and forget action? Looking at our intent once more, we can address this design issue by checking if the response is needed before our intent has been fulfilled. If it's not, fire and forget will suffice. Otherwise, we should wait for the response before completing our own process.

Similarly, if our intent is to handle customer complaints, the channel they reach us by is not relevant. In this case, complaints coming in from different channels are handled in the same process (possibly with some variations to account for differences). If it aims for the same outcome, it goes in the same (main) process.

## A moving target

Without a properly defined intent, implementation of a process quickly becomes a matter of aiming for a moving target, which is even more painful if the goal involves automating (part of) it. Scope and responsibilities have to be assumed to define work packages. Unfortunately these assumptions inevitably turn out to be wrong, incomplete or simply different from what is needed at a later time. This means the process has to be reworked and software needs to be changed to account for the redesign. These kinds of changes tend to hurt. They are not like new features or incremental development that benefits from refining our knowledge of the domain as progress is made. Instead, things need to be added to the process' input because they become part of the scope, become removed completely because they aren't within the process' responsibility or need to be changed because their outcomes are needed after all where before they were assumed to be last in line before the process ended. In other words, because the *contract* of the process changes, it has a big impact, similar to the way interface changes in APIs are harder problems to tackle than working on the internals within the contract's boundaries.

Referring to our example intent, if suddenly we realize that not only garden products need to be ordered by this process, its inputs might need to be more specific and its internal activities forced to deal with several types of products they were previously not concerned with. Had the intent been clear up front, the design would have accounted for this broader responsibility.

How do you model a process and more specifically, how do you choose the activities, decisions and events that form it, if you don't know what its intent is? You cannot and should not because you don't know what it's trying to accomplish. A team should hand back a request to attempt that and ask which purpose the process has, what the intent of implementing it is. Otherwise, it's not possible to know that the process that results actually fulfills its goal. It's like continuously claiming "Mission Re-Accomplished" for a mission that was never defined. 

## Defining intent

A well-formulated intent focuses on *what* needs to happen and not on *how* it happens. The *how* is what the process, its decisions and the activities are modelled for. Defining it doesn't require any magical skills and should come naturally to those familiar with the process and its business context.

In some cases, *what* needs to happen may itself be a moving target. Disaster, because we are trying to be agile? No! Realize that the intent is not a static definition. It's perfectly valid that it evolves over time. What we are trying to accomplish changes, so the intents from which processes start change as well. At any point though, the intent represents the *current* reason for the process to exist and what it helps to achieve. Having a defined intent is instrumental in determining impact of upcoming changes. If we start ordering from other suppliers than those with automated ordering only, the intent needs to be broadened. 

The granularity of the intent depends strongly on your process decomposition. There is no exact science to defining it and there is no right and wrong; it's about discussing the level that defines the scope adequately to answer the types of design questions that tend to come up in a particular environment. If the precise target supplier group is always an issue in our domain, including it in the intent is helpful. In other cases, an intent that is less specific can be sufficient. If timing is important, make it part of the intent of processes where it plays a key role.

There are some things we want to avoid when defining the intent:
* Taking far too much time to get it exactly right from the very start. Even working from a very basic definition is feasible and will lead to adjustments to the intent as more questions arise.
* Being far too specific and including detailed descriptions of activities in the intent instead of the result these activities try to achieve.
* Including to much details about the content of decisions or policies used within the process.
* A description that is too vague on key aspects such as when, what or for whom the process is performed, if those things are relevant in the design.

In finding the intent, a technique such as [Event Storming][event-storming] can be helpful, because it focuses on defining what the process is by first designing what needs to *have happened* for the process to be fulfilled. Especially working from the end towards the start brings up alternatives and discussion points to refine the intent. If you can't figure out what the end result (event(s)) of the process is, then how will you find the activities that together reach the goal and avoid having endless discussions about what comes before that end result? Here we see how closely the process' design is linked to the intent. If you are using Event Storming within the context of [Domain-Driven Design][ddd], it's also easy to see how the various pieces of domain behavior that the process uses are used in combination to fulfill the intent.

> Listen with the intent to understand, not the intent to reply. 
 - Steven Covely [[2]][2]

Defining a process' intent brings us a greater understanding of why it exists. This insight is invaluable in making scoping and design decisions and leads to a better process implementation through having a clear vision of the outcomes the process is meant to yield. 

## Footnotes 

**(1)** Some of the inspiration for this post came when tackling a tough modelling issue and deciding whether one process should be part of another or a separate process in its own right. Thanks to [Hajo Reijers][hajoReijers] for pointing to the discussion of process architecture decomposition (as developed by [Remco Dijkman][remcoDijkman]) in his book "[Fundamentals of Business Process Management][fundamentals-of-bpm]", which by now has reached its second edition. 

**(2)** "Don't answer this too hastily", [Silver][bpmn-method-and-style] writes about choosing the process' start. [...] "When does the process start, and when is it complete? [...] It is often a matter of perspective. In many process improvement projects, scope is an important but seldom discussed issue, and experts may disagree."

[1]: http://www.dictionary.com/browse/intention?s=t "Intention"
[2]: https://www.brainyquote.com/quotes/stephen_covey_636508 "Stephen Covey on BrainyQuote"
[bpmn-method-and-style]: https://www.amazon.com/BPMN-Method-Style-levels-based-methodology/dp/0982368100 "BPMN Method and Style"
[pushpins-and-threads]: ../../../assets/images/posts/pushpins-and-threads.jpg  "Determining intent"
[all-beginnings-are-hard]: ../../../2015/12/06/All-Beginnings-are-Hard.html "All Beginnings are Hard"
[hajoReijers]: https://twitter.com/profBPM "Hajo Reijers"
[remcoDijkman]: https://twitter.com/rmdijkman "Remco Dijkman"
[fundamentals-of-bpm]: https://www.amazon.com/Fundamentals-Business-Process-Management-Marlon/dp/3662565080/ "Fundamentals of Business Process Management"
[event-storming]: http://eventstorming.com/ "Event Storming"
[ddd]: https://www.amazon.com/exec/obidos/ASIN/0321125215/domainlanguag-20 "Domain-Driven Design - Tackling Complexity in the Heart of Software" 

