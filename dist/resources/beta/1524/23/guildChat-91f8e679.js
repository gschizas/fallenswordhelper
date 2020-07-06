import{G as t,p as e,C as a,f as s,t as n,b as r,g as o,h as i,Q as c}from"./calfSystem-34fcd691.js"
import"./fshOpen-ee221b8b.js"
import"./openQuickBuffByName-f52e13a3.js"
import"./dataRows-abf5aa16.js"
import{c as f}from"./createTextArea-1491a889.js"
import"./createStyle-44d1ad05.js"
import"./parseDateAsTimestamp-56d08ae7.js"
import"./doBuffLinkClick-6b8b0e16.js"
import{a as u}from"./addLogColoring-7b71ad67.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),c(t))}function d(){const t=a('input[value="Send As Mass"]')
if(!t)return
const c=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=a("#pCC table table")
e.rows[0].cells[0].remove()
const s=e.insertRow(-1).insertCell(-1)
i(s,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),b=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),s(e,"keypress",n(m,t)),e}(u)
d.replaceChild(b,d.children[0]),s(c,"submit",n(l,b))}export default function(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=a("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-91f8e679.js.map
