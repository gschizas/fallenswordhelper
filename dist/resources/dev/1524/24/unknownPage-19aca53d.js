import{D as e,G as n,H as t,bB as o,t as s,x as a,C as r,bM as i,bN as f,y as u,bO as c,ab as l,bP as m}from"./calfSystem-38898f3e.js"
import"./numberIsNaN-00e0daaf.js"
import{g as b,s as p}from"./idb-ccc44752.js"
import"./isDate-1ee2b7eb.js"
import"./padZ-cba8efb8.js"
import{f as g}from"./formatLocalDateTime-41195800.js"
import{x as w}from"./xPath-bbc8c927.js"
import{b as h}from"./buffObj-370bcf38.js"
let k
function d(e){return k.exec(e)}function j(t){k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(d)}function v(e){const n=function(e){return h.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function B(e){const n=g(new Date),t=j(document).map(s(x,n))
p(o,t.reverse().join("")+e)}const y=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&b(o).then(B)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),m()}]]
function D(){if(a())return
console.log("unknownPage")
const e=y.find(e=>e[0]())
e&&e[1]()}y.push([()=>!0,()=>{console.log("Fell through!")}])
export default D
//# sourceMappingURL=unknownPage-19aca53d.js.map
