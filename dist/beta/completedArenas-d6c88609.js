import{R as t,o as n,P as o,_ as e,v as a,U as p,bh as i,D as s}from"./calfSystem-99da704d.js"
import{d as u}from"./dontPost-af5ba7a2.js"
import{c as f}from"./createInput-bb469b2f.js"
import{i as r}from"./insertHtmlBeforeBegin-7b11627d.js"
import{u as c}from"./updateUrl-68b3753f.js"
function l(n){n.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(o,e){n(t(`#pCC input[value="${o}"]`),e)}function b(t){window.location=`${i}completed&page=${t}`}function d(){b(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=f({type:"button",value:"<<"})
o(t,p),e(t,"&nbsp;"),n(t,a(b,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=f({type:"button",value:">>"})
p(t,o),r(t,"&nbsp;"),n(t,d)}}(),m("View",c),m("Go",l)}
//# sourceMappingURL=completedArenas-d6c88609.js.map
