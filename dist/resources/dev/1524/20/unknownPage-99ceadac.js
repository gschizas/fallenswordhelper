import{D as e,K as n,G as t,bA as o,t as s,x as a,C as r,bL as i,bM as f,y as u,bN as c,ab as l,bO as m}from"./calfSystem-a2862afc.js"
import"./numberIsNaN-77d06981.js"
import{g as p,s as b}from"./idb-911ff7c2.js"
import"./isDate-4c8ac6ee.js"
import"./padZ-c3ec0e2d.js"
import{f as g}from"./formatLocalDateTime-8559d2c3.js"
import{x as w}from"./xPath-b67ab642.js"
import{b as d}from"./buffObj-517e038a.js"
let h
function k(e){return h.exec(e)}function j(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(k)}function v(e){const n=function(e){return d.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function L(e){const n=g(new Date),t=j(document).map(s(x,n))
b(o,t.reverse().join("")+e)}const y=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(o).then(L)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),m()}]]
y.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(a())return
console.log("unknownPage")
const e=y.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-99ceadac.js.map
