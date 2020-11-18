import{H as t,p as e,C as s,f as n,t as r,b as a,g as o,h as c,P as i}from"./calfSystem-f9a27018.js"
import"./createStyle-601211fe.js"
import"./fshOpen-71b2b356.js"
import"./openQuickBuffByName-77bb54c1.js"
import"./dataRows-1ff76178.js"
import{c as f}from"./createTextArea-169b584f.js"
import"./parseDateAsTimestamp-83334593.js"
import"./doBuffLinkClick-c3ac034f.js"
import{a as u}from"./addLogColoring-d3c74d7e.js"
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
d.replaceChild(b,d.children[0]),n(i,"submit",r(l,b))}function b(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}export default b
//# sourceMappingURL=guildChat-4de8a6b9.js.map
