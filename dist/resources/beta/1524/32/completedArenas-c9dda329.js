import{C as t,o as e,t as o,N as n,al as i,B as s}from"./calfSystem-26bcf570.js"
import{c as r}from"./createInput-538cc410.js"
import{i as a}from"./insertElementAfter-9866e669.js"
import{i as p}from"./insertElementBefore-aa28f497.js"
import{i as f}from"./insertHtmlAfterEnd-5d93c8a7.js"
import{i as m}from"./insertHtmlBeforeBegin-d7d0bf25.js"
import{i as c}from"./interceptSubmit-ac75d95b.js"
import"./formToUrl-ea3e8186.js"
function u(t){n(`${i}completed&page=${t}`)}function l(){u(s(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}function b(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=r({type:"button",value:"<<"})
p(t,n),f(t,"&nbsp;"),e(t,o(u,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=r({type:"button",value:">>"})
a(t,o),m(t,"&nbsp;"),e(t,l)}}(),c()}export default b
//# sourceMappingURL=completedArenas-c9dda329.js.map
