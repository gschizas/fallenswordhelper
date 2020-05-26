import{t,s as e,bv as s,b7 as n,w as i,a5 as a,z as o,p as d,o as c,g as r,y as h,x as l,D as f,a7 as u,u as p,M as m,A as g,F as b,i as k,aQ as y}from"./calfSystem-ee582533.js"
import"./playerName-e40f24e0.js"
import"./fshOpen-f1f6c477.js"
import"./openQuickBuffByName-60dde0f6.js"
import"./dataRows-b7cf82e5.js"
import{c as w}from"./createTable-cbb3667c.js"
import{h as j}from"./hideElement-faecef36.js"
import{a as L}from"./all-b94d2d9d.js"
import{e as R}from"./eventHandler5-39a91f1e.js"
import{t as N}from"./toggleForce-3b831976.js"
import{s as v}from"./selfIdIs-2732dbd2.js"
import{p as G}from"./parseDateAsTimestamp-aa2b0443.js"
import{f as x}from"./functionPasses-b1aaa5dd.js"
import{a as T}from"./addLogColoring-f78f39be.js"
import"./searchPlayerHref-fbfb4c1a.js"
import{a as H}from"./addGuildLogWidgets-e5e619b6.js"
function P(e){return t({cmd:"guild",subcmd:"log",page:e})}const I=[[],["(Potion)"],["recalled the item","took the item","auto-returned the","stored the item"],["has added flags to","has removed flags to"],["relic. This relic now has an empower level of","relic. The relic empower level has been reset to zero.","failed to capture the relic","captured the relic","captured your relic","has captured the undefended relic","attempted to capture your relic",/ empowered the .+ relic/,/ removed the empowerment from the .+ relic/],["disbanded a mercenary.","hired the mercenary"],["has disbanded one of their groups",/A group from your guild was (.*) in combat./],[/deposited ([,0-9]+) gold into the guild bank/,/deposited ([,0-9]+) FallenSword Points into the guild./],["has added a new rank entitled","has deleted the rank","has requested to join the guild","has invited the player","has officially joined the guild","has been kicked from the guild by","has left the guild","has been assigned the rank","has added/updated a rank entitled"],[/resulted in (.*) with a final score of/,"resulted in a draw. Your GvG rating ","has just initiated a conflict with the guild","has initiated a conflict with your guild","is participating in the conflict against the guild"],["bought the Titan Reward item","from your guild's contribution to the defeat of the titan","a 7 day cooldown has been activated on your guild for this titan"]]
function A(t,e){return s(e)?t.includes(e):e.test(t)}function S(t,s){return s.some(e(A,t))}function E(t){const s=I.findIndex(e(S,t))
return-1===s?0:s}const D=`<table id="fshNewGuildLog" class="fshInvFilter"><thead><tr><th colspan="11"><b>Guild Log Version 4</b></th><th colspan="3"><span id="rfsh" class="sendLink">Reset</span> <a href="${n}" class="sendLink">Old Guild Log</a></th></tr></thead><tbody><tr><td rowspan="3"><b>&nbsp;Filters:</b></td><td class="fshRight">&nbsp;Potions:</td><td><input id="fshPotion" type="checkbox" item="1"/></td><td class="fshRight">&nbsp;Store/Recalls:</td><td><input id="fshStore" type="checkbox" item="2"/></td><td class="fshRight">&nbsp;Relics:</td><td><input id="fshRelic" type="checkbox" item="4"/></td><td class="fshRight">&nbsp;Mercenaries:</td><td><input id="fshMerc" type="checkbox" item="5"/></td><td class="fshRight">&nbsp;Group Combats:</td><td><input id="fshGroup" type="checkbox" item="6"/></td><td colspan="3">&nbsp;</td></tr><tr><td class="fshRight">&nbsp;Donations:</td><td><input id="fshDonation" type="checkbox" item="7"/></td><td class="fshRight">&nbsp;Rankings:</td><td><input id="fshRank" type="checkbox" item="8"/></td><td class="fshRight">&nbsp;GvGs:</td><td><input id="fshGvG" type="checkbox" item="9"/></td><td class="fshRight">&nbsp;Tag/UnTags:</td><td><input id="fshTag" type="checkbox" item="3"/></td><td class="fshRight">&nbsp;Titans:</td><td><input id="fshTitan" type="checkbox" item="10"/></td><td class="fshRight">&nbsp;Other:</td><td><input id="fshOther" type="checkbox" item="0"/></td><td>&nbsp;</td></tr><tr><td colspan="2">&nbsp;[<span id="fshAll" class="fshLink">Select All</span>]</td><td colspan="2">&nbsp;[<span id="fshNone" class="fshLink">Select None</span>]</td><td colspan="9"></td></tr><tr><td id="fshOutput" class="fshBlue" colspan="14">Loading Page 1 ...</td></tr></tbody></table><table id="fshInjectHere"></table>`,M=[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],O=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1]
let C,F,$,_,B,z,Q,U,q={},V=[],W=!0
function Y(t,e){return[()=>1===z,()=>q.log,()=>q.log[0],()=>q.log[0][0],()=>t===q.log[0][0],()=>e===q.log[0][2]].every(x)}function J(){const t=b("width_full",B)
1===t.length&&function(t){const e=t[0],s=e.rows.length-1
for(let t=1;t<s;t+=2){const s=e.rows[t],n=y(s.cells[1]),i=G(n),a=s.cells[2].innerHTML
if(Y(i,a)){W=!1
break}V.push([100*z+t,i,n,a,E(a)])}}(t)}function K(t){!function(t){B=p(t)
const e=m('input[name="page"]',B)
e&&(z=Number(e.value),Q=Number(/\d+/.exec(g(e.parentNode))[0]),1===z&&(_=Math.min(Q,$)),h(`Loading ${z} of ${_}...`,F))}(t),J()}function X(t){V.push([0].concat(t))}function Z(){u("fsh_guildLog",q)}function tt(t,e){return e[1]!==t}function et(t){return t.slice(1,5)}function st(t,e){const s=t.insertCell(-1)
o(e,s),s.className="row"}function nt(t){!function(t){const e=U.insertRow(-1)
t.push(e),q.checks[t[4]]||(e.className="fshHide"),st(e,'<span class="newGuildLog"></span>'),st(e,`<nobr>${t[2]}</nobr>`),st(e,t[3])}(t),function(t){const e=U.insertRow(-1)
t.push(e),q.checks[t[4]]||(e.className="fshHide")
const s=e.insertCell(-1)
s.className="divider",s.colSpan=3}(t)}function it(t){t.checked=q.checks[t.getAttribute("item")]}function at(){r("input",C).forEach(it),Z()}function ot(t,e){return t[0]-e[0]}function dt(){W&&V.sort(ot),h("Loading complete.",F),q.log=V.filter(e(tt,(new Date).setSeconds(0,0))).map(et),Z(),function(){U=w({id:"fshInjectHere",className:"width_full"}),k(U,'<tbody><tr><td class="header" width="16">&nbsp;</td><td class="header" width="20%">Date</td><td class="header" width="80%">Message</td></tr></tbody>'),V.forEach(nt)
const t=l("fshInjectHere")
d.replaceChild(U,t),T("myGuildLog",1),H()}()}function ct(t){K(t),function(){const t=[]
if(W)for(let e=2;e<=_;e+=1)t.push(P(e).then(K))
else q.log.forEach(X)
return L(t)}().then(dt)}function rt(t,e,s){s[4]===t&&(N(s[5],e),N(s[6],e))}function ht(t){const s=Number(t.getAttribute("item"))
q.checks[s]=!q.checks[s],Z(),V.forEach(e(rt,s,!q.checks[s]))}function lt(t){t&&t.classList&&t.classList.remove("fshHide")}function ft(t){lt(t[5]),lt(t[6])}function ut(){q.checks=M.slice(0),at(),V.forEach(ft)}function pt(t){j(t[5]),j(t[6])}function mt(){q.checks=O.slice(0),at(),V.forEach(pt)}function gt(){q.log=!1,Z(),h("Loading Page 1 ...",F),V=[],W=!0,o("",l("fshInjectHere")),P(1).then(ct)}function bt(t){!function(t){q=t||q,q.checks=q.checks||M.slice(0)}(t),o(D,d),C=l("fshNewGuildLog"),F=l("fshOutput"),c(C,R([[t=>"INPUT"===t.tagName,ht],[v("fshAll"),ut],[v("fshNone"),mt],[v("rfsh"),gt]])),at(),$=Number(f("newGuildLogHistoryPages")),_=$,P(1).then(ct)}export default function(){i()||a("fsh_guildLog").then(bt)}
//# sourceMappingURL=newGuildLog-ee279762.js.map
