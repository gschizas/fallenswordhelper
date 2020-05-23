import{R as t,o as e,P as n,_ as o,v as p,U as a,bf as i,D as s}from"./calfSystem-4b4fbec4.js"
import{d as u}from"./dontPost-9b860b89.js"
import{c}from"./createInput-b0cbdcde.js"
import{i as f}from"./insertHtmlBeforeBegin-bb56c349.js"
import{u as r}from"./updateUrl-4bfd5c5c.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function b(n,o){e(t(`#pCC input[value="${n}"]`),o)}function m(t){window.location=`${i}completed&page=${t}`}function d(){m(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const a=t('#pCC input[value="<"]')
if(a){const t=c({type:"button",value:"<<"})
n(t,a),o(t,"&nbsp;"),e(t,p(m,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=c({type:"button",value:">>"})
a(t,n),f(t,"&nbsp;"),e(t,d)}}(),b("View",r),b("Go",l)}
//# sourceMappingURL=completedArenas-fa8845b7.js.map
