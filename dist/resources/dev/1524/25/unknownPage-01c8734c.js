import{D as e,G as n,H as t,bB as o,t as s,x as a,C as r,bM as f,bN as i,y as u,bO as c,ab as l,bP as m}from"./calfSystem-69dd5601.js"
import"./numberIsNaN-929de7af.js"
import{g as p,s as b}from"./idb-874fe815.js"
import"./isDate-b3759236.js"
import"./padZ-0c2f5370.js"
import{f as d}from"./formatLocalDateTime-be73fafb.js"
import{x as g}from"./xPath-e3d3a9bb.js"
import{b as w}from"./buffObj-33a441d7.js"
let h
function k(e){return h.exec(e)}function j(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(k)}function v(e){const n=function(e){return w.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function B(e){const n=d(new Date),t=j(document).map(s(x,n))
b(o,t.reverse().join("")+e)}const y=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(o).then(B)}],[()=>g('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),m()}]]
function D(){if(a())return
console.log("unknownPage")
const e=y.find(e=>e[0]())
e&&e[1]()}y.push([()=>!0,()=>{console.log("Fell through!")}])
export default D
//# sourceMappingURL=unknownPage-01c8734c.js.map
