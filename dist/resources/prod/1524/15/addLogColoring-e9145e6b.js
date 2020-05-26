import{D as t,L as s,s as a,o as e,V as n,aS as o,i}from"./calfSystem-740ec4d2.js"
import{o as l}from"./openQuickBuffByName-e399773d.js"
import{d as r}from"./dataRows-4e334837.js"
import{p as c}from"./parseDateAsTimestamp-256bcc14.js"
let f,u
function m(t,s,a){"Chat"===s&&a&&function(t){i(t.cells[1],' <button class="fshBl fshBls">[b]</button>')}(t)}function p(t,s,a){let e=!0
const n=c(o(a.cells[s])),i=(f-n)/6e4
n>u?a.classList.add("fshNr"):function(t,s){return t>20&&s<=u}(i,n)&&(a.classList.add("fshOr"),e=!1),m(a,t,e)}function b(t){var s;(s=t.target).classList.contains("fshBl")&&s.previousElementSibling&&l(o(t.target.previousElementSibling))}function d(s,o,i){f=(new Date).setUTCSeconds(0,0)-1
const l=`last${s}Check`
u=function(s){return t(s)||f}(l),r(i.rows,3,0).forEach(a(p,s,o)),e(i,b),n(l,f)}function h(a,e){if(!t("enableLogColoring"))return
const n=function(){let t=s("#pCC table table table table")
return t||(t=s("#pCC > table:last-of-type")),t}()
n&&d(a,e,n)}export{h as a}
//# sourceMappingURL=addLogColoring-e9145e6b.js.map
