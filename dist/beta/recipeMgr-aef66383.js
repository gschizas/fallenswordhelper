import{G as t,aU as e,bo as n,C as i,aj as r,A as s,g as a,x as o,i as c,v as d,D as u,bV as p,a_ as f,K as m,l as h,h as l,w as g,z as $,ah as b,o as v,p as x}from"./calfSystem-c91e004c.js"
import"./toLowerCase-dfc31d56.js"
import"./alpha-1a06806d.js"
import{a as _}from"./all-143e11c3.js"
import{d as N}from"./doSortParams-05f672ea.js"
import{a as w}from"./stringSort-88203bd5.js"
let C,k=[]
function y(t){return'<div class="rmItem"><img class="tip-dynamic" '+`data-tipped="fetchitem.php?item_id=${t.id}&inv_id=-1&t=2&p=${C}&vcode=${t.verify}" src="${t.img}" height="20px" width="20px"><p>${t.amountPresent}/${t.amountNeeded}</p></div>`}function j(t){return'<div class="rmItem"><img class="tip-dynamic" '+`data-tipped="fetchitem.php?item_id=${t.id}&inv_id=-1&t=2&p=${C}&vcode=${t.verify}" src="${t.img}" height="20px" width="20px"><p>${t.amountPresent}/${t.amountNeeded}</p></div>`}function S(t){return!k.includes(t.name)}function T(t){return'<tr class="rmTr"><td class="rmTd">'+`<a href="${t.link}">`+`<img src="${t.img}" height="30px" width="30px">`+'</a></td><td class="rmTd">'+`<a href="${t.link}">${t.name}</a>`+"</td>"+`<td class="rmTd">${function(t){return t.items?t.items.map(y).join(""):""}(t)}</td>`+`<td class="rmTd">${function(t){return t.components?t.components.map(j).join(""):""}(t)}</td>`+`<td class="rmTd">${function(t){return t.target?` <img class="tip-dynamic" data-tipped="fetchitem.php?item_id=${t.target.id}&inv_id=-1&t=2&p=${C}&vcode=${t.target.verify}" src="${t.target.img}" height="30px" width="30px"><br/>`:""}(t)}</td>`+"</tr>"}function I(s,a){a&&(t("hideRecipes")&&(k=e("hideRecipeNames")),function(t,e){C=n()
let s='<table width="100%"><tr class="rmTh"><th>Recipe</th><th><span id="sortName" class="fshLink" sortkey="name">Name</span></th><th>Items</th><th>Components</th><th>Target</th></tr>'
s+=e.recipe.filter(S).map(T).join(""),s+="</table>",i(s,t),r("fsh_recipeBook",e)}(s,a))}function P(t){const e=s("pCC",t).children[0].rows[4].cells[0].children[0]
return a("img",e)}const A=/fetchitem.php\?item_id=(\d+)&inv_id=-1&t=2&p=(\d+)&vcode=([a-z0-9]+)/i
function B(t,e){const n=e.getAttribute("background")
return n&&n.includes(t)}function R(t){const e=t.children[0].children[0],n=function(t){return t.dataset.tipped.match(A)}(e),i=function(t,e){return{img:t.getAttribute("src"),id:e[1],verify:e[3]}}(e,n)
return function(t,e){if(e){const n=u(e).split("/")
t.amountPresent=parseInt(n[0],10),t.amountNeeded=parseInt(n[1],10)}}(i,t.parentNode.nextElementSibling),i}function E(t,e){return t.filter(d(B,e)).map(R)}function F(t,e,n,i){const r=o(i)
c(t,`Parsing blueprint ${n.name}...<br>`)
const d=function(t){return a("td",s("pCC",t))}(r)
n.items=E(d,"/inventory/2x3."),n.components=E(d,"/inventory/1x1mini."),[n.target]=E(d,"/hellforge/2x3."),e.recipe.push(n)}function L(t,e,n){c(t,`Found blueprint "${u(n)}".<br>`)
const i=function(t){return{img:t.parentNode.previousElementSibling.children[0].getAttribute("src"),link:t.href,name:u(t),id:p(t.href,"recipe_id")}}(n)
return f(n.href).then(d(F,t,e,i))}function q(t,e,n){const i=function(t){const e=s("pCC",t).children[0].rows[6].cells[0].children[0]
return a("a",e)}(o(n)).map(d(L,t,e))
return _(i)}function z(t){return/\/folder_on\./.test(t.getAttribute("src"))}function D(t,e){return 0!==e}function G(t){return t.value}function K(t,e,n){return f(`${t}&page=${n}`).then(e)}function M(t,e,n){return function(t){return a("option",m("customselect",s("pCC",t))[0]).filter(D).map(G)}(t).map(d(K,e,n))}function U(t,e,n){const i=o(n),r=function(t){return P(t).find(z).parentNode.href}(i),s=d(q,t,e),a=M(i,r,s)
return a.push(s(n)),_(a)}function V(t){return"-1"!==p(t.parentNode.href,"folder_id")}function H(t,e){const n=u(e.parentNode.nextElementSibling.nextElementSibling.firstChild),i=/quest/i.test(n)
return i&&c(t,`Skipping folder "${n}"  as it has the word "quest" in folder name.<br>`),!i}function J(t,e){return f(e.parentNode.href).then(t)}function O(t,e,n){const i=d(U,t,e),r=function(t,e,n){return P(o(e)).filter(V).filter(d(H,t)).map(d(J,n))}(t,n,i)
return r.push(i(n)),_(r)}let Q,W
function X(){c(W,"Finished parsing ... formatting ..."),r("fsh_recipeBook",Q),I(W,Q)}function Y(){Q={},Q.recipe=[],i("<br>Parsing inventing screen ...<br>",W),g({cmd:"inventing"}).then(d(O,W,Q)).then(X)}function Z(t,e){Q=e,i('<table class="fshInvFilter"><thead><tr><th width="90%"><b>&nbsp;Recipe Manager</b></th><th width="10%" class="fshBtnBox">[<span id="rfsh" class="fshLink">Refresh</span>]</th></tr></thead></table>',t),W=h(),l(t,W),Q?I(W,Q):Y()}function tt(t){"rfsh"===t.target.id&&Y(),"sortName"===t.target.id&&function(t){N(t.target),Q.recipe.sort(w),I(W,Q)}(t)}export default function(t){if($())return
const e=t||x
b("fsh_recipeBook").then(d(Z,e)),v(e,tt)}
//# sourceMappingURL=recipeMgr-aef66383.js.map
