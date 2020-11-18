import{D as e,G as n,H as t,br as s,t as a,x as o,C as r,bB as i,bC as f,y as u,bD as c,a9 as m,bE as l}from"./calfSystem-57628ebe.js"
import"./numberIsNaN-d1ebf732.js"
import{g as p,s as b}from"./idb-5c863a6f.js"
import"./isDate-14b56c12.js"
import"./padZ-a3ed1fe1.js"
import{f as w}from"./formatLocalDateTime-c07c341a.js"
import{x as d}from"./xPath-f4917912.js"
import{b as k}from"./buffObj-cea0717c.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function B(e){const n=w(new Date),t=j(document).map(a(x,n))
b(s,t.reverse().join("")+e)}const D=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(s).then(B)}],[()=>d('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
function y(){if(o())return
const e=D.find(e=>e[0]())
e&&e[1]()}export default y
//# sourceMappingURL=unknownPage-0b483a92.js.map
