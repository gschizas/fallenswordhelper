import{M as e,b6 as n,F as t,ah as o,u as s,aj as a,c7 as r,y as i,z as f,ci as u,cj as c,az as l,ck as m}from"./calfSystem-d96a3efd.js"
import"./numberIsNaN-5b8bfc11.js"
import"./isDate-b5dd2678.js"
import{f as p}from"./formatLocalDateTime-8bf290f3.js"
import{x as b}from"./xPath-0b50606c.js"
import{b as g}from"./buffObj-58148047.js"
let h
function k(e){return h.exec(e)}function d(t){h||(h=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(k)}function w(e){const n=function(e){return g.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function j(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${w(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function v(e){const n=p(new Date),t=d(document).map(s(j,n))
a(r,t.reverse().join("")+e)}const x=[[()=>f("quickbuff-report"),()=>{u("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&o(r).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{u("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{u("unknown.recipes.inventing"),m()}]]
x.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(i())return
console.log("unknownPage")
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-738ad090.js.map
