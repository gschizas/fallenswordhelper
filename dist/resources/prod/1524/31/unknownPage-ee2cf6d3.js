import{D as e,G as n,H as t,be as s,t as o,x as a,C as r,bf as i,bg as f,y as u,bh as c,a9 as m,bi as l}from"./calfSystem-7aee5245.js"
import{f as b}from"./formatLocalDateTime-4d542cb2.js"
import{b as p}from"./buffObj-57514b10.js"
import{g as w,s as d}from"./idb-12bca0fb.js"
import{x as g}from"./xPath-7033f167.js"
import"./isDate-3e775446.js"
import"./numberIsNaN-53300e34.js"
import"./padZ-4bdbf4bf.js"
let k
function h(e){return k.exec(e)}function j(t){k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return p.find((n=>n.name===e))}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=b(new Date),t=j(document).map(o(x,n))
d(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&w(s).then(y)}],[()=>g('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
function D(){if(a())return
const e=B.find((e=>e[0]()))
e&&e[1]()}export default D
//# sourceMappingURL=unknownPage-ee2cf6d3.js.map
