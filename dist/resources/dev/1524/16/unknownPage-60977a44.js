import{I as e,a4 as n,D as t,bH as o,s,w as a,N as r,bR as i,bS as f,x as u,bT as c,ab as l,bU as m}from"./calfSystem-d49dbbd3.js"
import"./numberIsNaN-1742f258.js"
import{g as b,s as p}from"./idb-a6d1a1ba.js"
import"./isDate-f02c431c.js"
import"./padZ-004f73b4.js"
import{f as d}from"./formatLocalDateTime-2be45d59.js"
import{x as w}from"./xPath-e6d86637.js"
import{b as g}from"./buffObj-b2b9fab3.js"
let h
function k(e){return h.exec(e)}function j(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(k)}function v(e){const n=function(e){return g.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function B(e){const n=d(new Date),t=j(document).map(s(x,n))
p(o,t.reverse().join("")+e)}const D=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&b(o).then(B)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),m()}]]
D.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(a())return
console.log("unknownPage")
const e=D.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-60977a44.js.map
