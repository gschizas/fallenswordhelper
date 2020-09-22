import{H as t,p as e,C as s,f as n,t as a,b as r,g as o,h as c,Q as i}from"./calfSystem-ec854151.js"
import"./createStyle-20f757fd.js"
import"./fshOpen-d34bc8a7.js"
import"./openQuickBuffByName-94ccc2ce.js"
import"./dataRows-40e5e924.js"
import{c as f}from"./createTextArea-d17d25ea.js"
import"./parseDateAsTimestamp-b98cf0ad.js"
import"./doBuffLinkClick-5789f272.js"
import{a as u}from"./addLogColoring-9d5fa9bd.js"
function l(t){t.value=t.value.replace(/\r\n|\n|\r/g," ")}function p(t){t.setAttribute("form","dochat")}function d(t,e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),i(t))}function m(){const t=s('input[value="Send As Mass"]')
if(!t)return
const i=function(){const t=r("form",e)
return t[0].id="dochat",t[0]}(),u=function(){const t=o("input",e).slice(0,7)
return t.forEach(p),t[5]}(),m=function(t){const e=s("#pCC table table")
e.rows[0].cells[0].remove()
const n=e.insertRow(-1).insertCell(-1)
c(n,t)
const a=e.rows[0].cells[0]
return a.rowSpan=2,a}(t),h=function(t){const e=f({cols:72,name:"msg",required:!0,rows:2})
return p(e),n(e,"keypress",a(d,t)),e}(u)
m.replaceChild(h,m.children[0]),n(i,"submit",a(l,h))}function h(){t("enhanceChatTextEntry")&&e&&m(),function(){if(!t("wrapGuildChat"))return
const e=s("#pCC table table table table")
e&&e.classList.add("fshGc")}(),u("Chat",0)}export default h
//# sourceMappingURL=guildChat-63ee23db.js.map
