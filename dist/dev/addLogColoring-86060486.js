import{G as t,S as s,v as a,o as n,a5 as e,bs as o,b7 as l,au as f,i}from"./calfSystem-0e5d6faf.js"
import{d as c}from"./dataRows-8f00ff76.js"
let r,u
function b(t,s,a){"Chat"===s&&a&&function(t){i(t.cells[1],' <button class="fshBl fshBls">[b]</button>')}(t)}function d(t,s,a){let n=!0
const e=o(l(a.cells[s])),f=(r-e)/6e4
e>u?a.classList.add("fshNr"):function(t,s){return t>20&&s<=u}(f,e)&&(a.classList.add("fshOr"),n=!1),b(a,t,n)}function h(t){var s;(s=t.target).classList.contains("fshBl")&&s.previousElementSibling&&f(l(t.target.previousElementSibling))}function p(s,o,l){r=(new Date).setUTCSeconds(0,0)-1
const f=`last${s}Check`
u=function(s){return t(s)||r}(f),c(l.rows,3,0).forEach(a(d,s,o)),n(l,h),e(f,r)}function C(a,n){if(!t("enableLogColoring"))return
const e=function(){let t=s("#pCC table table table table")
return t||(t=s("#pCC > table:last-of-type")),t}()
e&&p(a,n,e)}export{C as a}
//# sourceMappingURL=addLogColoring-86060486.js.map
