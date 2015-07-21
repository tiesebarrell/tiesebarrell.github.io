---
layout: post
title: More on Orchestration Data
links: 
 - link: ../../../2014/06/29/Storing-data-in-processes.html
   name: Storing data in automated business processes
tags: [architecture,bpm]
location: Heerlen
excerpt: Your process engine [may not need your data](../../../2014/06/29/Storing-data-in-processes.html), but the orchestration it's performing might.
tldr: Some data is only available in your process because the orchestration has taken place. This includes information that was taken into account while performing the execution and has no history and therefore cannot be retrieved in retrospect. In such cases the data should be stored in the process engine's data storage.
---

![Conducting the orchestration][conductors-baton]   

In an [an earlier blogpost][storing-data-in-processes], I made the case for storing as little information in the datastore of your process engine as you can possibly get away with. In summary, there are three main kinds of information that warrant storage in the engine:

* **Identifying data**: data that uniquely identifies the data being handled in a case by referring to the data, which itself is stored elsewhere. Typically, if you think of a process definition as a blueprint for the process and process instances (cases) as occurrences of that blueprint, it's exactly the identifying data that distinguishes one process instance from the other.
* **Control data**: data that is required in order to perform the orchestration. This includes decisions, variation flags, and data derived during the process that is stored to prevent having to perform the same derivation multiple times. Control data is data that influences the *flow* of the process instance.
* **Orchestration data**: data that, again, is required to perform the orchestration. As opposed to control data, this normally refers to data that only exists because there is an orchestration in the first place. Examples include data that is stored to be used in subsequent steps of the process or is never needed in other storage outside the engine.

##Example: Negotiating a car sale

Orchestration data is best explained using an example. If you consider business processes that are long-running by nature, or even those where milliseconds count, time becomes an important factor in orchestration. Consider negotiating a car sale:

* **You**: I'd like to buy this car. What price can you offer me?
* **Sales guy**: I can go as low as $20.000 for you.
* **You**: That seems a bit steep. And if I pay cash?
* **Sales guy**: Sorry, that's still the best I can do.
* **You**: Hmmm. Well, I guess I should look elsewhere for a new car and some insurance.
* **Sales guy**: So, how does $18.500 with insurance sound?

In this example, time matters because the sales representative initially wasn't aware that you were looking for a car *and* insurance. At a later point in the process, this extra bit of information became available and influenced the price offered. You could argue that this is merely because cars with insurance can be offered for a different price and it makes no difference *when* the price is determined. From the process' perspective however, there are two moments when the representative performs a calculation of a price to offer. In both circumstances, the available information is different and the calculation yields a different price as a result.

In a more general sense, this illustrates exactly what is meant by orchestration data: data that only exists because we are performing an automated orchestration. It may be important to know at some point in the process that other information was considered at an earlier point in the same process. That data then needs to be available, but only pertains to the orchestration at hand. Let's look at another example.

##Example: Making credit card offerings

Imagine a credit card service that offers you a credit card with a limit based purely on your credit rating. You request a credit card in May and you receive an offer based on your credit rating at that moment. While you consider the offer, you decide that this is quite a good deal and you won't need your other cards any more, so you cancel them during the Summer holidays. You then apply for the new credit card by taking up the offer in August. At the credit card service, they will perform a new calculation. It turns out your rating has since increased and they can offer you a higher limit.

The only way to enable this kind of process is by storing the credit rating you had in May and comparing it to the current one after some time has passed. The process may still have rules regarding whether or not to act on differences and what it considers a significant change, but it needs the data that was used or available in the past to do any kind of comparison in the first place. Only in the orchestration is such data relevant.

Sometimes, data that is needed during the orchestration is also only available *at that point in time*. You can probably request credit ratings for any historic date, but in some cases, you can only get the *current* data for a piece of information. Especially in those cases you are forced to record some key data in the process engine's data store to make sure it remains available to the orchestration for later reference.

##In summary
Some data is simply only available because there is an orchestration of a process. Data becomes available during the process and needs to be stored for future reference because the information that was taken into account in one step of the process is relevant in a future step or because comparisons need to be done between values determined in similar activities as time passes. These kinds of orchestration data or references to them should be stored in the data storage of the process engine.


[storing-data-in-processes]: ../../../2014/06/29/Storing-data-in-processes.html "Storing data in automated business processes"
[conductors-baton]: ../../../assets/images/posts/conductors-baton.jpg  "Conducting the orchestration"
