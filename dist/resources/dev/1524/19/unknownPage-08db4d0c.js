import{I as e,a4 as n,D as t,bH as o,s,w as a,N as r,bR as i,bS as f,x as u,bT as c,ab as l,bU as m}from"./calfSystem-f7574730.js"
import"./numberIsNaN-92f332e4.js"
import{g as p,s as b}from"./idb-14a57c5b.js"
import"./isDate-04e85c3b.js"
import"./padZ-30f972ec.js"
import{f as w}from"./formatLocalDateTime-5291102f.js"
import{x as g}from"./xPath-b0b64a16.js"
import{b as h}from"./buffObj-25de2982.js"
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
//# sourceMappingURL=unknownPage-08db4d0c.js.map
