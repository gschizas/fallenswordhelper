import{M as t,o as e,s as o,a$ as n,A as i}from"./calfSystem-4197cc22.js"
import{d as a}from"./dontPost-c8e8377e.js"
import{c as s}from"./createInput-c03bcf66.js"
import{i as p}from"./insertElementBefore-fe70cd72.js"
import{i as r}from"./insertHtmlBeforeBegin-ee36aa93.js"
import{i as u}from"./insertHtmlAfterEnd-33a3ae32.js"
import{i as c}from"./insertElementAfter-4b83d56c.js"
import{u as f}from"./updateUrl-3c221329.js"
function m(e){e.preventDefault(),a(t('#pCC input[value="completed"]').parentNode)}function l(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function C(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=s({type:"button",value:"<<"})
p(t,n),u(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=s({type:"button",value:">>"})
c(t,o),r(t,"&nbsp;"),e(t,C)}}(),l("View",f),l("Go",m)}
//# sourceMappingURL=completedArenas-0a661562.js.map
