import{N as e,b7 as n,G as t,ai as o,v as s,ak as a,c8 as r,z as i,A as c,cj as f,ck as u,aA as l,cl as m}from"./calfSystem-fd021443.js"
import"./numberIsNaN-c0f5c8eb.js"
import"./isDate-cac18223.js"
import{f as p}from"./formatLocalDateTime-5b6685e5.js"
import{x as g}from"./xPath-9d6ee385.js"
import{b as k}from"./buffObj-c5e0f420.js"
let b
function h(e){return b.exec(e)}function w(t){b||(b=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function d(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function j(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${d(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function v(e){const n=p(new Date),t=w(document).map(s(j,n))
a(r,t.reverse().join("")+e)}const x=[[()=>c("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&o(r).then(v)}],[()=>g('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),u()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),m()}]]
x.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(i())return
console.log("unknownPage")
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-d7fc1e58.js.map
