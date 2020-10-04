import{H as t,p as e,C as a,f as s,t as n,b as r,g as o,h as c,P as i}from"./calfSystem-70c7a660.js"
import"./createStyle-cb78fc8f.js"
import"./fshOpen-da9a149e.js"
import"./openQuickBuffByName-caa214c8.js"
import"./dataRows-91ac97a0.js"
import{c as f}from"./createTextArea-6e3d33ab.js"
import"./parseDateAsTimestamp-e22eadba.js"
import"./doBuffLinkClick-0aa19e9c.js"
import{a as u}from"./addLogColoring-06e21ea4.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=a('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=a("#pCC table table")
e.rows[0].cells[0].remove()
const s=e.insertRow(-1).insertCell(-1)
c(s,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),h=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),s(e,"keypress",n(m,t)),e}(u)
d.replaceChild(h,d.children[0]),s(i,"submit",n(l,h))}function h(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=a("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}export default h
//# sourceMappingURL=guildChat-a5001e89.js.map
