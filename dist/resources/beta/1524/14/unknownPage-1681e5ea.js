import{M as e,bj as t,F as n,ag as a,u as s,ai as o,c3 as r,y as i,z as f,ce as u,cf as c,aw as m,cg as l}from"./calfSystem-371c414c.js"
import"./numberIsNaN-987e3021.js"
import"./isDate-a362329c.js"
import{f as p}from"./formatLocalDateTime-1836d05e.js"
import{x as b}from"./xPath-5ba71fda.js"
import{b as g}from"./buffObj-2f63841f.js"
let w
function k(e){return w.exec(e)}function d(n){w||(w=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",n).map(t).map(k)}function h(e){const t=function(e){return g.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function j(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${h(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=p(new Date),n=d(document).map(s(j,t))
o(r,n.reverse().join("")+e)}const x=[[()=>f("quickbuff-report"),()=>{u("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(r).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{u("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{u("unknown.recipes.inventing"),l()}]]
export default function(){if(i())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-1681e5ea.js.map
