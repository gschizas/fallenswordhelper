import{D as e,G as n,H as t,bf as s,t as a,x as o,C as r,bg as i,bh as f,y as u,bi as c,aa as m,bj as l}from"./calfSystem-45544049.js"
import{f as p}from"./formatLocalDateTime-e90fa5a5.js"
import{b}from"./buffObj-40298e85.js"
import{g as d,s as w}from"./idb-ca3578bc.js"
import{x as g}from"./xPath-de16c4ec.js"
import"./isDate-deba0fc7.js"
import"./numberIsNaN-fecd7e6d.js"
import"./padZ-0fd2ec23.js"
let k
function h(e){return k.exec(e)}function j(t){k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return b.find((n=>n.name===e))}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=p(new Date),t=j(document).map(a(x,n))
w(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&d(s).then(y)}],[()=>g('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
function D(){if(o())return
const e=B.find((e=>e[0]()))
e&&e[1]()}export default D
//# sourceMappingURL=unknownPage-2f4225bc.js.map
