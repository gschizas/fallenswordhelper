import{aV as t,t as s,aW as n,A as e,B as o,i as a,a1 as r,h as i,aE as c,o as l,D as f,C as u,H as d,c as p,c2 as h,U as m,m as b,u as g,x as j}from"./calfSystem-d3aab5a8.js"
import{c as C}from"./createInput-09f522aa.js"
import{o as $}from"./onlineDot-f41c7d87.js"
import"./currentGuildId-b5159547.js"
import"./intValue-65d3c36c.js"
import"./fshOpen-4f280086.js"
import"./openQuickBuffByName-f588663a.js"
import"./createUl-18e14c72.js"
import"./idb-f33380fa.js"
import"./createButton-96063297.js"
import"./createLi-d31a7b70.js"
import{h as A}from"./hideElement-c8e0696f.js"
import"./chunk-a1c62f77.js"
import"./closest-8d8d60b3.js"
import{c as S}from"./closestTr-c1780224.js"
import"./indexAjaxJson-86b35353.js"
import"./cmdExport-806d42e0.js"
import{c as w}from"./csvSplit-8c1a6c7f.js"
import{g as x}from"./getArrayByClassName-c7a1058a.js"
import{g as v}from"./getMembrList-1184b6eb.js"
import{d as B,g as G}from"./getGroupStats-8efd101b.js"
import"./groupViewStats-9ea9390c.js"
const N=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function T(t){const s=t.cells[3],n=N.exec(o(s)),e=(new Date).getFullYear()
a(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const n=new Date
return n.setUTCDate(t[2]),n.setUTCMonth(c.indexOf(t[3])),n.setUTCFullYear(s),n.setUTCHours(t[4]),n.setUTCMinutes(t[5]),n}(n,e).toString().substr(0,21)}</span>`)}function M(t,s){return t[s]?t[s].level:0}function U(t,s,n){return M(t,n)-M(t,s)}function y(t,s){return t[s]?`<a href="${r}${t[s].id}">${s}</a>`:s}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,n){const c=n.cells[0]
e(function(t,s){const n=o(s.children[0])
return t[n]?`${$({last_login:t[n].last_login})}&nbsp;<a href="${r}${t[n].id}"><b>${n}</b></a> [${t[n].level}]`:`<b>${n}</b>`}(t,c),c)
const l=n.cells[1],f=function(t,n){const e=w(n.innerHTML)
return e.length>1&&e.sort(s(U,t)),e}(t,l)
!function(t,s){const n=s.filter(J)
n.length>0&&i(t,B(n)),a(t,`<span class="fshXSmall">Members: ${n.length}</span>`)}(c,f),function(t,n,o){const a=o.map(s(y,t))
e(`<span>${a.join(", ")}</span>`,n)}(t,l,f),T(n)}function E(e){t("groups.doGroupPaint"),x("group-action-container").map(t=>S(t)).forEach(s(D,e)),n("groups.doGroupPaint")}function L(t,s){const n=C({className:"custombutton",type:"button",value:s})
return a(t,"&nbsp;"),i(t,n),n}function k(t,s){const n=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
a(e,n)}function R(t){G(t.href).then(s(k,t))}function z(t){t.target.disabled=!0,f('#pCC a[href*="=viewstats&"]').forEach(R)}let H
function F(t){return!t.includes("#000099")}function O(t){e('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function P(t){const n=t.parentNode.parentNode.parentNode.cells[1]
if(w(o(n)).filter(F).length<H){const n=b({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(n,t)
!function(t,n){g({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(s(O,n))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],n)}}function V(){m("groups","joinAllGroupsUnderSize"),f('#pCC a[href*="confirmJoin"]').forEach(P)}function X(){const t=u('#pCC input[value="Join All Available Groups"]'),s=t.parentNode
d("enableMaxGroupSizeToJoin")&&(H=d("maxGroupSizeToJoin"),A(t),function(t){const s=L(t,`Join All Groups < ${H} Members`)
l(s,V)}(s)),function(t){const s=L(t,"Fetch Group Stats")
l(s,z)}(s),p.subcmd2===h&&V()}function _(){j()||(v(!1).then(E),function(){const t=d("minGroupLevel")
t&&a(u("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),X(),function(){const t=f("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default _
//# sourceMappingURL=groups-302c4c43.js.map
