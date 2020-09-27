import{H as t,C as n,o,Y as e,t as a,e as s,h as r,G as i,E as c}from"./calfSystem-71b9378d.js"
import{c as f}from"./createStyle-ed98f25d.js"
import{d as m}from"./dataRows-46e36367.js"
import{p as l}from"./parseDateAsTimestamp-07140c81.js"
import{a as u,d}from"./doBuffLinkClick-f0e149eb.js"
let p,C
function h(t,n){let o="old"
const e=l(i(n.cells[t]))
return function(t,n){return t>20&&n<=C}((p-e)/6e4,e)||(o=e>C?"new":"seen"),[n,o]}function b(t,[n,o]){const e=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,e),max:Math.max(t[o].min,e)}:t[o]={min:e,max:e},t}function g(t,[n,{min:o,max:e}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${e}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(t,o,e){const i=m(e.rows,3,0).map(a(h,o))
!function(t,o){"Chat"===t&&o.filter(([,t])=>"old"!==t).map(([t])=>n(c,t)).forEach(d)}(t,i)
const l=i.filter(([,t])=>"seen"!==t).reduce(b,{}),u="Chat"===t?4:2,p=s(l).map(a(g,u))
p.length&&r(document.body,f(p.join("\n")))}function x(n,a,s){s.classList.add("fshLogColoring"),p=(new Date).setUTCSeconds(0,0)-1
const r=`last${n}Check`
C=function(n){return t(n)||p}(r),j(n,a,s),o(s,u),e(r,p)}function y(o,e){if(!t("enableLogColoring"))return
const a=function(t){return n("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(o)
a&&x(o,e,a)}export{y as a}
//# sourceMappingURL=addLogColoring-b25bbb5b.js.map
