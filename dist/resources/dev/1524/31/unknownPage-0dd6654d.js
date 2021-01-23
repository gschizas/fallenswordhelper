import{D as e,G as n,H as t,bl as o,t as s,x as a,C as r,bm as i,bn as f,y as u,bo as c,aa as l,bp as m}from"./calfSystem-393ab895.js"
import{f as b}from"./formatLocalDateTime-4d542cb2.js"
import{b as p}from"./buffObj-57514b10.js"
import{g,s as w}from"./idb-46b78b1e.js"
import{x as h}from"./xPath-23cc158c.js"
import"./isDate-3e775446.js"
import"./numberIsNaN-53300e34.js"
import"./padZ-4bdbf4bf.js"
let k
function d(e){return k.exec(e)}function j(t){k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(d)}function v(e){const n=function(e){return p.find((n=>n.name===e))}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=b(new Date),t=j(document).map(s(x,n))
w(o,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&g(o).then(y)}],[()=>h('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),m()}]]
function D(){if(a())return
console.log("unknownPage")
const e=B.find((e=>e[0]()))
e&&e[1]()}B.push([()=>!0,()=>{console.log("Fell through!")}])
export default D
//# sourceMappingURL=unknownPage-0dd6654d.js.map
