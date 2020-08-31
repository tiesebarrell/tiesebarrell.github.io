---
layout: post
title: A Screen for a Task, A Task for a Screen
tags: [bpm, architecture]
categories: group9
image:
  url: "/assets/images/posts/chemical-science-laboratory.jpg"
  title: "The Right Combination"
  x: -600
  y: -600
location: "Haarsteeg"
excerpt: "Dedicated task screens will make your process solutions easier to create and maintain and more flexible to manage. And they'll offer a better user experience."
tldr: "Stop creating screens that try to cover every use case imaginable, especially those that support users in performing tasks in a business process. Instead, create dedicated screens for each individual task, so the user experience for that task is front and centre. These _task screens_ will be cheaper and easier to create and maintain, too. The processes they are part of will become more flexible and ready to change when needed. It's all about dedication."
---

It's finally time for a demonstration of the new interface for users to perform their tasks in.
The first users are bustling into the room, grabbing coffee, clicking through login screens, and waiting for instructions.

> "Where is it?"

> "This is it."

[crickets]

> "Right there, see?"

[silence]

> "But i just need to upload the change request when it comes in."

This is not going very well.
Jokes and failed agile processes aside, something needs to change.
Let's have a look at task screens. 

## The Human Touch

As much as processes tend to be automated these days, in many business processes, human actors still play an important role.
Some activities simply cannot be automated, are too expensive to automate or require human assessment.
In BPMN, these activities are modelled as _User Tasks_.
The standard doesn't define much responsibility for the process engine that executes the process model and the user tasks it contains.
It should stop execution for the current path and await the completion of the task.
There is no prescription on how, when and where a task is actually performed.
Likewise, the technology used to perform a user task is completely open.

Vendors implementing a BPMN compliant process engine can choose to offer no solution, an extensible and open one, or a completely fixed solution for offering interfaces to perform tasks.
There doesn't even need to be technology involved, as long as the task can be completed somehow.
The general assumption is that there is some way for a user to perform the task, then complete it (or perform some other action such as cancelling, escalating or leaving the task for later completion).
In most process solutions, there is a piece of functionality, typically a screen, offered to the user, to do just that.
A lot of process automation tools offer quite some flexibility as to _how_ the screen is built and the user interacts with it.

I'd like to point out that this post doesn't assume any specific technology to execute processes or to create these screens (as they will be referred to).
Also, I'm far from a UI/UX designer, even though this post concerns some design choices.
These thoughts stem from practical experience in medium to large scale process implementations and working with designers and developers on delivering process solutions.

## Goals

We would like to offer users the most effective way to complete their tasks, of course.
Pleasing the database structure or the process solution's state requirements are not goals for the user; completing their tasks to get their work done is.

Completing a task should be fast, or at least interacting with the screen should get out of the way of the task itself.

Maintenance of our screens should also be as efficient as we can afford.
Building UI tends to be a relatively costly part of the overall development, so we must ensure every cent is well spent.

The term _management_ is in BPM for a reason; we need to be able to _manage_ and if needed, _change_ processes.
The ability we gain to flexibly adapt processes is one of the core promises that make it worth all the effort going into BPM.

## Dedicated Screens

It stands to reason that a screen tailored to the task at hand generally offers a better experience for users than a generic one.
Therefore, we should create a screen that is dedicated to be used for a single task: a *task screen*.
A task screen can be optimised to the task at hand, by optimising the information offered as context for the user, the input options to complete it and the design to make it usable.
The user is presented with a distraction-free interface that does one thing very well: perform this type of task.
For another task, in the same or a different process, a different screen is created.
You can use a hammer to cut through a piece of wood, but a saw would be a better tool choice for that job.

This does not mean we have to graphically design every screen separately, or even should. 
We can have a style guide that describes the patterns used for standard coloring, layouts and components.
This way, a uniform experience across screens can be created.
The main concern is with the information that we present, to tune this information to the task.
In some cases a screen may require a very specific graphical and interaction design as well, but these tend to be exceptions rather than the norm.
Those screens are likely the highest value tasks, which also warrant creating a separate design for.

Our task screens offer us a lot of additional benefits.

* If we need to change the information, input or design of a task's screen to better serve users, we can change _that_ screen.
* If a task can now be handled automatically, we can discard the screen, because it is not used elsewhere.
* If a screen has fewer dependencies, it is cheaper to develop and to maintain because changes can be applied in isolation to the context of the task.
No checking the state of the process to enable actions, perform validations conditionally, etc. are needed: you only see the screen when you're performing the task.
This reduces the complexity greatly: the process manages when a task is created and can be performed.
At that point, the screen can be used, without knowing about all the surrounding business rules that govern it.
* If the screens are developed individually, the process as a whole can be changed more easily because the task screens are not dependent on the control flow of the process.

There are often other actions that users perform in processes, such as initiating new process flows, triggering an event or providing input other than in a user task.
For these cases, the same principle of a [dedicated screen to perform the work](https://jbenckhuijsen.blogspot.com/2020/07/validations-across-micro-services.html) can be applied.

## The Alternative: Integrated Screens

The alternative to separate task screens is that we integrate task execution into other screens in an application.
This approach, which is more common than you might think, comes with a number of drawbacks.
First of all, there is a tendency to assign multiple responsibilities to the screens and their surrounding context.
Instead of a screen dedicated to one task in the process and another for the next, we have a single screen that tries to cover all these different cases.
This is typical if the screen we integrate into is a detail screen of some sort, such as a dossier, a client file, or an order. 
Users are expected to know what to do in different situations and find the right options mixed in with all the others.
In other terms, users are now responsible for pleasing the system in an array of different contexts and remembering how to do that.

Integrated screens are high cost items as far as maintenance goes.
There are dependencies with the surrounding elements on the screen, complexity is higher and the amount of circumstantial knowledge built in to the screens increases the cognitive load required to design, develop, maintain and use the screens.
After all, the screens are tightly coupled to the control flow of the process and the various states the process could be in at any time the screen is accessed.
The screens take care of enabling and disabling interface elements depending on the current process state and must update themselves when the process state changes in the background.
Developers will even shy away from the risk of changing them once they have grown into such a convoluted mixture of UI, UX and state management that nobody can even think through all the different scenarios that need to keep working if we want to change just one.

In some cases, users will ask for these large, combined and integrated screens, arguing that it is easier to just have everything in one place.
Some designers will gladly accommodate this in the design, feeling they are giving the users what they are told is what they need.
Once the users start working with it, though, the effect of the example we started with is observed too often.
The information overload of cramming heaps of functionality into a single screen and the complexity of working with it are detrimental.

All in all, integrating the screens with the rest of the user interface is providing a poor experience and slowing us down when making changes.

## Going Micro

You can apply this principle of task screens whether you build a large, monolithic system or a micro services based system.
It fits very well with a popular option these days, to build a _micro front end_ application.
In a monolithic system, even though you deliver just one artifact, you can separate screens into separate components and subsystems to isolate them.
On the other extreme of the spectrum, a task screen could even be a separate application, built for its single purpose.

Every option in between is also an option.
The point is that you can build and present your screens to perform tasks in a dedicated fashion to be the best tool for the job of one task, regardless of the architecture of your system.

## Completing

Design task screens to display exactly the information you need and exactly the input required to perform the task. 
Just that, nothing else. 
In exceptional cases you may need more information to perform the task.
This is easy to cover: provide links to look up more detailed information for those 5% of cases where it's needed, instead of blowing up the screen with it all the time "just in case".
You can still apply a consistent look and feel, and re-use components if you display the same information on a lot of them.
For task based work, a consistent experience that offers focus works best.

Create a screen for each task and make sure each task has its own screen.

Integrating them in other screens only serves to complicate matters when designing, developing and using the process solution.

Put your designers to creating good design and interaction patterns for the application, instead of each single screen.
It's more fun for them too.
Put a simple, dedicated screen in front of your users to focus on their tasks instead of the system that's supposed to support them.
Put yourself on the right track to be able to manage your business processes.

Now, let's go and get some work done!

