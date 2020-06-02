import{N as e,o as t,s as o,b5 as n,A as i}from"./calfSystem-d49dbbd3.js"
import{d as s}from"./dontPost-9ae48c7f.js"
import{c as p}from"./createInput-1699d448.js"
import{i as a}from"./insertElementBefore-5eb6d41d.js"
import{i as r}from"./insertHtmlBeforeBegin-7716e1e2.js"
import{i as u}from"./insertHtmlAfterEnd-43b283e0.js"
import{i as f}from"./insertElementAfter-e7cdbe3b.js"
import{u as m}from"./updateUrl-cbaa891e.js"
function c(t){t.preventDefault(),s(e('#pCC input[value="completed"]').parentNode)}function l(o,n){t(e(`#pCC input[value="${o}"]`),n)}function d(e){window.location=`${n}completed&page=${e}`}function b(){d(i(e('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=e('#pCC input[value="<"]')
if(n){const e=p({type:"button",value:"<<"})
a(e,n),u(e,"&nbsp;"),t(e,o(d,1))}}(),function(){const o=e('#pCC input[value=">"]')
if(o){const e=p({type:"button",value:">>"})
f(e,o),r(e,"&nbsp;"),t(e,b)}}(),l("View",m),l("Go",c)}
//# sourceMappingURL=completedArenas-2e04e136.js.map
