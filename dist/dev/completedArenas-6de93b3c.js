import{S as t,o as n,P as o,$ as e,v as a,V as p,bp as i,D as s}from"./calfSystem-70b0df7f.js"
import{d as u}from"./dontPost-66858ca6.js"
import{c as f}from"./createInput-9a444f78.js"
import{i as c}from"./insertHtmlBeforeBegin-24c569d6.js"
import{u as r}from"./updateUrl-33a1c85f.js"
function l(n){n.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(o,e){n(t(`#pCC input[value="${o}"]`),e)}function d(t){window.location=`${i}completed&page=${t}`}function v(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=f({type:"button",value:"<<"})
o(t,p),e(t,"&nbsp;"),n(t,a(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=f({type:"button",value:">>"})
p(t,o),c(t,"&nbsp;"),n(t,v)}}(),m("View",r),m("Go",l)}
//# sourceMappingURL=completedArenas-6de93b3c.js.map
