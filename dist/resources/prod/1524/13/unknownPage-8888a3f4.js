import{N as e,bi as t,G as n,ah as a,v as s,aj as o,b$ as r,z as i,A as c,ca as f,cb as u,ax as m,cc as l}from"./calfSystem-e6a24264.js"
import"./numberIsNaN-c3be1434.js"
import"./isDate-42796083.js"
import{f as p}from"./formatLocalDateTime-ae524e59.js"
import{x as b}from"./xPath-c1c7c7be.js"
import{b as h}from"./buffObj-698c2569.js"
let k
function w(e){return k.exec(e)}function g(n){k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",n).map(t).map(w)}function j(e){const t=function(e){return h.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function d(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${j(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=p(new Date),n=g(document).map(s(d,t))
o(r,n.reverse().join("")+e)}const x=[[()=>c("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(r).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),u()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),l()}]]
export default function(){if(i())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-8888a3f4.js.map
