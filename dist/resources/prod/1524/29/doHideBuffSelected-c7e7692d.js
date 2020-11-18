import{M as e,t as i,c as n,a9 as t,J as a,y as s,o,l as c,G as f}from"./calfSystem-57628ebe.js"
import{o as l}from"./openQuickBuffByName-4b21bd39.js"
import{h as d}from"./hideElement-a8c1e8d6.js"
import{g as u}from"./getArrayByClassName-b9f9e51c.js"
import{s as r}from"./selfIdIs-276a5b27.js"
function m(e,i){u("player-name",e).forEach(i)}function g(e,i){const n=e.dataset.tipped,t=/Last Activity:<\/td><td>(\d+) mins/.exec(n)[1]
t<2?e.classList.add(i.l1):t<5?e.classList.add(i.l2):e.classList.add(i.l3)}function b(i){e(i).forEach(d)}const p=[["hideGuildInfoTrade","#guild-minibox-action-trade","#online-allies-action-trade"],["hideGuildInfoSecureTrade","#guild-minibox-action-secure-trade","#online-allies-action-secure-trade"],["hideGuildInfoBuff","#guild-minibox-action-quickbuff","#online-allies-action-quickbuff"],["hideGuildInfoMessage","#guild-minibox-action-send-message","#online-allies-action-send-message"]]
function h(e,i,a){n[a[0]]&&b(t(a[i],e))}function k(e,n){p.forEach(i(h,e,n))}function x(e,i,n){n.preventDefault(),n.target.classList.toggle(e),n.target.classList.toggle(i)}function y(e,i){const n=u(i,e).map(e=>f(e.nextElementSibling))
l(n.join())}function j(e,i){const n=e.find(e=>e[0](i.target))
if(n)return n[1](i)}function B([e,n,t,a]){return i(j,function([e,n,t,a]){return[[i(c,n),i(x,n,t)],[i(c,t),i(x,n,t)],[r(a),i(y,e,n)]]}([e,n,t,a]))}function I(e,i){const t=i+"-buff-check-on",c=i+"-quick-buff"
n.hideBuffSelected?(b(a(t,e)),d(s(c))):n.fixBuffSelected&&function([e,i,n,t]){const a=i+"-buff-check-off"
$("."+n).off("click"),$("."+a).off("click"),$("#"+t).off("click"),o(e.parentNode,B([e,n,a,t]))}([e,i,t,c])}export{I as a,g as b,m as c,k as d}
//# sourceMappingURL=doHideBuffSelected-c7e7692d.js.map
