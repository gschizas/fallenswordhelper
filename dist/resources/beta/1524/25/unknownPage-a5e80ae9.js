import{D as e,G as n,H as t,bz as a,t as s,x as o,C as r,bK as f,bL as i,y as u,bM as c,a9 as m,bN as l}from"./calfSystem-d3aab5a8.js"
import"./numberIsNaN-929de7af.js"
import{g as p,s as b}from"./idb-f33380fa.js"
import"./isDate-b3759236.js"
import"./padZ-0c2f5370.js"
import{f as d}from"./formatLocalDateTime-be73fafb.js"
import{x as w}from"./xPath-004f8d34.js"
import{b as k}from"./buffObj-33a441d7.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var a
return t=n[1]?` ${(a=n)[0]} (${v(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function L(e){const n=d(new Date),t=j(document).map(s(x,n))
b(a,t.reverse().join("")+e)}const y=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(a).then(L)}],[()=>w('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),l()}]]
function B(){if(o())return
const e=y.find(e=>e[0]())
e&&e[1]()}export default B
//# sourceMappingURL=unknownPage-a5e80ae9.js.map
