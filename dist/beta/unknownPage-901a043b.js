import{N as e,bk as t,G as n,ah as a,v as s,aj as o,c4 as r,z as f,A as i,cf as c,cg as u,ax as m,ch as l}from"./calfSystem-99da704d.js"
import"./numberIsNaN-9b6eee03.js"
import"./isDate-ceb0f978.js"
import{f as p}from"./formatLocalDateTime-faa1ec7c.js"
import{x as b}from"./xPath-3ac016bf.js"
import{b as h}from"./buffObj-661b7e94.js"
let k
function g(e){return k.exec(e)}function w(n){return k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",n).map(t).map(g)}function d(e){const t=function(e){return h.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function j(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${d(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=p(new Date),n=w(document).map(s(j,t))
o(r,n.reverse().join("")+e)}const x=[[()=>i("quickbuff-report"),()=>{c("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(r).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{c("unknown.questBook.injectQuestBookFull"),u()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{c("unknown.recipes.inventing"),l()}]]
export default function(){if(f())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-901a043b.js.map
