import{N as e,b7 as n,G as t,ai as o,v as s,ak as a,c8 as r,z as i,A as f,cj as c,ck as u,aA as l,cl as m}from"./calfSystem-8dc0fa4b.js"
import"./numberIsNaN-73f607dc.js"
import"./isDate-f41a9473.js"
import{f as p}from"./formatLocalDateTime-043c5978.js"
import{x as g}from"./xPath-25f95332.js"
import{b as k}from"./buffObj-b7c475c0.js"
let b
function h(e){return b.exec(e)}function w(t){return b||(b=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",t).map(n).map(h)}function d(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function j(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${d(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function v(e){const n=p(new Date),t=w(document).map(s(j,n))
a(r,t.reverse().join("")+e)}const x=[[()=>f("quickbuff-report"),()=>{c("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&o(r).then(v)}],[()=>g('//td[.="Quest Name"]'),()=>{c("unknown.questBook.injectQuestBookFull"),u()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{c("unknown.recipes.inventing"),m()}]]
x.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(i())return
console.log("unknownPage")
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-8ae9712c.js.map
