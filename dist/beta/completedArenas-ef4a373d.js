import{R as t,o as e,P as n,_ as o,v as a,U as p,bh as i,D as s}from"./calfSystem-c91e004c.js"
import{d as u}from"./dontPost-2d911553.js"
import{c as f}from"./createInput-2ffac67f.js"
import{i as c}from"./insertHtmlBeforeBegin-31134dae.js"
import{u as r}from"./updateUrl-efe16448.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function v(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=f({type:"button",value:"<<"})
n(t,p),o(t,"&nbsp;"),e(t,a(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=f({type:"button",value:">>"})
p(t,n),c(t,"&nbsp;"),e(t,v)}}(),m("View",r),m("Go",l)}
//# sourceMappingURL=completedArenas-ef4a373d.js.map
