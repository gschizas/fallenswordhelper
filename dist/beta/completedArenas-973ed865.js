import{R as t,o as e,P as n,_ as o,v as a,U as p,bh as i,D as s}from"./calfSystem-07c25a1c.js"
import{d as u}from"./dontPost-cc24ebb5.js"
import{c}from"./createInput-2b2e8237.js"
import{i as f}from"./insertHtmlBeforeBegin-a38d5f5e.js"
import{u as r}from"./updateUrl-b4e629af.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function b(t){window.location=`${i}completed&page=${t}`}function d(){b(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=c({type:"button",value:"<<"})
n(t,p),o(t,"&nbsp;"),e(t,a(b,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=c({type:"button",value:">>"})
p(t,n),f(t,"&nbsp;"),e(t,d)}}(),m("View",r),m("Go",l)}
//# sourceMappingURL=completedArenas-973ed865.js.map
