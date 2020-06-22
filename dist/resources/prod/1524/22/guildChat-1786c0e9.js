import{G as t,p as e,C as s,f as n,t as r,b as a,g as o,h as c,Q as i}from"./calfSystem-d04e4be4.js"
import"./fshOpen-9117b13c.js"
import"./openQuickBuffByName-3b6db0bb.js"
import"./dataRows-c25dd1f9.js"
import{c as f}from"./createTextArea-2cc6d8f4.js"
import"./createStyle-62ea9fd4.js"
import"./parseDateAsTimestamp-8b8402c4.js"
import"./doBuffLinkClick-5c78da4c.js"
import{a as u}from"./addLogColoring-5b762967.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function d(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function m(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=a("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),m=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const n=e.insertRow(-1).insertCell(-1)
c(n,t)
const r=e.rows[0].cells[0]
return r.rowSpan=2,r}(t),b=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),n(e,"keypress",r(d,t)),e}(u)
m.replaceChild(b,m.children[0]),n(i,"submit",r(l,b))}export default function(){t("enhanceChatTextEntry")&&e&&m(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-1786c0e9.js.map
