import{t as e,A as t,M as n,bH as s,D as a,Q as r,W as i,x as o,n as c,a8 as l,c as u,k as f,bT as b,bJ as d,z as p,bV as h,f as m,i as y,u as L,w as g,o as v}from"./calfSystem-9554b525.js"
import"./insertElementBefore-5f238f78.js"
import{i as w}from"./insertElementAfterBegin-ecab1c25.js"
import{c as $}from"./createSpan-40c5f348.js"
import"./csvSplit-6b438d23.js"
import{s as x}from"./shouldBeArray-5c53ef4a.js"
import{f as N}from"./functionPasses-39b1a4e5.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function A(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let T,B,j,W,M,S
function H(e){return c(A(e),{progress:t(e[5])})}function P(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=H(e.rows[t].cells)
T.bounty.push(n)}}(e)}function C(){return T&&r-T.lastUpdate>W||B&&r-B.lastUpdate>W}function E(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const U=[()=>S.includes("*"),e=>S.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function O(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&U.some(n=>n(e,t))})(e,t)&&B.bounty.push((n=t.cells,c(A(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:E(n)})))}let G,X,q,z,D,J
function K(){return f({className:"minibox"})}function Q(){d("bountyList",T),p("",G)
const e=f({innerHTML:`<a href="${h}">Active Bounties</a> `})
q=$({className:"xxsLink",textContent:"Reset"}),m(e,q),m(G,e)
let t=""
if(0===T.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<T.bounty.length;e+=1)t+=`<a href="${T.bounty[e].link}" class="tip-static" data-tipped="${n=T.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${T.bounty[e].target}</a><br>`
var n
y(G,t)}function V(){d("wantedList",B),p("",X)
const e=f({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
z=$({className:"xxsLink",textContent:"Reset"}),m(e,z),m(X,e)
let t=""
if(0===B.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<B.bounty.length;e+=1)t+=`${s=B.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=B.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${B.bounty[e].link}">${B.bounty[e].target}</a><br>`
var n,s
y(X,t)}function F(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
D=Number(t.value),J=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
O(s,n)}}(s)}function I(e){u.enableActiveBountyList&&!j&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
T={},T.bounty=[],T.isRefreshed=!0,T.lastUpdate=r,n&&P(n),j=!0}(e),Q())}function Y(e){const t=L(e)
I(t),u.enableWantedList&&(F(t),D<J?R(D+1).then(Y):V())}const Z=[()=>!T,()=>!B,()=>M]
function _(e,t){T=s("bountyList"),B=s("wantedList"),W=a("bountyListRefreshTime"),M=a("bwNeedsRefresh"),M||C()&&(M=!0),Z.some(N)?(B={},B.bounty=[],B.isRefreshed=!0,B.lastUpdate=r,j=!1,S=x("wantedNames"),i("bwNeedsRefresh",!1),R(1).then(Y)):function(e,t){t&&(B.isRefreshed=!1,V()),e&&(T.isRefreshed=!1,Q())}(e,t)}function ee(e){e.target===q&&(d("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===z&&(d("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}export default function(){g()||(u.enableWantedList&&(X=K(),w(b,X)),u.enableActiveBountyList&&(G=K(),w(b,G)),G&&v(G,ee),X&&v(X,ee),_(u.enableActiveBountyList,u.enableWantedList))}
//# sourceMappingURL=activeWantedBounties-e720ed44.js.map
