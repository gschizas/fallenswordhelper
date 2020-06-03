import{I as e,a8 as n,D as t,bF as s,s as o,w as a,M as r,bP as f,bQ as i,x as u,bR as c,a7 as m,bS as l}from"./calfSystem-57340987.js"
import"./numberIsNaN-9e712afc.js"
import{g as p,s as b}from"./idb-c55e2904.js"
import"./isDate-2c2b8ff6.js"
import"./padZ-4a0f9130.js"
import{f as w}from"./formatLocalDateTime-f3e20ebd.js"
import{x as d}from"./xPath-bc72d363.js"
import{b as k}from"./buffObj-939c34c8.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function B(e){const n=w(new Date),t=j(document).map(o(x,n))
b(s,t.reverse().join("")+e)}const D=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(s).then(B)}],[()=>d('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),l()}]]
export default function(){if(a())return
const e=D.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-8378d54c.js.map
