import{R as t,o as e,P as n,_ as o,v as p,U as a,bh as i,D as s}from"./calfSystem-70c0e373.js"
import{d as u}from"./dontPost-d8e94133.js"
import{c}from"./createInput-0bc2f786.js"
import{i as f}from"./insertHtmlBeforeBegin-d1f256b2.js"
import{u as r}from"./updateUrl-457b2445.js"
function l(e){e.preventDefault(),u(t('#pCC input[value="completed"]').parentNode)}function m(n,o){e(t(`#pCC input[value="${n}"]`),o)}function d(t){window.location=`${i}completed&page=${t}`}function v(){d(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const a=t('#pCC input[value="<"]')
if(a){const t=c({type:"button",value:"<<"})
n(t,a),o(t,"&nbsp;"),e(t,p(d,1))}}(),function(){const n=t('#pCC input[value=">"]')
if(n){const t=c({type:"button",value:">>"})
a(t,n),f(t,"&nbsp;"),e(t,v)}}(),m("View",r),m("Go",l)}
//# sourceMappingURL=completedArenas-303ad07f.js.map
