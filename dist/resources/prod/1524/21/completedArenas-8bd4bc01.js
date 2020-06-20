import{C as t,o as e,t as o,aY as n,B as i}from"./calfSystem-2741d97b.js"
import{c as r}from"./createInput-0f2d72fe.js"
import{i as s}from"./insertElementBefore-1ac41a54.js"
import"./formToUrl-d134536c.js"
import{i as a}from"./interceptSubmit-60aabec1.js"
import{i as p}from"./insertHtmlAfterEnd-65ae14da.js"
import{i as m}from"./insertElementAfter-7975ede1.js"
import{i as f}from"./insertHtmlBeforeBegin-4c326e35.js"
function c(t){window.location=`${n}completed&page=${t}`}function u(){c(i(t('#pCC input[value="Go"]').parentNode.previousElementSibling).replace(/\D/g,""))}export default function(){!function(){const n=t('#pCC input[value="<"]')
if(n){const t=r({type:"button",value:"<<"})
s(t,n),p(t,"&nbsp;"),e(t,o(c,1))}}(),function(){const o=t('#pCC input[value=">"]')
if(o){const t=r({type:"button",value:">>"})
m(t,o),f(t,"&nbsp;"),e(t,u)}}(),a()}
//# sourceMappingURL=completedArenas-8bd4bc01.js.map
