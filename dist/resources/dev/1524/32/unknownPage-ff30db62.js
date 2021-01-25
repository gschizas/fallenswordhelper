import{D as e,G as n,H as t,bm as o,t as s,x as a,C as r,bn as f,bo as i,y as u,bp as c,ab as l,bq as m}from"./calfSystem-19a5d332.js"
import{f as p}from"./formatLocalDateTime-e90fa5a5.js"
import{b}from"./buffObj-40298e85.js"
import{g as d,s as g}from"./idb-faef0351.js"
import{x as w}from"./xPath-f8a9e78f.js"
import"./isDate-deba0fc7.js"
import"./numberIsNaN-fecd7e6d.js"
import"./padZ-0fd2ec23.js"
let h
function k(e){return h.exec(e)}function j(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(k)}function v(e){const n=function(e){return b.find((n=>n.name===e))}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function q(e){const n=p(new Date),t=j(document).map(s(x,n))
g(o,t.reverse().join("")+e)}const y=[[()=>r(".news_left_column"),()=>{f("unknown.news"),i()}],[()=>u("quickbuff-report"),()=>{f("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&d(o).then(q)}],[()=>w('//td[.="Quest Name"]'),()=>{f("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{f("unknown.recipes.inventing"),m()}]]
function B(){if(a())return
console.log("unknownPage")
const e=y.find((e=>e[0]()))
e&&e[1]()}y.push([()=>!0,()=>{console.log("Fell through!")}])
export default B
//# sourceMappingURL=unknownPage-ff30db62.js.map
