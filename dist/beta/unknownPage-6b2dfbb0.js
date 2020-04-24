import{N as e,bk as t,G as n,ah as a,c4 as o,v as s,aj as r,z as f,A as i,cf as c,cg as u,ch as m}from"./calfSystem-07c25a1c.js"
import"./numberIsNaN-77d2bff3.js"
import"./isDate-684e0288.js"
import{f as l}from"./formatLocalDateTime-3f733767.js"
import{x as p}from"./xPath-15333f28.js"
import{b}from"./buffObj-2a2be0bc.js"
let h
function k(e){return h.exec(e)}function g(n){return h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",n).map(t).map(k)}function w(e){const t=function(e){return b.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function d(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${w(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function j(e){const t=l(new Date),n=g(document).map(s(d,t))
r(o,n.reverse().join("")+e)}const v=[[()=>i("quickbuff-report"),()=>{c("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(o).then(j)}],[()=>p('//td[.="Quest Name"]'),()=>{c("unknown.questBook.injectQuestBookFull"),u()}],[()=>$('#pCC img[title="Inventing"]').length>0,()=>{c("unknown.recipes.inventing"),m()}]]
export default function(){f()||v.find(e=>e[0]())[1]()}
//# sourceMappingURL=unknownPage-6b2dfbb0.js.map
