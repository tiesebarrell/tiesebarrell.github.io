---
layout: post
title: Storing data in automated business processes
redirect_from:
 - /2014/06/29/Storing-data-in-processes.html
tags: [activiti, bpm, architecture]
location: Eindhoven
---
If you are automating business processes, you need to store data. But you shouldn't store complex data in your process engine. That data should live elsewhere.

I often have discussions with people about using data in automated business processes. This typically revolves around data that process instances handle and how to store it, within or outside of the process engine's data store. 

In [Activiti](http://activiti.org) for instance, this couldn't be easier because you can [store any object](http://activiti.org/javadocs/org/activiti/engine/RuntimeService.html#setVariable%28java.lang.String,%20java.lang.String,%20java.lang.Object%29) (in the Java sense of the word) in Activiti's store without a problem at any time during process execution. You don't have to write code to do it and any `Serializable` will happily be stored by the engine if you tell it to. Other process engines have similar mechanisms, allowing you to store data in the process engine's data storage (typically, a set of database tables) and relate them to a process instance (I'll refer to that as storing data in the process engine/instance).

Even with these convenient features that process engines offer, my advice is usually: "don't do it". Let's have a look at why.

## The use case
First, consider the use case. While executing a process instance, it's typically the data that separates one instance from the other. Whether it's the customer whose case is being handled, a particular complaint or an order from a web shop, if all process instances are executed in the same way (according to the process definition), the data being handled will differ. This is often the whole point of automating a process in the first place. 

When people look at the data that are handled during a case, they realize that some of the data is only relevant during the execution of the process and some of it has a more permanent nature. There's rarely much discussion about the latter because people know this has to be stored somewhere else than in the process engine (let's call that "in the application", even though there might be a complex landscape of services and/or applications that collectively make up "the application"). For data that only lives during the execution of the process however, this is not an obvious choice. Requirements will be risen to store all manner of data in the process engine, ranging from order data to complete object trees and even documents being generated or shared while the process progresses.

I have to point out that such requirements seldom stem from a conscious deliberation. Practicality is the culprit in the majority of cases. "We don't have a store for this", "We don't need it afterwards anyway" or "There's no column in this table to put these things right now" are enough to resort to storing data in the process engine. Reluctance to incur impact or indifference may also play a role, but let's not focus on the reasons, but why it's often not a good idea.

## Your process engine doesn't need your data
My main argument against storing data in the process is that **it's not the process engine's responsibility to store the application's data**. You might say: "Wait a minute, isn't it *exactly* its responsibility to store things that relate to the process?".  The answer is simply no. It's the process engine's responsibility to store anything it needs to *orchestrate* the process, which is precisely what a process engine should be good at. 

Process engines are specialized software components in your architecture that are meant for executing process instances according to the model, maintaining transactional integrity over state and instructing people and systems what needs to happen along the way. True, storing data is part of what needs to happen while executing process instances. But the process engine doesn't need the data itself, the application does. So that's where the data should be stored.

Obviously, it's not as simple as that. You can't go around avoiding storing data in process instances in all situations and neither should you. You *should* however aim to store as little as possible in your process instances, and everything you store should be a *simple data type* (such as a string, a number or a boolean), not a complex object or hierarchies of objects. 

You will have to store data in the process engine, but only certain types of data should be considered for this. How do you know which ones? Well, ask the question: does the process engine need this data to perform the orchestration? Is this the only possible place to store the data? There are three main types of data that you might store in the process engine:

* Identifying data
* Control data
* Orchestration data

I'll discuss each in turn.

### Identifying data
This is data that identifies the process instance and data being handled in it. I don't mean the process instance's technical id, although you might use that at some point. Examples of identifying data are: the customer's id, the id of the web shop order or the id of a document that's stored in a repository. You can see the theme here: you don't store the data itself in the process engine, you store a *reference* to it. The reference can be used to retrieve the data needed in subsequent steps, because it is stored somewhere else, where it belongs. 

You can have multiple pieces of identifying data in a single process instance and together they make the instance unique. Think of an insurance claim that starts online (claim id) for a customer (customer id), gets processed internally which results in an assessment report (document id) and eventually is awarded by an outgoing payment (payment id). The complex data of the claim, the documents, etc. are not stored in the engine, but the identifying characteristics are, so they can be retrieved in the context of the process instance, when the process is running or after it's been completed.

### Control data
To perform the orchestration, the process engine needs access to control data that steer the process at decision points or determine which exact execution must take place. Examples of these kinds of data are human decisions (such as "award or reject"), derived data (the customer is a VIP customer) and the channel the process was started from ("mail order or internet order"). The nature of these data is that they influence the flow of the process instance (which makes them required for orchestration). 

Control data can typically be stored in booleans or strings (e.g. derived from a enumeration). If they are more complicated, then it's best to delegate to a service or a business rule engine to manage and provide the decision logic externally. The engine only needs the outcome, so send it a simple type to choose the right path.

### Orchestration data
Some data are only really needed to be able to orchestrate the process. This typically involves data that results from one step in the process and is used in the next, without being relevant outside the process execution. The subsequent steps have no other way of getting the data other than having it provided to them by the process engine, because the engine is the glue between the steps that has the overview. 

An example of orchestration data is a balance total. Let's say we have business process to add money to your savings account. At the end of the process, we send you an email with the new balance in your account. This balance total seems like something we might store in our application, but in fact [we don't store your balance total at all](http://vimeo.com/31645099). We store transactions in and out of your account. The total is always calculated as a result of the whole history of transaction events (which is what we *do* store, in the application). So after processing the transaction, we invoke the "calculateBalanceTotal" method on some service. The result is a single amount, which is stored in the process engine for that process instance, because it belongs to this process instance only and is stored nowhere else. Once the process gets around to sending the email, the amount is retrieved by that process step.

Sometimes these types blur and a piece of data fulfills multiple roles. In any case, they are always just necessary because the process engine wouldn't be able to orchestrate the flow without them.

## Other reasons
There are other reasons not to store complex objects in the process engine. 

### External dependencies
In general, applications or services should not depend on what's stored in the process engine or its history. That is an internal storage that you should be able to maintain without impact to the world outside the process engine. The engine might automatically clean up its history and should be able to do so without considering external factors. You don't want to be hunted down in the car park because a business user couldn't generate a monthly report that was based on data that was just deleted.

If anybody or any system needs the data during the process, it should be stored outside the process engine. Similarly, if the data has relevance after the process instance has completed, it should be stored outside the process engine. Your engine is not a view on your application's state, but on the process' state.

If you don't follow these guidelines, your data and the process become intertwined and it becomes cumbersome to change things because of dependencies resulting in higher impact. Your process doesn't need to know about all the things that are being stored, it should only know about things that relate to the orchestration. 

### Historic mismatches
Since Activiti stores any `Serializable` object, you might have guessed that the way that works is by simply serializing the object and storing the byte array; you would be right. If you consider that many business processes are long-running and they may easily run longer than a development cycle, the objects that were stored in existing process instances may have changed class definitions in the next iteration of the software. Combined with the fact that many applications are developed with almost no regard for versioning of `Serializable`s, it's easy to see that your existing object blobs will no longer be able to be deserialized by the JVM. This will result in errors while querying for data, even if you're not using those particular objects. You'll be in a big mess before you know it and it won't be easy to recover those existing instances. Trust me, I've been there.

If you are introducing a change to a process' data that makes older cases incompatible with new ones, you want to solve that problem where it arises, in the data or the services that manage it. If you need to start tackling compatibility problems at your process engine, you're making life harder than need be.

### Agility
Your processes will be much easier to change if they don't store and/or rely on complex data structures. If you add a property to an order object, because you now want to track an additional characteristic, nothing changes in the orchestration. Older and newer orders can be just as easily maintained in the existing process, because you only keep a reference to them; what happens to be inside them or what's used by services has no impact on the flow. If you add a decision option, which is handled the same way as an existing one, your process can remain unchanged. 

Once you run into a change that *does* affect the process definition, it will be much easier to change because the data managed is still simple and most likely the older scenarios are still valid or easily changed. 

## But what about...?
> "that's all fine, but in *my* particular case, I *really* need to store it in the process." 

Well, maybe you do. In which case, you should. But if you're dedicated to keeping your processes lean, flexible and focused on orchestration execution, I find there is usually a way around storing the data in the process and that way tends to work out much better.

Often when you think there's no other way than storing the data in the process engine's storage, it's because you don't want to solve the actual problem: that you don't know where *else* to store it. There might be a real problem in storing the data somewhere else. But that's *your* problem, because you need the data. It's not the problem of the process engine.

> "So now I have to create data stores for every little bit of data, just because it can't live in the process engine?" 

Ask yourself this question: does that "temporary object" have a name, a function, something that's relevant in your domain? It probably does - why else are you discussing storing it? I'd argue that anything that's relevant in that sense should be stored in the application and at best referenced from the process instance. It apparently has meaning, even if only during process execution. It's important and others may need or use it. For that reason alone, it should not be stored in your process engine.

> "That'll cost a bunch of money to design and maintain." 

It might, but people tend to overestimate the impact to change things in order to avoid the work. That might sound harsh, but it's true. If the data is only relevant during process execution, just delete it as a final step in the process. Or run a batch process every once in a while to get rid of data that's no longer needed.

> "I don't want to normalize this data just because it can't be stored in the process engine. It's too complicated and the variability is too high". 

You're using the wrong kind of data store - consider a nosql database or some other flexible storage mechanism.

> "I don't need to be able to look at the data, I just need it to be carried along with the process." 

What does it tell you about how you value your data if you're willing to store it just about anywhere? Why are you storing it in the first place? If you need it, dump it in a data store somewhere. Just don't use the process engine as a dump for data you don't care about or can't figure out what to do with. Solve the actual problem instead of working around it.

## Summing up
You should only store simple data types in your automated processes. Even more so, you should only store identifying, control or orchestration data in your process engine's data store. This makes your processes more resilient to change, easier to change when necessary and keeps them focused on the main goal of a process engine: orchestrating the flow of activities and leaving the details and data management to other components that are more suited to the task.

