import{D as t,p as e,M as s,e as a,s as n,b as r,g as o,f as c,O as i}from"./calfSystem-4197cc22.js"
import"./fshOpen-e5d8c136.js"
import"./openQuickBuffByName-d8a01295.js"
import"./dataRows-635afab2.js"
import{c as f}from"./createTextArea-8ed5f96b.js"
import"./createStyle-6687f7ad.js"
import"./parseDateAsTimestamp-11233d2d.js"
import{a as u}from"./addLogColoring-106de169.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function d(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function m(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),m=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const a=e.insertRow(-1).insertCell(-1)
c(a,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),h=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),a(e,"keypress",n(d,t)),e}(u)
m.replaceChild(h,m.children[0]),a(i,"submit",n(l,h))}export default function(){t("enhanceChatTextEntry")&&e&&m(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}
//# sourceMappingURL=guildChat-6d026ad6.js.map
