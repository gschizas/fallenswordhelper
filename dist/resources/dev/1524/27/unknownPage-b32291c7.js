import{D as e,G as n,H as t,bz as o,t as s,x as a,C as r,bJ as i,bK as c,y as f,bL as u,ac as l,bM as m}from"./calfSystem-ec5e5725.js"
import"./numberIsNaN-871eca26.js"
import{g as p,s as b}from"./idb-cecca562.js"
import"./isDate-ad4f47cd.js"
import"./padZ-b87d0d09.js"
import{f as d}from"./formatLocalDateTime-a37bd785.js"
import{x as g}from"./xPath-44313ac2.js"
import{b as w}from"./buffObj-fc2481d9.js"
let h
function k(e){return h.exec(e)}function j(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(k)}function v(e){const n=function(e){return w.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function L(e){const n=d(new Date),t=j(document).map(s(x,n))
b(o,t.reverse().join("")+e)}const y=[[()=>r(".news_left_column"),()=>{i("unknown.news"),c()}],[()=>f("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(o).then(L)}],[()=>g('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),u()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),m()}]]
function B(){if(a())return
console.log("unknownPage")
const e=y.find(e=>e[0]())
e&&e[1]()}y.push([()=>!0,()=>{console.log("Fell through!")}])
export default B
//# sourceMappingURL=unknownPage-b32291c7.js.map
