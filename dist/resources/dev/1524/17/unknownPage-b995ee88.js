import{I as e,a4 as n,D as t,bG as o,s,w as a,N as r,bQ as i,bR as f,x as u,bS as c,ab as l,bT as m}from"./calfSystem-1c103624.js"
import"./numberIsNaN-40c4542d.js"
import{g as p,s as b}from"./idb-347cc2af.js"
import"./isDate-a4926894.js"
import"./padZ-717e9500.js"
import{f as w}from"./formatLocalDateTime-8e22bac1.js"
import{x as g}from"./xPath-7398befa.js"
import{b as h}from"./buffObj-bac41881.js"
let k
function d(e){return k.exec(e)}function j(t){k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(d)}function v(e){const n=function(e){return h.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function B(e){const n=w(new Date),t=j(document).map(s(x,n))
b(o,t.reverse().join("")+e)}const D=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(o).then(B)}],[()=>g('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),m()}]]
D.push([()=>!0,()=>{console.log("Fell through!")}])
export default function(){if(a())return
console.log("unknownPage")
const e=D.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-b995ee88.js.map
