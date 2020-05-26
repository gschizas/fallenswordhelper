import{L as t,o as e,s as o,bc as n,A as i}from"./calfSystem-740ec4d2.js"
import{d as s}from"./dontPost-e5e24e4d.js"
import{c as p}from"./createInput-e6e1d6b3.js"
import{i as r}from"./insertElementBefore-d3961941.js"
import{i as a}from"./insertHtmlBeforeBegin-3188dd8f.js"
import{i as u}from"./insertHtmlAfterEnd-85b35954.js"
import{i as f}from"./insertElementAfter-c1c5f2c6.js"
import{u as m}from"./updateUrl-66484a50.js"
function c(e){e.preventDefault(),s(t('#pCC input[value="completed"]').parentNode)}function l(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function C(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=p({type:"button",value:"<<"})
r(t,n),u(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=p({type:"button",value:">>"})
f(t,o),a(t,"&nbsp;"),e(t,C)}}(),l("View",m),l("Go",c)}
//# sourceMappingURL=completedArenas-71ce73e0.js.map
