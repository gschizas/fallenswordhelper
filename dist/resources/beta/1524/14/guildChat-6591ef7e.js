import{F as t,p as e,Q as n,e as s,u as o,b as r,g as a,f as c,X as i}from"./calfSystem-371c414c.js"
import"./dataRows-e367647c.js"
import{c as f}from"./createTextArea-6ed77f95.js"
import{a as l}from"./addLogColoring-63ef2fdb.js"
function u(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function d(t){t.setAttribute("form","dochat")}function p(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function m(){const t=n('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),l=function(){const t=a("input",e).slice(0,7)
return t.forEach(d),t[5]}(),m=function(t){const e=n("#pCC table table")
e.rows[0].cells[0].remove()
const s=e.insertRow(-1).insertCell(-1)
c(s,t)
const o=e.rows[0].cells[0]
return o.rowSpan=2,o}(t),b=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return d(e),s(e,"keypress",o(p,t)),e}(l)
m.replaceChild(b,m.children[0]),s(i,"submit",o(u,b))}export default function(){t("enhanceChatTextEntry")&&e&&m(),function(){const t=n("#pCC table table table table")
t&&t.classList.add("fshGc")}(),l("Chat",0)}
//# sourceMappingURL=guildChat-6591ef7e.js.map
