import{D as e,G as n,H as t,bu as s,t as a,x as o,C as r,bF as f,bG as i,y as u,bH as c,a9 as m,bI as l}from"./calfSystem-ec854151.js"
import"./numberIsNaN-00e0daaf.js"
import{g as b,s as p}from"./idb-72ad0068.js"
import"./isDate-1ee2b7eb.js"
import"./padZ-cba8efb8.js"
import{f as w}from"./formatLocalDateTime-41195800.js"
import{x as d}from"./xPath-4f7fb7d5.js"
import{b as k}from"./buffObj-370bcf38.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=w(new Date),t=j(document).map(a(x,n))
p(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&b(s).then(y)}],[()=>d('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),l()}]]
function D(){if(o())return
const e=B.find(e=>e[0]())
e&&e[1]()}export default D
//# sourceMappingURL=unknownPage-d13d1041.js.map
