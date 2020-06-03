import{D as t,M as n,o,W as a,a8 as e,s,l as r,f as i,i as c}from"./calfSystem-4197cc22.js"
import{o as l}from"./openQuickBuffByName-d8a01295.js"
import{d as f}from"./dataRows-635afab2.js"
import{c as m}from"./createStyle-6687f7ad.js"
import{p as u}from"./parseDateAsTimestamp-11233d2d.js"
let p,d
function h(t){c(t.cells[1],' <button class="fshBl fshBls">[b]</button>')}function b(t){var n;(n=t.target).classList.contains("fshBl")&&n.previousElementSibling&&l(e(t.target.previousElementSibling))}function C(t,n){let o="old"
const a=u(e(n.cells[t]))
return function(t,n){return t>20&&n<=d}((p-a)/6e4,a)||(o=a>d?"new":"seen"),[n,o]}function g(t,[n,o]){const a=n.rowIndex+1
return t[o]?t[o]={min:Math.min(t[o].min,a),max:Math.max(t[o].min,a)}:t[o]={min:a,max:a},t}function y(t,[n,{min:o,max:a}]){return`.fshLogColoring tr:nth-of-type(${t}n+${o}):nth-of-type(-${t}n+${a}) {background-color: ${"old"===n?"#CD9E4B":"#F5F298"};}`}function j(t,n,o){const a=f(o.rows,3,0).map(s(C,n))
!function(t,n){"Chat"===t&&n.filter(([,t])=>"old"!==t).map(([t])=>t).forEach(h)}(t,a)
const e=a.filter(([,t])=>"seen"!==t).reduce(g,{}),c="Chat"===t?4:2,l=r(e).map(s(y,c))
l.length&&i(document.body,m(l.join("\n")))}function x(n,e,s){s.classList.add("fshLogColoring"),p=(new Date).setUTCSeconds(0,0)-1
const r=`last${n}Check`
d=function(n){return t(n)||p}(r),j(n,e,s),o(s,b),a(r,p)}function B(o,a){if(!t("enableLogColoring"))return
const e=function(t){return n("Chat"===t?"#pCC table table table table":"#pCC > table:last-of-type")}(o)
e&&x(o,a,e)}export{B as a}
//# sourceMappingURL=addLogColoring-106de169.js.map
