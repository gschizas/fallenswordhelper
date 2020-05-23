import{G as t,p as e,R as n,f as s,v as o,b as r,g as a,h as c,Y as i}from"./calfSystem-4f7c0235.js"
import"./dataRows-c3d3b386.js"
import{c as l}from"./createTextArea-b9714cc1.js"
import{a as f}from"./addLogColoring-370cbdfd.js"
function u(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function d(t){t.setAttribute("form","dochat")}function p(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function m(){const t=n('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),f=function(){const t=a("input",e).slice(0,7)
return t.forEach(d),t[5]}(),m=function(t){const e=n("#pCC table table")
e.rows[0].cells[0].remove()
const s=e.insertRow(-1).insertCell(-1)
c(s,t)
const o=e.rows[0].cells[0]
return o.rowSpan=2,o}(t),b=function(t){const e=l({cols:72,name:"msg",required:!0,rows:2})
return d(e),s(e,"keypress",o(p,t)),e}(f)
m.replaceChild(b,m.children[0]),s(i,"submit",o(u,b))}export default function(){t("enhanceChatTextEntry")&&e&&m(),function(){const t=n("#pCC table table table table")
t&&t.classList.add("fshGc")}(),f("Chat",0)}
//# sourceMappingURL=guildChat-1f2f68eb.js.map
