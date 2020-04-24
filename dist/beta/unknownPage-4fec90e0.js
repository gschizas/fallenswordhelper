import{N as e,bk as t,G as n,ah as a,c4 as s,v as o,aj as r,z as i,A as f,cf as c,cg as u,ax as m,ch as l}from"./calfSystem-c91e004c.js"
import"./numberIsNaN-e812a421.js"
import"./isDate-1318bbd5.js"
import{f as p}from"./formatLocalDateTime-d158f1db.js"
import{x as b}from"./xPath-b33cbb8e.js"
import{b as d}from"./buffObj-1c4f85d9.js"
let h
function k(e){return h.exec(e)}function g(n){return h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",n).map(t).map(k)}function w(e){const t=function(e){return d.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function j(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${w(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=p(new Date),n=g(document).map(o(j,t))
r(s,n.reverse().join("")+e)}const x=[[()=>f("quickbuff-report"),()=>{c("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(s).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{c("unknown.questBook.injectQuestBookFull"),u()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{c("unknown.recipes.inventing"),l()}]]
export default function(){if(i())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-4fec90e0.js.map
