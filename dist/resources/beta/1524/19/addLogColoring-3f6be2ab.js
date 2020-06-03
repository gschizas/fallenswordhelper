import{D as t,M as n,o,W as e,a8 as s,s as a,l as r,f as i,i as l}from"./calfSystem-57340987.js"
import{o as c}from"./openQuickBuffByName-69b6986b.js"
import{d as f}from"./dataRows-bbabdd56.js"
import{c as m}from"./createStyle-1094727e.js"
import{p as u}from"./parseDateAsTimestamp-c9ded138.js"
let p,b
function d(t){l(t.cells[1],' <button class="fshBl fshBls">[b]</button>')}function h(t){var n;(n=t.target).classList.contains("fshBl")&&n.previousElementSibling&&c(s(t.target.previousElementSibling))}function C(t,n){let o="old"
const e=u(s(n.cells[t]))
return function(t,n){return t>20&&n<=b}((p-e)/6e4,e)||(o=e>b?"new":"seen"),[n,o]}function g(t,[n,o]){const e=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,e),max:Math.max(t[o].min,e)}:t[o]={min:e,max:e},t}function y(t,[n,{min:o,max:e}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${e}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(t,n,o){const e=f(o.rows,3,0).map(a(C,n))
!function(t,n){"Chat"===t&&n.filter(([,t])=>"old"!==t).map(([t])=>t).forEach(d)}(t,e)
const s=e.filter(([,t])=>"seen"!==t).reduce(g,{}),l="Chat"===t?4:2,c=r(s).map(a(y,l))
c.length&&i(document.body,m(c.join("\n")))}function x(n,s,a){a.classList.add("fshLogColoring"),p=(new Date).setUTCSeconds(0,0)-1
const r=`last${n}Check`
b=function(n){return t(n)||p}(r),j(n,s,a),o(a,h),e(r,p)}function B(o,e){if(!t("enableLogColoring"))return
const s=function(t){return n("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(o)
s&&x(o,e,s)}export{B as a}
//# sourceMappingURL=addLogColoring-3f6be2ab.js.map
