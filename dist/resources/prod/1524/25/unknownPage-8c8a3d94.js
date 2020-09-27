import{D as e,G as n,H as t,bu as s,t as a,x as o,C as r,bF as i,bG as f,y as u,bH as c,a9 as m,bI as l}from"./calfSystem-71b9378d.js"
import"./numberIsNaN-929de7af.js"
import{g as p,s as b}from"./idb-97e2a44e.js"
import"./isDate-b3759236.js"
import"./padZ-0c2f5370.js"
import{f as d}from"./formatLocalDateTime-be73fafb.js"
import{x as w}from"./xPath-e31da866.js"
import{b as k}from"./buffObj-33a441d7.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=d(new Date),t=j(document).map(a(x,n))
b(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(s).then(y)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
function D(){if(o())return
const e=B.find(e=>e[0]())
e&&e[1]()}export default D
//# sourceMappingURL=unknownPage-8c8a3d94.js.map
