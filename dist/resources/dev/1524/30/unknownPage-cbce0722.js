import{D as e,G as n,H as t,by as o,t as s,x as a,C as r,bI as f,bJ as i,y as u,bK as c,ab as l,bL as m}from"./calfSystem-54df10e3.js"
import"./numberIsNaN-fa7d637d.js"
import{g as p,s as b}from"./idb-7f0d2b39.js"
import"./isDate-546a6320.js"
import"./padZ-bd3dfcf9.js"
import{f as d}from"./formatLocalDateTime-a3e766db.js"
import{x as g}from"./xPath-f3a8c42a.js"
import{b as w}from"./buffObj-59ad5c76.js"
let h
function k(e){return h.exec(e)}function j(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(k)}function v(e){const n=function(e){return w.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=d(new Date),t=j(document).map(s(x,n))
b(o,t.reverse().join("")+e)}const L=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(o).then(y)}],[()=>g('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),m()}]]
function B(){if(a())return
console.log("unknownPage")
const e=L.find(e=>e[0]())
e&&e[1]()}L.push([()=>!0,()=>{console.log("Fell through!")}])
export default B
//# sourceMappingURL=unknownPage-cbce0722.js.map
