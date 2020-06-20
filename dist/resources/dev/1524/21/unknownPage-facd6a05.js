import{D as n,K as e,G as t,bB as o,t as s,x as a,C as r,bM as i,bN as f,y as u,bO as c,ab as l,bP as m}from"./calfSystem-9c7241dc.js"
import"./numberIsNaN-7270cc8c.js"
import{g as p,s as b}from"./idb-5f8a9591.js"
import"./isDate-b97c9238.js"
import"./padZ-95af3fc2.js"
import{f as g}from"./formatLocalDateTime-199ba4b3.js"
import{x as w}from"./xPath-2a12a613.js"
import{b as h}from"./buffObj-18072011.js"
let k
function d(n){return k.exec(n)}function j(t){k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return n("#quickbuff-report font",t).map(e).map(d)}function v(n){const e=function(n){return h.find(e=>e.name===n)}(n)
return e?e.stam.toString():"-"}function x(n,e){let t
var o
return t=e[1]?` ${(o=e)[0]} (${v(o[1])} stamina)<br>`:(n=>` <span class="fshRed">${n[0]}</span><br>`)(e),n+t}function B(n){const e=g(new Date),t=j(document).map(s(x,e))
b(o,t.reverse().join("")+n)}const y=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(o).then(B)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),m()}]]
y.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(a())return
console.log("unknownPage")
const n=y.find(n=>n[0]())
n&&n[1]()}
//# sourceMappingURL=unknownPage-facd6a05.js.map
