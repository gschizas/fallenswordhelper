import{N as e,b7 as n,G as t,ai as o,c9 as a,v as s,ak as r,z as i,A as c,ck as f,cl as u,cm as l}from"./calfSystem-94018cd0.js"
import"./numberIsNaN-b4c6efab.js"
import"./isDate-c1cc18a3.js"
import{f as m}from"./formatLocalDateTime-3538fb7e.js"
import{x as p}from"./xPath-b04942fb.js"
import{b}from"./buffObj-a7ba62e1.js"
let g
function k(e){return g.exec(e)}function h(t){return g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",t).map(n).map(k)}function w(e){const n=function(e){return b.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function d(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${w(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function j(e){const n=m(new Date),t=h(document).map(s(d,n))
r(a,t.reverse().join("")+e)}const v=[[()=>c("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&o(a).then(j)}],[()=>p('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),u()}],[()=>$('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),l()}],[()=>!0,()=>{console.log("Fell through!")}]]
export default function(){i()||(console.log("unknownPage"),v.find(e=>e[0]())[1]())}
//# sourceMappingURL=unknownPage-868761fa.js.map
