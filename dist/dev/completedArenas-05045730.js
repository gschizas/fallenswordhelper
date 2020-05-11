import{S as t,o as n,P as o,$ as e,v as a,V as p,bp as i,D as s}from"./calfSystem-8dc0fa4b.js"
import{d as u}from"./dontPost-c6d67b14.js"
import{c}from"./createInput-29f46dac.js"
import{i as f}from"./insertHtmlBeforeBegin-3f5cdd49.js"
import{u as r}from"./updateUrl-c03619d9.js"
function l(n){n.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function d(o,e){n(t(`#pCC input[value="${o}"]`),e)}function m(t){window.location=`${i}completed&page=${t}`}function v(){m(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=c({type:"button",value:"<<"})
o(t,p),e(t,"&nbsp;"),n(t,a(m,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=c({type:"button",value:">>"})
p(t,o),f(t,"&nbsp;"),n(t,v)}}(),d("View",r),d("Go",l)}
//# sourceMappingURL=completedArenas-05045730.js.map
