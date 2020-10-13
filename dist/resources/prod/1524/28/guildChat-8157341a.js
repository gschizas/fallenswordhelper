import{H as t,p as e,C as s,f as n,t as a,b as r,g as o,h as c,P as i}from"./calfSystem-a5da5210.js"
import"./createStyle-c78804ee.js"
import"./fshOpen-027ef4bd.js"
import"./openQuickBuffByName-08b8519d.js"
import"./dataRows-544fd651.js"
import{c as f}from"./createTextArea-6c19a0fe.js"
import"./parseDateAsTimestamp-5ef6ade0.js"
import"./doBuffLinkClick-ebdf6185.js"
import{a as u}from"./addLogColoring-92525390.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const n=e.insertRow(-1).insertCell(-1)
c(n,t)
const a=e.rows[0].cells[0]
return a.rowSpan=2,a}(t),h=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),n(e,"keypress",a(m,t)),e}(u)
d.replaceChild(h,d.children[0]),n(i,"submit",a(l,h))}function h(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}export default h
//# sourceMappingURL=guildChat-8157341a.js.map
