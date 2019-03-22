---
layout: post
title: The spy who nagged me
redirect_from:
 - /2014/08/09/The-spy-who-nagged-me.html
tags: [mockito, activiti]
links: 
 - link: https://code.google.com/p/mockito/
   name: Mockito
 - link: http://docs.mockito.googlecode.com/hg/latest/org/mockito/Mockito.html#13
   name: Mockito - Spying on real objects
location: The Hague
---
After bumping into this issue for the third time, it was about time I documented it, if only as a reminder to myself. Over the past year, I've become an enthusiastic user of the [Mockito](https://code.google.com/p/mockito/ "Visit the Mockito project") mocking framework for unit testing. But then along came the spy who nagged me.

## The case
When performing automated testing of business processes with [Activiti](http://activiti.org/ "Activiti website"), Mockito is an excellent fit. Activiti itself already provides good support for unit testing and Mockito adds precisely the behavior I need to that. The way we test processes is pretty straightforward. All processes powered by Activiti delegate their service calls to a single and dedicated component, which we dub the "process delegate". The delegate is responsible for directing service invocations to the relevant services in the backing application. Besides isolation of functionality and separation of concerns, this design provides an easy way to unit test processes.

The aim of the tests is to test the flow and configuration of the process. We want to make sure the process follows the correct flows at the right moments and invokes the expected services with the correct values as input. We're not particularly interested in invoking the underlying application services as part of these tests, as they have their own dependencies and setup requirements which would complicate matters beyond the point where we can still get a decent return on investment from our integration tests. For this reason, we create mocks of the process delegate and mock the behavior we expect for the test cases we are running.

We also have some special test cases, where it's possible to start multiple similar process instances, for instance for the same customer. In these processes, the process instances interact with each other, by querying Activiti's API and sending signals to each other to react to certain events. These are the slightly harder cases to test. Since the process delegate is the designated place to code such interactions (it's one of the very few component layers allowed to import Activiti API classes), a mock of the delegate will not suffice for testing: we want to invoke the *actual* implementation to make sure this all works fine if there are actual running process instances (as opposed to unit testing the delegate itself).

## Spying on objects
Mockito provides functionality for such cases. In addition to <code>Mock</code>s, you can create <code>Spy</code> objects on real objects. A <code>Spy</code> allows you to create a partial mock of an object, which we use to cherry-pick behavior we would like to mock and behavior we would like to actually invoke.

A piece of test code with a spy could look like this:

{% highlight java %}
@Inject
private PurchaseToPayProcessDelegate actualDelegate;

private PurchaseToPayProcessDelegate processDelegate;

// in setup
processDelegateSpy = Mockito.spy(actualDelegate);

// mock this service call
when(processDelegateSpy.checkOrder(orderId))
  .thenReturn(true);

// test the real implementation
when(processDelegateSpy.checkForRunningProcesses(customerId))
  .thenCallRealMethod();
{% endhighlight %}

As you can see, the actual implementation can be injected (in our cases, it's a [Spring](http://spring.io) bean). A <code>Spy</code> is then created on that object to allow for mocking behavior. The <code>checkOrder</code> method is a regular call we want to just mock. The <code>checkForRunningProcesses</code> method however checks for other Activiti processes and we want to use the real implementation in the process delegate. To do that, we can use the <code>thenCallRealMethod()</code> method from Mockito. This is why we use a <code>Spy</code> if the process has such cases (if not, we just use a regular <code>Mock</code>).

## The snag

However, there's a snag with spying on real objects: the default behavior is to invoke the real method. This manifests itself as a vast array of seemingly odd test failures, all of which have one thing in common: your real implementation is invoked when you don't want it to be. In this case, all of my tests suddenly started failing after adding a new <code>Validate.notNull(processInstanceId)</code> on a process delegate's method. Which, of course, should **never, ever** happen, because it would mean Activiti was executing a process instance and didn't know the <code>processInstanceId</code> of its own <code>Execution</code>.

The first place to look is the process definition itself. Maybe something isn't configured right. But since the process actually already *works*, it's unlikely the <code>Validate.notNull()</code> would be the first to run into this problem. Especially because the implementation in the process delegate already uses the <code>processInstanceId</code> that's passed in.

The second hunch is to have a good, hard stare at our <code>when(someMock).thenReturn()</code> expectation setup in the test. In my experience, if tests start acting strange by not invoking or actually invoking mocked behavior in the wrong way, it's often because there was some change to the invocation which resulted in the arguments of the <code>when()</code> no longer matching. Which means the conditions aren't met any more and Mockito gladly ignores the behavior you tried to mock because you are now mocking them for conditions which no longer apply. Turns out, nothing's changed in that regard. We just added the <code>Validate.notNull()</code>.

Wait a minute. We only added the <code>Validate.notNull()</code> and it trips. But that means our real implementation is being invoked. Since we didn't change anything else, that indicates it was being called all along, but somehow never resulted in a failure before. That's the point where I realize I've tackled this problem before. The following documentation annotation from the Mockito framework comes to mind:

> **Important gotcha on spying real objects!**
>
> Sometimes it's impossible or impractical to use <code>when(Object)</code> for stubbing spies. Therefore when using spies please consider <code>doReturn|Answer|Throw()</code> family of methods for stubbing. 
> 
> Source: [Mockito documentation](http://docs.mockito.googlecode.com/hg/latest/org/mockito/Spy.html)

Now if you haven't used this stuff much, that's still rather cryptic. Put simply it means this: if you're using a <code>Spy</code> and not a <code>Mock</code>, you should change this:

{% highlight java %}
when(processDelegateSpy.checkOrder(orderId))
  .thenReturn(true);
when(processDelegateSpy.checkForRunningProcesses(customerId))
  .thenCallRealMethod();
{% endhighlight %}

to this:

{% highlight java %}
doReturn(true)
  .when(processDelegateSpy).checkOrder(orderId);
doCallRealMethod()
  .when(processDelegateSpy).checkForRunningProcesses(customerId);
{% endhighlight %}

Similarly, you should use this test code for void methods on a <code>Spy</code>:

{% highlight java %}
doNothing()
  .when(processDelegateSpy).sendOrderConfirmation(orderId);
{% endhighlight %}

In plain terms, you put the desired behavior first and the condition second. The same applies to throwing exceptions or using <code>thenAnswer()</code> type mocking behavior. Otherwise, the behavior gets executed on the spot when setting up the expectation in your test. Which had apparently always been happening in my test, but coincidentally never resulted in errors.






