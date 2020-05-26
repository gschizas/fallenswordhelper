import{M as t,o as e,s as o,bk as n,A as i}from"./calfSystem-ee582533.js"
import{d as a}from"./dontPost-2a1b6847.js"
import{c as s}from"./createInput-2410e798.js"
import{i as p}from"./insertElementBefore-7ed837be.js"
import{i as r}from"./insertHtmlBeforeBegin-66a80e13.js"
import{i as f}from"./insertHtmlAfterEnd-4dbaaf09.js"
import{i as u}from"./insertElementAfter-0f11924a.js"
import{u as m}from"./updateUrl-2f469a7c.js"
function l(e){e.preventDefault(),a(t('#pCC input[value="completed"]').parentNode)}function c(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function C(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=s({type:"button",value:"<<"})
p(t,n),f(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=s({type:"button",value:">>"})
u(t,o),r(t,"&nbsp;"),e(t,C)}}(),c("View",m),c("Go",l)}
//# sourceMappingURL=completedArenas-60da275d.js.map
