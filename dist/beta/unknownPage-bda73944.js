import{N as e,bk as t,G as n,ah as a,v as s,aj as o,c4 as r,z as i,A as f,cf as c,cg as u,ax as m,ch as l}from"./calfSystem-70c0e373.js"
import"./numberIsNaN-a9336482.js"
import"./isDate-cc4b6185.js"
import{f as p}from"./formatLocalDateTime-eda2bf6d.js"
import{x as b}from"./xPath-879cd5fa.js"
import{b as h}from"./buffObj-c878663a.js"
let k
function d(e){return k.exec(e)}function g(n){return k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",n).map(t).map(d)}function w(e){const t=function(e){return h.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function j(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${w(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=p(new Date),n=g(document).map(s(j,t))
o(r,n.reverse().join("")+e)}const x=[[()=>f("quickbuff-report"),()=>{c("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(r).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{c("unknown.questBook.injectQuestBookFull"),u()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{c("unknown.recipes.inventing"),l()}]]
export default function(){if(i())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-bda73944.js.map
