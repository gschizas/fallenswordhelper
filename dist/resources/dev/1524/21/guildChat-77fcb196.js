import{G as t,p as e,C as s,f as n,t as r,b as a,g as o,h as c,R as i}from"./calfSystem-9c7241dc.js"
import"./fshOpen-df010b52.js"
import"./openQuickBuffByName-fbd53231.js"
import"./dataRows-e462b280.js"
import{c as f}from"./createTextArea-5155cd2c.js"
import"./createStyle-e06c3e3c.js"
import"./parseDateAsTimestamp-887793ae.js"
import"./doBuffLinkClick-2e707ac2.js"
import{a as u}from"./addLogColoring-6af49c50.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=a("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const n=e.insertRow(-1).insertCell(-1)
c(n,t)
const r=e.rows[0].cells[0]
return r.rowSpan=2,r}(t),h=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),n(e,"keypress",r(m,t)),e}(u)
d.replaceChild(h,d.children[0]),n(i,"submit",r(l,h))}export default function(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-77fcb196.js.map
