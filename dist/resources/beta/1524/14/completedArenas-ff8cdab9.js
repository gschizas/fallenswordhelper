import{Q as t,o as e,O as n,Z as o,u as a,T as p,bg as i,C as u}from"./calfSystem-371c414c.js"
import{d as s}from"./dontPost-0ae0f7ca.js"
import{c}from"./createInput-d378f9d2.js"
import{i as f}from"./insertHtmlBeforeBegin-410252ec.js"
import{u as r}from"./updateUrl-2acd4160.js"
function l(e){e.preventDefault(),s(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function C(){d(u(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=c({type:"button",value:"<<"})
n(t,p),o(t,"&nbsp;"),e(t,a(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=c({type:"button",value:">>"})
p(t,n),f(t,"&nbsp;"),e(t,C)}}(),m("View",r),m("Go",l)}
//# sourceMappingURL=completedArenas-ff8cdab9.js.map
