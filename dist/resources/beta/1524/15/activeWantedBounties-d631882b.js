import{t as e,A as t,L as n,bS as s,D as a,P as r,V as i,x as o,n as c,aS as l,c as u,k as d,aX as f,bU as b,z as p,c1 as h,f as m,i as y,u as L,w as g,o as v}from"./calfSystem-1262535f.js"
import"./insertElementBefore-dcdbe7ae.js"
import{i as w}from"./insertElementAfterBegin-eeb77058.js"
import{c as $}from"./createSpan-aa5e4be8.js"
import"./csvSplit-b1d72ffd.js"
import{s as x}from"./shouldBeArray-3a61602c.js"
import{f as N}from"./functionPasses-7d5b7f8e.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function A(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let B,T,S,j,P,W
function M(e){return c(A(e),{progress:t(e[5])})}function U(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=M(e.rows[t].cells)
B.bounty.push(n)}}(e)}function C(){return B&&r-B.lastUpdate>j||T&&r-T.lastUpdate>j}function E(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const H=[()=>W.includes("*"),e=>W.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function O(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&H.some(n=>n(e,t))})(e,t)&&T.bounty.push((n=t.cells,c(A(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:E(n)})))}let X,G,q,z,D,K
function V(){return d({className:"minibox"})}function F(){b("bountyList",B),p("",X)
const e=d({innerHTML:`<a href="${h}">Active Bounties</a> `})
q=$({className:"xxsLink",textContent:"Reset"}),m(e,q),m(X,e)
let t=""
if(0===B.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<B.bounty.length;e+=1)t+=`<a href="${B.bounty[e].link}" class="tip-static" data-tipped="${n=B.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${B.bounty[e].target}</a><br>`
var n
y(X,t)}function I(){b("wantedList",T),p("",G)
const e=d({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
z=$({className:"xxsLink",textContent:"Reset"}),m(e,z),m(G,e)
let t=""
if(0===T.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<T.bounty.length;e+=1)t+=`${s=T.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=T.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${T.bounty[e].link}">${T.bounty[e].target}</a><br>`
var n,s
y(G,t)}function J(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
D=Number(t.value),K=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
O(s,n)}}(s)}function Q(e){u.enableActiveBountyList&&!S&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
B={},B.bounty=[],B.isRefreshed=!0,B.lastUpdate=r,n&&U(n),S=!0}(e),F())}function Y(e){const t=L(e)
Q(t),u.enableWantedList&&(J(t),D<K?R(D+1).then(Y):I())}const Z=[()=>!B,()=>!T,()=>P]
function _(e,t){B=s("bountyList"),T=s("wantedList"),j=a("bountyListRefreshTime"),P=a("bwNeedsRefresh"),P||C()&&(P=!0),Z.some(N)?(T={},T.bounty=[],T.isRefreshed=!0,T.lastUpdate=r,S=!1,W=x("wantedNames"),i("bwNeedsRefresh",!1),R(1).then(Y)):function(e,t){t&&(T.isRefreshed=!1,I()),e&&(B.isRefreshed=!1,F())}(e,t)}function ee(e){e.target===q&&(b("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===z&&(b("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}export default function(){g()||(u.enableWantedList&&(G=V(),w(f,G)),u.enableActiveBountyList&&(X=V(),w(f,X)),X&&v(X,ee),G&&v(G,ee),_(u.enableActiveBountyList,u.enableWantedList))}
//# sourceMappingURL=activeWantedBounties-d631882b.js.map
