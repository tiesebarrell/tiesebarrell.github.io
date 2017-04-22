---
layout: post
title: All Beginnings are Hard
links: 
 - link: ../../../2014/06/29/Storing-data-in-processes.html
   name: Storing data in automated business processes
tags: [bpm]
location: "'s Hertogenbosch"
excerpt: "It's essential to address the start and end of the business process at the very start of the project. And by address, I mean decide, specify and communicate."
tldr: "Ask different people what *the process* is, and you’ll get as many answers as respondents. People’s views differ on what the process *is*, so they also have alternate views on what *constitutes its beginning* or which outcomes it may have. You need to address the start(s) and end(s) of the process by discussing, deciding, documenting and communicating them. It's worth the trouble."
---
![Getting the start and end right][start-end]  

This blogpost focuses on one of those things we all know, but too often don't practice when the situation arises: beginning at the start. What seems like a *no-brainer* is apparently far less than obvious. As with many things, if you start off on the wrong foot, what follows is much harder than it needs to be.

It's essential to address the start and end of the business process at the very start of the project. And by address, I mean decide, specify and communicate.

## Decide
* **Business analist**: "We're implementing the order process in this project."
* **Project manager**: "This project has a scope of the customer order process for all channels."
* **IT**: "We're implementing a generic order process and a single initial configuration for the first tenant in the next couple of sprints."

If people use different terms for something, that's a good indicator they mean different things. Even if they use the same terms, their understanding of concepts may differ. To some extent, this is unavoidable and harmless. Jargon is rampant in any discipline and fairly innocuous as long as it's only used within that domain. With terminology for processes and particulary with its start(s) and end(s), which is needed in communication that is interdisciplinary, it can be problematic.

Ask different people what "the process" is, and you'll get as many answers as respondents. People's views differ on what the process *is*, so they also have alternate views on *what constitutes its beginning*. Deciding therefore means sitting around the table and explaining different options and opinions. This should be focussed on putting together ideas and gaining mutual understanding and agreement on what the starting points of the process are and how they are defined. Which implies you need to do this with various domains at the table (business, project, IT, financial).

This process requires working out details; high-over analysis does not bring you far enough. This is the point where you determine what the process *is and is not* and where terms used need to align. In a dictionary, this is achieved by defining each word. Here, a similar definition is needed, for terms like "process", "start", "input data" and "customer". You have to look at technical aspects (such as integration challenges) as well as data input requirements for starting a process. You have to look at which actor (human or system) performs which action. You have to define what is meant by "we transform the Internet form data into an Order object". You do this by sketching flows, listing data containers and their properties, drawing system components and their interactions, etc. 

There are important trade-offs to be made during this step. Funneling multiple channels into a single process places requirements on input, transformations and administrative processes, but has the benefit of a single way of processing requests. Existing software components may need to be changed, configured or even entire new ones built. Offering a process start screen means weighing user experience against technical impact to support it. There might be a reduction of time spent on data entry with a far more extensive and interactive screen, but it might not be worth the investment to build it over a more simple variant. Once these decisions have been made, these need to be noted with our rationales for them, as they will be needed later on to retrace our choices.

## Specify
This step should be easy if you took the appropriate time for the previous step as it's fundamentally writing down the result of the decision process. If you determined there are two possible ways to start the process, write that down. Explain terms used and list input data. Describe assumptions about further processing requirements and how they relate to choices made. In other words: summarize the outcome of the decision making process. You went into all that detail; make good use of the effort by documenting the results.

The importance of this step is that it's the primary input for further activities. Not just for technical implementation where a precise specification is required to make sure everything works as intended, but also as a means of facilitating discussions. People forget things that were discussed and decided a week ago. Hey, I have trouble remembering why I went to the kitchen by the time I get there, how do you expect me to remember minute details about process start data? Right. I don't. I look them up. Or I ask somebody else if they remember *whether an Internet channel start also includes the exact calculation results or just the input variables*. What was decided and in some cases a brief description of the rationale behind the decisions help to remember what should be done and why it should be done that way.

## Communicate
For some reason, we sometimes tend to act like a military operation: information is communicated on a need-to-know basis. While this may be true for a lot of information in a process automation project, the starting point of the process is not one of these things. Anybody involved needs to understand in which ways this process can start. So once the decision has been made and specified, it needs to be communicated. This can (and probably will) lead to feedback from others not involved in the decision making process. They may have the same concerns with the chosen options and come up with alternatives. Most of the time, this re-iterates the discussion held before. Using our rationales, choices can be explained. Sometimes, there is new information that's valuable and leads to reconsidering our decisions. Even so, the communication makes it clear for everyone which process exactly is being worked on.

## How about that end?
By now you may be excited to get started automating the rest of the process. Unfortunately, you need to revisit the previous three steps first. To define what the process is, you need to decide what starts the process *as well as* what ends the process. Many processes have several valid outcomes and these all determine the scope and content of a process. Does the process end once we package orders or do we require a receipt confirmation on the other end before we're satisfied our work is complete? If we need more information in order to process a customer's request, does that mean we ask for it and then close the process until the information arrives and we start a new process? Maybe we should keep a single process open ended until we receive an update. These are the happy flow versus alternative flow decisions that need to be made and are crucial for scoping the process and the project to automate it.

##Benefits
Admittedly, there is no magic in following these simple steps. There's a lot to be gained for doing them, though.

* First, if nothing else, you'll end up with a happy project manager who now has a clear description of the scope of the process that's being designed and implemented;
* More importantly, performing these steps brings clarity to all involved about what the process *is* and *is not*. You have thought it through, noted your rationales and documented the outcomes. It also serves the same purpose for those who join later or are interested to know more about the process. Even a quick glance at your process' scope will show what's in and what's outside the process when questions arise;
* The documented rationales for choices made will be a major aid in future stages. First, they allow you to make clear where insights have evolved because the old ones are right in front of you. Second, determining what starts and ends a process allows a clear analysis of data requirements, manual or automatic processing and change requests. If you need certain information in a late stage of your process, it needs to become available somewhere before that point. Knowing exactly whether the start of the process requires this information tells you whether it's available or needs to be created during the process' lifecycle at some point before you need it. If someone asks whether a certain piece of information can be linked to the process, you can easily field the question by telling them it's inside or outside the process' scope.

## Or else...
If that isn't enough reason for you to make start and end of your process clear, here's what you may be in for further down the road.

* Unclear starting points lead to unclear requirements on input data. If you don't know the input your process requires and/or what it produces along the way, you'll be implementing changes all the way along to redesign the information exchange of the process. If you're interested in this topic, here's [an earlier blogpost][storing-data] I wrote about it.
* All those vague and sometimes contradicting ideas of what the process is live on and frustrate the project if you don't discuss them and make a decision. Get it on the table and make sure people know what was actually decided in the end.
* If you don't go into details, discrepancies will not present themselves. If an input transformation is needed, but there is no component inbetween, you're in for some serious technical refactoring. If you don't define the properties of objects, further on in the process the information you need is not available. 
* If you don't specify various outcomes of the process, your analysis of the process' usage will be severly limited by not being able to differentiate different scenarios. If you didn't identify some possible ends, you will have cases that cannot be handled by the process - you will under deliver. Go too far the other way, you'll be over delivering functionality that nobody needs and is not worth the costs.
* Not writing down and/or communicating your decisions and rationales? You'll feel like an actor rehearsing lines telling everybody the same story. But it will be your own fault. As a "bonus", you'll find out you forgot most of it yourself too and you get to do the discussion and decision making all over again.

## Summary

Sound simple? Indeed, it is; and it's well worth it. All we need is to *just do it*.

All beginnings are hard, but as the saying goes: a good beginning is half the battle. Make sure you get off to a good start and determine the start and end(s) of your process before you dig into the details of what happens inbetween. It's a surefire investment for the whole project.

[start-end]: ../../../assets/images/posts/start-end.jpg  "Getting the start and end right"
[storing-data]: ../../../2014/06/29/Storing-data-in-processes.html "Storing data in automated business processes"