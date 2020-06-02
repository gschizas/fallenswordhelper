import{M as t,o as e,s as o,a$ as n,A as i}from"./calfSystem-9554b525.js"
import{d as a}from"./dontPost-03651e75.js"
import{c as s}from"./createInput-73435eda.js"
import{i as p}from"./insertElementBefore-5f238f78.js"
import{i as r}from"./insertHtmlBeforeBegin-f4dec0f3.js"
import{i as f}from"./insertHtmlAfterEnd-b9b58b3d.js"
import{i as u}from"./insertElementAfter-6879a7fc.js"
import{u as m}from"./updateUrl-44a8065a.js"
function l(e){e.preventDefault(),a(t('#pCC input[value="completed"]').parentNode)}function c(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function C(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=s({type:"button",value:"<<"})
p(t,n),f(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=s({type:"button",value:">>"})
u(t,o),r(t,"&nbsp;"),e(t,C)}}(),c("View",m),c("Go",l)}
//# sourceMappingURL=completedArenas-4df95006.js.map
