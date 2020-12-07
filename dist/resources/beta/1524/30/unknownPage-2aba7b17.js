import{D as e,G as n,H as t,bw as s,t as a,x as o,C as r,bG as f,bH as i,y as u,bI as c,a9 as m,bJ as l}from"./calfSystem-ebf4b17d.js"
import"./numberIsNaN-fa7d637d.js"
import{g as b,s as p}from"./idb-b7d9067e.js"
import"./isDate-546a6320.js"
import"./padZ-bd3dfcf9.js"
import{f as d}from"./formatLocalDateTime-a3e766db.js"
import{x as w}from"./xPath-7c6b881f.js"
import{b as k}from"./buffObj-59ad5c76.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=d(new Date),t=j(document).map(a(x,n))
p(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&b(s).then(y)}],[()=>w('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),l()}]]
function D(){if(o())return
const e=B.find(e=>e[0]())
e&&e[1]()}export default D
//# sourceMappingURL=unknownPage-2aba7b17.js.map
