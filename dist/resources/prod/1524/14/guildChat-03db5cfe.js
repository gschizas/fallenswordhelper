import{F as t,p as e,Q as n,e as s,u as a,b as o,g as r,f as c,X as i}from"./calfSystem-d587d232.js"
import"./dataRows-22551573.js"
import{c as l}from"./createTextArea-7dc1aafa.js"
import{a as u}from"./addLogColoring-956dd5f0.js"
function f(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function d(t){t.setAttribute("form","dochat")}function p(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function m(){const t=n('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=o("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=r("input",e).slice(0,7)
return t.forEach(d),t[5]}(),m=function(t){const e=n("#pCC table table")
e.rows[0].cells[0].remove()
const s=e.insertRow(-1).insertCell(-1)
c(s,t)
const a=e.rows[0].cells[0]
return a.rowSpan=2,a}(t),h=function(t){const e=l({cols:72,name:"msg",required:!0,rows:2})
return d(e),s(e,"keypress",a(p,t)),e}(u)
m.replaceChild(h,m.children[0]),s(i,"submit",a(f,h))}export default function(){t("enhanceChatTextEntry")&&e&&m(),function(){const t=n("#pCC table table table table")
t&&t.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-03db5cfe.js.map
