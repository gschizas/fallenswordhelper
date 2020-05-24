import{R as t,o,O as e,_ as n,u as a,U as p,bo as i,C as u}from"./calfSystem-d96a3efd.js"
import{d as s}from"./dontPost-a74ab672.js"
import{c as f}from"./createInput-2717f905.js"
import{i as r}from"./insertHtmlBeforeBegin-449d0625.js"
import{u as c}from"./updateUrl-266f192f.js"
function l(o){o.preventDefault(),s(t('#pCC input[value="completed"]').parentNode)}function m(e,n){o(t(`#pCC input[value="${e}"]`),n)}function d(t){window.location=`${i}completed&page=${t}`}function C(){d(u(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const p=t('#pCC input[value="<"]')
if(p){const t=f({type:"button",value:"<<"})
e(t,p),n(t,"&nbsp;"),o(t,a(d,1))}}(),function(){const e=t('#pCC input[value=">"]')
if(e){const t=f({type:"button",value:">>"})
p(t,e),r(t,"&nbsp;"),o(t,C)}}(),m("View",c),m("Go",l)}
//# sourceMappingURL=completedArenas-f98268a6.js.map
