import{R as t,o as e,P as n,_ as o,v as a,U as p,bf as i,D as s}from"./calfSystem-d06402b1.js"
import{d as u}from"./dontPost-a6e48caa.js"
import{c as f}from"./createInput-91da4003.js"
import{i as r}from"./insertHtmlBeforeBegin-01272058.js"
import{u as c}from"./updateUrl-1b6ead9f.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function v(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=f({type:"button",value:"<<"})
n(t,p),o(t,"&nbsp;"),e(t,a(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=f({type:"button",value:">>"})
p(t,n),r(t,"&nbsp;"),e(t,v)}}(),m("View",c),m("Go",l)}
//# sourceMappingURL=completedArenas-14e09d88.js.map
