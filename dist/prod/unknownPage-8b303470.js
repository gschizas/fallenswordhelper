import{N as e,bi as t,G as n,ah as a,v as s,aj as o,b$ as r,z as i,A as f,ca as c,cb as u,ax as m,cc as l}from"./calfSystem-4f7c0235.js"
import"./numberIsNaN-c62a2787.js"
import"./isDate-546c0676.js"
import{f as p}from"./formatLocalDateTime-07d0e9e0.js"
import{x as b}from"./xPath-9d17ef0d.js"
import{b as d}from"./buffObj-397c5953.js"
let h
function k(e){return h.exec(e)}function w(n){return h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",n).map(t).map(k)}function g(e){const t=function(e){return d.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function j(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${g(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=p(new Date),n=w(document).map(s(j,t))
o(r,n.reverse().join("")+e)}const x=[[()=>f("quickbuff-report"),()=>{c("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(r).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{c("unknown.questBook.injectQuestBookFull"),u()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{c("unknown.recipes.inventing"),l()}]]
export default function(){if(i())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-8b303470.js.map
