import{D as e,G as n,H as t,bz as s,t as a,x as o,C as r,bK as i,bL as f,y as u,bM as c,a9 as m,bN as l}from"./calfSystem-019a589c.js"
import"./numberIsNaN-00e0daaf.js"
import{g as b,s as p}from"./idb-6718e849.js"
import"./isDate-1ee2b7eb.js"
import"./padZ-cba8efb8.js"
import{f as w}from"./formatLocalDateTime-41195800.js"
import{x as d}from"./xPath-5d2c3bd0.js"
import{b as k}from"./buffObj-370bcf38.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function L(e){const n=w(new Date),t=j(document).map(a(x,n))
p(s,t.reverse().join("")+e)}const y=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&b(s).then(L)}],[()=>d('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
function B(){if(o())return
const e=y.find(e=>e[0]())
e&&e[1]()}export default B
//# sourceMappingURL=unknownPage-de900d3a.js.map
