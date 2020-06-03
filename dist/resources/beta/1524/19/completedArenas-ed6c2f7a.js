import{M as t,o as e,s as o,a$ as n,A as i}from"./calfSystem-57340987.js"
import{d as s}from"./dontPost-e24d8962.js"
import{c as p}from"./createInput-b52727dd.js"
import{i as r}from"./insertElementBefore-69bb0e1f.js"
import{i as a}from"./insertHtmlBeforeBegin-ef1c12da.js"
import{i as f}from"./insertHtmlAfterEnd-c6138b5e.js"
import{i as u}from"./insertElementAfter-7d3f2313.js"
import{u as m}from"./updateUrl-705783d5.js"
function l(e){e.preventDefault(),s(t('#pCC input[value="completed"]').parentNode)}function c(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function C(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=p({type:"button",value:"<<"})
r(t,n),f(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=p({type:"button",value:">>"})
u(t,o),a(t,"&nbsp;"),e(t,C)}}(),c("View",m),c("Go",l)}
//# sourceMappingURL=completedArenas-ed6c2f7a.js.map
