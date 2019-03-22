---
layout: post
title: Need something? Contribute it yourself!
redirect_from:
 - /2014/05/06/Need-something-contribute-it.html
tags: [activiti, bpm, oss]
location: Eindhoven
---

One of the beautiful things about open source is that you can have a look under the hood to find out why things work the way they do. I recently ran into one of those things with [Activiti](http://activiti.org) and decided it wasn't fitting my needs. Instead of working around the problem, I decided to have a look myself, think of how to customize behavior for my needs and then merrily move along. Except I didn't. Turns out, my particular needs weren't so particular. So I ended up adding a new feature to Activiti itself.

## Deploying process definitions

Running process instances in Activiti relies on process definitions being *deployed* to Activiti's process engine, effectively requiring the BPMN XML file(s) to be added into Activiti's internal tables. If you're using [Spring framework](http://springframework.org) with Activiti, there's a neat feature that allows you to leverage Spring's capability to scan the classpath for resources matching a certain pattern and deploy all such resources to Activiti when the Spring context is initialized. This feature is documented [here](http://activiti.org/userguide/index.html#N109AE) in the userguide. In your configuration, you would have something like this:

{% highlight xml %}
<bean id="processEngineConfiguration" 
      class="org.activiti.spring.SpringProcessEngineConfiguration">
	<property name="deploymentResources" value="classpath*:/*.bpmn" />
</bean>
{% endhighlight %}

The main advantage to this configuration option is that all of the BPMN resources that match the pattern will automatically be available within Activiti once the application is started. In our case, all process definitions on the classpath *are* the processes in use in the application, so it makes sense to use this option. It will even check whether the processes have actually changed before deploying instead of blindly deploying new versions at every restart of the Spring context. After having used this option succesfully for a while in the application I'm working on, we discovered that there seemed to be too many versions of certain process definitions in our Activiti dashboard. We hadn't changed these processes that often. Also, the application had been restarted many more times than there were new versions, so the number of redeployed versions was somewhere between our expectations (low) and our first hunch (one for every restart - very undesirable).

## Sources to the rescue

An investigation of the <code>SpringProcessEngineConfiguration</code> class showed that detecting whether the processes have changed is applied at the *deployment* level, not the process definition level. The auto-deployment option groups all resources into one big deployment every time, so if only one of the processes has changed, this results in new versions of *all* the process definitions because the deployment they all share is considered changed.

To fix this is easy enough. You can simply subclass <code>SpringProcessEngineConfiguration</code> and override the appropriate method, <code>autoDeployResources()</code>. Implement the deployment in whichever way fits your needs. Then, just reference your own subclass as the process engine's configuration.

{% highlight xml %}
<bean id="processEngineConfiguration" 
      class="org.acme.AcmeProcessEngineConfiguration">
	<property name="deploymentResources" value="classpath*:/*.bpmn" />
</bean>
{% endhighlight %}

## Contributing the generalized option

Although the  above option is perfectly feasible, there's the consideration of maintenance. I didn't really fancy maintaining our own subclass of <code>SpringProcessEngineConfiguration</code> and realized being able to customize this behavior was probably something others could benefit from as well. So I contacted the guys at the Activiti team and [proposed to make the deployment behavior customizable](https://github.com/Activiti/Activiti/pull/253). 

You can now configure the <code>SpringProcessEngineConfiguration</code> to use the original behavior. But you can also specify two new modes. One (which we'll be using) considers each individual resource found as belonging to its own deployment and will check for changes against its previous version before deploying. The other mode does the deployments in a similar way, but considers resources with the same parent folder as groups for a single deployment, which allows you to structure your process definitions slightly. 

As an added benefit, the change also allows you to easily add new deployment modes. Simply subclass <code>SpringProcessEngineConfiguration</code> and override the <code>getAutoDeploymentStrategy()</code> method. Supply a strategy that handles your specific mode and configure it in the XML.

{% highlight xml %}
<bean id="processEngineConfiguration" 
      class="org.acme.AcmeProcessEngineConfiguration">
	<property name="deploymentResources" value="classpath*:/*.bpmn" />
	<property name="deploymentMode" value="default | single-resource | resource-parent-folder | my-custom-mode" />
</bean>
{% endhighlight %}