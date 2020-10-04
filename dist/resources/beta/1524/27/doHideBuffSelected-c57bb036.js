import{M as i,t as e,c as a,aa as n,J as t,y as s,o,l as c,G as f}from"./calfSystem-70c7a660.js"
import{o as l}from"./openQuickBuffByName-caa214c8.js"
import{h as u}from"./hideElement-b0b3e820.js"
import{g as d}from"./getArrayByClassName-0b280c78.js"
import{s as r}from"./selfIdIs-b829380b.js"
function m(i,e){d("player-name",i).forEach(e)}function g(i,e){const a=i.dataset.tipped,n=/Last Activity:<\/td><td>(\d+) mins/.exec(a)[1]
n<2?i.classList.add(e.l1):n<5?i.classList.add(e.l2):i.classList.add(e.l3)}function b(e){i(e).forEach(u)}const p=[["hideGuildInfoTrade","#guild-minibox-action-trade","#online-allies-action-trade"],["hideGuildInfoSecureTrade","#guild-minibox-action-secure-trade","#online-allies-action-secure-trade"],["hideGuildInfoBuff","#guild-minibox-action-quickbuff","#online-allies-action-quickbuff"],["hideGuildInfoMessage","#guild-minibox-action-send-message","#online-allies-action-send-message"]]
function h(i,e,t){a[t[0]]&&b(n(t[e],i))}function k(i,a){p.forEach(e(h,i,a))}function x(i,e,a){a.preventDefault(),a.target.classList.toggle(i),a.target.classList.toggle(e)}function y(i,e){const a=d(e,i).map(i=>f(i.nextElementSibling))
l(a.join())}function j(i,e){const a=i.find(i=>i[0](e.target))
if(a)return a[1](e)}function B([i,a,n,t]){return e(j,function([i,a,n,t]){return[[e(c,a),e(x,a,n)],[e(c,n),e(x,a,n)],[r(t),e(y,i,a)]]}([i,a,n,t]))}function I(i,e){const n=e+"-buff-check-on",c=e+"-quick-buff"
a.hideBuffSelected?(b(t(n,i)),u(s(c))):a.fixBuffSelected&&function([i,e,a,n]){const t=e+"-buff-check-off"
$("."+a).off("click"),$("."+t).off("click"),$("#"+n).off("click"),o(i.parentNode,B([i,a,t,n]))}([i,e,n,c])}export{I as a,g as b,m as c,k as d}
//# sourceMappingURL=doHideBuffSelected-c57bb036.js.map
