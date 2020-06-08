import{u as e,B as t,C as n,bw as s,G as a,S as r,Y as i,y as o,q as c,K as l,c as u,l as d,bI as f,by as b,A as p,bL as h,f as m,i as y,v as L,x as g,o as v}from"./calfSystem-03970067.js"
import"./insertElementBefore-c9a36777.js"
import{i as w}from"./insertElementAfterBegin-6c7a660f.js"
import{c as $}from"./createSpan-3c9a32c0.js"
import"./csvSplit-a1c5f5ec.js"
import{s as x}from"./shouldBeArray-a3c24456.js"
import{f as N}from"./functionPasses-57966c99.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function A(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let B,T,j,S,W,C
function M(e){return c(A(e),{progress:t(e[5])})}function P(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=M(e.rows[t].cells)
B.bounty.push(n)}}(e)}function E(){return B&&r-B.lastUpdate>S||T&&r-T.lastUpdate>S}function H(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const U=[()=>C.includes("*"),e=>C.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function G(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&U.some(n=>n(e,t))})(e,t)&&T.bounty.push((n=t.cells,c(A(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:H(n)})))}let O,q,K,X,I,Y
function z(){return d({className:"minibox"})}function D(){b("bountyList",B),p("",O)
const e=d({innerHTML:`<a href="${h}">Active Bounties</a> `})
K=$({className:"xxsLink",textContent:"Reset"}),m(e,K),m(O,e)
let t=""
if(0===B.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<B.bounty.length;e+=1)t+=`<a href="${B.bounty[e].link}" class="tip-static" data-tipped="${n=B.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${B.bounty[e].target}</a><br>`
var n
y(O,t)}function F(){b("wantedList",T),p("",q)
const e=d({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
X=$({className:"xxsLink",textContent:"Reset"}),m(e,X),m(q,e)
let t=""
if(0===T.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<T.bounty.length;e+=1)t+=`${s=T.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=T.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${T.bounty[e].link}">${T.bounty[e].target}</a><br>`
var n,s
y(q,t)}function J(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
I=Number(t.value),Y=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
G(s,n)}}(s)}function Q(e){u.enableActiveBountyList&&!j&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
B={},B.bounty=[],B.isRefreshed=!0,B.lastUpdate=r,n&&P(n),j=!0}(e),D())}function V(e){const t=L(e)
Q(t),u.enableWantedList&&(J(t),I<Y?R(I+1).then(V):F())}const Z=[()=>!B,()=>!T,()=>W]
function _(e,t){B=s("bountyList"),T=s("wantedList"),S=a("bountyListRefreshTime"),W=a("bwNeedsRefresh"),W||E()&&(W=!0),Z.some(N)?(T={},T.bounty=[],T.isRefreshed=!0,T.lastUpdate=r,j=!1,C=x("wantedNames"),i("bwNeedsRefresh",!1),R(1).then(V)):function(e,t){t&&(T.isRefreshed=!1,F()),e&&(B.isRefreshed=!1,D())}(e,t)}function ee(e){e.target===K&&(b("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===X&&(b("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}export default function(){g()||(u.enableWantedList&&(q=z(),w(f,q)),u.enableActiveBountyList&&(O=z(),w(f,O)),O&&v(O,ee),q&&v(q,ee),_(u.enableActiveBountyList,u.enableWantedList))}
//# sourceMappingURL=activeWantedBounties-f30247b5.js.map
