import{D as t,bg as e,z as n,a6 as i,x as r,g as s,u as a,i as o,s as c,A as d,bH as p,aJ as u,F as f,k as m,f as h,t as l,w as g,a4 as b,o as $,p as v}from"./calfSystem-1262535f.js"
import"./toLowerCase-0c270c29.js"
import"./alpha-cdb4272d.js"
import{a as x}from"./all-c00b9c25.js"
import"./csvSplit-b1d72ffd.js"
import{s as _}from"./shouldBeArray-3a61602c.js"
import{d as N}from"./doSortParams-1e080cc5.js"
import{a as k}from"./stringSort-f2d4f03f.js"
let w,y=[]
function j(t){return`<div class="rmItem"><img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.id}&inv_id=-1&t=2&p=${w}&vcode=${t.verify}" src="${t.img}" height="20px" width="20px"><p>${t.amountPresent}/${t.amountNeeded}</p></div>`}function C(t){return`<div class="rmItem"><img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.id}&inv_id=-1&t=2&p=${w}&vcode=${t.verify}" src="${t.img}" height="20px" width="20px"><p>${t.amountPresent}/${t.amountNeeded}</p></div>`}function S(t){return!y.includes(t.name)}function T(t){return`<tr class="rmTr"><td class="rmTd"><a href="${t.link}"><img src="${t.img}" height="30px" width="30px"></a></td><td class="rmTd"><a href="${t.link}">${t.name}</a></td><td class="rmTd">${function(t){return t.items?t.items.map(j).join(""):""}(t)}</td><td class="rmTd">${function(t){return t.components?t.components.map(C).join(""):""}(t)}</td><td class="rmTd">${function(t){return t.target?` <img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.target.id}&inv_id=-1&t=2&p=${w}&vcode=${t.target.verify}" src="${t.target.img}" height="30px" width="30px"><br/>`:""}(t)}</td></tr>`}function A(r,s){s&&(t("hideRecipes")&&(y=_("hideRecipeNames")),function(t,r){w=e()
let s='<table width="100%"><tr class="rmTh"><th>Recipe</th><th><span id="sortName" class="fshLink" sortkey="name">Name</span></th><th>Items</th><th>Components</th><th>Target</th></tr>'
s+=r.recipe.filter(S).map(T).join(""),s+="</table>",n(s,t),i("fsh_recipeBook",r)}(r,s))}function B(t){const e=r("pCC",t).children[0].rows[4].cells[0].children[0]
return s("img",e)}const I=/fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i
function P(t,e){const n=e.getAttribute("background")
return n&&n.includes(t)}function R(t){const e=t.children[0].children[0],n=function(t){return t.dataset.tipped.match(I)}(e),i=function(t,e){return{img:t.getAttribute("src"),id:e[1],verify:e[3]}}(e,n)
return function(t,e){if(e){const n=d(e).split("/")
t.amountPresent=parseInt(n[0],10),t.amountNeeded=parseInt(n[1],10)}}(i,t.parentNode.nextElementSibling),i}function E(t,e){return t.filter(c(P,e)).map(R)}function F(t,e,n,i){const c=a(i)
o(t,`Parsing blueprint ${n.name}...<br>`)
const d=function(t){return s("td",r("pCC",t))}(c)
n.items=E(d,"/inventory/2x3."),n.components=E(d,"/inventory/1x1mini."),[n.target]=E(d,"/hellforge/2x3."),e.recipe.push(n)}function L(t,e,n){o(t,`Found blueprint "${d(n)}".<br>`)
const i=function(t){return{img:t.parentNode.previousElementSibling.children[0].getAttribute("src"),link:t.href,name:d(t),id:p(t.href,"recipe_id")}}(n)
return u(n.href).then(c(F,t,e,i))}function q(t,e,n){const i=function(t){const e=r("pCC",t).children[0].rows[6].cells[0].children[0]
return s("a",e)}(a(n)).map(c(L,t,e))
return x(i)}function z(t){return/\/folder_on\./.test(t.getAttribute("src"))}function D(t,e){return 0!==e}function H(t){return t.value}function J(t,e,n){return u(`${t}&page=${n}`).then(e)}function M(t,e,n){return function(t){return s("option",f("customselect",r("pCC",t))[0]).filter(D).map(H)}(t).map(c(J,e,n))}function G(t,e,n){const i=a(n),r=function(t){return B(t).find(z).parentNode.href}(i),s=c(q,t,e),o=M(i,r,s)
return o.push(s(n)),x(o)}function K(t){return"-1"!==p(t.parentNode.href,"folder_id")}function O(t,e){const n=d(e.parentNode.nextElementSibling.nextElementSibling.firstChild),i=/quest/i.test(n)
return i&&o(t,`Skipping folder "${n}"  as it has the word "quest" in folder name.<br>`),!i}function Q(t,e){return u(e.parentNode.href).then(t)}function U(t,e,n){const i=c(G,t,e),r=function(t,e,n){return B(a(e)).filter(K).filter(c(O,t)).map(c(Q,n))}(t,n,i)
return r.push(i(n)),x(r)}let V,W
function X(){o(W,"Finished parsing ... formatting ..."),i("fsh_recipeBook",V),A(W,V)}function Y(){V={},V.recipe=[],n("<br>Parsing inventing screen ...<br>",W),l({cmd:"inventing"}).then(c(U,W,V)).then(X)}function Z(t,e){V=e,n('<table class="fshInvFilter"><thead><tr><th width="90%"><b>&nbsp;Recipe Manager</b></th><th width="10%" class="fshBtnBox">[<span id="rfsh" class="fshLink">Refresh</span>]</th></tr></thead></table>',t),W=m(),h(t,W),V?A(W,V):Y()}function tt(t){"rfsh"===t.target.id&&Y(),"sortName"===t.target.id&&function(t){N(t.target),V.recipe.sort(k),A(W,V)}(t)}export default function(t){if(g())return
const e=t||v
b("fsh_recipeBook").then(c(Z,e)),$(e,tt)}
//# sourceMappingURL=recipeMgr-7ea8f19c.js.map
