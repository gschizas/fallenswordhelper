import{H as t,p as e,C as s,f as a,t as n,b as r,g as o,h as c,P as i}from"./calfSystem-cf4d22a7.js"
import"./createStyle-1ea5a054.js"
import"./fshOpen-a7890139.js"
import"./openQuickBuffByName-905195be.js"
import"./dataRows-1c64b1cb.js"
import{c as f}from"./createTextArea-68b9d151.js"
import"./parseDateAsTimestamp-21fc8baa.js"
import"./doBuffLinkClick-8560d233.js"
import{a as u}from"./addLogColoring-c8983eab.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const a=e.insertRow(-1).insertCell(-1)
c(a,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),b=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),a(e,"keypress",n(m,t)),e}(u)
d.replaceChild(b,d.children[0]),a(i,"submit",n(l,b))}function b(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}export default b
//# sourceMappingURL=guildChat-05707db6.js.map
