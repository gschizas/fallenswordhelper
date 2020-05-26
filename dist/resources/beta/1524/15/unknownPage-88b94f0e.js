import{I as e,aS as n,D as t,a4 as a,s,a6 as o,bQ as r,w as f,L as i,bZ as u,b_ as c,x as m,b$ as l,ah as p,c0 as b}from"./calfSystem-1262535f.js"
import"./numberIsNaN-e4fe1516.js"
import"./isDate-b25d137c.js"
import"./padZ-9d5b7a82.js"
import{f as d}from"./formatLocalDateTime-ff109bee.js"
import{x as w}from"./xPath-adba6d40.js"
import{b as k}from"./buffObj-62dd53f4.js"
let h
function g(e){return h.exec(e)}function j(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(g)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var a
return t=n[1]?` ${(a=n)[0]} (${v(a[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function L(e){const n=d(new Date),t=j(document).map(s(x,n))
o(r,t.reverse().join("")+e)}const B=[[()=>i(".news_left_column"),()=>{u("unknown.news"),c()}],[()=>m("quickbuff-report"),()=>{u("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&a(r).then(L)}],[()=>w('//td[.="Quest Name"]'),()=>{u("unknown.questBook.injectQuestBookFull"),l()}],[()=>p('#pCC img[title="Inventing"]').length>0,()=>{u("unknown.recipes.inventing"),b()}]]
export default function(){if(f())return
const e=B.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-88b94f0e.js.map
