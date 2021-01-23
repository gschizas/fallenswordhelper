import{H as t,p as e,C as s,f as a,t as n,b as r,g as o,h as i,Q as c}from"./calfSystem-393ab895.js"
import{c as f}from"./createTextArea-f1a04a11.js"
import{a as u}from"./addLogColoring-49bb427b.js"
import"./createStyle-2bea16e8.js"
import"./dataRows-0805e883.js"
import"./doBuffLinkClick-e5793872.js"
import"./openQuickBuffByName-47bff80e.js"
import"./fshOpen-bec182a3.js"
import"./parseDateAsTimestamp-01885405.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),c(t))}function b(){const t=s('input[value="Send As Mass"]')
if(!t)return
const c=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),b=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const a=e.insertRow(-1).insertCell(-1)
i(a,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),d=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),a(e,"keypress",n(m,t)),e}(u)
b.replaceChild(d,b.children[0]),a(c,"submit",n(l,d))}function d(){t("enhanceChatTextEntry")&&e&&b(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}export default d
//# sourceMappingURL=guildChat-736397b0.js.map
