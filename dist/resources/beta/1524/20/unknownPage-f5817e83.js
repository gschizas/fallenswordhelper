import{D as e,K as n,G as t,by as a,t as s,x as o,C as r,bJ as f,bK as i,y as u,bL as c,a9 as m,bM as l}from"./calfSystem-05554bae.js"
import"./numberIsNaN-d04aa9f7.js"
import{g as p,s as b}from"./idb-862da886.js"
import"./isDate-b81a8388.js"
import"./padZ-14d8d7ee.js"
import{f as d}from"./formatLocalDateTime-1ff300c1.js"
import{x as w}from"./xPath-8466baf0.js"
import{b as k}from"./buffObj-b2053fa5.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var a
return t=n[1]?` ${(a=n)[0]} (${v(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=d(new Date),t=j(document).map(s(x,n))
b(a,t.reverse().join("")+e)}const L=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(a).then(y)}],[()=>w('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),l()}]]
export default function(){if(o())return
const e=L.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-f5817e83.js.map
