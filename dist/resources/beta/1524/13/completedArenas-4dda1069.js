import{R as t,o as e,P as n,_ as o,v as a,U as p,bh as i,D as s}from"./calfSystem-1e164202.js"
import{d as u}from"./dontPost-d7997a25.js"
import{c as f}from"./createInput-57c382fb.js"
import{i as r}from"./insertHtmlBeforeBegin-fd8fa522.js"
import{u as c}from"./updateUrl-4e0ff54d.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function v(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=f({type:"button",value:"<<"})
n(t,p),o(t,"&nbsp;"),e(t,a(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=f({type:"button",value:">>"})
p(t,n),r(t,"&nbsp;"),e(t,v)}}(),m("View",c),m("Go",l)}
//# sourceMappingURL=completedArenas-4dda1069.js.map
