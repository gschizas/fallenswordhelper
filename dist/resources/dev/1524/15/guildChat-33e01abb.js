import{D as t,p as e,M as s,e as n,s as a,b as o,g as r,f as c,O as i}from"./calfSystem-ee582533.js"
import"./fshOpen-f1f6c477.js"
import"./openQuickBuffByName-60dde0f6.js"
import"./dataRows-b7cf82e5.js"
import{c as f}from"./createTextArea-1f364dcc.js"
import"./parseDateAsTimestamp-aa2b0443.js"
import{a as u}from"./addLogColoring-f78f39be.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=o("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=r("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const n=e.insertRow(-1).insertCell(-1)
c(n,t)
const a=e.rows[0].cells[0]
return a.rowSpan=2,a}(t),b=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),n(e,"keypress",a(m,t)),e}(u)
d.replaceChild(b,d.children[0]),n(i,"submit",a(l,b))}export default function(){t("enhanceChatTextEntry")&&e&&d(),function(){const t=s("#pCC table table table table")
t&&t.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-33e01abb.js.map
