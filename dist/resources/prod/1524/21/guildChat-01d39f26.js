import{G as t,p as e,C as s,f as n,t as r,b as a,g as o,h as c,Q as i}from"./calfSystem-2741d97b.js"
import"./fshOpen-591841c3.js"
import"./openQuickBuffByName-85bc7291.js"
import"./dataRows-9eb2983f.js"
import{c as f}from"./createTextArea-f4702227.js"
import"./createStyle-2abef2bf.js"
import"./parseDateAsTimestamp-f8f97be9.js"
import"./doBuffLinkClick-b1bec7e2.js"
import{a as u}from"./addLogColoring-b35faa4b.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function b(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=a("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),b=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const n=e.insertRow(-1).insertCell(-1)
c(n,t)
const r=e.rows[0].cells[0]
return r.rowSpan=2,r}(t),d=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),n(e,"keypress",r(m,t)),e}(u)
b.replaceChild(d,b.children[0]),n(i,"submit",r(l,d))}export default function(){t("enhanceChatTextEntry")&&e&&b(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-01d39f26.js.map
