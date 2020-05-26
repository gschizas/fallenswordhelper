import{I as e,aS as n,D as t,a4 as s,s as a,a6 as o,bM as r,w as i,L as f,bV as u,bW as c,x as m,bX as l,ah as p,bY as b}from"./calfSystem-740ec4d2.js"
import"./numberIsNaN-2fbabd4d.js"
import"./isDate-1559670b.js"
import"./padZ-54c74bdd.js"
import{f as d}from"./formatLocalDateTime-144e4c80.js"
import{x as w}from"./xPath-1110f440.js"
import{b as k}from"./buffObj-45598ad0.js"
let h
function g(e){return h.exec(e)}function j(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(g)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function L(e){const n=d(new Date),t=j(document).map(a(x,n))
o(r,t.reverse().join("")+e)}const B=[[()=>f(".news_left_column"),()=>{u("unknown.news"),c()}],[()=>m("quickbuff-report"),()=>{u("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&s(r).then(L)}],[()=>w('//td[.="Quest Name"]'),()=>{u("unknown.questBook.injectQuestBookFull"),l()}],[()=>p('#pCC img[title="Inventing"]').length>0,()=>{u("unknown.recipes.inventing"),b()}]]
export default function(){if(i())return
const e=B.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-fd08a000.js.map
