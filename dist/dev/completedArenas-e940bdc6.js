import{S as t,o as e,P as n,$ as o,v as a,V as p,bp as i,D as s}from"./calfSystem-94018cd0.js"
import{d as u}from"./dontPost-cebe2d2a.js"
import{c as f}from"./createInput-cfb8faf0.js"
import{i as c}from"./insertHtmlBeforeBegin-0aeb26c4.js"
import{u as r}from"./updateUrl-48eff90a.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function v(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=f({type:"button",value:"<<"})
n(t,p),o(t,"&nbsp;"),e(t,a(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=f({type:"button",value:">>"})
p(t,n),c(t,"&nbsp;"),e(t,v)}}(),m("View",r),m("Go",l)}
//# sourceMappingURL=completedArenas-e940bdc6.js.map
