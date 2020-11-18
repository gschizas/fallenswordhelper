import{D as e,G as n,H as t,by as o,t as s,x as a,C as r,bI as i,bJ as f,y as u,bK as c,ab as l,bL as m}from"./calfSystem-02c48ff5.js"
import"./numberIsNaN-d1ebf732.js"
import{g as p,s as b}from"./idb-49c5b621.js"
import"./isDate-14b56c12.js"
import"./padZ-a3ed1fe1.js"
import{f as g}from"./formatLocalDateTime-c07c341a.js"
import{x as w}from"./xPath-2a39e38c.js"
import{b as h}from"./buffObj-cea0717c.js"
let k
function d(e){return k.exec(e)}function j(t){k||(k=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(d)}function v(e){const n=function(e){return h.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var o
return t=n[1]?` ${(o=n)[0]} (${v(o[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function y(e){const n=g(new Date),t=j(document).map(s(x,n))
b(o,t.reverse().join("")+e)}const L=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(o).then(y)}],[()=>w('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>l('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),m()}]]
function B(){if(a())return
console.log("unknownPage")
const e=L.find(e=>e[0]())
e&&e[1]()}L.push([()=>!0,()=>{console.log("Fell through!")}])
export default B
//# sourceMappingURL=unknownPage-08caf671.js.map
