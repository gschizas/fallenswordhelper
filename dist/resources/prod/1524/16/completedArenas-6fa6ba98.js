import{M as t,o as e,s as o,aZ as n,A as i}from"./calfSystem-be09bdff.js"
import{d as a}from"./dontPost-c1d489a0.js"
import{c as s}from"./createInput-e2c4d8a7.js"
import{i as p}from"./insertElementBefore-1fd7bda7.js"
import{i as r}from"./insertHtmlBeforeBegin-212e98dd.js"
import{i as f}from"./insertHtmlAfterEnd-a624273f.js"
import{i as u}from"./insertElementAfter-647a360b.js"
import{u as m}from"./updateUrl-9030af0e.js"
function l(e){e.preventDefault(),a(t('#pCC input[value="completed"]').parentNode)}function c(o,n){e(t(`#pCC input[value="${o}"]`),n)}function d(t){window.location=`${n}completed&page=${t}`}function C(){d(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=s({type:"button",value:"<<"})
p(t,n),f(t,"&nbsp;"),e(t,o(d,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=s({type:"button",value:">>"})
u(t,o),r(t,"&nbsp;"),e(t,C)}}(),c("View",m),c("Go",l)}
//# sourceMappingURL=completedArenas-6fa6ba98.js.map
