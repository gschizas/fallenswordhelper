import{I as e,a8 as n,D as t,bA as s,s as o,w as a,M as r,bK as f,bL as i,x as u,bM as c,a7 as m,bN as l}from"./calfSystem-dec5e071.js"
import"./numberIsNaN-ea515379.js"
import{g as p,s as b}from"./idb-8fe34e30.js"
import"./isDate-d6df2ce8.js"
import"./padZ-89cf7495.js"
import{f as d}from"./formatLocalDateTime-020e647d.js"
import{x as w}from"./xPath-8069d44e.js"
import{b as k}from"./buffObj-70e3fcf6.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function L(e){const n=d(new Date),t=j(document).map(o(x,n))
b(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(s).then(L)}],[()=>w('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),l()}]]
export default function(){if(a())return
const e=B.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-f1f63c09.js.map
