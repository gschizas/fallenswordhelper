import{R as t,o as e,P as n,_ as o,v as a,U as p,bf as i,D as s}from"./calfSystem-72fdbe97.js"
import{d as u}from"./dontPost-ccc4e305.js"
import{c}from"./createInput-00d19dd2.js"
import{i as f}from"./insertHtmlBeforeBegin-e44dc9ae.js"
import{u as r}from"./updateUrl-3f46424e.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function v(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=c({type:"button",value:"<<"})
n(t,p),o(t,"&nbsp;"),e(t,a(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=c({type:"button",value:">>"})
p(t,n),f(t,"&nbsp;"),e(t,v)}}(),m("View",r),m("Go",l)}
//# sourceMappingURL=completedArenas-1079b2d7.js.map
