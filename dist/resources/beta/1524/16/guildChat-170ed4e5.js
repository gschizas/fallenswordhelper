import{D as t,p as e,M as s,e as n,s as r,b as a,g as o,f as c,O as f}from"./calfSystem-9554b525.js"
import"./fshOpen-cf721236.js"
import"./openQuickBuffByName-72f82ff2.js"
import"./dataRows-16ab74f1.js"
import{c as i}from"./createTextArea-9c0f9ff2.js"
import"./createStyle-1635cb7b.js"
import"./parseDateAsTimestamp-88f3f0a3.js"
import{a as u}from"./addLogColoring-df38d3e2.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),f(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const f=function(){const t=a("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const n=e.insertRow(-1).insertCell(-1)
c(n,t)
const r=e.rows[0].cells[0]
return r.rowSpan=2,r}(t),b=function(t){const e=i({cols:72,name:"msg",required:!0,rows:2})
return p(e),n(e,"keypress",r(m,t)),e}(u)
d.replaceChild(b,d.children[0]),n(f,"submit",r(l,b))}export default function(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-170ed4e5.js.map
