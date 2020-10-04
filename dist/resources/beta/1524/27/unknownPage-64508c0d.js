import{D as e,G as n,H as t,bx as s,t as a,x as o,C as r,bH as i,bI as f,y as u,bJ as c,aa as m,bK as l}from"./calfSystem-70c7a660.js"
import"./numberIsNaN-871eca26.js"
import{g as p,s as d}from"./idb-d93da5f0.js"
import"./isDate-ad4f47cd.js"
import"./padZ-b87d0d09.js"
import{f as b}from"./formatLocalDateTime-a37bd785.js"
import{x as w}from"./xPath-d706fe1d.js"
import{b as k}from"./buffObj-fc2481d9.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=b(new Date),t=j(document).map(a(x,n))
d(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(s).then(y)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
function D(){if(o())return
const e=B.find(e=>e[0]())
e&&e[1]()}export default D
//# sourceMappingURL=unknownPage-64508c0d.js.map
