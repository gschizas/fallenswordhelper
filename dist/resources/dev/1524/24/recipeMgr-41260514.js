import{H as t,b7 as e,A as n,y as i,g as r,v as s,i as a,t as c,B as o,bC as d,aB as p,J as u,m as f,h as m,u as h,x as l,o as g,p as b}from"./calfSystem-38898f3e.js"
import"./toLowerCase-2f55d839.js"
import{s as $,g as v}from"./idb-ccc44752.js"
import"./alpha-fc758c41.js"
import"./csvSplit-dcc6dfc9.js"
import{s as x}from"./shouldBeArray-de467b07.js"
import{d as _}from"./doSortParams-592ecd6a.js"
import{a as y}from"./stringSort-139cd8d1.js"
import{a as N}from"./all-e4fd8fad.js"
let j,C=[]
function k(t){return`<div class="rmItem"><img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.id}&inv_id=-1&t=2&p=${j}&vcode=${t.verify}" src="${t.img}" height="20px" width="20px"><p>${t.amountPresent}/${t.amountNeeded}</p></div>`}function w(t){return`<div class="rmItem"><img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.id}&inv_id=-1&t=2&p=${j}&vcode=${t.verify}" src="${t.img}" height="20px" width="20px"><p>${t.amountPresent}/${t.amountNeeded}</p></div>`}function S(t){return!C.includes(t.name)}function B(t){return`<tr class="rmTr"><td class="rmTd"><a href="${t.link}"><img src="${t.img}" height="30px" width="30px"></a></td><td class="rmTd"><a href="${t.link}">${t.name}</a></td><td class="rmTd">${function(t){return t.items?t.items.map(k).join(""):""}(t)}</td><td class="rmTd">${function(t){return t.components?t.components.map(w).join(""):""}(t)}</td><td class="rmTd">${function(t){return t.target?` <img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.target.id}&inv_id=-1&t=2&p=${j}&vcode=${t.target.verify}" src="${t.target.img}" height="30px" width="30px"><br/>`:""}(t)}</td></tr>`}function T(i,r){r&&(t("hideRecipes")&&(C=x("hideRecipeNames")),function(t,i){j=e()
let r='<table width="100%"><tr class="rmTh"><th>Recipe</th><th><span id="sortName" class="fshLink" sortkey="name">Name</span></th><th>Items</th><th>Components</th><th>Target</th></tr>'
r+=i.recipe.filter(S).map(B).join(""),r+="</table>",n(r,t),$("fsh_recipeBook",i)}(i,r))}function A(t){const e=i("pCC",t).children[0].rows[4].cells[0].children[0]
return r("img",e)}const I=/fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i
function P(t,e){const n=e.getAttribute("background")
return n&&n.includes(t)}function R(t){const e=t.children[0].children[0],n=function(t){return t.dataset.tipped.match(I)}(e),i=function(t,e){return{img:t.getAttribute("src"),id:e[1],verify:e[3]}}(e,n)
return function(t,e){if(e){const n=o(e).split("/")
t.amountPresent=parseInt(n[0],10),t.amountNeeded=parseInt(n[1],10)}}(i,t.parentNode.nextElementSibling),i}function E(t,e){return t.filter(c(P,e)).map(R)}function F(t,e,n,c){const o=s(c)
a(t,`Parsing blueprint ${n.name}...<br>`)
const d=function(t){return r("td",i("pCC",t))}(o)
n.items=E(d,"/inventory/2x3."),n.components=E(d,"/inventory/1x1mini."),[n.target]=E(d,"/hellforge/2x3."),e.recipe.push(n)}function L(t,e,n){a(t,`Found blueprint "${o(n)}".<br>`)
const i=function(t){return{img:t.parentNode.previousElementSibling.children[0].getAttribute("src"),link:t.href,name:o(t),id:d(t.search,"recipe_id")}}(n)
return p(n.href).then(c(F,t,e,i))}function q(t,e,n){const a=function(t){const e=i("pCC",t).children[0].rows[6].cells[0].children[0]
return r("a",e)}(s(n)).map(c(L,t,e))
return N(a)}function z(t){return/\/folder_on\./.test(t.getAttribute("src"))}function H(t,e){return 0!==e}function J(t){return t.value}function M(t,e,n){return p(`${t}&page=${n}`).then(e)}function D(t,e,n){return function(t){return r("option",u("customselect",i("pCC",t))[0]).filter(H).map(J)}(t).map(c(M,e,n))}function G(t,e,n){const i=s(n),r=function(t){return A(t).find(z).parentNode.href}(i),a=c(q,t,e),o=D(i,r,a)
return o.push(a(n)),N(o)}function K(t){return"-1"!==d(t.parentNode.search,"folder_id")}function O(t,e){const n=o(e.parentNode.nextElementSibling.nextElementSibling.firstChild),i=/quest/i.test(n)
return i&&a(t,`Skipping folder "${n}"  as it has the word "quest" in folder name.<br>`),!i}function Q(t,e){return p(e.parentNode.href).then(t)}function U(t,e,n){const i=c(G,t,e),r=function(t,e,n){return A(s(e)).filter(K).filter(c(O,t)).map(c(Q,n))}(t,n,i)
return r.push(i(n)),N(r)}let V,W
function X(){a(W,"Finished parsing ... formatting ..."),$("fsh_recipeBook",V),T(W,V)}function Y(){V={},V.recipe=[],n("<br>Parsing inventing screen ...<br>",W),h({cmd:"inventing"}).then(c(U,W,V)).then(X)}function Z(t,e){V=e,n('<table class="fshInvFilter"><thead><tr><th width="90%"><b>&nbsp;Recipe Manager</b></th><th width="10%" class="fshBtnBox">[<span id="rfsh" class="fshLink">Refresh</span>]</th></tr></thead></table>',t),W=f(),m(t,W),V?T(W,V):Y()}function tt(t){"rfsh"===t.target.id&&Y(),"sortName"===t.target.id&&function(t){_(t.target),V.recipe.sort(y),T(W,V)}(t)}function et(t){if(l())return
const e=t||b
v("fsh_recipeBook").then(c(Z,e)),g(e,tt)}export default et
//# sourceMappingURL=recipeMgr-41260514.js.map
