import{t as e,A as t,M as n,bC as s,D as r,Q as a,W as i,x as o,n as c,a8 as l,c as u,k as d,bO as b,bE as f,z as p,bQ as h,f as m,i as y,u as L,w as g,o as v}from"./calfSystem-dec5e071.js"
import"./insertElementBefore-1d764477.js"
import{i as w}from"./insertElementAfterBegin-80cc8c86.js"
import{c as $}from"./createSpan-660731dc.js"
import"./csvSplit-655e7fa5.js"
import{s as x}from"./shouldBeArray-1a63d3cb.js"
import{f as N}from"./functionPasses-b23556b1.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function A(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let B,T,j,W,M,S
function C(e){return c(A(e),{progress:t(e[5])})}function E(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=C(e.rows[t].cells)
B.bounty.push(n)}}(e)}function P(){return B&&a-B.lastUpdate>W||T&&a-T.lastUpdate>W}function H(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const O=[()=>S.includes("*"),e=>S.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function U(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&O.some(n=>n(e,t))})(e,t)&&T.bounty.push((n=t.cells,c(A(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:H(n)})))}let G,Q,X,q,z,D
function K(){return d({className:"minibox"})}function F(){f("bountyList",B),p("",G)
const e=d({innerHTML:`<a href="${h}">Active Bounties</a> `})
X=$({className:"xxsLink",textContent:"Reset"}),m(e,X),m(G,e)
let t=""
if(0===B.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<B.bounty.length;e+=1)t+=`<a href="${B.bounty[e].link}" class="tip-static" data-tipped="${n=B.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${B.bounty[e].target}</a><br>`
var n
y(G,t)}function I(){f("wantedList",T),p("",Q)
const e=d({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
q=$({className:"xxsLink",textContent:"Reset"}),m(e,q),m(Q,e)
let t=""
if(0===T.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<T.bounty.length;e+=1)t+=`${s=T.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=T.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${T.bounty[e].link}">${T.bounty[e].target}</a><br>`
var n,s
y(Q,t)}function J(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
z=Number(t.value),D=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
U(s,n)}}(s)}function V(e){u.enableActiveBountyList&&!j&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
B={},B.bounty=[],B.isRefreshed=!0,B.lastUpdate=a,n&&E(n),j=!0}(e),F())}function Y(e){const t=L(e)
V(t),u.enableWantedList&&(J(t),z<D?R(z+1).then(Y):I())}const Z=[()=>!B,()=>!T,()=>M]
function _(e,t){B=s("bountyList"),T=s("wantedList"),W=r("bountyListRefreshTime"),M=r("bwNeedsRefresh"),M||P()&&(M=!0),Z.some(N)?(T={},T.bounty=[],T.isRefreshed=!0,T.lastUpdate=a,j=!1,S=x("wantedNames"),i("bwNeedsRefresh",!1),R(1).then(Y)):function(e,t){t&&(T.isRefreshed=!1,I()),e&&(B.isRefreshed=!1,F())}(e,t)}function ee(e){e.target===X&&(f("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===q&&(f("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}export default function(){g()||(u.enableWantedList&&(Q=K(),w(b,Q)),u.enableActiveBountyList&&(G=K(),w(b,G)),G&&v(G,ee),Q&&v(Q,ee),_(u.enableActiveBountyList,u.enableWantedList))}
//# sourceMappingURL=activeWantedBounties-a2c891c5.js.map
