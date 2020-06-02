import{aD as i,s as a,c as e,a7 as s,F as n,x as d}from"./calfSystem-be09bdff.js"
import{h as t}from"./hideElement-dd1f789a.js"
import{g as o}from"./getArrayByClassName-dcccee52.js"
function c(i,a){o("player-name",i).forEach(a)}function l(i,a){const e=i.dataset.tipped,s=/Last Activity:<\/td><td>(\d+) mins/.exec(e)[1]
s<2?i.classList.add(a.l1):s<5?i.classList.add(a.l2):i.classList.add(a.l3)}function f(a){i(a).forEach(t)}const u=[["hideGuildInfoTrade","#guild-minibox-action-trade","#online-allies-action-trade"],["hideGuildInfoSecureTrade","#guild-minibox-action-secure-trade","#online-allies-action-secure-trade"],["hideGuildInfoBuff","#guild-minibox-action-quickbuff","#online-allies-action-quickbuff"],["hideGuildInfoMessage","#guild-minibox-action-send-message","#online-allies-action-send-message"]]
function r(i,a,n){e[n[0]]&&f(s(n[a],i))}function m(i,e){u.forEach(a(r,i,e))}function h(i,a,s){e.hideBuffSelected&&(f(n(a,i)),t(d(s)))}export{h as a,l as b,c,m as d}
//# sourceMappingURL=doHideBuffSelected-ae576ff9.js.map
