import{G as t,R as s,v as a,o as n,a4 as e,bk as o,bi as l,ar as i,i as c}from"./calfSystem-d06402b1.js"
import{d as r}from"./dataRows-48658c8b.js"
let f,u
function b(t,s,a){"Chat"===s&&a&&function(t){c(t.cells[1],' <button class="fshBl fshBls">[b]</button>')}(t)}function d(t,s,a){let n=!0
const e=o(l(a.cells[s])),i=(f-e)/6e4
e>u?a.classList.add("fshNr"):function(t,s){return t>20&&s<=u}(i,e)&&(a.classList.add("fshOr"),n=!1),b(a,t,n)}function h(t){var s;(s=t.target).classList.contains("fshBl")&&s.previousElementSibling&&i(l(t.target.previousElementSibling))}function p(s,o,l){f=(new Date).setUTCSeconds(0,0)-1
const i=`last${s}Check`
u=function(s){return t(s)||f}(i),r(l.rows,3,0).forEach(a(d,s,o)),n(l,h),e(i,f)}function C(a,n){if(!t("enableLogColoring"))return
const e=function(){let t=s("#pCC table table table table")
return t||(t=s("#pCC > table:last-of-type")),t}()
e&&p(a,n,e)}export{C as a}
//# sourceMappingURL=addLogColoring-7de7f9ed.js.map
