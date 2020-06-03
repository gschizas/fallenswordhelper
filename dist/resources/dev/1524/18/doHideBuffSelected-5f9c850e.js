import{a3 as a,s as i,c as e,ab as s,F as n,x as t}from"./calfSystem-5545a3e6.js"
import{h as o}from"./hideElement-f7434a50.js"
import{g as d}from"./getArrayByClassName-8790cbe5.js"
function c(a,i){d("player-name",a).forEach(i)}function l(a,i){const e=a.dataset.tipped,s=/Last Activity:<\/td><td>(\d+) mins/.exec(e)[1]
s<2?a.classList.add(i.l1):s<5?a.classList.add(i.l2):a.classList.add(i.l3)}function f(i){a(i).forEach(o)}const u=[["hideGuildInfoTrade","#guild-minibox-action-trade","#online-allies-action-trade"],["hideGuildInfoSecureTrade","#guild-minibox-action-secure-trade","#online-allies-action-secure-trade"],["hideGuildInfoBuff","#guild-minibox-action-quickbuff","#online-allies-action-quickbuff"],["hideGuildInfoMessage","#guild-minibox-action-send-message","#online-allies-action-send-message"]]
function r(a,i,n){e[n[0]]&&f(s(n[i],a))}function m(a,e){u.forEach(i(r,a,e))}function h(a,i,s){e.hideBuffSelected&&(f(n(i,a)),o(t(s)))}export{h as a,l as b,c,m as d}
//# sourceMappingURL=doHideBuffSelected-5f9c850e.js.map
