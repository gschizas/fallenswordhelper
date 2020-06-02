import{M as t,o as e,s as o,a$ as n,A as i}from"./calfSystem-02ae8657.js"
import{d as s}from"./dontPost-c73663bf.js"
import{c as a}from"./createInput-cbb1c2cb.js"
import{i as p}from"./insertElementBefore-35d3b41e.js"
import{i as r}from"./insertHtmlBeforeBegin-d5084f64.js"
import{i as f}from"./insertHtmlAfterEnd-23545b48.js"
import{i as u}from"./insertElementAfter-17facfb9.js"
import{u as c}from"./updateUrl-c3fdab4c.js"
function m(e){e.preventDefault(),s(t('#pCC input[value="completed"]').parentNode)}function l(o,n){e(t(`#pCC input[value="${o}"]`),n)}function b(t){window.location=`${n}completed&page=${t}`}function d(){b(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=a({type:"button",value:"<<"})
p(t,n),f(t,"&nbsp;"),e(t,o(b,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=a({type:"button",value:">>"})
u(t,o),r(t,"&nbsp;"),e(t,d)}}(),l("View",c),l("Go",m)}
//# sourceMappingURL=completedArenas-e945c5a4.js.map
