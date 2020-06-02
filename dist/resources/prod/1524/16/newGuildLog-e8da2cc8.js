import{t,s as e,bh as s,bi as i,w as n,z as o,p as a,o as d,g as c,y as r,x as h,D as l,u as f,M as u,A as p,F as m,i as g,a8 as b}from"./calfSystem-be09bdff.js"
import"./playerName-73d6a463.js"
import"./fshOpen-d27f23b3.js"
import"./openQuickBuffByName-cbbf176e.js"
import"./dataRows-4159fd61.js"
import{g as k,s as y}from"./idb-a63ec135.js"
import{c as w}from"./createTable-6ea63fbc.js"
import"./createStyle-e061c495.js"
import{h as j}from"./hideElement-dd1f789a.js"
import{a as L}from"./all-e1939fb2.js"
import{e as R}from"./eventHandler5-59c96079.js"
import{t as N}from"./toggleForce-2711e067.js"
import{s as G}from"./selfIdIs-c523c399.js"
import{p as v}from"./parseDateAsTimestamp-f5ce65ae.js"
import{f as x}from"./functionPasses-7c70a053.js"
import{a as T}from"./addLogColoring-6ac83c50.js"
import"./searchPlayerHref-e6f5a1d2.js"
import{a as H}from"./addGuildLogWidgets-9245de51.js"
function P(e){return t({cmd:"guild",subcmd:"log",page:e})}const I=[[],["(Potion)"],["recalled the item","took the item","auto-returned the","stored the item"],["has added flags to","has removed flags to"],["relic. This relic now has an empower level of","relic. The relic empower level has been reset to zero.","failed to capture the relic","captured the relic","captured your relic","has captured the undefended relic","attempted to capture your relic",/ empowered the .+ relic/,/ removed the empowerment from the .+ relic/],["disbanded a mercenary.","hired the mercenary"],["has disbanded one of their groups",/A group from your guild was (.*) in combat./],[/deposited ([,0-9]+) gold into the guild bank/,/deposited ([,0-9]+) FallenSword Points into the guild./],["has added a new rank entitled","has deleted the rank","has requested to join the guild","has invited the player","has officially joined the guild","has been kicked from the guild by","has left the guild","has been assigned the rank","has added/updated a rank entitled"],[/resulted in (.*) with a final score of/,"resulted in a draw. Your GvG rating ","has just initiated a conflict with the guild","has initiated a conflict with your guild","is participating in the conflict against the guild"],["bought the Titan Reward item","from your guild's contribution to the defeat of the titan","a 7 day cooldown has been activated on your guild for this titan"]]
function S(t,e){return s(e)?t.includes(e):e.test(t)}function A(t,s){return s.some(e(S,t))}function E(t){const s=I.findIndex(e(A,t))
return-1===s?0:s}const D=`<table id="fshNewGuildLog" class="fshInvFilter"><thead><tr><th colspan="11"><b>Guild Log Version 4</b></th><th colspan="3"><span id="rfsh" class="sendLink">Reset</span> <a href="${i}" class="sendLink">Old Guild Log</a></th></tr></thead><tbody><tr><td rowspan="3"><b>&nbsp;Filters:</b></td><td class="fshRight">&nbsp;Potions:</td><td><input id="fshPotion" type="checkbox" item="1"/></td><td class="fshRight">&nbsp;Store/Recalls:</td><td><input id="fshStore" type="checkbox" item="2"/></td><td class="fshRight">&nbsp;Relics:</td><td><input id="fshRelic" type="checkbox" item="4"/></td><td class="fshRight">&nbsp;Mercenaries:</td><td><input id="fshMerc" type="checkbox" item="5"/></td><td class="fshRight">&nbsp;Group Combats:</td><td><input id="fshGroup" type="checkbox" item="6"/></td><td colspan="3">&nbsp;</td></tr><tr><td class="fshRight">&nbsp;Donations:</td><td><input id="fshDonation" type="checkbox" item="7"/></td><td class="fshRight">&nbsp;Rankings:</td><td><input id="fshRank" type="checkbox" item="8"/></td><td class="fshRight">&nbsp;GvGs:</td><td><input id="fshGvG" type="checkbox" item="9"/></td><td class="fshRight">&nbsp;Tag/UnTags:</td><td><input id="fshTag" type="checkbox" item="3"/></td><td class="fshRight">&nbsp;Titans:</td><td><input id="fshTitan" type="checkbox" item="10"/></td><td class="fshRight">&nbsp;Other:</td><td><input id="fshOther" type="checkbox" item="0"/></td><td>&nbsp;</td></tr><tr><td colspan="2">&nbsp;[<span id="fshAll" class="fshLink">Select All</span>]</td><td colspan="2">&nbsp;[<span id="fshNone" class="fshLink">Select None</span>]</td><td colspan="9"></td></tr><tr><td id="fshOutput" class="fshBlue" colspan="14">Loading Page 1 ...</td></tr></tbody></table><table id="fshInjectHere"></table>`,M=[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],O=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1]
let C,F,$,_,B,z,U,q,Q={},V=[],W=!0
function Y(t,e){return[()=>1===z,()=>Q.log,()=>Q.log[0],()=>Q.log[0][0],()=>t===Q.log[0][0],()=>e===Q.log[0][2]].every(x)}function J(){const t=m("width_full",B)
1===t.length&&function(t){const e=t[0],s=e.rows.length-1
for(let t=1;t<s;t+=2){const s=e.rows[t],i=b(s.cells[1]),n=v(i),o=s.cells[2].innerHTML
if(Y(n,o)){W=!1
break}V.push([100*z+t,n,i,o,E(o)])}}(t)}function K(t){!function(t){B=f(t)
const e=u('input[name="page"]',B)
e&&(z=Number(e.value),U=Number(/\d+/.exec(p(e.parentNode))[0]),1===z&&(_=Math.min(U,$)),r(`Loading ${z} of ${_}...`,F))}(t),J()}function X(t){V.push([0].concat(t))}function Z(){y("fsh_guildLog",Q)}function tt(t,e){return e[1]!==t}function et(t){return t.slice(1,5)}function st(t,e){const s=t.insertCell(-1)
o(e,s),s.className="row"}function it(t){!function(t){const e=q.insertRow(-1)
t.push(e),Q.checks[t[4]]||(e.className="fshHide"),st(e,'<span class="newGuildLog"></span>'),st(e,`<nobr>${t[2]}</nobr>`),st(e,t[3])}(t),function(t){const e=q.insertRow(-1)
t.push(e),Q.checks[t[4]]||(e.className="fshHide")
const s=e.insertCell(-1)
s.className="divider",s.colSpan=3}(t)}function nt(t){t.checked=Q.checks[t.getAttribute("item")]}function ot(){c("input",C).forEach(nt),Z()}function at(t,e){return t[0]-e[0]}function dt(){W&&V.sort(at),r("Loading complete.",F),Q.log=V.filter(e(tt,(new Date).setSeconds(0,0))).map(et),Z(),function(){q=w({id:"fshInjectHere",className:"width_full"}),g(q,'<tbody><tr><td class="header" width="16">&nbsp;</td><td class="header" width="20%">Date</td><td class="header" width="80%">Message</td></tr></tbody>'),V.forEach(it)
const t=h("fshInjectHere")
a.replaceChild(q,t),T("myGuildLog",1),H()}()}function ct(t){K(t),function(){const t=[]
if(W)for(let e=2;e<=_;e+=1)t.push(P(e).then(K))
else Q.log.forEach(X)
return L(t)}().then(dt)}function rt(t,e,s){s[4]===t&&(N(s[5],e),N(s[6],e))}function ht(t){const s=Number(t.getAttribute("item"))
Q.checks[s]=!Q.checks[s],Z(),V.forEach(e(rt,s,!Q.checks[s]))}function lt(t){t&&t.classList&&t.classList.remove("fshHide")}function ft(t){lt(t[5]),lt(t[6])}function ut(){Q.checks=M.slice(0),ot(),V.forEach(ft)}function pt(t){j(t[5]),j(t[6])}function mt(){Q.checks=O.slice(0),ot(),V.forEach(pt)}function gt(){Q.log=!1,Z(),r("Loading Page 1 ...",F),V=[],W=!0,o("",h("fshInjectHere")),P(1).then(ct)}function bt(t){!function(t){Q=t||Q,Q.checks=Q.checks||M.slice(0)}(t),o(D,a),C=h("fshNewGuildLog"),F=h("fshOutput"),d(C,R([[t=>"INPUT"===t.tagName,ht],[G("fshAll"),ut],[G("fshNone"),mt],[G("rfsh"),gt]])),ot(),$=Number(l("newGuildLogHistoryPages")),_=$,P(1).then(ct)}export default function(){n()||k("fsh_guildLog").then(bt)}
//# sourceMappingURL=newGuildLog-e8da2cc8.js.map
