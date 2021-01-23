import{H as t,p as e,C as a,f as s,t as n,b as r,g as o,h as c,P as i}from"./calfSystem-7aee5245.js"
import{c as f}from"./createTextArea-09fadbae.js"
import{a as u}from"./addLogColoring-d75d6c4a.js"
import"./createStyle-a90207f5.js"
import"./dataRows-d2344907.js"
import"./doBuffLinkClick-6f7aa7be.js"
import"./openQuickBuffByName-88fe8230.js"
import"./fshOpen-bec182a3.js"
import"./parseDateAsTimestamp-9a3302cb.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=a('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=a("#pCC table table")
e.rows[0].cells[0].remove()
const s=e.insertRow(-1).insertCell(-1)
c(s,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),b=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),s(e,"keypress",n(m,t)),e}(u)
d.replaceChild(b,d.children[0]),s(i,"submit",n(l,b))}function b(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=a("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}export default b
//# sourceMappingURL=guildChat-f7684ada.js.map
