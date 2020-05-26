import{D as t,L as s,s as a,o as e,V as n,aS as o,i as f}from"./calfSystem-1262535f.js"
import{o as i}from"./openQuickBuffByName-05521d4e.js"
import{d as l}from"./dataRows-f0bd58da.js"
import{p as r}from"./parseDateAsTimestamp-53cf8e3f.js"
let c,u
function m(t,s,a){"Chat"===s&&a&&function(t){f(t.cells[1],' <button class="fshBl fshBls">[b]</button>')}(t)}function p(t,s,a){let e=!0
const n=r(o(a.cells[s])),f=(c-n)/6e4
n>u?a.classList.add("fshNr"):function(t,s){return t>20&&s<=u}(f,n)&&(a.classList.add("fshOr"),e=!1),m(a,t,e)}function b(t){var s;(s=t.target).classList.contains("fshBl")&&s.previousElementSibling&&i(o(t.target.previousElementSibling))}function d(s,o,f){c=(new Date).setUTCSeconds(0,0)-1
const i=`last${s}Check`
u=function(s){return t(s)||c}(i),l(f.rows,3,0).forEach(a(p,s,o)),e(f,b),n(i,c)}function h(a,e){if(!t("enableLogColoring"))return
const n=function(){let t=s("#pCC table table table table")
return t||(t=s("#pCC > table:last-of-type")),t}()
n&&d(a,e,n)}export{h as a}
//# sourceMappingURL=addLogColoring-c53cab2a.js.map
