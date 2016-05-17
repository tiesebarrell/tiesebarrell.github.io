---
layout: post
title: This Engineer Doesn't Despise Agile
links: 
 - link: https://age-of-product.com/engineers-despise-agile/
   name: Why Engineers Despise Agile
tags: [agile,tech]
location: "'s Hertogenbosch"
excerpt: "Agile working is not without its own problems. That doesn't mean that engineers necessarily dislike it for what it offers."
tldr: "I don't believe engineers despise agile, but generally appreciate what it tries to accomplish. Like any way of working, it's hard to get right, takes a lot of effort and will continue to do so as the world around the team evolves. Don't blame the method if you're struggling. You get a new chance to improve every 2 or so weeks."
---
![Balance][balance]

I recently read the post [Why Engineers Despise Agile][why-engineers-despise-agile]. It contains a lot of valid points about agile, none of which however have made [*this* engineer][about] come to despise agile. Let me explain why by going through the categories mentioned in the article: control, manipulation, monitoring, technology and teamwork.

## Control
I have little to add to this aspect, although I don't see that increased surveillance is a neccessary outcome of not empowering teams in a control-oriented organization. The cases I've witnessed are far more characterized by a complete lack of interest in creating a learning organization by giving teams more responsibility and autonomy. Which in practice means management takes more of an approach best summarized as: "Sure, you software guys go do your agile thing over there. As long as you deliver on time, full scope at the estimated project cost". Agile becomes an effort within just the team and management continues to excert control in exactly the same manner they've always done, because that enables them to keep telling each other they're doing their jobs and everything is running smoothly.

## Manipulation
The reasoning here is that, by applying a seemingly simple set of rules to the way work is done, but losing the value of those rules in the process creates the perception that the approach is yet another management fad. I would agree that many attempts to implement agile suffer from ritual-weariness: the feeling that seeps in after a couple of unsuccessful sprints that the team is just going through the motions but is unable to improve and become more predictable. There is no rhythm to be found as advertised. However, I've seldom seen this weariness arise as the result of somebody outside the team dictating rules to live by. 

In most cases, the team wanted this way of working for themselves, but they struggle at implementing it and reaping the benefits they've heard about that are supposed to come from it. There are all sorts of reasons for struggling, such as not actually thinking of planning in an agile way, not attending properly to refining the product backlog in time or the inability to see ways to "slice" work into small enough chunks to have stories that can be completed with a reasonable amount of effort. Management dictating following a restrictive set of rules that limit the team's potential to deliver? Nope, never seen it.

## Monitoring
> Agile mechanics are adopted whenever beneficial, but the culture itself is not changed.

This pretty much proves the point that the problem is not in the method, but the way it is implemented. If you want to implement agile, first ask yourself why. What do you hope to accomplish? The culture is a natural part that might need changing. The need for more agility should be supported by a business' desire to get functionality delivered with more flexibility, interaction and predictability. I'm not arguing that business owners or management are often late to the game and many agile initiatives start bottom-up from teams wanting to work this way, but that doesn't mean a more comprehensive approach isn't required at some point to make it really work. It's like a business behemoth starting a "we do lean startups too" initiative where it takes a solid business plan and year-and-a-half approval process to start testing some ideas. Anything you don't *enable* to work, will not. Agile is no exception - why would it be?

> The all important metrics of Agile are story points and velocity, 
> and Jira acts as the manifestation of the resulting bureaucratic overhead: 
> have a ticket for each and everything to make every engineer’s performance visible.

These *are* the important metrics, but why Jira must become a tool to record bureaucratic overhead, I don't understand. How to use an issue tracking tool is completely up to the team and has nothing to do with agile. If the team prefers short story descriptions with points attached to them, that's all they need to track - it's their tool. If the team works better with more elaborate use of a tool, that's fine too. 

There is no inherent bureaucracy attached to creating a list of work to be done, putting it in order of priority and assigning each item an estimation of the effort involved to get it done (i.e. creating a backlog) - you'll need to do at least that in pretty much any project approach. You could have done it in Excel or put it on a whiteboard. It just turns out tools like Jira help out with the repetitive stuff, are easily made accessible to others and generate some statistics such as velocity for past sprints. That's why people use them - it helps get the job done. Engineers I know tend to loathe and avoid tools of any kind that get in their way of being productive. The success of such tools seems to indicate that issue trackers, however imperfect maybe, have been widely adopted despite engineers' sceptical attitude. If you use them to track individual performance, that's your choice and quite a silly one. Almost as silly as measuring developers' performance using lines of code as a metric of productivity.

While agile may lead to more information, I have not witnessed it resulting in more micro-management. Most teams I've been a part of don't mind being transparent about progress. Actually, teams struggling with demonstrable progress might embrace the opportunity to show that delays are often caused by external factors the team can influence only in part. If management keeps breaking open sprint targets and/or changing business priorities or the team's progress is suffering from time draining maintenance work and bug hunting, the only way to do something about it is to start by putting the information right out there.

> By making the "tech" visible for non-technical people, it enables those to gain a sort of managerial control over territory that they could not exercise before.

Really? Non-technical people typically run as soon as "tech" comes up. In my experience, transparency about the technical work being performed involves non-developers as they slowly gain more understanding of the domain. The discussion it brings up in turn leads to more insight for technical people as far as business priorities are concerned. As a team, you learn from each other and improve the cooperation. This makes a team ever more effective. I heard a product owner say: "By now, I sometimes find myself starting to understand what you [developers] are talking about." While you learn and improve as a team by gradually appreciating more details about each other's expertise, management is typically focussed on the bigger picture, not on micro-managing work.

> Built on top of this are forced commitments without having the authority to actually make them happen.

Again, this is an organizational problem. If management is strong-arming a development team to commit to work they have no control over delivering, there's an issue with the way you're delegating work. No way of working is going to protect the team in that case. If anything, agile's open information is at least going to make it painfully transparent how disfunctional the operation is.

## Technology

> Agile fails to deliver–as promised by the Agile Manifesto–an engineering driven development. Decisions are still business-driven, made by people without an understanding of technology.

Well sure they are. As they should be. If you're the type of engineer that thinks you're creating things just for the sake of technology, maybe you should look around you a bit more. Personally, I prefer engineering stuff that somebody actually uses for the business value it brings. I don't expect agile to create some *technolorgy* playground culture.

On the point of technical debt, this again has little to do with agile. Focussing on delivering functionality each sprint definitely challenges a team to tackle technical debt. You will have technical debt with almost any approach. Part of the challenge of being a creative engineer is finding a way to control it. With short iterations, that means controlling it more often - exactly the way you slice user stories into smaller chunks of work. You should be reducing technical debt in each and every sprint. Which means you can fit in less functionality. That's why if you're really focussed on quality, it's in the definition of done that technical debt is either solved or planned. Address it and plan for it. It's part of the work that needs to be done.

## Teamwork

> There is no room for the individual in Agile. It does not respect seniority and personal growth of the individual engineer, as there are no longer tech leads.

I could not disagree more. In every team I've been, I've felt I have something to add to the team. What that is, may differ from one team to the next or from one period to the next within the same team. There are always challenges to learn new things, to provide existing expertise and there is experience to be gained from new ways of approaching problems. The same goes for the other team members: they all bring something to the table in terms of experience or expertise. Agile is not holding me back from developing, learning or sharing knowledge with others. Agile enables an individual to flourish within the *multidisciplinary* team by being a *real team player*. Outside the team the experience can be put to good use too and usually is. If you're all bent up on becoming a "tech lead" because you value the title itself over actual growth, I think you're looking at it the wrong way. 

You are not turned into a "replaceable cog in the machinery" if you don't want to be. Becoming a "tech lead" and isolating your own little comfy space to rule as king stifles you even more than it does the environment, in the long run. There are many choices to make, but the one you should probably not experiment with is whether to keep learning. Show some humility first, some vulnerability after and some progress to follow. Go out there, take part, be open and learn. There's more than plenty to develop yourself (pun intended). If not the most important, of course, the way of working can enable the possibilities you have, but I don't see why agile would be any more restrictive than others - I certainly don't feel it is.

I love being in a team. I'm not interested in everything technical that comes by - there may be someone else taking up one part while I focus on other things, technical or otherwise. It's a team effort. I want to learn about the business my work is meant to support. I want to get involved and participate in "rituals" that help us first get work done, then learn from each other and finally improve along the way. It also gets me unglued from the screen every once in a while, which is not just good for me, but also helps to have a fresh look at challenges.

## Conclusion
[The article][why-engineers-despise-agile] points to a lot of valid, common problems when implementing agile. But many engineers I know don't despise the methodology because of the problems encountered while implementing it. 

I remember the phrase: "It simple to understand, but extremely hard to do". I believe many engineers see through the failed attempts and don't blame the method for the mistakes people make while trying to use it. 

This doesn't mean agile doesn't have drawbacks or is the silver bullet for any development team. What I like though is that it focusses on improving the effectiveness of the team by being transparant and working closely with those who need the functionality the team produces. I'll give any way of working a chance that promotes that attitude combined with a "Think big, act small" approach. As always, there will be bumps in the road. But that's why people came up with shock breakers - there will be ways to deal with the bumps. Have a critical look at how you're working instead of writing off a method that offers some good ideas and values based on lots of experience.

As for the article, maybe a better title would have been "Why Engineers Despise Poor Agile Implementations". 

[balance]: ../../../assets/images/posts/balance.jpg  "Balance"
[why-engineers-despise-agile]: https://age-of-product.com/engineers-despise-agile/ "Why Engineers Despise Agile"
[about]: ../../../about.html "About"
