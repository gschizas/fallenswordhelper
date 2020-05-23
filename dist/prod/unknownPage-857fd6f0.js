import{N as e,bi as t,G as n,ah as a,v as s,aj as o,b$ as r,z as i,A as f,ca as u,cb as c,ax as m,cc as l}from"./calfSystem-4b4fbec4.js"
import"./numberIsNaN-3b37a036.js"
import"./isDate-0a89a2ae.js"
import{f as b}from"./formatLocalDateTime-ad8d290b.js"
import{x as p}from"./xPath-d248cf47.js"
import{b as d}from"./buffObj-bb311a1b.js"
let h
function k(e){return h.exec(e)}function w(n){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",n).map(t).map(k)}function g(e){const t=function(e){return d.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function j(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${g(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=b(new Date),n=w(document).map(s(j,t))
o(r,n.reverse().join("")+e)}const x=[[()=>f("quickbuff-report"),()=>{u("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(r).then(v)}],[()=>p('//td[.="Quest Name"]'),()=>{u("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{u("unknown.recipes.inventing"),l()}]]
export default function(){if(i())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-857fd6f0.js.map
