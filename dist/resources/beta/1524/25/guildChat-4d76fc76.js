import{H as t,p as e,C as a,f as s,t as n,b as r,g as o,h as c,P as i}from"./calfSystem-d3aab5a8.js"
import"./createStyle-9acc975b.js"
import"./fshOpen-4f280086.js"
import"./openQuickBuffByName-f588663a.js"
import"./dataRows-87814179.js"
import{c as f}from"./createTextArea-ee9abcd0.js"
import"./parseDateAsTimestamp-2f425fab.js"
import"./doBuffLinkClick-2191ff6d.js"
import{a as u}from"./addLogColoring-0504d5ae.js"
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
//# sourceMappingURL=guildChat-4d76fc76.js.map
