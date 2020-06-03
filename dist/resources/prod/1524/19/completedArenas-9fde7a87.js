import{M as t,o as e,s as o,aZ as n,A as i}from"./calfSystem-6fc0cc1b.js"
import{d as s}from"./dontPost-7996c1bc.js"
import{c as a}from"./createInput-75e5aa25.js"
import{i as p}from"./insertElementBefore-6f4b88f2.js"
import{i as r}from"./insertHtmlBeforeBegin-66902ded.js"
import{i as f}from"./insertHtmlAfterEnd-cb1e0a76.js"
import{i as u}from"./insertElementAfter-9e18ee3b.js"
import{u as c}from"./updateUrl-5273596c.js"
function m(e){e.preventDefault(),s(t('#pCC input[value="completed"]').parentNode)}function l(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function b(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=a({type:"button",value:"<<"})
p(t,n),f(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=a({type:"button",value:">>"})
u(t,o),r(t,"&nbsp;"),e(t,b)}}(),l("View",c),l("Go",m)}
//# sourceMappingURL=completedArenas-9fde7a87.js.map
