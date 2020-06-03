import{N as t,o as e,s as o,b5 as n,A as i}from"./calfSystem-5545a3e6.js"
import{d as s}from"./dontPost-14e1d4b8.js"
import{c as a}from"./createInput-836d9f1f.js"
import{i as p}from"./insertElementBefore-babbeb6f.js"
import{i as f}from"./insertHtmlBeforeBegin-e7607ccd.js"
import{i as r}from"./insertHtmlAfterEnd-489f5b87.js"
import{i as u}from"./insertElementAfter-a43cfe0f.js"
import{u as m}from"./updateUrl-f2860fab.js"
function c(e){e.preventDefault(),s(t('#pCC input[value="completed"]').parentNode)}function l(o,n){e(t(`#pCC input[value="${o}"]`),n)}function b(t){window.location=`${n}completed&page=${t}`}function d(){b(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=a({type:"button",value:"<<"})
p(t,n),r(t,"&nbsp;"),e(t,o(b,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=a({type:"button",value:">>"})
u(t,o),f(t,"&nbsp;"),e(t,d)}}(),l("View",m),l("Go",c)}
//# sourceMappingURL=completedArenas-0667c615.js.map
