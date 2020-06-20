import{D as e,K as n,G as t,bu as s,t as a,x as o,C as r,bF as i,bG as f,y as u,bH as c,a9 as m,bI as l}from"./calfSystem-2741d97b.js"
import"./numberIsNaN-ed994c04.js"
import{g as b,s as p}from"./idb-cb4fc9f9.js"
import"./isDate-2bcc8259.js"
import"./padZ-7a081566.js"
import{f as d}from"./formatLocalDateTime-eca41e0b.js"
import{x as w}from"./xPath-eb83d4da.js"
import{b as k}from"./buffObj-1b1d81ca.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=d(new Date),t=j(document).map(a(x,n))
p(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&b(s).then(y)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
export default function(){if(o())return
const e=B.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-1cd7677d.js.map
