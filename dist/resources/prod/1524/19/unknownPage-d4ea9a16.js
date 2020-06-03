import{I as e,a8 as n,D as t,bB as s,s as a,w as o,M as r,bL as i,bM as f,x as u,bN as c,a7 as m,bO as l}from"./calfSystem-6fc0cc1b.js"
import"./numberIsNaN-4ae9af58.js"
import{g as p,s as b}from"./idb-92d6a2b5.js"
import"./isDate-12da8c02.js"
import"./padZ-8f1e016d.js"
import{f as d}from"./formatLocalDateTime-7d959d46.js"
import{x as w}from"./xPath-9b3cad75.js"
import{b as k}from"./buffObj-e1044e92.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function B(e){const n=d(new Date),t=j(document).map(a(x,n))
b(s,t.reverse().join("")+e)}const L=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(s).then(B)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
export default function(){if(o())return
const e=L.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-d4ea9a16.js.map
