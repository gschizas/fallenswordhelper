import{N as t,o as e,s as o,b5 as n,A as i}from"./calfSystem-1c103624.js"
import{d as s}from"./dontPost-f9ce543e.js"
import{c as a}from"./createInput-7f1f4562.js"
import{i as p}from"./insertElementBefore-0e09c5df.js"
import{i as r}from"./insertHtmlBeforeBegin-ff6f06a1.js"
import{i as f}from"./insertHtmlAfterEnd-cca1ed99.js"
import{i as u}from"./insertElementAfter-7a31764a.js"
import{u as c}from"./updateUrl-44ce0828.js"
function m(e){e.preventDefault(),s(t('#pCC input[value="completed"]').parentNode)}function l(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function C(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=a({type:"button",value:"<<"})
p(t,n),f(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=a({type:"button",value:">>"})
u(t,o),r(t,"&nbsp;"),e(t,C)}}(),l("View",c),l("Go",m)}
//# sourceMappingURL=completedArenas-2646b1e4.js.map
