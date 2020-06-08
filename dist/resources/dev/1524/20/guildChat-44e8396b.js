import{G as t,p as e,C as s,e as n,t as r,b as a,g as o,f as c,R as i}from"./calfSystem-a2862afc.js"
import"./fshOpen-a1ebd7c1.js"
import"./openQuickBuffByName-808f9233.js"
import"./dataRows-b327254e.js"
import{c as f}from"./createTextArea-176b0835.js"
import"./createStyle-571bf4ff.js"
import"./parseDateAsTimestamp-0811cfc6.js"
import"./doBuffLinkClick-0e2cbd69.js"
import{a as u}from"./addLogColoring-cbb58717.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=a("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const n=e.insertRow(-1).insertCell(-1)
c(n,t)
const r=e.rows[0].cells[0]
return r.rowSpan=2,r}(t),b=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),n(e,"keypress",r(m,t)),e}(u)
d.replaceChild(b,d.children[0]),n(i,"submit",r(l,b))}export default function(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-44e8396b.js.map
