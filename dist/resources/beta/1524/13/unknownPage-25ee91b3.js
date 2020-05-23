import{N as e,bk as t,G as n,ah as a,v as s,aj as o,c4 as r,z as f,A as i,cf as u,cg as c,ax as m,ch as l}from"./calfSystem-1e164202.js"
import"./numberIsNaN-caf9724d.js"
import"./isDate-15e6062a.js"
import{f as p}from"./formatLocalDateTime-f28b71af.js"
import{x as b}from"./xPath-e874e891.js"
import{b as h}from"./buffObj-ca3e8401.js"
let k
function g(e){return k.exec(e)}function w(n){k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",n).map(t).map(g)}function d(e){const t=function(e){return h.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function j(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${d(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=p(new Date),n=w(document).map(s(j,t))
o(r,n.reverse().join("")+e)}const x=[[()=>i("quickbuff-report"),()=>{u("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(r).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{u("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{u("unknown.recipes.inventing"),l()}]]
export default function(){if(f())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-25ee91b3.js.map
