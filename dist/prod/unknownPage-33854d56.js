import{N as e,bi as t,G as n,ah as a,b$ as s,v as o,aj as r,z as i,A as f,ca as c,cb as u,ax as m,cc as l}from"./calfSystem-3956a623.js"
import"./numberIsNaN-c09ad043.js"
import"./isDate-dd83b977.js"
import{f as p}from"./formatLocalDateTime-4dc4e18e.js"
import{x as b}from"./xPath-f0cb4248.js"
import{b as d}from"./buffObj-930b74f8.js"
let h
function k(e){return h.exec(e)}function w(n){return h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",n).map(t).map(k)}function g(e){const t=function(e){return d.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function j(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${g(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=p(new Date),n=w(document).map(o(j,t))
r(s,n.reverse().join("")+e)}const x=[[()=>f("quickbuff-report"),()=>{c("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(s).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{c("unknown.questBook.injectQuestBookFull"),u()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{c("unknown.recipes.inventing"),l()}]]
export default function(){if(i())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-33854d56.js.map
