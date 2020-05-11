import{N as e,bi as t,G as n,ah as a,v as s,aj as o,b$ as r,z as i,A as f,ca as u,cb as c,ax as m,cc as l}from"./calfSystem-72fdbe97.js"
import"./numberIsNaN-7d89f7bf.js"
import"./isDate-08d5ec71.js"
import{f as p}from"./formatLocalDateTime-ea9e02a8.js"
import{x as b}from"./xPath-1c0a6453.js"
import{b as d}from"./buffObj-db96d9e7.js"
let h
function k(e){return h.exec(e)}function w(n){return h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",n).map(t).map(k)}function g(e){const t=function(e){return d.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function j(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${g(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=p(new Date),n=w(document).map(s(j,t))
o(r,n.reverse().join("")+e)}const x=[[()=>f("quickbuff-report"),()=>{u("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(r).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{u("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{u("unknown.recipes.inventing"),l()}]]
export default function(){if(i())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-34d51eed.js.map
