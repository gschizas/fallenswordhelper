import{R as t,o as e,P as n,_ as o,v as p,U as a,bf as i,D as s}from"./calfSystem-cb871cc0.js"
import{d as u}from"./dontPost-bd45f448.js"
import{c}from"./createInput-91fe6fc0.js"
import{i as f}from"./insertHtmlBeforeBegin-4c679357.js"
import{u as r}from"./updateUrl-7149e046.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function v(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const a=t('#pCC input[value="<"]')
if(a){const t=c({type:"button",value:"<<"})
n(t,a),o(t,"&nbsp;"),e(t,p(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=c({type:"button",value:">>"})
a(t,n),f(t,"&nbsp;"),e(t,v)}}(),m("View",r),m("Go",l)}
//# sourceMappingURL=completedArenas-f4b8f322.js.map
