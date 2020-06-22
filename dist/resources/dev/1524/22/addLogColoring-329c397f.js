import{G as t,C as n,o,Z as a,t as e,e as s,h as r,K as c,E as i}from"./calfSystem-4cc738f8.js"
import{d as f}from"./dataRows-03f8210c.js"
import{c as m}from"./createStyle-639ee71b.js"
import{p as l}from"./parseDateAsTimestamp-adcf08c1.js"
import{a as u,d as p}from"./doBuffLinkClick-4a349c18.js"
let d,C
function h(t,n){let o="old"
const a=l(c(n.cells[t]))
return function(t,n){return t>20&&n<=C}((d-a)/6e4,a)||(o=a>C?"new":"seen"),[n,o]}function b(t,[n,o]){const a=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,a),max:Math.max(t[o].min,a)}:t[o]={min:a,max:a},t}function g(t,[n,{min:o,max:a}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${a}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(t,o,a){const c=f(a.rows,3,0).map(e(h,o))
!function(t,o){"Chat"===t&&o.filter(([,t])=>"old"!==t).map(([t])=>n(i,t)).forEach(p)}(t,c)
const l=c.filter(([,t])=>"seen"!==t).reduce(b,{}),u="Chat"===t?4:2,d=s(l).map(e(g,u))
d.length&&r(document.body,m(d.join("\n")))}function x(n,e,s){s.classList.add("fshLogColoring"),d=(new Date).setUTCSeconds(0,0)-1
const r=`last${n}Check`
C=function(n){return t(n)||d}(r),j(n,e,s),o(s,u),a(r,d)}function y(o,a){if(!t("enableLogColoring"))return
const e=function(t){return n("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(o)
e&&x(o,a,e)}export{y as a}
//# sourceMappingURL=addLogColoring-329c397f.js.map
