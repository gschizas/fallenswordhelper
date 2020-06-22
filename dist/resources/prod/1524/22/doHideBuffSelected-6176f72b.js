import{M as i,t as a,c as e,a9 as s,I as n,y as t}from"./calfSystem-d04e4be4.js"
import{h as d}from"./hideElement-54f4258c.js"
import{g as o}from"./getArrayByClassName-a2df28cd.js"
function c(i,a){o("player-name",i).forEach(a)}function l(i,a){const e=i.dataset.tipped,s=/Last Activity:<\/td><td>(\d+) mins/.exec(e)[1]
s<2?i.classList.add(a.l1):s<5?i.classList.add(a.l2):i.classList.add(a.l3)}function f(a){i(a).forEach(d)}const u=[["hideGuildInfoTrade","#guild-minibox-action-trade","#online-allies-action-trade"],["hideGuildInfoSecureTrade","#guild-minibox-action-secure-trade","#online-allies-action-secure-trade"],["hideGuildInfoBuff","#guild-minibox-action-quickbuff","#online-allies-action-quickbuff"],["hideGuildInfoMessage","#guild-minibox-action-send-message","#online-allies-action-send-message"]]
function r(i,a,n){e[n[0]]&&f(s(n[a],i))}function m(i,e){u.forEach(a(r,i,e))}function h(i,a,s){e.hideBuffSelected&&(f(n(a,i)),d(t(s)))}export{h as a,l as b,c,m as d}
//# sourceMappingURL=doHideBuffSelected-6176f72b.js.map
