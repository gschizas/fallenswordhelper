import{N as e,b7 as n,G as t,ai as o,c8 as a,v as s,ak as r,z as i,A as f,cj as c,ck as u,aA as l,cl as m}from"./calfSystem-9b1fa4ca.js"
import"./numberIsNaN-6f59053c.js"
import"./isDate-dcf658b5.js"
import{f as p}from"./formatLocalDateTime-5d5ddd42.js"
import{x as b}from"./xPath-4195782a.js"
import{b as d}from"./buffObj-537d16ab.js"
let g
function k(e){return g.exec(e)}function h(t){return g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them.")),e("#quickbuff-report font",t).map(n).map(k)}function w(e){const n=function(e){return d.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function j(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${w(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function v(e){const n=p(new Date),t=h(document).map(s(j,n))
r(a,t.reverse().join("")+e)}const x=[[()=>f("quickbuff-report"),()=>{c("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&o(a).then(v)}],[()=>b('//td[.="Quest Name"]'),()=>{c("unknown.questBook.injectQuestBookFull"),u()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{c("unknown.recipes.inventing"),m()}],[()=>!0,()=>{console.log("Fell through!")}]]
export default function(){if(i())return
console.log("unknownPage")
const e=x.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-31e9768b.js.map
