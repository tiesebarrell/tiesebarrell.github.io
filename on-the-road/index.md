---
layout: default
title: On the Road
platesEu: 27
platesOther: 13
---
{% assign total = page.platesEu | plus: page.platesOther %}
{% assign euFraction = page.platesEu | times: 100 | divided_by: total %}
{% assign otherFraction = page.platesOther | times: 100 | divided_by: total %}

In following of [this post][on-the-road-again], I am tracking how many different license plates I can spot in the time span of a year. Started on the 7th of August 2017, ending by the 7th of August 2018.

## Current status

<div class="progress">
  <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" style="width: {{euFraction}}%" aria-valuenow="{{page.platesEu}}" aria-valuemin="0" aria-valuemax="{{total}}">{{page.platesEu}} EU plates</div>
  <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" style="width: {{otherFraction}}%" aria-valuenow="{{page.platesOther}}" aria-valuemin="0" aria-valuemax="{{total}}">{{page.platesOther}} Other plates</div>
</div>

## Sightings log

| Date          | Code | Country                | Seen within |
| ------------- | ---- | ---------------------- | ----------- |
| 2017-08-07    | NL   | Netherlands            |             |
| 2017-08-07    | B    | Belgium                |             |
| 2017-08-07    | D    | Germany                |             |
| 2017-08-07    | E    | Spain                  |             |
| 2017-08-07    | EST  | Estonia                |             |
| 2017-08-07    | F    | France                 |             |
| 2017-08-07    | G    | Greece                 |             |
| 2017-08-07    | I    | Italy                  |             |
| 2017-08-07    | LT   | Lithuania              |             |
| 2017-08-07    | P    | Portugal               |             |
| 2017-08-07    | PL   | Poland                 |             |
| 2017-08-07    | RO   | Romania                |             |
| 2017-08-07    | SK   | Slovakia               |             |
| 2017-08-07    | TR   | Turkey                 |             |
| 2017-08-08    | UA   | Ukraine                |             |
| 2017-08-08    | SRB  | Serbia                 |             |
| 2017-08-08    | GB   | Great Britain          |             |
| 2017-08-08    | L    | Luxembourg             |             |
| 2017-08-08    | BG   | Bulgaria               |             |
| 2017-08-08    | CZ   | Czech Republic         |             |
| 2017-08-11    | SLO  | Slovenia               |             |
| 2017-08-11    | MK   | Macedonia              |             |
| 2017-08-11    | LV   | Latvia                 |             |
| 2017-08-11    | H    | Hungary                |             |
| 2017-08-14    | CH   | Switzerland            |             |
| 2017-08-16    | FIN  | Finland                |             |
| 2017-08-18    | BY   | Belarus                |             |
| 2017-08-18    | IRL  | Ireland                |             |
| 2017-08-18    | A    | Austria                |             |
| 2017-08-25    | S    | Sweden                 |             |
| 2017-08-30    | RUS  | Russian Federation     |             |
| 2017-09-03    | HR   | Croatia                |             |
| 2017-09-05    | N    | Norway                 |             |
| 2017-09-06    | BIH  | Bosnia and Herzegovina |             |
| 2017-09-24    | CY   | Cyprus                 |             |
| 2017-10-27    | MA   | Morocco                |             |
| 2017-11-01    | GE   | Georgia                |             |
| 2017-11-13    | MD   | Moldova                |             |
| 2017-11-16    | DK   | Denmark                |             |
| 2017-12-01    | AZ   | Azerbaijan             |             |
| 2017-12-11    | AND  | Andorra                |             |


[on-the-road-again]: ../2017/08/07/On-the-Road-Again.html "On the Road Again"