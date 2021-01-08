import{H as t,C as n,o,Y as a,t as e,e as s,h as r,G as i,E as c}from"./calfSystem-6459f18a.js"
import{c as f}from"./createStyle-0479102d.js"
import{d as m}from"./dataRows-55e47afb.js"
import{p as l}from"./parseDateAsTimestamp-6a159a44.js"
import{a as u,d as p}from"./doBuffLinkClick-067ebf8a.js"
let d,C
function h(t,n){let o="old"
const a=l(i(n.cells[t]))
return function(t,n){return t>20&&n<=C}((d-a)/6e4,a)||(o=a>C?"new":"seen"),[n,o]}function b(t,[n,o]){const a=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,a),max:Math.max(t[o].min,a)}:t[o]={min:a,max:a},t}function g(t,[n,{min:o,max:a}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${a}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(t,o,a){const i=m(a.rows,3,0).map(e(h,o))
!function(t,o){"Chat"===t&&o.filter(([,t])=>"old"!==t).map(([t])=>n(c,t)).forEach(p)}(t,i)
const l=function(t,n){const o="Chat"===t?4:2
return s(n.filter(([,t])=>"seen"!==t).reduce(b,{})).map(e(g,o))}(t,i)
l.length&&r(document.body,f(l.join("\n")))}function x(n,e,s){s.classList.add("fshLogColoring"),d=(new Date).setUTCSeconds(0,0)-1
const r=`last${n}Check`
C=function(n){return t(n)||d}(r),j(n,e,s),o(s,u),a(r,d)}function y(o,a){if(!t("enableLogColoring"))return
const e=function(t){return n("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(o)
e&&x(o,a,e)}export{y as a}
//# sourceMappingURL=addLogColoring-58d8a76c.js.map
