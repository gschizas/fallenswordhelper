import{M as t,o as e,s as o,aZ as n,A as i}from"./calfSystem-8b6534a5.js"
import{d as a}from"./dontPost-10e2d3b5.js"
import{c as s}from"./createInput-a695d53e.js"
import{i as p}from"./insertElementBefore-91801123.js"
import{i as r}from"./insertHtmlBeforeBegin-ab576692.js"
import{i as f}from"./insertHtmlAfterEnd-4546785f.js"
import{i as u}from"./insertElementAfter-f214147b.js"
import{u as m}from"./updateUrl-9a36f3fb.js"
function l(e){e.preventDefault(),a(t('#pCC input[value="completed"]').parentNode)}function c(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function b(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=s({type:"button",value:"<<"})
p(t,n),f(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=s({type:"button",value:">>"})
u(t,o),r(t,"&nbsp;"),e(t,b)}}(),c("View",m),c("Go",l)}
//# sourceMappingURL=completedArenas-84a6adbe.js.map
