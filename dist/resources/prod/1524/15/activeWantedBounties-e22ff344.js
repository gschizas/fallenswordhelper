import{t as e,A as t,L as n,bO as s,D as a,P as r,V as i,x as o,n as c,aS as l,c as u,k as d,aX as b,bQ as f,z as p,bZ as h,f as m,i as y,u as L,w as g,o as v}from"./calfSystem-740ec4d2.js"
import"./insertElementBefore-d3961941.js"
import{i as w}from"./insertElementAfterBegin-08e27acb.js"
import{c as $}from"./createSpan-b29fd959.js"
import"./csvSplit-dbbb8019.js"
import{s as x}from"./shouldBeArray-2f2d7d51.js"
import{f as N}from"./functionPasses-09107a62.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function A(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let B,T,j,S,P,W
function M(e){return c(A(e),{progress:t(e[5])})}function C(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=M(e.rows[t].cells)
B.bounty.push(n)}}(e)}function E(){return B&&r-B.lastUpdate>S||T&&r-T.lastUpdate>S}function H(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const O=[()=>W.includes("*"),e=>W.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function U(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&O.some(n=>n(e,t))})(e,t)&&T.bounty.push((n=t.cells,c(A(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:H(n)})))}let X,G,q,z,D,K
function Q(){return d({className:"minibox"})}function V(){f("bountyList",B),p("",X)
const e=d({innerHTML:`<a href="${h}">Active Bounties</a> `})
q=$({className:"xxsLink",textContent:"Reset"}),m(e,q),m(X,e)
let t=""
if(0===B.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<B.bounty.length;e+=1)t+=`<a href="${B.bounty[e].link}" class="tip-static" data-tipped="${n=B.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${B.bounty[e].target}</a><br>`
var n
y(X,t)}function Z(){f("wantedList",T),p("",G)
const e=d({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
z=$({className:"xxsLink",textContent:"Reset"}),m(e,z),m(G,e)
let t=""
if(0===T.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<T.bounty.length;e+=1)t+=`${s=T.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=T.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${T.bounty[e].link}">${T.bounty[e].target}</a><br>`
var n,s
y(G,t)}function F(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
D=Number(t.value),K=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
U(s,n)}}(s)}function I(e){u.enableActiveBountyList&&!j&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
B={},B.bounty=[],B.isRefreshed=!0,B.lastUpdate=r,n&&C(n),j=!0}(e),V())}function J(e){const t=L(e)
I(t),u.enableWantedList&&(F(t),D<K?R(D+1).then(J):Z())}const Y=[()=>!B,()=>!T,()=>P]
function _(e,t){B=s("bountyList"),T=s("wantedList"),S=a("bountyListRefreshTime"),P=a("bwNeedsRefresh"),P||E()&&(P=!0),Y.some(N)?(T={},T.bounty=[],T.isRefreshed=!0,T.lastUpdate=r,j=!1,W=x("wantedNames"),i("bwNeedsRefresh",!1),R(1).then(J)):function(e,t){t&&(T.isRefreshed=!1,Z()),e&&(B.isRefreshed=!1,V())}(e,t)}function ee(e){e.target===q&&(f("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===z&&(f("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}export default function(){g()||(u.enableWantedList&&(G=Q(),w(b,G)),u.enableActiveBountyList&&(X=Q(),w(b,X)),X&&v(X,ee),G&&v(G,ee),_(u.enableActiveBountyList,u.enableWantedList))}
//# sourceMappingURL=activeWantedBounties-e22ff344.js.map
