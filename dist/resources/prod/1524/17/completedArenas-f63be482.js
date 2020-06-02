import{M as t,o as e,s as o,aZ as n,A as i}from"./calfSystem-dec5e071.js"
import{d as s}from"./dontPost-5930c5be.js"
import{c as p}from"./createInput-6f4c3b04.js"
import{i as r}from"./insertElementBefore-1d764477.js"
import{i as a}from"./insertHtmlBeforeBegin-4f6b924a.js"
import{i as u}from"./insertHtmlAfterEnd-52e450d3.js"
import{i as f}from"./insertElementAfter-5bd77494.js"
import{u as m}from"./updateUrl-b1cce363.js"
function c(e){e.preventDefault(),s(t('#pCC input[value="completed"]').parentNode)}function l(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function b(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=p({type:"button",value:"<<"})
r(t,n),u(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=p({type:"button",value:">>"})
f(t,o),a(t,"&nbsp;"),e(t,b)}}(),l("View",m),l("Go",c)}
//# sourceMappingURL=completedArenas-f63be482.js.map
