import{u as e,B as t,C as n,bx as s,H as r,S as i,Y as a,y as o,q as c,G as l,c as u,m as f,bJ as d,bz as b,A as p,bM as h,h as m,i as y,v as L,x as g,o as v}from"./calfSystem-71b9378d.js"
import"./insertElementBefore-286ff14c.js"
import{i as $}from"./insertElementAfterBegin-1ff1031d.js"
import{c as w}from"./createSpan-729a1388.js"
import"./csvSplit-8c1a6c7f.js"
import{s as x}from"./shouldBeArray-0139e4ee.js"
import{f as N}from"./functionPasses-2024f108.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function A(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let B,T,j,S,M,W
function C(e){return c(A(e),{progress:t(e[5])})}function H(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=C(e.rows[t].cells)
B.bounty.push(n)}}(e)}function P(){return B&&i-B.lastUpdate>S||T&&i-T.lastUpdate>S}function E(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const U=[()=>W.includes("*"),e=>W.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function G(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&U.some(n=>n(e,t))})(e,t)&&T.bounty.push((n=t.cells,c(A(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:E(n)})))}let O,q,X,z,J,K
function Y(){return f({className:"minibox"})}function D(){b("bountyList",B),p("",O)
const e=f({innerHTML:`<a href="${h}">Active Bounties</a> `})
X=w({className:"xxsLink",textContent:"Reset"}),m(e,X),m(O,e)
let t=""
if(0===B.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<B.bounty.length;e+=1)t+=`<a href="${B.bounty[e].link}" class="tip-static" data-tipped="${n=B.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${B.bounty[e].target}</a><br>`
var n
y(O,t)}function F(){b("wantedList",T),p("",q)
const e=f({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
z=w({className:"xxsLink",textContent:"Reset"}),m(e,z),m(q,e)
let t=""
if(0===T.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<T.bounty.length;e+=1)t+=`${s=T.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=T.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${T.bounty[e].link}">${T.bounty[e].target}</a><br>`
var n,s
y(q,t)}function I(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
J=Number(t.value),K=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
G(s,n)}}(s)}function Q(e){u.enableActiveBountyList&&!j&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
B={},B.bounty=[],B.isRefreshed=!0,B.lastUpdate=i,n&&H(n),j=!0}(e),D())}function V(e){const t=L(e)
Q(t),u.enableWantedList&&(I(t),J<K?R(J+1).then(V):F())}const Z=[()=>!B,()=>!T,()=>M]
function _(e,t){B=s("bountyList"),T=s("wantedList"),S=r("bountyListRefreshTime"),M=r("bwNeedsRefresh"),M||P()&&(M=!0),Z.some(N)?(T={},T.bounty=[],T.isRefreshed=!0,T.lastUpdate=i,j=!1,W=x("wantedNames"),a("bwNeedsRefresh",!1),R(1).then(V)):function(e,t){t&&(T.isRefreshed=!1,F()),e&&(B.isRefreshed=!1,D())}(e,t)}function ee(e){e.target===X&&(b("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===z&&(b("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}function te(){g()||(u.enableWantedList&&(q=Y(),$(d,q)),u.enableActiveBountyList&&(O=Y(),$(d,O)),O&&v(O,ee),q&&v(q,ee),_(u.enableActiveBountyList,u.enableWantedList))}export default te
//# sourceMappingURL=activeWantedBounties-a94e6ed9.js.map
