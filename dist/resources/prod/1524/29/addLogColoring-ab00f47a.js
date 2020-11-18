import{H as t,C as n,o,Y as e,t as a,e as s,h as r,G as c,E as i}from"./calfSystem-57628ebe.js"
import{c as f}from"./createStyle-91aeec8a.js"
import{d as m}from"./dataRows-2520efc0.js"
import{p as l}from"./parseDateAsTimestamp-a0fe37ba.js"
import{a as u,d as p}from"./doBuffLinkClick-5033c62b.js"
let d,C
function h(t,n){let o="old"
const e=l(c(n.cells[t]))
return function(t,n){return t>20&&n<=C}((d-e)/6e4,e)||(o=e>C?"new":"seen"),[n,o]}function b(t,[n,o]){const e=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,e),max:Math.max(t[o].min,e)}:t[o]={min:e,max:e},t}function g(t,[n,{min:o,max:e}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${e}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(t,o,e){const c=m(e.rows,3,0).map(a(h,o))
!function(t,o){"Chat"===t&&o.filter(([,t])=>"old"!==t).map(([t])=>n(i,t)).forEach(p)}(t,c)
const l=function(t,n){const o="Chat"===t?4:2
return s(n.filter(([,t])=>"seen"!==t).reduce(b,{})).map(a(g,o))}(t,c)
l.length&&r(document.body,f(l.join("\n")))}function x(n,a,s){s.classList.add("fshLogColoring"),d=(new Date).setUTCSeconds(0,0)-1
const r=`last${n}Check`
C=function(n){return t(n)||d}(r),j(n,a,s),o(s,u),e(r,d)}function y(o,e){if(!t("enableLogColoring"))return
const a=function(t){return n("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(o)
a&&x(o,e,a)}export{y as a}
//# sourceMappingURL=addLogColoring-ab00f47a.js.map
