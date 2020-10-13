import{H as t,C as n,o,Y as e,t as a,e as s,h as r,G as i,E as c}from"./calfSystem-a5da5210.js"
import{c as f}from"./createStyle-c78804ee.js"
import{d as m}from"./dataRows-544fd651.js"
import{p as l}from"./parseDateAsTimestamp-5ef6ade0.js"
import{a as u,d}from"./doBuffLinkClick-ebdf6185.js"
let p,C
function h(t,n){let o="old"
const e=l(i(n.cells[t]))
return function(t,n){return t>20&&n<=C}((p-e)/6e4,e)||(o=e>C?"new":"seen"),[n,o]}function b(t,[n,o]){const e=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,e),max:Math.max(t[o].min,e)}:t[o]={min:e,max:e},t}function g(t,[n,{min:o,max:e}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${e}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(t,o,e){const i=m(e.rows,3,0).map(a(h,o))
!function(t,o){"Chat"===t&&o.filter(([,t])=>"old"!==t).map(([t])=>n(c,t)).forEach(d)}(t,i)
const l=function(t,n){const o="Chat"===t?4:2
return s(n.filter(([,t])=>"seen"!==t).reduce(b,{})).map(a(g,o))}(t,i)
l.length&&r(document.body,f(l.join("\n")))}function x(n,a,s){s.classList.add("fshLogColoring"),p=(new Date).setUTCSeconds(0,0)-1
const r=`last${n}Check`
C=function(n){return t(n)||p}(r),j(n,a,s),o(s,u),e(r,p)}function y(o,e){if(!t("enableLogColoring"))return
const a=function(t){return n("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(o)
a&&x(o,e,a)}export{y as a}
//# sourceMappingURL=addLogColoring-92525390.js.map
