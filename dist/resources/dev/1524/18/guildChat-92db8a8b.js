import{D as t,p as e,N as s,e as a,s as n,b as r,g as o,f as c,P as i}from"./calfSystem-5545a3e6.js"
import"./fshOpen-04e3fd62.js"
import"./openQuickBuffByName-790a8d74.js"
import"./dataRows-7b7ef266.js"
import{c as f}from"./createTextArea-63b85d1f.js"
import"./createStyle-b74477ed.js"
import"./parseDateAsTimestamp-d25abda3.js"
import{a as u}from"./addLogColoring-f20275fa.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const a=e.insertRow(-1).insertCell(-1)
c(a,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),b=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),a(e,"keypress",n(m,t)),e}(u)
d.replaceChild(b,d.children[0]),a(i,"submit",n(l,b))}export default function(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-92db8a8b.js.map
