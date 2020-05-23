import{N as e,b7 as n,G as t,ai as o,v as s,ak as a,c8 as r,z as i,A as c,cj as u,ck as f,aA as l,cl as m}from"./calfSystem-01eb06ed.js"
import"./numberIsNaN-5d7b8ccd.js"
import"./isDate-fee13b4a.js"
import{f as p}from"./formatLocalDateTime-74e1ccea.js"
import{x as b}from"./xPath-e480b698.js"
import{b as g}from"./buffObj-d006c43c.js"
let k
function h(e){return k.exec(e)}function d(t){k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function w(e){const n=function(e){return g.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function j(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${w(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function v(e){const n=p(new Date),t=d(document).map(s(j,n))
a(r,t.reverse().join("")+e)}const x=[[()=>c("quickbuff-report"),()=>{u("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&o(r).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{u("unknown.questBook.injectQuestBookFull"),f()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{u("unknown.recipes.inventing"),m()}]]
x.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(i())return
console.log("unknownPage")
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-2918fb3a.js.map
