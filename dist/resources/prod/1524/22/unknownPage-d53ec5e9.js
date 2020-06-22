import{D as e,K as n,G as t,bu as s,t as o,x as a,C as r,bF as i,bG as f,y as u,bH as c,a9 as m,bI as l}from"./calfSystem-d04e4be4.js"
import"./numberIsNaN-eb16384c.js"
import{g as b,s as p}from"./idb-0492f5ed.js"
import"./isDate-72ba9145.js"
import"./padZ-cb9d6b55.js"
import{f as d}from"./formatLocalDateTime-16dde364.js"
import{x as w}from"./xPath-1e9382b5.js"
import{b as k}from"./buffObj-84c39b72.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=d(new Date),t=j(document).map(o(x,n))
p(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&b(s).then(y)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
export default function(){if(a())return
const e=B.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-d53ec5e9.js.map
