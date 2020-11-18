import{H as t,p as e,C as s,f as n,t as a,b as r,g as o,h as c,Q as i}from"./calfSystem-02c48ff5.js"
import"./createStyle-a35475d1.js"
import"./fshOpen-71b2b356.js"
import"./openQuickBuffByName-6e7bf41a.js"
import"./dataRows-46078e55.js"
import{c as f}from"./createTextArea-5ab7de2d.js"
import"./parseDateAsTimestamp-c157f06b.js"
import"./doBuffLinkClick-991b04a9.js"
import{a as u}from"./addLogColoring-68535fbf.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const n=e.insertRow(-1).insertCell(-1)
c(n,t)
const a=e.rows[0].cells[0]
return a.rowSpan=2,a}(t),b=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),n(e,"keypress",a(m,t)),e}(u)
d.replaceChild(b,d.children[0]),n(i,"submit",a(l,b))}function b(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}export default b
//# sourceMappingURL=guildChat-4a8f5c78.js.map
