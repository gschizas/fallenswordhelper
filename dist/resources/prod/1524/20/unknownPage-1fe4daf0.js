import{D as e,K as t,G as n,bt as s,t as a,x as o,C as r,bE as i,bF as f,y as u,bG as c,a9 as m,bH as l}from"./calfSystem-03970067.js"
import"./numberIsNaN-b19dc958.js"
import{g as p,s as b}from"./idb-3dad9172.js"
import"./isDate-1d982223.js"
import"./padZ-5ea37ccb.js"
import{f as d}from"./formatLocalDateTime-a1756fb1.js"
import{x as w}from"./xPath-1aefce45.js"
import{b as k}from"./buffObj-705b9c7d.js"
let g
function h(e){return g.exec(e)}function j(n){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",n).map(t).map(h)}function v(e){const t=function(e){return k.find(t=>t.name===e)}(e)
return t?t.stam.toString():"-"}function x(e,t){let n
var s
return n=t[1]?` ${(s=t)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(t),e+n}function y(e){const t=d(new Date),n=j(document).map(a(x,t))
b(s,n.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),n("keepBuffLog")&&p(s).then(y)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
export default function(){if(o())return
const e=B.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-1fe4daf0.js.map
