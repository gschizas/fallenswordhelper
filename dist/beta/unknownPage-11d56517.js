import{N as e,bk as t,G as n,ah as a,v as s,aj as o,c4 as r,z as f,A as i,cf as c,cg as u,ax as m,ch as l}from"./calfSystem-fb94ddf0.js"
import"./numberIsNaN-c4fdd2a1.js"
import"./isDate-756f2a35.js"
import{f as p}from"./formatLocalDateTime-6c8cd0a7.js"
import{x as d}from"./xPath-30caed99.js"
import{b}from"./buffObj-d11c5cfc.js"
let h
function k(e){return h.exec(e)}function g(n){return h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",n).map(t).map(k)}function w(e){const t=function(e){return b.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function j(e,t){let n
var a
return n=t[1]?` ${(a=t)[0]} (${w(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function v(e){const t=p(new Date),n=g(document).map(s(j,t))
o(r,n.reverse().join("")+e)}const x=[[()=>i("quickbuff-report"),()=>{c("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&a(r).then(v)}],[()=>d('//td[.="Quest Name"]'),()=>{c("unknown.questBook.injectQuestBookFull"),u()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{c("unknown.recipes.inventing"),l()}]]
export default function(){if(f())return
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-11d56517.js.map
