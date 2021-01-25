import{H as t,p as e,C as s,f as a,t as n,b as r,g as o,h as c,Q as i}from"./calfSystem-26bcf570.js"
import{c as f}from"./createTextArea-a894f326.js"
import{a as u}from"./addLogColoring-c83f953d.js"
import"./createStyle-1e114c13.js"
import"./dataRows-8ffa0e9a.js"
import"./doBuffLinkClick-84e9a69c.js"
import"./openQuickBuffByName-effe4147.js"
import"./fshOpen-56a6fafa.js"
import"./parseDateAsTimestamp-623e3c34.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function m(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function d(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),d=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const a=e.insertRow(-1).insertCell(-1)
c(a,t)
const n=e.rows[0].cells[0]
return n.rowSpan=2,n}(t),h=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),a(e,"keypress",n(m,t)),e}(u)
d.replaceChild(h,d.children[0]),a(i,"submit",n(l,h))}function h(){t("enhanceChatTextEntry")&&e&&d(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}export default h
//# sourceMappingURL=guildChat-d8b7671e.js.map
