import{t as e,A as t,M as n,bG as s,D as a,Q as r,W as i,x as o,n as c,a8 as l,c as u,k as d,bS as b,bI as f,z as p,bU as h,f as m,i as y,u as L,w as g,o as v}from"./calfSystem-02ae8657.js"
import"./insertElementBefore-35d3b41e.js"
import{i as w}from"./insertElementAfterBegin-680701c3.js"
import{c as $}from"./createSpan-0a306aad.js"
import"./csvSplit-3188b9df.js"
import{s as x}from"./shouldBeArray-6beb3a25.js"
import{f as N}from"./functionPasses-a776a47a.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function A(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let B,T,j,S,W,M
function P(e){return c(A(e),{progress:t(e[5])})}function U(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=P(e.rows[t].cells)
B.bounty.push(n)}}(e)}function C(){return B&&r-B.lastUpdate>S||T&&r-T.lastUpdate>S}function E(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const H=[()=>M.includes("*"),e=>M.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function G(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&H.some(n=>n(e,t))})(e,t)&&T.bounty.push((n=t.cells,c(A(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:E(n)})))}let O,X,q,z,D,I
function K(){return d({className:"minibox"})}function Q(){f("bountyList",B),p("",O)
const e=d({innerHTML:`<a href="${h}">Active Bounties</a> `})
q=$({className:"xxsLink",textContent:"Reset"}),m(e,q),m(O,e)
let t=""
if(0===B.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<B.bounty.length;e+=1)t+=`<a href="${B.bounty[e].link}" class="tip-static" data-tipped="${n=B.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${B.bounty[e].target}</a><br>`
var n
y(O,t)}function F(){f("wantedList",T),p("",X)
const e=d({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
z=$({className:"xxsLink",textContent:"Reset"}),m(e,z),m(X,e)
let t=""
if(0===T.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<T.bounty.length;e+=1)t+=`${s=T.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=T.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${T.bounty[e].link}">${T.bounty[e].target}</a><br>`
var n,s
y(X,t)}function J(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
D=Number(t.value),I=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
G(s,n)}}(s)}function V(e){u.enableActiveBountyList&&!j&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
B={},B.bounty=[],B.isRefreshed=!0,B.lastUpdate=r,n&&U(n),j=!0}(e),Q())}function Y(e){const t=L(e)
V(t),u.enableWantedList&&(J(t),D<I?R(D+1).then(Y):F())}const Z=[()=>!B,()=>!T,()=>W]
function _(e,t){B=s("bountyList"),T=s("wantedList"),S=a("bountyListRefreshTime"),W=a("bwNeedsRefresh"),W||C()&&(W=!0),Z.some(N)?(T={},T.bounty=[],T.isRefreshed=!0,T.lastUpdate=r,j=!1,M=x("wantedNames"),i("bwNeedsRefresh",!1),R(1).then(Y)):function(e,t){t&&(T.isRefreshed=!1,F()),e&&(B.isRefreshed=!1,Q())}(e,t)}function ee(e){e.target===q&&(f("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===z&&(f("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}export default function(){g()||(u.enableWantedList&&(X=K(),w(b,X)),u.enableActiveBountyList&&(O=K(),w(b,O)),O&&v(O,ee),X&&v(X,ee),_(u.enableActiveBountyList,u.enableWantedList))}
//# sourceMappingURL=activeWantedBounties-f690ed92.js.map
