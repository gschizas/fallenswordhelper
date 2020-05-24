import{F as t,Q as s,u as a,o as n,a3 as e,bl as o,bj as l,aq as c,i}from"./calfSystem-371c414c.js"
import{d as r}from"./dataRows-e367647c.js"
let f,u
function b(t,s,a){"Chat"===s&&a&&function(t){i(t.cells[1],' <button class="fshBl fshBls">[b]</button>')}(t)}function h(t,s,a){let n=!0
const e=o(l(a.cells[s])),c=(f-e)/6e4
e>u?a.classList.add("fshNr"):function(t,s){return t>20&&s<=u}(c,e)&&(a.classList.add("fshOr"),n=!1),b(a,t,n)}function p(t){var s;(s=t.target).classList.contains("fshBl")&&s.previousElementSibling&&c(l(t.target.previousElementSibling))}function C(s,o,l){f=(new Date).setUTCSeconds(0,0)-1
const c=`last${s}Check`
u=function(s){return t(s)||f}(c),r(l.rows,3,0).forEach(a(h,s,o)),n(l,p),e(c,f)}function d(a,n){if(!t("enableLogColoring"))return
const e=function(){let t=s("#pCC table table table table")
return t||(t=s("#pCC > table:last-of-type")),t}()
e&&C(a,n,e)}export{d as a}
//# sourceMappingURL=addLogColoring-63ef2fdb.js.map
