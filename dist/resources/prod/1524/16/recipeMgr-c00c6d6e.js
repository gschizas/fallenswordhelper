import{D as t,b1 as e,z as n,x as i,g as r,u as s,i as a,s as o,A as c,bp as d,aP as p,F as u,k as f,f as m,t as h,w as l,o as g,p as b}from"./calfSystem-be09bdff.js"
import"./toLowerCase-28455111.js"
import{s as $,g as v}from"./idb-a63ec135.js"
import"./alpha-21380883.js"
import{a as x}from"./all-e1939fb2.js"
import"./csvSplit-e4a6d9be.js"
import{s as _}from"./shouldBeArray-4191a3ae.js"
import{d as N}from"./doSortParams-640ef24f.js"
import{a as j}from"./stringSort-ff3f86cd.js"
let k,w=[]
function y(t){return`<div class="rmItem"><img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.id}&inv_id=-1&t=2&p=${k}&vcode=${t.verify}" src="${t.img}" height="20px" width="20px"><p>${t.amountPresent}/${t.amountNeeded}</p></div>`}function C(t){return`<div class="rmItem"><img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.id}&inv_id=-1&t=2&p=${k}&vcode=${t.verify}" src="${t.img}" height="20px" width="20px"><p>${t.amountPresent}/${t.amountNeeded}</p></div>`}function S(t){return!w.includes(t.name)}function T(t){return`<tr class="rmTr"><td class="rmTd"><a href="${t.link}"><img src="${t.img}" height="30px" width="30px"></a></td><td class="rmTd"><a href="${t.link}">${t.name}</a></td><td class="rmTd">${function(t){return t.items?t.items.map(y).join(""):""}(t)}</td><td class="rmTd">${function(t){return t.components?t.components.map(C).join(""):""}(t)}</td><td class="rmTd">${function(t){return t.target?` <img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.target.id}&inv_id=-1&t=2&p=${k}&vcode=${t.target.verify}" src="${t.target.img}" height="30px" width="30px"><br/>`:""}(t)}</td></tr>`}function P(i,r){r&&(t("hideRecipes")&&(w=_("hideRecipeNames")),function(t,i){k=e()
let r='<table width="100%"><tr class="rmTh"><th>Recipe</th><th><span id="sortName" class="fshLink" sortkey="name">Name</span></th><th>Items</th><th>Components</th><th>Target</th></tr>'
r+=i.recipe.filter(S).map(T).join(""),r+="</table>",n(r,t),$("fsh_recipeBook",i)}(i,r))}function A(t){const e=i("pCC",t).children[0].rows[4].cells[0].children[0]
return r("img",e)}const B=/fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i
function I(t,e){const n=e.getAttribute("background")
return n&&n.includes(t)}function R(t){const e=t.children[0].children[0],n=function(t){return t.dataset.tipped.match(B)}(e),i=function(t,e){return{img:t.getAttribute("src"),id:e[1],verify:e[3]}}(e,n)
return function(t,e){if(e){const n=c(e).split("/")
t.amountPresent=parseInt(n[0],10),t.amountNeeded=parseInt(n[1],10)}}(i,t.parentNode.nextElementSibling),i}function E(t,e){return t.filter(o(I,e)).map(R)}function F(t,e,n,o){const c=s(o)
a(t,`Parsing blueprint ${n.name}...<br>`)
const d=function(t){return r("td",i("pCC",t))}(c)
n.items=E(d,"/inventory/2x3."),n.components=E(d,"/inventory/1x1mini."),[n.target]=E(d,"/hellforge/2x3."),e.recipe.push(n)}function L(t,e,n){a(t,`Found blueprint "${c(n)}".<br>`)
const i=function(t){return{img:t.parentNode.previousElementSibling.children[0].getAttribute("src"),link:t.href,name:c(t),id:d(t.href,"recipe_id")}}(n)
return p(n.href).then(o(F,t,e,i))}function q(t,e,n){const a=function(t){const e=i("pCC",t).children[0].rows[6].cells[0].children[0]
return r("a",e)}(s(n)).map(o(L,t,e))
return x(a)}function z(t){return/\/folder_on\./.test(t.getAttribute("src"))}function D(t,e){return 0!==e}function M(t){return t.value}function G(t,e,n){return p(`${t}&page=${n}`).then(e)}function H(t,e,n){return function(t){return r("option",u("customselect",i("pCC",t))[0]).filter(D).map(M)}(t).map(o(G,e,n))}function J(t,e,n){const i=s(n),r=function(t){return A(t).find(z).parentNode.href}(i),a=o(q,t,e),c=H(i,r,a)
return c.push(a(n)),x(c)}function K(t){return"-1"!==d(t.parentNode.href,"folder_id")}function O(t,e){const n=c(e.parentNode.nextElementSibling.nextElementSibling.firstChild),i=/quest/i.test(n)
return i&&a(t,`Skipping folder "${n}"  as it has the word "quest" in folder name.<br>`),!i}function Q(t,e){return p(e.parentNode.href).then(t)}function U(t,e,n){const i=o(J,t,e),r=function(t,e,n){return A(s(e)).filter(K).filter(o(O,t)).map(o(Q,n))}(t,n,i)
return r.push(i(n)),x(r)}let V,W
function X(){a(W,"Finished parsing ... formatting ..."),$("fsh_recipeBook",V),P(W,V)}function Y(){V={},V.recipe=[],n("<br>Parsing inventing screen ...<br>",W),h({cmd:"inventing"}).then(o(U,W,V)).then(X)}function Z(t,e){V=e,n('<table class="fshInvFilter"><thead><tr><th width="90%"><b>&nbsp;Recipe Manager</b></th><th width="10%" class="fshBtnBox">[<span id="rfsh" class="fshLink">Refresh</span>]</th></tr></thead></table>',t),W=f(),m(t,W),V?P(W,V):Y()}function tt(t){"rfsh"===t.target.id&&Y(),"sortName"===t.target.id&&function(t){N(t.target),V.recipe.sort(j),P(W,V)}(t)}export default function(t){if(l())return
const e=t||b
v("fsh_recipeBook").then(o(Z,e)),g(e,tt)}
//# sourceMappingURL=recipeMgr-c00c6d6e.js.map
