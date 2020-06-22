import{D as e,K as n,G as t,bB as o,t as s,x as a,C as r,bM as f,bN as i,y as u,bO as c,ab as l,bP as m}from"./calfSystem-4cc738f8.js"
import"./numberIsNaN-1f5d9185.js"
import{g as p,s as b}from"./idb-670c0cca.js"
import"./isDate-f0efcfda.js"
import"./padZ-efc0fa0f.js"
import{f as g}from"./formatLocalDateTime-67261aab.js"
import{x as w}from"./xPath-b4e8c5bd.js"
import{b as d}from"./buffObj-fda6eb0f.js"
let h
function k(e){return h.exec(e)}function j(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(k)}function v(e){const n=function(e){return d.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function B(e){const n=g(new Date),t=j(document).map(s(x,n))
b(o,t.reverse().join("")+e)}const y=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(o).then(B)}],[()=>w('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),m()}]]
y.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(a())return
console.log("unknownPage")
const e=y.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-1b94d802.js.map
