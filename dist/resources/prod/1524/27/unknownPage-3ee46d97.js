import{D as e,G as n,H as t,bs as s,t as a,x as o,C as r,bC as i,bD as f,y as u,bE as c,aa as m,bF as l}from"./calfSystem-3bdf319e.js"
import"./numberIsNaN-871eca26.js"
import{g as p,s as b}from"./idb-31fb041e.js"
import"./isDate-ad4f47cd.js"
import"./padZ-b87d0d09.js"
import{f as d}from"./formatLocalDateTime-a37bd785.js"
import{x as w}from"./xPath-3027b789.js"
import{b as k}from"./buffObj-fc2481d9.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function D(e){const n=d(new Date),t=j(document).map(a(x,n))
b(s,t.reverse().join("")+e)}const y=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(s).then(D)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
function B(){if(o())return
const e=y.find(e=>e[0]())
e&&e[1]()}export default B
//# sourceMappingURL=unknownPage-3ee46d97.js.map
