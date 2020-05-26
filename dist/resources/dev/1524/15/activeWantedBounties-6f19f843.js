import{t as e,A as t,M as n,bX as s,D as a,Q as r,W as i,x as o,n as c,aQ as l,c as u,k as d,aZ as b,bZ as f,z as p,c6 as h,f as m,i as y,u as L,w as g,o as v}from"./calfSystem-ee582533.js"
import"./insertElementBefore-7ed837be.js"
import{i as w}from"./insertElementAfterBegin-115e10be.js"
import{c as $}from"./createSpan-63b97269.js"
import"./csvSplit-7018cdb4.js"
import{s as x}from"./shouldBeArray-3e5e27c5.js"
import{f as N}from"./functionPasses-b1aaa5dd.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function A(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let B,T,j,W,M,S
function P(e){return c(A(e),{progress:t(e[5])})}function C(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=P(e.rows[t].cells)
B.bounty.push(n)}}(e)}function E(){return B&&r-B.lastUpdate>W||T&&r-T.lastUpdate>W}function H(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const U=[()=>S.includes("*"),e=>S.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function O(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&U.some(n=>n(e,t))})(e,t)&&T.bounty.push((n=t.cells,c(A(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:H(n)})))}let X,G,Q,Z,q,z
function D(){return d({className:"minibox"})}function K(){f("bountyList",B),p("",X)
const e=d({innerHTML:`<a href="${h}">Active Bounties</a> `})
Q=$({className:"xxsLink",textContent:"Reset"}),m(e,Q),m(X,e)
let t=""
if(0===B.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<B.bounty.length;e+=1)t+=`<a href="${B.bounty[e].link}" class="tip-static" data-tipped="${n=B.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${B.bounty[e].target}</a><br>`
var n
y(X,t)}function F(){f("wantedList",T),p("",G)
const e=d({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
Z=$({className:"xxsLink",textContent:"Reset"}),m(e,Z),m(G,e)
let t=""
if(0===T.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<T.bounty.length;e+=1)t+=`${s=T.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=T.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${T.bounty[e].link}">${T.bounty[e].target}</a><br>`
var n,s
y(G,t)}function I(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
q=Number(t.value),z=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
O(s,n)}}(s)}function J(e){u.enableActiveBountyList&&!j&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
B={},B.bounty=[],B.isRefreshed=!0,B.lastUpdate=r,n&&C(n),j=!0}(e),K())}function V(e){const t=L(e)
J(t),u.enableWantedList&&(I(t),q<z?R(q+1).then(V):F())}const Y=[()=>!B,()=>!T,()=>M]
function _(e,t){B=s("bountyList"),T=s("wantedList"),W=a("bountyListRefreshTime"),M=a("bwNeedsRefresh"),M||E()&&(M=!0),Y.some(N)?(T={},T.bounty=[],T.isRefreshed=!0,T.lastUpdate=r,j=!1,S=x("wantedNames"),i("bwNeedsRefresh",!1),R(1).then(V)):function(e,t){t&&(T.isRefreshed=!1,F()),e&&(B.isRefreshed=!1,K())}(e,t)}function ee(e){e.target===Q&&(f("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===Z&&(f("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}export default function(){g()||(u.enableWantedList&&(G=D(),w(b,G)),u.enableActiveBountyList&&(X=D(),w(b,X)),X&&v(X,ee),G&&v(G,ee),_(u.enableActiveBountyList,u.enableWantedList))}
//# sourceMappingURL=activeWantedBounties-6f19f843.js.map
