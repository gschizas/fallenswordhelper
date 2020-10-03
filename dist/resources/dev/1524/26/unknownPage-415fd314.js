import{D as e,G as n,H as t,bz as o,t as s,x as a,C as r,bJ as i,bK as f,y as u,bL as c,ab as l,bM as m}from"./calfSystem-4991bf5b.js"
import"./numberIsNaN-a6bcb044.js"
import{g as p,s as b}from"./idb-ee31c042.js"
import"./isDate-622067da.js"
import"./padZ-f9e33f92.js"
import{f as g}from"./formatLocalDateTime-09429320.js"
import{x as w}from"./xPath-5786865e.js"
import{b as d}from"./buffObj-edd5c6f3.js"
let h
function k(e){return h.exec(e)}function j(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(k)}function v(e){const n=function(e){return d.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function L(e){const n=g(new Date),t=j(document).map(s(x,n))
b(o,t.reverse().join("")+e)}const y=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(o).then(L)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),m()}]]
function B(){if(a())return
console.log("unknownPage")
const e=y.find(e=>e[0]())
e&&e[1]()}y.push([()=>!0,()=>{console.log("Fell through!")}])
export default B
//# sourceMappingURL=unknownPage-415fd314.js.map
