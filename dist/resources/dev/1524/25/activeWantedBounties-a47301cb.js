import{u as e,B as t,C as n,bE as s,H as r,T as i,Z as a,y as o,q as c,G as l,c as u,m as d,bQ as f,bG as b,A as p,bT as h,h as m,i as y,v as L,x as g,o as v}from"./calfSystem-69dd5601.js"
import"./insertElementBefore-286ff14c.js"
import{i as $}from"./insertElementAfterBegin-c6f715e1.js"
import{c as w}from"./createSpan-71b557d6.js"
import"./csvSplit-8c1a6c7f.js"
import{s as x}from"./shouldBeArray-547bc477.js"
import{f as N}from"./functionPasses-2024f108.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function T(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let A,B,j,S,W,C
function E(e){return c(T(e),{progress:t(e[5])})}function H(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=E(e.rows[t].cells)
A.bounty.push(n)}}(e)}function M(){return A&&i-A.lastUpdate>S||B&&i-B.lastUpdate>S}function P(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const G=[()=>C.includes("*"),e=>C.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function U(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&G.some(n=>n(e,t))})(e,t)&&B.bounty.push((n=t.cells,c(T(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:P(n)})))}let O,q,X,K,Q,Z
function z(){return d({className:"minibox"})}function D(){b("bountyList",A),p("",O)
const e=d({innerHTML:`<a href="${h}">Active Bounties</a> `})
X=w({className:"xxsLink",textContent:"Reset"}),m(e,X),m(O,e)
let t=""
if(0===A.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<A.bounty.length;e+=1)t+=`<a href="${A.bounty[e].link}" class="tip-static" data-tipped="${n=A.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${A.bounty[e].target}</a><br>`
var n
y(O,t)}function F(){b("wantedList",B),p("",q)
const e=d({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
K=w({className:"xxsLink",textContent:"Reset"}),m(e,K),m(q,e)
let t=""
if(0===B.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<B.bounty.length;e+=1)t+=`${s=B.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=B.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${B.bounty[e].link}">${B.bounty[e].target}</a><br>`
var n,s
y(q,t)}function I(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
Q=Number(t.value),Z=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
U(s,n)}}(s)}function J(e){u.enableActiveBountyList&&!j&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
A={},A.bounty=[],A.isRefreshed=!0,A.lastUpdate=i,n&&H(n),j=!0}(e),D())}function V(e){const t=L(e)
J(t),u.enableWantedList&&(I(t),Q<Z?R(Q+1).then(V):F())}const Y=[()=>!A,()=>!B,()=>W]
function _(e,t){A=s("bountyList"),B=s("wantedList"),S=r("bountyListRefreshTime"),W=r("bwNeedsRefresh"),W||M()&&(W=!0),Y.some(N)?(B={},B.bounty=[],B.isRefreshed=!0,B.lastUpdate=i,j=!1,C=x("wantedNames"),a("bwNeedsRefresh",!1),R(1).then(V)):function(e,t){t&&(B.isRefreshed=!1,F()),e&&(A.isRefreshed=!1,D())}(e,t)}function ee(e){e.target===X&&(b("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===K&&(b("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}function te(){g()||(u.enableWantedList&&(q=z(),$(f,q)),u.enableActiveBountyList&&(O=z(),$(f,O)),O&&v(O,ee),q&&v(q,ee),_(u.enableActiveBountyList,u.enableWantedList))}export default te
//# sourceMappingURL=activeWantedBounties-a47301cb.js.map
