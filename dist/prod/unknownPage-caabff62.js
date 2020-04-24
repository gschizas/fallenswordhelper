import{N as e,bi as t,G as n,ah as a,b$ as o,v as s,aj as r,z as i,A as f,ca as c,cb as u,cc as m}from"./calfSystem-cb871cc0.js"
import"./numberIsNaN-3061f097.js"
import"./isDate-4e37d041.js"
import{f as l}from"./formatLocalDateTime-5828b171.js"
import{x as p}from"./xPath-014661a4.js"
import{b}from"./buffObj-d8bfcb16.js"
let h
function k(e){return h.exec(e)}function w(n){return h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",n).map(t).map(k)}function d(e){const t=function(e){return b.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function g(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${d(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function j(e){const t=l(new Date),n=w(document).map(s(g,t))
r(o,n.reverse().join("")+e)}const v=[[()=>f("quickbuff-report"),()=>{c("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(o).then(j)}],[()=>p('//td[.="Quest Name"]'),()=>{c("unknown.questBook.injectQuestBookFull"),u()}],[()=>$('#pCC img[title="Inventing"]').length>0,()=>{c("unknown.recipes.inventing"),m()}]]
export default function(){i()||v.find(e=>e[0]())[1]()}
//# sourceMappingURL=unknownPage-caabff62.js.map
