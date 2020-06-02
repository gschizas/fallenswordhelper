import{D as t,p as e,M as s,e as n,s as a,b as r,g as o,f as c,O as i}from"./calfSystem-dec5e071.js"
import"./fshOpen-eee4440e.js"
import"./openQuickBuffByName-71c2a436.js"
import"./dataRows-75c1f744.js"
import{c as u}from"./createTextArea-0453e213.js"
import"./createStyle-0016a693.js"
import"./parseDateAsTimestamp-c7307a60.js"
import{a as f}from"./addLogColoring-133b31c5.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),f=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const n=e.insertRow(-1).insertCell(-1)
c(n,t)
const a=e.rows[0].cells[0]
return a.rowSpan=2,a}(t),h=function(t){const e=u({cols:72,name:"msg",required:!0,rows:2})
return p(e),n(e,"keypress",a(m,t)),e}(f)
d.replaceChild(h,d.children[0]),n(i,"submit",a(l,h))}export default function(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),f("Chat",0)}
//# sourceMappingURL=guildChat-367f13a3.js.map
