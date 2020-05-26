import{D as t,p as e,L as s,e as n,s as a,b as o,g as r,f as c,N as i}from"./calfSystem-1262535f.js"
import"./fshOpen-6d67ed12.js"
import"./openQuickBuffByName-05521d4e.js"
import"./dataRows-f0bd58da.js"
import{c as f}from"./createTextArea-98df359f.js"
import"./parseDateAsTimestamp-53cf8e3f.js"
import{a as u}from"./addLogColoring-c53cab2a.js"
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
//# sourceMappingURL=guildChat-a29e18d2.js.map
