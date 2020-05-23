import{R as t,o as e,P as n,_ as o,v as a,U as p,bh as i,D as s}from"./calfSystem-fb94ddf0.js"
import{d as u}from"./dontPost-9febdb8a.js"
import{c as f}from"./createInput-ba8eca60.js"
import{i as c}from"./insertHtmlBeforeBegin-cc8a3eeb.js"
import{u as r}from"./updateUrl-e00f8709.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function b(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=f({type:"button",value:"<<"})
n(t,p),o(t,"&nbsp;"),e(t,a(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=f({type:"button",value:">>"})
p(t,n),c(t,"&nbsp;"),e(t,b)}}(),m("View",r),m("Go",l)}
//# sourceMappingURL=completedArenas-d8e4dbac.js.map
