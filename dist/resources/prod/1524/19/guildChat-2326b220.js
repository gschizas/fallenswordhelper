import{D as t,p as e,M as s,e as a,s as n,b as r,g as o,f as c,O as i}from"./calfSystem-6fc0cc1b.js"
import"./fshOpen-8d675aa9.js"
import"./openQuickBuffByName-b0838d7a.js"
import"./dataRows-ddfae63d.js"
import{c as f}from"./createTextArea-6e8664c7.js"
import"./createStyle-68b93dee.js"
import"./parseDateAsTimestamp-576c2f4c.js"
import{a as u}from"./addLogColoring-5ab3012c.js"
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
//# sourceMappingURL=guildChat-2326b220.js.map
