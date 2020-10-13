import{H as t,p as e,C as s,f as a,t as n,b as r,g as o,h as c,Q as i}from"./calfSystem-b136673a.js"
import"./createStyle-04d9ec28.js"
import"./fshOpen-027ef4bd.js"
import"./openQuickBuffByName-1b8ea02b.js"
import"./dataRows-17e46aaa.js"
import{c as f}from"./createTextArea-141eee0d.js"
import"./parseDateAsTimestamp-dc8c4305.js"
import"./doBuffLinkClick-96a0b2d6.js"
import{a as u}from"./addLogColoring-edf6d445.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function d(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function m(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),m=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const a=e.insertRow(-1).insertCell(-1)
c(a,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),b=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),a(e,"keypress",n(d,t)),e}(u)
m.replaceChild(b,m.children[0]),a(i,"submit",n(l,b))}function b(){t("enhanceChatTextEntry")&&e&&m(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}export default b
//# sourceMappingURL=guildChat-ae329103.js.map
