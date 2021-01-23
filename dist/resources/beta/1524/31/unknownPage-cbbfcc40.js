import{D as e,G as n,H as t,bg as s,t as o,x as a,C as r,bh as i,bi as f,y as u,bj as c,a9 as m,bk as l}from"./calfSystem-47fc08ae.js"
import{f as b}from"./formatLocalDateTime-4d542cb2.js"
import{b as p}from"./buffObj-57514b10.js"
import{g as w,s as d}from"./idb-b72d80f0.js"
import{x as k}from"./xPath-15a92601.js"
import"./isDate-3e775446.js"
import"./numberIsNaN-53300e34.js"
import"./padZ-4bdbf4bf.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return p.find((n=>n.name===e))}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=b(new Date),t=j(document).map(o(x,n))
d(s,t.reverse().join("")+e)}const B=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&w(s).then(y)}],[()=>k('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
function D(){if(a())return
const e=B.find((e=>e[0]()))
e&&e[1]()}export default D
//# sourceMappingURL=unknownPage-cbbfcc40.js.map
