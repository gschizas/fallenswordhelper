import{N as t,o as e,s as o,b5 as n,A as i}from"./calfSystem-f7574730.js"
import{d as s}from"./dontPost-f800280d.js"
import{c as a}from"./createInput-ca63b3fd.js"
import{i as p}from"./insertElementBefore-b5c9c232.js"
import{i as r}from"./insertHtmlBeforeBegin-474099b5.js"
import{i as f}from"./insertHtmlAfterEnd-38a30874.js"
import{i as u}from"./insertElementAfter-3b34b5ac.js"
import{u as m}from"./updateUrl-1670c59a.js"
function c(e){e.preventDefault(),s(t('#pCC input[value="completed"]').parentNode)}function l(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function b(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=a({type:"button",value:"<<"})
p(t,n),f(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=a({type:"button",value:">>"})
u(t,o),r(t,"&nbsp;"),e(t,b)}}(),l("View",m),l("Go",c)}
//# sourceMappingURL=completedArenas-494fd1f0.js.map
