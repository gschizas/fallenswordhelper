import{t,A as s,B as e,i as n,a1 as o,h as a,aE as r,o as i,D as c,C as l,H as d,c as f,bZ as u,U as p,m as h,u as m,x as b}from"./calfSystem-71b9378d.js"
import{c as g}from"./createInput-1eba672c.js"
import{o as j}from"./onlineDot-4f9ab5c3.js"
import"./currentGuildId-58e8f97e.js"
import"./intValue-65d3c36c.js"
import"./fshOpen-4f280086.js"
import"./openQuickBuffByName-3c146954.js"
import"./createUl-9605d03d.js"
import"./idb-97e2a44e.js"
import"./createButton-5da07973.js"
import"./createLi-7deaae00.js"
import{h as C}from"./hideElement-c8e0696f.js"
import"./chunk-a1c62f77.js"
import"./closest-8d8d60b3.js"
import{c as $}from"./closestTr-966a5985.js"
import"./indexAjaxJson-fd3c427d.js"
import"./cmdExport-0ed34c6b.js"
import{c as A}from"./csvSplit-8c1a6c7f.js"
import{g as S}from"./getArrayByClassName-0b903c97.js"
import{g as w}from"./getMembrList-9dd14d07.js"
import{d as x,g as v}from"./getGroupStats-65027d2f.js"
import"./groupViewStats-10253c5a.js"
const B=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const s=t.cells[3],o=B.exec(e(s)),a=(new Date).getFullYear()
n(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(r.indexOf(t[3])),e.setUTCFullYear(s),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(o,a).toString().substr(0,21)}</span>`)}function T(t,s){return t[s]?t[s].level:0}function G(t,s,e){return T(t,e)-T(t,s)}function M(t,s){return t[s]?`<a href="${o}${t[s].id}">${s}</a>`:s}function U(t){return"[none]"!==t&&-1===t.indexOf("<font")}function y(r,i){const c=i.cells[0]
s(function(t,s){const n=e(s.children[0])
return t[n]?`${j({last_login:t[n].last_login})}&nbsp;<a href="${o}${t[n].id}"><b>${n}</b></a> [${t[n].level}]`:`<b>${n}</b>`}(r,c),c)
const l=i.cells[1],d=function(s,e){const n=A(e.innerHTML)
return n.length>1&&n.sort(t(G,s)),n}(r,l)
!function(t,s){const e=s.filter(U)
e.length>0&&a(t,x(e)),n(t,`<span class="fshXSmall">Members: ${e.length}</span>`)}(c,d),function(e,n,o){const a=o.map(t(M,e))
s(`<span>${a.join(", ")}</span>`,n)}(r,l,d),N(i)}function J(s){S("group-action-container").map(t=>$(t)).forEach(t(y,s))}function D(t,s){const e=g({className:"custombutton",type:"button",value:s})
return n(t,"&nbsp;"),a(t,e),e}function E(t,s){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,o=t.parentNode.parentNode.previousElementSibling
n(o,e)}function L(s){v(s.href).then(t(E,s))}function k(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(L)}let R
function z(t){return!t.includes("#000099")}function H(t){s('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function F(s){const n=s.parentNode.parentNode.parentNode.cells[1]
if(A(e(n)).filter(z).length<R){const e=h({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
s.parentNode.replaceChild(e,s)
!function(s,e){m({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:s}).then(t(H,e))}(/confirmJoin\((\d+)\)/.exec(s.href)[1],e)}}function O(){p("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(F)}function X(){const t=l('#pCC input[value="Join All Available Groups"]'),s=t.parentNode
d("enableMaxGroupSizeToJoin")&&(R=d("maxGroupSizeToJoin"),C(t),function(t){const s=D(t,`Join All Groups < ${R} Members`)
i(s,O)}(s)),function(t){const s=D(t,"Fetch Group Stats")
i(s,k)}(s),f.subcmd2===u&&O()}function Z(){b()||(w(!1).then(J),function(){const t=d("minGroupLevel")
t&&n(l("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),X(),function(){const t=c("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default Z
//# sourceMappingURL=groups-af481664.js.map
