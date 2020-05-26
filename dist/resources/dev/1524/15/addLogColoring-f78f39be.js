import{D as t,M as s,s as a,o as e,W as n,aQ as o,i}from"./calfSystem-ee582533.js"
import{o as l}from"./openQuickBuffByName-60dde0f6.js"
import{d as r}from"./dataRows-b7cf82e5.js"
import{p as f}from"./parseDateAsTimestamp-aa2b0443.js"
let c,u
function m(t,s,a){"Chat"===s&&a&&function(t){i(t.cells[1],' <button class="fshBl fshBls">[b]</button>')}(t)}function p(t,s,a){let e=!0
const n=f(o(a.cells[s])),i=(c-n)/6e4
n>u?a.classList.add("fshNr"):function(t,s){return t>20&&s<=u}(i,n)&&(a.classList.add("fshOr"),e=!1),m(a,t,e)}function b(t){var s;(s=t.target).classList.contains("fshBl")&&s.previousElementSibling&&l(o(t.target.previousElementSibling))}function d(s,o,i){c=(new Date).setUTCSeconds(0,0)-1
const l=`last${s}Check`
u=function(s){return t(s)||c}(l),r(i.rows,3,0).forEach(a(p,s,o)),e(i,b),n(l,c)}function h(a,e){if(!t("enableLogColoring"))return
const n=function(){let t=s("#pCC table table table table")
return t||(t=s("#pCC > table:last-of-type")),t}()
n&&d(a,e,n)}export{h as a}
//# sourceMappingURL=addLogColoring-f78f39be.js.map
