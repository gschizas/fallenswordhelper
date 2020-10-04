import{M as i,t as e,c as n,ac as t,J as a,y as s,o,l as c,G as f}from"./calfSystem-ec5e5725.js"
import{o as l}from"./openQuickBuffByName-9db0dd32.js"
import{h as d}from"./hideElement-b0b3e820.js"
import{g as u}from"./getArrayByClassName-bb31bc41.js"
import{s as r}from"./selfIdIs-3ab2425b.js"
function m(i,e){u("player-name",i).forEach(e)}function b(i,e){const n=i.dataset.tipped,t=/Last Activity:<\/td><td>(\d+) mins/.exec(n)[1]
t<2?i.classList.add(e.l1):t<5?i.classList.add(e.l2):i.classList.add(e.l3)}function g(e){i(e).forEach(d)}const p=[["hideGuildInfoTrade","#guild-minibox-action-trade","#online-allies-action-trade"],["hideGuildInfoSecureTrade","#guild-minibox-action-secure-trade","#online-allies-action-secure-trade"],["hideGuildInfoBuff","#guild-minibox-action-quickbuff","#online-allies-action-quickbuff"],["hideGuildInfoMessage","#guild-minibox-action-send-message","#online-allies-action-send-message"]]
function h(i,e,a){n[a[0]]&&g(t(a[e],i))}function k(i,n){p.forEach(e(h,i,n))}function x(i,e,n){n.preventDefault(),n.target.classList.toggle(i),n.target.classList.toggle(e)}function y(i,e){const n=u(e,i).map(i=>f(i.nextElementSibling))
l(n.join())}function j(i,e){const n=i.find(i=>i[0](e.target))
if(n)return n[1](e)}function B([i,n,t,a]){return e(j,function([i,n,t,a]){return[[e(c,n),e(x,n,t)],[e(c,t),e(x,n,t)],[r(a),e(y,i,n)]]}([i,n,t,a]))}function I(i,e){const t=e+"-buff-check-on",c=e+"-quick-buff"
n.hideBuffSelected?(g(a(t,i)),d(s(c))):n.fixBuffSelected&&function([i,e,n,t]){const a=e+"-buff-check-off"
$("."+n).off("click"),$("."+a).off("click"),$("#"+t).off("click"),o(i.parentNode,B([i,n,a,t]))}([i,e,t,c])}export{I as a,b,m as c,k as d}
//# sourceMappingURL=doHideBuffSelected-bdb1dcaa.js.map
