import{M as i,t as e,c as n,a9 as t,J as a,y as s,o,l as c,G as f}from"./calfSystem-6459f18a.js"
import{o as l}from"./openQuickBuffByName-240bf7ec.js"
import{h as u}from"./hideElement-f7381055.js"
import{g as d}from"./getArrayByClassName-b1615c24.js"
import{s as r}from"./selfIdIs-e4985f40.js"
function m(i,e){d("player-name",i).forEach(e)}function g(i,e){const n=i.dataset.tipped,t=/Last Activity:<\/td><td>(\d+) mins/.exec(n)[1]
t<2?i.classList.add(e.l1):t<5?i.classList.add(e.l2):i.classList.add(e.l3)}function b(e){i(e).forEach(u)}const p=[["hideGuildInfoTrade","#guild-minibox-action-trade","#online-allies-action-trade"],["hideGuildInfoSecureTrade","#guild-minibox-action-secure-trade","#online-allies-action-secure-trade"],["hideGuildInfoBuff","#guild-minibox-action-quickbuff","#online-allies-action-quickbuff"],["hideGuildInfoMessage","#guild-minibox-action-send-message","#online-allies-action-send-message"]]
function h(i,e,a){n[a[0]]&&b(t(a[e],i))}function k(i,n){p.forEach(e(h,i,n))}function x(i,e,n){n.preventDefault(),n.target.classList.toggle(i),n.target.classList.toggle(e)}function y(i,e){const n=d(e,i).map(i=>f(i.nextElementSibling))
l(n.join())}function j(i,e){const n=i.find(i=>i[0](e.target))
if(n)return n[1](e)}function B([i,n,t,a]){return e(j,function([i,n,t,a]){return[[e(c,n),e(x,n,t)],[e(c,t),e(x,n,t)],[r(a),e(y,i,n)]]}([i,n,t,a]))}function I(i,e){const t=e+"-buff-check-on",c=e+"-quick-buff"
n.hideBuffSelected?(b(a(t,i)),u(s(c))):n.fixBuffSelected&&function([i,e,n,t]){const a=e+"-buff-check-off"
$("."+n).off("click"),$("."+a).off("click"),$("#"+t).off("click"),o(i.parentNode,B([i,n,a,t]))}([i,e,t,c])}export{I as a,g as b,m as c,k as d}
//# sourceMappingURL=doHideBuffSelected-a9666f1d.js.map
