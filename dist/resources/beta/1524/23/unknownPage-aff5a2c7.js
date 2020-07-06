import{D as e,K as n,G as t,bz as s,t as o,x as a,C as r,bK as i,bL as f,y as u,bM as c,a9 as m,bN as l}from"./calfSystem-34fcd691.js"
import"./numberIsNaN-cb2409eb.js"
import{g as p,s as b}from"./idb-62d2605f.js"
import"./isDate-32fe1182.js"
import"./padZ-ce2146a0.js"
import{f as w}from"./formatLocalDateTime-3e97021e.js"
import{x as d}from"./xPath-9353bcf9.js"
import{b as k}from"./buffObj-6db8253c.js"
let g
function h(e){return g.exec(e)}function j(t){g||(g=new RegExp("Skill ([\\w ]*) level (\\d*) was activated on '(\\w*)'|The skill ([\\w ]*) of (current or higher level is currently active) on '(\\w*)'|Player '(\\w*)' (has set their preferences to block the skill) '([\\w ]*)' from being cast on them."))
return e("#quickbuff-report font",t).map(n).map(h)}function v(e){const n=function(e){return k.find(n=>n.name===e)}(e)
return n?n.stam.toString():"-"}function x(e,n){let t
var s
return t=n[1]?` ${(s=n)[0]} (${v(s[1])} stamina)<br>`:(e=>` <span class="fshRed">${e[0]}</span><br>`)(n),e+t}function L(e){const n=w(new Date),t=j(document).map(o(x,n))
b(s,t.reverse().join("")+e)}const y=[[()=>r(".news_left_column"),()=>{i("unknown.news"),f()}],[()=>u("quickbuff-report"),()=>{i("unknown.buffLog.updateBuffLog"),t("keepBuffLog")&&p(s).then(L)}],[()=>d('//td[.="Quest Name"]'),()=>{i("unknown.questBook.injectQuestBookFull"),c()}],[()=>m('#pCC img[title="Inventing"]').length>0,()=>{i("unknown.recipes.inventing"),l()}]]
export default function(){if(a())return
const e=y.find(e=>e[0]())
e&&e[1]()}
//# sourceMappingURL=unknownPage-aff5a2c7.js.map
