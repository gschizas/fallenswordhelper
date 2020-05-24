import{F as t,aT as e,bn as n,B as i,ai as r,z as s,g as a,w as o,i as c,u as d,C as u,bU as p,aZ as f,J as m,k as h,f as l,v as g,y as b,ag as $,o as v,p as x}from"./calfSystem-371c414c.js"
import"./toLowerCase-08111a24.js"
import"./alpha-9e71f7c7.js"
import{a as _}from"./all-93023d41.js"
import{d as N}from"./doSortParams-ad3be8fe.js"
import{a as k}from"./stringSort-bd71fb27.js"
let w,y=[]
function C(t){return`<div class="rmItem"><img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.id}&inv_id=-1&t=2&p=${w}&vcode=${t.verify}" src="${t.img}" height="20px" width="20px"><p>${t.amountPresent}/${t.amountNeeded}</p></div>`}function j(t){return`<div class="rmItem"><img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.id}&inv_id=-1&t=2&p=${w}&vcode=${t.verify}" src="${t.img}" height="20px" width="20px"><p>${t.amountPresent}/${t.amountNeeded}</p></div>`}function T(t){return!y.includes(t.name)}function S(t){return`<tr class="rmTr"><td class="rmTd"><a href="${t.link}"><img src="${t.img}" height="30px" width="30px"></a></td><td class="rmTd"><a href="${t.link}">${t.name}</a></td><td class="rmTd">${function(t){return t.items?t.items.map(C).join(""):""}(t)}</td><td class="rmTd">${function(t){return t.components?t.components.map(j).join(""):""}(t)}</td><td class="rmTd">${function(t){return t.target?` <img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.target.id}&inv_id=-1&t=2&p=${w}&vcode=${t.target.verify}" src="${t.target.img}" height="30px" width="30px"><br/>`:""}(t)}</td></tr>`}function B(s,a){a&&(t("hideRecipes")&&(y=e("hideRecipeNames")),function(t,e){w=n()
let s='<table width="100%"><tr class="rmTh"><th>Recipe</th><th><span id="sortName" class="fshLink" sortkey="name">Name</span></th><th>Items</th><th>Components</th><th>Target</th></tr>'
s+=e.recipe.filter(T).map(S).join(""),s+="</table>",i(s,t),r("fsh_recipeBook",e)}(s,a))}function I(t){const e=s("pCC",t).children[0].rows[4].cells[0].children[0]
return a("img",e)}const P=/fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i
function R(t,e){const n=e.getAttribute("background")
return n&&n.includes(t)}function A(t){const e=t.children[0].children[0],n=function(t){return t.dataset.tipped.match(P)}(e),i=function(t,e){return{img:t.getAttribute("src"),id:e[1],verify:e[3]}}(e,n)
return function(t,e){if(e){const n=u(e).split("/")
t.amountPresent=parseInt(n[0],10),t.amountNeeded=parseInt(n[1],10)}}(i,t.parentNode.nextElementSibling),i}function E(t,e){return t.filter(d(R,e)).map(A)}function F(t,e,n,i){const r=o(i)
c(t,`Parsing blueprint ${n.name}...<br>`)
const d=function(t){return a("td",s("pCC",t))}(r)
n.items=E(d,"/inventory/2x3."),n.components=E(d,"/inventory/1x1mini."),[n.target]=E(d,"/hellforge/2x3."),e.recipe.push(n)}function L(t,e,n){c(t,`Found blueprint "${u(n)}".<br>`)
const i=function(t){return{img:t.parentNode.previousElementSibling.children[0].getAttribute("src"),link:t.href,name:u(t),id:p(t.href,"recipe_id")}}(n)
return f(n.href).then(d(F,t,e,i))}function q(t,e,n){const i=function(t){const e=s("pCC",t).children[0].rows[6].cells[0].children[0]
return a("a",e)}(o(n)).map(d(L,t,e))
return _(i)}function z(t){return/\/folder_on\./.test(t.getAttribute("src"))}function J(t,e){return 0!==e}function M(t){return t.value}function U(t,e,n){return f(`${t}&page=${n}`).then(e)}function Z(t,e,n){return function(t){return a("option",m("customselect",s("pCC",t))[0]).filter(J).map(M)}(t).map(d(U,e,n))}function D(t,e,n){const i=o(n),r=function(t){return I(t).find(z).parentNode.href}(i),s=d(q,t,e),a=Z(i,r,s)
return a.push(s(n)),_(a)}function G(t){return"-1"!==p(t.parentNode.href,"folder_id")}function H(t,e){const n=u(e.parentNode.nextElementSibling.nextElementSibling.firstChild),i=/quest/i.test(n)
return i&&c(t,`Skipping folder "${n}"  as it has the word "quest" in folder name.<br>`),!i}function K(t,e){return f(e.parentNode.href).then(t)}function O(t,e,n){const i=d(D,t,e),r=function(t,e,n){return I(o(e)).filter(G).filter(d(H,t)).map(d(K,n))}(t,n,i)
return r.push(i(n)),_(r)}let Q,V
function W(){c(V,"Finished parsing ... formatting ..."),r("fsh_recipeBook",Q),B(V,Q)}function X(){Q={},Q.recipe=[],i("<br>Parsing inventing screen ...<br>",V),g({cmd:"inventing"}).then(d(O,V,Q)).then(W)}function Y(t,e){Q=e,i('<table class="fshInvFilter"><thead><tr><th width="90%"><b>&nbsp;Recipe Manager</b></th><th width="10%" class="fshBtnBox">[<span id="rfsh" class="fshLink">Refresh</span>]</th></tr></thead></table>',t),V=h(),l(t,V),Q?B(V,Q):X()}function tt(t){"rfsh"===t.target.id&&X(),"sortName"===t.target.id&&function(t){N(t.target),Q.recipe.sort(k),B(V,Q)}(t)}export default function(t){if(b())return
const e=t||x
$("fsh_recipeBook").then(d(Y,e)),v(e,tt)}
//# sourceMappingURL=recipeMgr-a326e863.js.map
