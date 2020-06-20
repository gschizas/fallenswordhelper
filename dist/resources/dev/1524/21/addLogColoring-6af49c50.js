import{G as t,C as n,o,Z as e,t as a,e as s,h as r,K as c,E as i}from"./calfSystem-9c7241dc.js"
import{d as f}from"./dataRows-e462b280.js"
import{c as m}from"./createStyle-e06c3e3c.js"
import{p as l}from"./parseDateAsTimestamp-887793ae.js"
import{a as u,d as p}from"./doBuffLinkClick-2e707ac2.js"
let d,C
function h(t,n){let o="old"
const e=l(c(n.cells[t]))
return function(t,n){return t>20&&n<=C}((d-e)/6e4,e)||(o=e>C?"new":"seen"),[n,o]}function b(t,[n,o]){const e=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,e),max:Math.max(t[o].min,e)}:t[o]={min:e,max:e},t}function g(t,[n,{min:o,max:e}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${e}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(t,o,e){const c=f(e.rows,3,0).map(a(h,o))
!function(t,o){"Chat"===t&&o.filter(([,t])=>"old"!==t).map(([t])=>n(i,t)).forEach(p)}(t,c)
const l=c.filter(([,t])=>"seen"!==t).reduce(b,{}),u="Chat"===t?4:2,d=s(l).map(a(g,u))
d.length&&r(document.body,m(d.join("\n")))}function x(n,a,s){s.classList.add("fshLogColoring"),d=(new Date).setUTCSeconds(0,0)-1
const r=`last${n}Check`
C=function(n){return t(n)||d}(r),j(n,a,s),o(s,u),e(r,d)}function y(o,e){if(!t("enableLogColoring"))return
const a=function(t){return n("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(o)
a&&x(o,e,a)}export{y as a}
//# sourceMappingURL=addLogColoring-6af49c50.js.map
