import{I as e,a4 as n,D as t,bH as o,s,w as a,N as r,bR as i,bS as f,x as u,bT as c,ab as l,bU as m}from"./calfSystem-5545a3e6.js"
import"./numberIsNaN-0d2994c6.js"
import{g as p,s as b}from"./idb-ab1a88c6.js"
import"./isDate-f8d1bd37.js"
import"./padZ-d6df3a69.js"
import{f as d}from"./formatLocalDateTime-97e8b356.js"
import{x as w}from"./xPath-e694d060.js"
import{b as g}from"./buffObj-82b14f05.js"
let h
function k(e){return h.exec(e)}function j(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(k)}function v(e){const n=function(e){return g.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function B(e){const n=d(new Date),t=j(document).map(s(x,n))
b(o,t.reverse().join("")+e)}const D=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(o).then(B)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),m()}]]
D.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(a())return
console.log("unknownPage")
const e=D.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-c548d3ac.js.map
