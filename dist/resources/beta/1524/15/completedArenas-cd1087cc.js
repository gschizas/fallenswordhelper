import{L as t,o as e,s as o,be as n,A as i}from"./calfSystem-1262535f.js"
import{d as s}from"./dontPost-780742ab.js"
import{c as a}from"./createInput-62cab8cf.js"
import{i as p}from"./insertElementBefore-dcdbe7ae.js"
import{i as r}from"./insertHtmlBeforeBegin-5ac12245.js"
import{i as u}from"./insertHtmlAfterEnd-2dcd57ed.js"
import{i as f}from"./insertElementAfter-b1db9c91.js"
import{u as c}from"./updateUrl-17430bd2.js"
function m(e){e.preventDefault(),s(t('#pCC input[value="completed"]').parentNode)}function l(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function b(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=a({type:"button",value:"<<"})
p(t,n),u(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=a({type:"button",value:">>"})
f(t,o),r(t,"&nbsp;"),e(t,b)}}(),l("View",c),l("Go",m)}
//# sourceMappingURL=completedArenas-cd1087cc.js.map
