import{G as t,C as n,o,Y as a,t as e,m as s,f as r,K as f,E as i}from"./calfSystem-03970067.js"
import{d as c}from"./dataRows-6f4f327f.js"
import{c as m}from"./createStyle-5e6d06bc.js"
import{p as l}from"./parseDateAsTimestamp-375eca5d.js"
import{a as u,d}from"./doBuffLinkClick-df86d3a3.js"
let p,C
function h(t,n){let o="old"
const a=l(f(n.cells[t]))
return function(t,n){return t>20&&n<=C}((p-a)/6e4,a)||(o=a>C?"new":"seen"),[n,o]}function b(t,[n,o]){const a=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,a),max:Math.max(t[o].min,a)}:t[o]={min:a,max:a},t}function g(t,[n,{min:o,max:a}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${a}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(t,o,a){const f=c(a.rows,3,0).map(e(h,o))
!function(t,o){"Chat"===t&&o.filter(([,t])=>"old"!==t).map(([t])=>n(i,t)).forEach(d)}(t,f)
const l=f.filter(([,t])=>"seen"!==t).reduce(b,{}),u="Chat"===t?4:2,p=s(l).map(e(g,u))
p.length&&r(document.body,m(p.join("\n")))}function x(n,e,s){s.classList.add("fshLogColoring"),p=(new Date).setUTCSeconds(0,0)-1
const r=`last${n}Check`
C=function(n){return t(n)||p}(r),j(n,e,s),o(s,u),a(r,p)}function y(o,a){if(!t("enableLogColoring"))return
const e=function(t){return n("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(o)
e&&x(o,a,e)}export{y as a}
//# sourceMappingURL=addLogColoring-162622fa.js.map
