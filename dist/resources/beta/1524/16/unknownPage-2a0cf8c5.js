import{I as e,a8 as n,D as t,bF as s,s as a,w as o,M as r,bP as f,bQ as i,x as u,bR as c,a7 as m,bS as l}from"./calfSystem-9554b525.js"
import"./numberIsNaN-f35fe828.js"
import{g as p,s as b}from"./idb-e27acc21.js"
import"./isDate-499dba92.js"
import"./padZ-484af22c.js"
import{f as w}from"./formatLocalDateTime-7e4fb5ec.js"
import{x as d}from"./xPath-fed69dd6.js"
import{b as k}from"./buffObj-01a07e20.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function B(e){const n=w(new Date),t=j(document).map(a(x,n))
b(s,t.reverse().join("")+e)}const D=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(s).then(B)}],[()=>d('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),l()}]]
export default function(){if(o())return
const e=D.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-2a0cf8c5.js.map
