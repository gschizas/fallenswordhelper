import{H as t,p as e,C as s,f as a,t as n,b as r,g as o,h as c,P as i}from"./calfSystem-57628ebe.js"
import"./createStyle-91aeec8a.js"
import"./fshOpen-71b2b356.js"
import"./openQuickBuffByName-4b21bd39.js"
import"./dataRows-2520efc0.js"
import{c as f}from"./createTextArea-38974726.js"
import"./parseDateAsTimestamp-a0fe37ba.js"
import"./doBuffLinkClick-5033c62b.js"
import{a as u}from"./addLogColoring-ab00f47a.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function b(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),b=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const a=e.insertRow(-1).insertCell(-1)
c(a,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),d=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),a(e,"keypress",n(m,t)),e}(u)
b.replaceChild(d,b.children[0]),a(i,"submit",n(l,d))}function d(){t("enhanceChatTextEntry")&&e&&b(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}export default d
//# sourceMappingURL=guildChat-d886a268.js.map
