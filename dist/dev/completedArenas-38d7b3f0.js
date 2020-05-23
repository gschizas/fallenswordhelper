import{S as t,o as e,P as n,$ as o,v as a,V as p,bp as i,D as s}from"./calfSystem-fd021443.js"
import{d as u}from"./dontPost-18b03cba.js"
import{c}from"./createInput-309e97c5.js"
import{i as r}from"./insertHtmlBeforeBegin-9d9640eb.js"
import{u as f}from"./updateUrl-ca744051.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function v(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=c({type:"button",value:"<<"})
n(t,p),o(t,"&nbsp;"),e(t,a(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=c({type:"button",value:">>"})
p(t,n),r(t,"&nbsp;"),e(t,v)}}(),m("View",f),m("Go",l)}
//# sourceMappingURL=completedArenas-38d7b3f0.js.map
