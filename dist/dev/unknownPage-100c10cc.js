import{N as e,b7 as n,G as t,ai as o,v as a,ak as s,c8 as r,z as f,A as i,cj as c,ck as u,aA as l,cl as m}from"./calfSystem-0e5d6faf.js"
import"./numberIsNaN-a4c8282b.js"
import"./isDate-d076e679.js"
import{f as p}from"./formatLocalDateTime-f6fcd32d.js"
import{x as g}from"./xPath-77c22f83.js"
import{b as k}from"./buffObj-ffca1882.js"
let h
function b(e){return h.exec(e)}function d(t){return h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",t).map(n).map(b)}function w(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function j(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${w(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function v(e){const n=p(new Date),t=d(document).map(a(j,n))
s(r,t.reverse().join("")+e)}const x=[[()=>i("quickbuff-report"),()=>{c("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&o(r).then(v)}],[()=>g('//td[.="Quest Name"]'),()=>{c("unknown.questBook.injectQuestBookFull"),u()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{c("unknown.recipes.inventing"),m()}]]
x.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(f())return
console.log("unknownPage")
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-100c10cc.js.map
