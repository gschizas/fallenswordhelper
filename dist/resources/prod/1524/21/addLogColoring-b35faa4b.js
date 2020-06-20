import{G as t,C as n,o,Y as e,t as a,e as s,h as r,K as f,E as i}from"./calfSystem-2741d97b.js"
import{d as c}from"./dataRows-9eb2983f.js"
import{c as m}from"./createStyle-2abef2bf.js"
import{p as l}from"./parseDateAsTimestamp-f8f97be9.js"
import{a as u,d as p}from"./doBuffLinkClick-b1bec7e2.js"
let d,b
function C(t,n){let o="old"
const e=l(f(n.cells[t]))
return function(t,n){return t>20&&n<=b}((d-e)/6e4,e)||(o=e>b?"new":"seen"),[n,o]}function h(t,[n,o]){const e=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,e),max:Math.max(t[o].min,e)}:t[o]={min:e,max:e},t}function g(t,[n,{min:o,max:e}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${e}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(t,o,e){const f=c(e.rows,3,0).map(a(C,o))
!function(t,o){"Chat"===t&&o.filter(([,t])=>"old"!==t).map(([t])=>n(i,t)).forEach(p)}(t,f)
const l=f.filter(([,t])=>"seen"!==t).reduce(h,{}),u="Chat"===t?4:2,d=s(l).map(a(g,u))
d.length&&r(document.body,m(d.join("\n")))}function x(n,a,s){s.classList.add("fshLogColoring"),d=(new Date).setUTCSeconds(0,0)-1
const r=`last${n}Check`
b=function(n){return t(n)||d}(r),j(n,a,s),o(s,u),e(r,d)}function y(o,e){if(!t("enableLogColoring"))return
const a=function(t){return n("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(o)
a&&x(o,e,a)}export{y as a}
//# sourceMappingURL=addLogColoring-b35faa4b.js.map
