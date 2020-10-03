import{D as e,G as n,H as t,bx as s,t as o,x as a,C as r,bH as f,bI as i,y as u,bJ as c,a9 as m,bK as l}from"./calfSystem-cf4d22a7.js"
import"./numberIsNaN-a6bcb044.js"
import{g as p,s as b}from"./idb-4798970d.js"
import"./isDate-622067da.js"
import"./padZ-f9e33f92.js"
import{f as d}from"./formatLocalDateTime-09429320.js"
import{x as w}from"./xPath-790edecf.js"
import{b as k}from"./buffObj-edd5c6f3.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=d(new Date),t=j(document).map(o(x,n))
b(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(s).then(y)}],[()=>w('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),l()}]]
function D(){if(a())return
const e=B.find(e=>e[0]())
e&&e[1]()}export default D
//# sourceMappingURL=unknownPage-5bc06f57.js.map
