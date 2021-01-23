import{u as e,B as t,C as n,bB as s,H as a,S as r,Y as i,y as o,q as c,G as l,c as u,m as d,bF as b,bD as f,A as p,bK as h,h as m,i as y,v as L,x as g,o as v}from"./calfSystem-7aee5245.js"
import{f as $}from"./functionPasses-75c75ad9.js"
import{s as w}from"./shouldBeArray-c0e711d8.js"
import{i as x}from"./insertElementAfterBegin-88a9bca4.js"
import{c as N}from"./createSpan-08d79c06.js"
import"./csvSplit-aa512e64.js"
import"./insertElementBefore-43970b1f.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function B(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let A,T,j,S,W,C
function H(e){return c(B(e),{progress:t(e[5])})}function M(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=H(e.rows[t].cells)
A.bounty.push(n)}}(e)}function P(){return A&&r-A.lastUpdate>S||T&&r-T.lastUpdate>S}function E(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const U=[()=>C.includes("*"),e=>C.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function G(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&U.some((n=>n(e,t)))})(e,t)&&T.bounty.push((n=t.cells,c(B(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:E(n)})))}let O,q,K,X,D,F
function Y(){return d({className:"minibox"})}function z(){f("bountyList",A),p("",O)
const e=d({innerHTML:`<a href="${h}">Active Bounties</a> `})
K=N({className:"xxsLink",textContent:"Reset"}),m(e,K),m(O,e)
let t=""
if(0===A.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<A.bounty.length;e+=1)t+=`<a href="${A.bounty[e].link}" class="tip-static" data-tipped="${n=A.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${A.bounty[e].target}</a><br>`
var n
y(O,t)}function I(){f("wantedList",T),p("",q)
const e=d({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
X=N({className:"xxsLink",textContent:"Reset"}),m(e,X),m(q,e)
let t=""
if(0===T.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<T.bounty.length;e+=1)t+=`${s=T.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=T.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${T.bounty[e].link}">${T.bounty[e].target}</a><br>`
var n,s
y(q,t)}function J(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
D=Number(t.value),F=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
G(s,n)}}(s)}function Q(e){u.enableActiveBountyList&&!j&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
A={},A.bounty=[],A.isRefreshed=!0,A.lastUpdate=r,n&&M(n),j=!0}(e),z())}function V(e){const t=L(e)
Q(t),u.enableWantedList&&(J(t),D<F?R(D+1).then(V):I())}const Z=[()=>!A,()=>!T,()=>W]
function _(e,t){A=s("bountyList"),T=s("wantedList"),S=a("bountyListRefreshTime"),W=a("bwNeedsRefresh"),W||P()&&(W=!0),Z.some($)?(T={},T.bounty=[],T.isRefreshed=!0,T.lastUpdate=r,j=!1,C=w("wantedNames"),i("bwNeedsRefresh",!1),R(1).then(V)):function(e,t){t&&(T.isRefreshed=!1,I()),e&&(A.isRefreshed=!1,z())}(e,t)}function ee(e){e.target===K&&(f("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===X&&(f("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}function te(){g()||(u.enableWantedList&&(q=Y(),x(b,q)),u.enableActiveBountyList&&(O=Y(),x(b,O)),O&&v(O,ee),q&&v(q,ee),_(u.enableActiveBountyList,u.enableWantedList))}export default te
//# sourceMappingURL=activeWantedBounties-72e2647b.js.map
