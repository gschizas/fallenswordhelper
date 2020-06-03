import{t as e,A as t,N as n,bJ as s,D as r,R as i,X as a,x as o,n as c,a4 as l,c as u,k as f,bV as d,bL as b,z as p,bX as h,f as m,i as y,u as L,w as g,o as v}from"./calfSystem-f7574730.js"
import"./insertElementBefore-b5c9c232.js"
import{i as w}from"./insertElementAfterBegin-5fb4abe9.js"
import{c as $}from"./createSpan-4e730390.js"
import"./csvSplit-49dcf2f6.js"
import{s as N}from"./shouldBeArray-efc6bcff.js"
import{f as x}from"./functionPasses-cbddd5c3.js"
function R(t){return e({cmd:"bounty",page:t})}function k(e){return n("img",e[2]).title}function A(e){const n="A"===(s=e[0]).children[0].tagName?s.children[0]:s.children[0].children[0]
var s
return{target:t(n),link:n.href,lvl:t(n.nextSibling).replace(/[[|\]]/g,""),reward:t(e[2]),rewardType:k(e),posted:t(e[3]),xpLoss:t(e[4])}}let B,T,j,S,W,M
function P(e){return c(A(e),{progress:t(e[5])})}function C(e){(function(e){return!/No bounties active/.test(e.rows[1].cells[0].innerHTML)})(e)&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=P(e.rows[t].cells)
B.bounty.push(n)}}(e)}function E(){return B&&i-B.lastUpdate>S||T&&i-T.lastUpdate>S}function H(e){const t=e[6]
return"[n/a]"!==l(t)?t.children[0].children[0].getAttribute("onclick"):""}const U=[()=>M.includes("*"),e=>M.includes(e),(e,t)=>u.wantedGuildMembers&&"[n/a]"===l(t.cells[6])]
function X(e,t){var n;(function(e,t){return"[active]"!==l(t.cells[6])&&U.some(n=>n(e,t))})(e,t)&&T.bounty.push((n=t.cells,c(A(n),{offerer:l(n[1].children[0].children[0]),tickets:l(n[5]),accept:H(n)})))}let O,G,q,z,D,J
function K(){return f({className:"minibox"})}function V(){b("bountyList",B),p("",O)
const e=f({innerHTML:`<a href="${h}">Active Bounties</a> `})
q=$({className:"xxsLink",textContent:"Reset"}),m(e,q),m(O,e)
let t=""
if(0===B.bounty.length)t+='<div class="xsOrange">[No active bounties]</div>'
else for(let e=0;e<B.bounty.length;e+=1)t+=`<a href="${B.bounty[e].link}" class="tip-static" data-tipped="${n=B.bounty[e],`Level:  ${n.lvl}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Progress:  ${n.progress}`}">${B.bounty[e].target}</a><br>`
var n
y(O,t)}function F(){b("wantedList",T),p("",G)
const e=f({innerHTML:`<a href="${h}">Wanted Bounties</a> `})
z=$({className:"xxsLink",textContent:"Reset"}),m(e,z),m(G,e)
let t=""
if(0===T.bounty.length)t+='<div class="xsOrange">[No wanted bounties]</div>'
else for(let e=0;e<T.bounty.length;e+=1)t+=`${s=T.bounty[e],s.accept?`<span class="xsGreen" onclick="${s.accept}">[a]</span>&nbsp;`:""}<a class="xsKhaki tip-static" data-tipped="${n=T.bounty[e],`Target Level:  ${n.lvl}<br>Offerer: ${n.offerer}<br>Reward: ${n.reward} ${n.rewardType}<br>XP Loss Remaining: ${n.xpLoss}<br>Posted: ${n.posted}<br>Tickets Req.:  ${n.tickets}`}" href="${T.bounty[e].link}">${T.bounty[e].target}</a><br>`
var n,s
y(G,t)}function I(e){const t=n('#pCC input[name="page"]',e)
if(!t)return
D=Number(t.value),J=Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])
const s=o("bounty-info",e).parentNode.parentNode.nextElementSibling.children[0].children[0]
s&&function(e){for(let t=1;t<e.rows.length-2;t+=2){const n=e.rows[t],s=l(n.cells[0].children[0].children[0])
if("[ No bounties available. ]"===s)break
X(s,n)}}(s)}function Q(e){u.enableActiveBountyList&&!j&&(!function(e){const t=o("bounty-info",e)
if(!t)return
const n=t.parentNode.parentNode.previousElementSibling.children[0].children[0]
B={},B.bounty=[],B.isRefreshed=!0,B.lastUpdate=i,n&&C(n),j=!0}(e),V())}function Y(e){const t=L(e)
Q(t),u.enableWantedList&&(I(t),D<J?R(D+1).then(Y):F())}const Z=[()=>!B,()=>!T,()=>W]
function _(e,t){B=s("bountyList"),T=s("wantedList"),S=r("bountyListRefreshTime"),W=r("bwNeedsRefresh"),W||E()&&(W=!0),Z.some(x)?(T={},T.bounty=[],T.isRefreshed=!0,T.lastUpdate=i,j=!1,M=N("wantedNames"),a("bwNeedsRefresh",!1),R(1).then(Y)):function(e,t){t&&(T.isRefreshed=!1,F()),e&&(B.isRefreshed=!1,V())}(e,t)}function ee(e){e.target===q&&(b("bountyList",null),_(u.enableActiveBountyList,u.enableWantedList)),e.target===z&&(b("wantedList",null),_(u.enableActiveBountyList,u.enableWantedList))}export default function(){g()||(u.enableWantedList&&(G=K(),w(d,G)),u.enableActiveBountyList&&(O=K(),w(d,O)),O&&v(O,ee),G&&v(G,ee),_(u.enableActiveBountyList,u.enableWantedList))}
//# sourceMappingURL=activeWantedBounties-53673424.js.map
