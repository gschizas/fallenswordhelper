import{u as t,t as e,bg as s,bh as i,x as n,A as o,p as a,o as d,g as c,z as r,y as h,H as l,v as f,C as u,B as p,J as m,i as g,G as b}from"./calfSystem-ec854151.js"
import"./playerName-f06eed80.js"
import"./createStyle-20f757fd.js"
import"./fshOpen-d34bc8a7.js"
import"./openQuickBuffByName-94ccc2ce.js"
import"./dataRows-40e5e924.js"
import{g as k,s as y}from"./idb-72ad0068.js"
import{c as w}from"./createTable-4fb4ab07.js"
import{h as j}from"./hideElement-b044934d.js"
import{p as L}from"./parseDateAsTimestamp-b98cf0ad.js"
import{t as R}from"./toggleForce-d6f8623d.js"
import{a as N}from"./all-e4fd8fad.js"
import{e as G}from"./eventHandler5-2f87d693.js"
import{s as v}from"./selfIdIs-2f353791.js"
import{f as x}from"./functionPasses-3ebe883f.js"
import"./doBuffLinkClick-5789f272.js"
import{a as H}from"./addLogColoring-9d5fa9bd.js"
import"./searchPlayerHref-1ef74ba3.js"
import{a as T}from"./addGuildLogWidgets-5b5e1397.js"
function P(e){return t({cmd:"guild",subcmd:"log",page:e})}const I=[[],["(Potion)"],["recalled the item","took the item","auto-returned the","stored the item"],["has added flags to","has removed flags to"],["relic. This relic now has an empower level of","relic. The relic empower level has been reset to zero.","failed to capture the relic","captured the relic","captured your relic","has captured the undefended relic","attempted to capture your relic",/ empowered the .+ relic/,/ removed the empowerment from the .+ relic/],["disbanded a mercenary.","hired the mercenary"],["has disbanded one of their groups",/A group from your guild was (.*) in combat./],[/deposited ([,0-9]+) gold into the guild bank/,/deposited ([,0-9]+) FallenSword Points into the guild./],["has added a new rank entitled","has deleted the rank","has requested to join the guild","has invited the player","has officially joined the guild","has been kicked from the guild by","has left the guild","has been assigned the rank","has added/updated a rank entitled"],[/resulted in (.*) with a final score of/,"resulted in a draw. Your GvG rating ","has just initiated a conflict with the guild","has initiated a conflict with your guild","is participating in the conflict against the guild"],["bought the Titan Reward item","from your guild's contribution to the defeat of the titan","a 7 day cooldown has been activated on your guild for this titan"]]
function S(t,e){return s(e)?t.includes(e):e.test(t)}function A(t,s){return s.some(e(S,t))}function C(t){const s=I.findIndex(e(A,t))
return-1===s?0:s}const E=`<table id="fshNewGuildLog" class="fshInvFilter"><thead><tr><th colspan="11"><b>Guild Log Version 4</b></th><th colspan="3"><span id="rfsh" class="sendLink">Reset</span> <a href="${i}" class="sendLink">Old Guild Log</a></th></tr></thead><tbody><tr><td rowspan="3"><b>&nbsp;Filters:</b></td><td class="fshRight">&nbsp;Potions:</td><td><input id="fshPotion" type="checkbox" item="1"/></td><td class="fshRight">&nbsp;Store/Recalls:</td><td><input id="fshStore" type="checkbox" item="2"/></td><td class="fshRight">&nbsp;Relics:</td><td><input id="fshRelic" type="checkbox" item="4"/></td><td class="fshRight">&nbsp;Mercenaries:</td><td><input id="fshMerc" type="checkbox" item="5"/></td><td class="fshRight">&nbsp;Group Combats:</td><td><input id="fshGroup" type="checkbox" item="6"/></td><td colspan="3">&nbsp;</td></tr><tr><td class="fshRight">&nbsp;Donations:</td><td><input id="fshDonation" type="checkbox" item="7"/></td><td class="fshRight">&nbsp;Rankings:</td><td><input id="fshRank" type="checkbox" item="8"/></td><td class="fshRight">&nbsp;GvGs:</td><td><input id="fshGvG" type="checkbox" item="9"/></td><td class="fshRight">&nbsp;Tag/UnTags:</td><td><input id="fshTag" type="checkbox" item="3"/></td><td class="fshRight">&nbsp;Titans:</td><td><input id="fshTitan" type="checkbox" item="10"/></td><td class="fshRight">&nbsp;Other:</td><td><input id="fshOther" type="checkbox" item="0"/></td><td>&nbsp;</td></tr><tr><td colspan="2">&nbsp;[<span id="fshAll" class="fshLink">Select All</span>]</td><td colspan="2">&nbsp;[<span id="fshNone" class="fshLink">Select None</span>]</td><td colspan="9"></td></tr><tr><td id="fshOutput" class="fshBlue" colspan="14">Loading Page 1 ...</td></tr></tbody></table><table id="fshInjectHere"></table>`,O=[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],B=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1]
let D,M,F,$,_,z,U,q,J={},Q=[],V=!0
function W(t,e){return[()=>1===z,()=>J.log,()=>J.log[0],()=>J.log[0][0],()=>t===J.log[0][0],()=>e===J.log[0][2]].every(x)}function Y(){const t=m("width_full",_)
1===t.length&&function(t){const e=t[0],s=e.rows.length-1
for(let t=1;t<s;t+=2){const s=e.rows[t],i=b(s.cells[1]),n=L(i),o=s.cells[2].innerHTML
if(W(n,o)){V=!1
break}Q.push([100*z+t,n,i,o,C(o)])}}(t)}function K(t){!function(t){_=f(t)
const e=u('input[name="page"]',_)
e&&(z=Number(e.value),U=Number(/\d+/.exec(p(e.parentNode))[0]),1===z&&($=Math.min(U,F)),r(`Loading ${z} of ${$}...`,M))}(t),Y()}function X(t){Q.push([0].concat(t))}function Z(){y("fsh_guildLog",J)}function tt(t,e){return e[1]!==t}function et(t){return t.slice(1,5)}function st(t,e){const s=t.insertCell(-1)
o(e,s),s.className="row"}function it(t){!function(t){const e=q.insertRow(-1)
t.push(e),J.checks[t[4]]||(e.className="fshHide"),st(e,'<span class="newGuildLog"></span>'),st(e,`<nobr>${t[2]}</nobr>`),st(e,t[3])}(t),function(t){const e=q.insertRow(-1)
t.push(e),J.checks[t[4]]||(e.className="fshHide")
const s=e.insertCell(-1)
s.className="divider",s.colSpan=3}(t)}function nt(t){t.checked=J.checks[t.getAttribute("item")]}function ot(){c("input",D).forEach(nt),Z()}function at(t,e){return t[0]-e[0]}function dt(){V&&Q.sort(at),r("Loading complete.",M),J.log=Q.filter(e(tt,(new Date).setSeconds(0,0))).map(et),Z(),function(){q=w({id:"fshInjectHere",className:"width_full"}),g(q,'<tbody><tr><td class="header" width="16">&nbsp;</td><td class="header" width="20%">Date</td><td class="header" width="80%">Message</td></tr></tbody>'),Q.forEach(it)
const t=h("fshInjectHere")
a.replaceChild(q,t),H("myGuildLog",1),T()}()}function ct(t){K(t),function(){const t=[]
if(V)for(let e=2;e<=$;e+=1)t.push(P(e).then(K))
else J.log.forEach(X)
return N(t)}().then(dt)}function rt(t,e,s){s[4]===t&&(R(s[5],e),R(s[6],e))}function ht(t){const s=Number(t.getAttribute("item"))
J.checks[s]=!J.checks[s],Z(),Q.forEach(e(rt,s,!J.checks[s]))}function lt(t){t&&t.classList&&t.classList.remove("fshHide")}function ft(t){lt(t[5]),lt(t[6])}function ut(){J.checks=O.slice(0),ot(),Q.forEach(ft)}function pt(t){j(t[5]),j(t[6])}function mt(){J.checks=B.slice(0),ot(),Q.forEach(pt)}function gt(){J.log=!1,Z(),r("Loading Page 1 ...",M),Q=[],V=!0,o("",h("fshInjectHere")),P(1).then(ct)}function bt(t){!function(t){J=t||J,J.checks=J.checks||O.slice(0)}(t),o(E,a),D=h("fshNewGuildLog"),M=h("fshOutput"),d(D,G([[t=>"INPUT"===t.tagName,ht],[v("fshAll"),ut],[v("fshNone"),mt],[v("rfsh"),gt]])),ot(),F=Number(l("newGuildLogHistoryPages")),$=F,P(1).then(ct)}function kt(){n()||k("fsh_guildLog").then(bt)}export default kt
//# sourceMappingURL=newGuildLog-0cf9ff33.js.map
