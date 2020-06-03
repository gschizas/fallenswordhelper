import{D as t,p as e,N as s,e as a,s as n,b as r,g as o,f as c,P as i}from"./calfSystem-f7574730.js"
import"./fshOpen-da8138fa.js"
import"./openQuickBuffByName-811c9a22.js"
import"./dataRows-2e6b99d7.js"
import{c as f}from"./createTextArea-c4f792e8.js"
import"./createStyle-d4675aa6.js"
import"./parseDateAsTimestamp-e4ec080f.js"
import{a as u}from"./addLogColoring-5f4631ad.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const a=e.insertRow(-1).insertCell(-1)
c(a,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),h=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),a(e,"keypress",n(m,t)),e}(u)
d.replaceChild(h,d.children[0]),a(i,"submit",n(l,h))}export default function(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-4e01ea91.js.map
