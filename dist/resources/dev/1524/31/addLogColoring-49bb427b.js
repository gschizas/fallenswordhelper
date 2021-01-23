import{c as t}from"./createStyle-2bea16e8.js"
import{d as n}from"./dataRows-0805e883.js"
import{a as o,d as e}from"./doBuffLinkClick-e5793872.js"
import{H as a,C as s,o as r,Z as i,t as c,e as f,h as m,G as l,E as u}from"./calfSystem-393ab895.js"
import{p}from"./parseDateAsTimestamp-01885405.js"
let d,C
function h(t,n){let o="old"
const e=p(l(n.cells[t]))
return function(t,n){return t>20&&n<=C}((d-e)/6e4,e)||(o=e>C?"new":"seen"),[n,o]}function b(t,[n,o]){const e=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,e),max:Math.max(t[o].min,e)}:t[o]={min:e,max:e},t}function g(t,[n,{min:o,max:e}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${e}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(o,a,r){const i=n(r.rows,3,0).map(c(h,a))
!function(t,n){"Chat"===t&&n.filter((([,t])=>"old"!==t)).map((([t])=>s(u,t))).forEach(e)}(o,i)
const l=function(t,n){const o="Chat"===t?4:2
return f(n.filter((([,t])=>"seen"!==t)).reduce(b,{})).map(c(g,o))}(o,i)
l.length&&m(document.body,t(l.join("\n")))}function x(t,n,e){e.classList.add("fshLogColoring"),d=(new Date).setUTCSeconds(0,0)-1
const s=`last${t}Check`
C=function(t){return a(t)||d}(s),j(t,n,e),r(e,o),i(s,d)}function y(t,n){if(!a("enableLogColoring"))return
const o=function(t){return s("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(t)
o&&x(t,n,o)}export{y as a}
//# sourceMappingURL=addLogColoring-49bb427b.js.map
