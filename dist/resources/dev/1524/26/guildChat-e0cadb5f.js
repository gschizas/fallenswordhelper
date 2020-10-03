import{H as t,p as e,C as s,f as n,t as r,b as a,g as o,h as c,Q as i}from"./calfSystem-4991bf5b.js"
import"./createStyle-65df74b6.js"
import"./fshOpen-a7890139.js"
import"./openQuickBuffByName-94fca028.js"
import"./dataRows-bc8eef13.js"
import{c as f}from"./createTextArea-74d36b8a.js"
import"./parseDateAsTimestamp-38003be6.js"
import"./doBuffLinkClick-e35eed9e.js"
import{a as u}from"./addLogColoring-3fe40b26.js"
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
//# sourceMappingURL=guildChat-e0cadb5f.js.map
