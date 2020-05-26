import{I as e,aQ as n,D as t,a5 as o,s,a7 as a,bV as r,w as f,M as i,c2 as u,c3 as c,x as l,c4 as m,ak as p,c5 as b}from"./calfSystem-ee582533.js"
import"./numberIsNaN-c9f76e43.js"
import"./isDate-f3df3fd8.js"
import"./padZ-55be60ec.js"
import{f as w}from"./formatLocalDateTime-1bf9bcb1.js"
import{x as g}from"./xPath-b535d8a8.js"
import{b as k}from"./buffObj-05c8a5d9.js"
let d
function h(e){return d.exec(e)}function j(t){d||(d=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function B(e){const n=w(new Date),t=j(document).map(s(x,n))
a(r,t.reverse().join("")+e)}const D=[[()=>i(".news_left_column"),()=>{u("unknown.news"),c()}],[()=>l("quickbuff-report"),()=>{u("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&o(r).then(B)}],[()=>g('//td[.="Quest Name"]'),()=>{u("unknown.questBook.injectQuestBookFull"),m()}],[()=>p('#pCC img[title="Inventing"]').length>0,()=>{u("unknown.recipes.inventing"),b()}]]
D.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(f())return
console.log("unknownPage")
const e=D.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-64ea1704.js.map
