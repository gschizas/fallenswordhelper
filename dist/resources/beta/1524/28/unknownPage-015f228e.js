import{D as e,G as n,H as t,bw as s,t as a,x as o,C as r,bG as i,bH as f,y as u,bI as c,a9 as m,bJ as l}from"./calfSystem-964f4fc9.js"
import"./numberIsNaN-91041dcf.js"
import{g as p,s as b}from"./idb-be8b4ca8.js"
import"./isDate-45c423ee.js"
import"./padZ-28ca6b6e.js"
import{f as w}from"./formatLocalDateTime-8d7e97c2.js"
import{x as d}from"./xPath-82a404a0.js"
import{b as k}from"./buffObj-79519cf4.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=w(new Date),t=j(document).map(a(x,n))
b(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(s).then(y)}],[()=>d('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
function D(){if(o())return
const e=B.find(e=>e[0]())
e&&e[1]()}export default D
//# sourceMappingURL=unknownPage-015f228e.js.map
