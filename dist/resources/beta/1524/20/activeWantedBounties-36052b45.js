import{u as e,B as t,C as n,bB as s,G as a,S as r,Y as i,y as o,q as c,K as l,c as u,l as d,bN as b,bD as f,A as p,bQ as h,f as m,i as y,v as L,x as g,o as v}from"./calfSystem-05554bae.js"
import"./insertElementBefore-2ba0b318.js"
import{i as $}from"./insertElementAfterBegin-1acc7ec9.js"
import{c as w}from"./createSpan-472d43ae.js"
import"./csvSplit-d1d5e8a8.js"
import{s as N}from"./shouldBeArray-28316d52.js"
import{f as x}from"./functionPasses-a445c50c.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function B(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let A,T,j,S,W,C
function M(e){return c(B(e),{progress:t(e[5])})}function P(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=M(e.rows[t].cells)
A.bounty.push(n)}}(e)}function E(){return A&&r-A.lastUpdate>S||T&&r-T.lastUpdate>S}function H(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const U=[()=>C.includes("*"),e=>C.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function G(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&U.some(n=>n(e,t))})(e,t)&&T.bounty.push((n=t.cells,c(B(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:H(n)})))}let O,q,K,X,D,Q
function Y(){return d({className:"minibox"})}function z(){f("bountyList",A),p("",O)
const e=d({innerHTML:`<a href="${h}">Active Bounties</a> `})
K=w({className:"xxsLink",textContent:"Reset"}),m(e,K),m(O,e)
let t=""
if(0===A.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<A.bounty.length;e+=1)t+=`<a href="${A.bounty[e].link}" class="tip-static" data-tipped="${n=A.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${A.bounty[e].target}</a><br>`
var n
y(O,t)}function F(){f("wantedList",T),p("",q)
const e=d({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
X=w({className:"xxsLink",textContent:"Reset"}),m(e,X),m(q,e)
let t=""
if(0===T.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<T.bounty.length;e+=1)t+=`${s=T.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=T.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${T.bounty[e].link}">${T.bounty[e].target}</a><br>`
var n,s
y(q,t)}function I(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
D=Number(t.value),Q=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
G(s,n)}}(s)}function J(e){u.enableActiveBountyList&&!j&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
A={},A.bounty=[],A.isRefreshed=!0,A.lastUpdate=r,n&&P(n),j=!0}(e),z())}function V(e){const t=L(e)
J(t),u.enableWantedList&&(I(t),D<Q?R(D+1).then(V):F())}const Z=[()=>!A,()=>!T,()=>W]
function _(e,t){A=s("bountyList"),T=s("wantedList"),S=a("bountyListRefreshTime"),W=a("bwNeedsRefresh"),W||E()&&(W=!0),Z.some(x)?(T={},T.bounty=[],T.isRefreshed=!0,T.lastUpdate=r,j=!1,C=N("wantedNames"),i("bwNeedsRefresh",!1),R(1).then(V)):function(e,t){t&&(T.isRefreshed=!1,F()),e&&(A.isRefreshed=!1,z())}(e,t)}function ee(e){e.target===K&&(f("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===X&&(f("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}export default function(){g()||(u.enableWantedList&&(q=Y(),$(b,q)),u.enableActiveBountyList&&(O=Y(),$(b,O)),O&&v(O,ee),q&&v(q,ee),_(u.enableActiveBountyList,u.enableWantedList))}
//# sourceMappingURL=activeWantedBounties-36052b45.js.map
