import{G as t,p as e,C as s,e as n,t as r,b as a,g as o,f as c,Q as i}from"./calfSystem-03970067.js"
import"./fshOpen-526cc69f.js"
import"./openQuickBuffByName-d2028079.js"
import"./dataRows-6f4f327f.js"
import{c as f}from"./createTextArea-1871f6b5.js"
import"./createStyle-5e6d06bc.js"
import"./parseDateAsTimestamp-375eca5d.js"
import"./doBuffLinkClick-df86d3a3.js"
import{a as u}from"./addLogColoring-162622fa.js"
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
//# sourceMappingURL=guildChat-c46187a4.js.map
