---
layout: post
title: The Value of Intent
links:
 - link: ../../../2015/12/06/All-Beginnings-are-Hard.html
   name: All Beginnings are Hard
tags: [agile,bpm]
location: "'s-Hertogenbosch"
excerpt: "TODO"
tldr: "TODO"
---
![Determining intent][pushpins-and-threads]  

Having trouble defining the scope of a business process or making design decisions at functional or technical levels? Try formulating the process' **intent**. This post discusses the *Value of Intent*.

## Of beginnings and endings

As eluded to by Bruce Silver and probably many before and after him, when designing and/or automating business processes, one of the most often overlooked aspects is to clearly define the process' start(s) and possible outcomes (endings). Getting off on the wrong foot by not having a clear definition of the start and end of the process will encumber the entire project. I [wrote about this a while ago][all-beginnings-are-hard]. As I put it there:

> [...] you determine what the process *is* and *is not* [...] Even a quick glance at your process’ scope will show what’s in and what’s outside the process when questions arise.

and...

> [...] it’s the primary input for further activities. Not just for technical implementation where a precise specification is required to make sure everything works as intended, but also as a means of facilitating discussions. [...] People forget things that were discussed and decided a week ago. What was decided and in some cases a brief description of the rationale behind the decisions help to remember what should be done and why it should be done that way.

So, determining the ways in which a process can begin and how it can end is essential for scoping the process. What's part of it and not will become obvious from these boundaries and they can be used to revisit decisions later on. The inevitable question in defining them therefore becomes: How should they be determined? What decides what the process is and is not? This is where the *intent* comes into play.

## Of intent

For the purposes of this post, let's get our definitions laid down. In this context, I am referring to *intention* as "purpose or attitude toward the effect of one's actions or conduct"[[1]][1]. The shorter definition works too: "The end or object intended; purpose.". 

Put simply, the intent of the process is that which we are aiming to achieve as a result of executing it; it forms its reason for existing. The intent should cover the implementation of a particular logical part of the business as a whole.

When starting the implementation of a business process, we should start be asking what the purpose of having the process is. What intent is fulfilled by the process? Discuss the options and write it down - it will be useful throughout. Let's look at how.

## What do we gain?

There is much value in having a well-defined intent for the process. An example helps in explaining the benefits. Let's assume we have a process with a defined intent of:
 
**"Order replenishment stock items for garden products from suppliers with automated ordering within the order cycle."** 

### Scoping

As we already saw, the beginnings and endings of a process mark the boundaries of its scope. The scope itself is a direct result of the intent: the scope should be exactly broad enough to fulfill the entire intent, but no broader. 

From the example intent above, it becomes clear that this process does *not* cover suppliers where there is no automated ordering in place and that anything other than garden products is not part of it. That narrows down our scope quite a bit potentially. It also rules out any start events that aren't time-based from the order cycle. Note, that it doesn't define that cycle here, as the process may be run multiple times a week and change to daily as business requirements change - the intent remains stable.

We can also see that the intent is only to order the products. Presumably, once the orders have been made, the process ends. That helps figure out which possible outcomes the process may have and that for instance all activities related to ensuring the orders are delivered on time are not within the responsibility of this particular process - there may be another one whose intent covers such issues.

Now, in discussions about the end(s) of a process, we can use the intent to make decisions. By asking the simple question: "at this point, is the intent fulfilled?" we can determine if the process is ended. If the intent is not yet fulfilled, more has to happen. On the other hand, if the following activities are not required to fulfill the intent, they are out of scope for the process. Note that flows in the process that lead to an early termination (e.g. customer credit is insufficient, despite our best efforts) are still a valid ending of the process even though the intent may not have been fulfilled at that point. These are simply modelled as alternate or exceptional endings.


### Responsibility

Somewhat related to scoping but not so much in the sense of start and end boundaries is the notion of responsibility of a process. This addresses what is covered within a process' activities and what is left to others to fulfill. Having an intent helps in tackling design decisions in this regard. If activities being considered do not help or are not required in fulfilling the intent of the process, they are apparently not its responsibility. They may still be performed, but under the auspices of another process.

Design questions like this come up all the time: if we're ordering our replenishment stocks from the example above, how do we deal with the case where a supplier appears to be on a blacklist for being notoriously late on delivery? Do we handle it in a subprocess of the replenishment process? Probably not - our intention is not to re-evaluate the supplier relationships. We might start some other process at this point, but as it doesn't bring us any closer to reaching our intended outcome, it cannot become part of this process (without changing the process' intent).

Do we wait for some additional processing or is the action we triggered a fire and forget action? Looking at our intent once more, we can address this design issue but checking if the response is needed before our intent has been fulfilled. If it's not, fire and forget will suffice. Otherwise, we should wait for the response before completing our own process.

Similarly, if our intent is to handle customer complaints, the channel they reach us by is not relevant. In this case, complaints coming in from different channels are handled in the same process (possibly with some variations to account for differences). If it aims for the same outcome, it goes in the same (main) process.




[1]: http://www.dictionary.com/browse/intention?s=t "Intention"
[pushpins-and-threads]: ../../../assets/images/posts/pushpins-and-threads.jpg  "Determining intent"
[all-beginnings-are-hard]: ../../../2015/12/06/All-Beginnings-are-Hard.html "All Beginnings are Hard"

