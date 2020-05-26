import{D as t,p as e,L as s,e as n,s as o,b as r,g as a,f as c,N as i}from"./calfSystem-740ec4d2.js"
import"./fshOpen-78430220.js"
import"./openQuickBuffByName-e399773d.js"
import"./dataRows-4e334837.js"
import{c as u}from"./createTextArea-e25330d9.js"
import"./parseDateAsTimestamp-256bcc14.js"
import{a as f}from"./addLogColoring-e9145e6b.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),f=function(){const t=a("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const n=e.insertRow(-1).insertCell(-1)
c(n,t)
const o=e.rows[0].cells[0]
return o.rowSpan=2,o}(t),b=function(t){const e=u({cols:72,name:"msg",required:!0,rows:2})
return p(e),n(e,"keypress",o(m,t)),e}(f)
d.replaceChild(b,d.children[0]),n(i,"submit",o(l,b))}export default function(){t("enhanceChatTextEntry")&&e&&d(),function(){const t=s("#pCC table table table table")
t&&t.classList.add("fshGc")}(),f("Chat",0)}
//# sourceMappingURL=guildChat-1dee2c98.js.map
