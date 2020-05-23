import{S as t,o as e,P as n,$ as o,v as a,V as p,bp as i,D as s}from"./calfSystem-0e5d6faf.js"
import{d as u}from"./dontPost-2f9bbd28.js"
import{c as f}from"./createInput-fb0874a0.js"
import{i as r}from"./insertHtmlBeforeBegin-f6338e74.js"
import{u as c}from"./updateUrl-1997a60e.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function v(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=f({type:"button",value:"<<"})
n(t,p),o(t,"&nbsp;"),e(t,a(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=f({type:"button",value:">>"})
p(t,n),r(t,"&nbsp;"),e(t,v)}}(),m("View",c),m("Go",l)}
//# sourceMappingURL=completedArenas-f3aca50b.js.map
