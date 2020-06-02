import{aD as a,s as i,c as e,a7 as s,F as n,x as t}from"./calfSystem-9554b525.js"
import{h as d}from"./hideElement-adf57e3b.js"
import{g as o}from"./getArrayByClassName-61d73ad7.js"
function c(a,i){o("player-name",a).forEach(i)}function l(a,i){const e=a.dataset.tipped,s=/Last Activity:<\/td><td>(\d+) mins/.exec(e)[1]
s<2?a.classList.add(i.l1):s<5?a.classList.add(i.l2):a.classList.add(i.l3)}function f(i){a(i).forEach(d)}const u=[["hideGuildInfoTrade","#guild-minibox-action-trade","#online-allies-action-trade"],["hideGuildInfoSecureTrade","#guild-minibox-action-secure-trade","#online-allies-action-secure-trade"],["hideGuildInfoBuff","#guild-minibox-action-quickbuff","#online-allies-action-quickbuff"],["hideGuildInfoMessage","#guild-minibox-action-send-message","#online-allies-action-send-message"]]
function r(a,i,n){e[n[0]]&&f(s(n[i],a))}function m(a,e){u.forEach(i(r,a,e))}function h(a,i,s){e.hideBuffSelected&&(f(n(i,a)),d(t(s)))}export{h as a,l as b,c,m as d}
//# sourceMappingURL=doHideBuffSelected-98af60eb.js.map
