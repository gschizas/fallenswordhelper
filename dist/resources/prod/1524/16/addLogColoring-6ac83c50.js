import{D as t,M as n,o,W as e,a8 as s,s as a,l as r,f as i,i as c}from"./calfSystem-be09bdff.js"
import{o as f}from"./openQuickBuffByName-cbbf176e.js"
import{d as l}from"./dataRows-4159fd61.js"
import{c as m}from"./createStyle-e061c495.js"
import{p as u}from"./parseDateAsTimestamp-f5ce65ae.js"
let p,b
function d(t){c(t.cells[1],' <button class="fshBl fshBls">[b]</button>')}function h(t){var n;(n=t.target).classList.contains("fshBl")&&n.previousElementSibling&&f(s(t.target.previousElementSibling))}function C(t,n){let o="old"
const e=u(s(n.cells[t]))
return function(t,n){return t>20&&n<=b}((p-e)/6e4,e)||(o=e>b?"new":"seen"),[n,o]}function g(t,[n,o]){const e=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,e),max:Math.max(t[o].min,e)}:t[o]={min:e,max:e},t}function y(t,[n,{min:o,max:e}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${e}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(t,n,o){const e=l(o.rows,3,0).map(a(C,n))
!function(t,n){"Chat"===t&&n.filter(([,t])=>"old"!==t).map(([t])=>t).forEach(d)}(t,e)
const s=e.filter(([,t])=>"seen"!==t).reduce(g,{}),c="Chat"===t?4:2,f=r(s).map(a(y,c))
f.length&&i(document.body,m(f.join("\n")))}function x(n,s,a){a.classList.add("fshLogColoring"),p=(new Date).setUTCSeconds(0,0)-1
const r=`last${n}Check`
b=function(n){return t(n)||p}(r),j(n,s,a),o(a,h),e(r,p)}function B(o,e){if(!t("enableLogColoring"))return
const s=function(t){return n("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(o)
s&&x(o,e,s)}export{B as a}
//# sourceMappingURL=addLogColoring-6ac83c50.js.map
