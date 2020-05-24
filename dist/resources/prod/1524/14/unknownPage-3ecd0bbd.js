import{M as e,bh as t,F as n,ag as a,u as s,ai as o,b_ as r,y as i,z as f,c9 as u,ca as c,aw as m,cb as l}from"./calfSystem-d587d232.js"
import"./numberIsNaN-054e0c59.js"
import"./isDate-e674ecfd.js"
import{f as p}from"./formatLocalDateTime-9f6d250b.js"
import{x as b}from"./xPath-71865ff6.js"
import{b as d}from"./buffObj-e1dd8bc6.js"
let w
function g(e){return w.exec(e)}function h(n){w||(w=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",n).map(t).map(g)}function k(e){const t=function(e){return d.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function j(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${k(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=p(new Date),n=h(document).map(s(j,t))
o(r,n.reverse().join("")+e)}const x=[[()=>f("quickbuff-report"),()=>{u("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(r).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{u("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{u("unknown.recipes.inventing"),l()}]]
export default function(){if(i())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-3ecd0bbd.js.map
