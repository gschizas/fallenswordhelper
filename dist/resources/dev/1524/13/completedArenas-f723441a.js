import{S as t,o as e,P as n,$ as o,v as a,V as p,bp as i,D as s}from"./calfSystem-01eb06ed.js"
import{d as u}from"./dontPost-05b11a96.js"
import{c as r}from"./createInput-7fd54c66.js"
import{i as c}from"./insertHtmlBeforeBegin-27203589.js"
import{u as f}from"./updateUrl-3475ad70.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function v(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=r({type:"button",value:"<<"})
n(t,p),o(t,"&nbsp;"),e(t,a(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=r({type:"button",value:">>"})
p(t,n),c(t,"&nbsp;"),e(t,v)}}(),m("View",f),m("Go",l)}
//# sourceMappingURL=completedArenas-f723441a.js.map
