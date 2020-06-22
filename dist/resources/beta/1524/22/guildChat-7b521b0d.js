import{G as t,p as e,C as s,f as a,t as n,b as r,g as o,h as c,Q as i}from"./calfSystem-1b876afa.js"
import"./fshOpen-3cbd8c34.js"
import"./openQuickBuffByName-40bbfe57.js"
import"./dataRows-d97d1e1d.js"
import{c as f}from"./createTextArea-ccabaccd.js"
import"./createStyle-923684dd.js"
import"./parseDateAsTimestamp-50780e09.js"
import"./doBuffLinkClick-dc6cfb27.js"
import{a as u}from"./addLogColoring-9af57996.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function d(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function m(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),m=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const a=e.insertRow(-1).insertCell(-1)
c(a,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),b=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),a(e,"keypress",n(d,t)),e}(u)
m.replaceChild(b,m.children[0]),a(i,"submit",n(l,b))}export default function(){t("enhanceChatTextEntry")&&e&&m(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-7b521b0d.js.map
