import{D as t,p as e,M as s,e as a,s as n,b as r,g as o,f as c,O as i}from"./calfSystem-8b6534a5.js"
import"./fshOpen-b5a7c2c8.js"
import"./openQuickBuffByName-ccc15ff1.js"
import"./dataRows-7ad53ca7.js"
import{c as f}from"./createTextArea-1516ea82.js"
import"./createStyle-046c3f77.js"
import"./parseDateAsTimestamp-c909c985.js"
import{a as u}from"./addLogColoring-7c1e6876.js"
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
//# sourceMappingURL=guildChat-f0f56b2f.js.map
