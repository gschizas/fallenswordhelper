import{aV as t,t as s,aW as n,A as e,B as o,i as a,a1 as r,h as i,aE as c,o as l,D as d,C as u,H as f,c as p,c2 as h,U as m,m as b,u as g,x as j}from"./calfSystem-019a589c.js"
import{c as C}from"./createInput-62d3b51a.js"
import{o as $}from"./onlineDot-78d506d7.js"
import"./currentGuildId-29e13ecc.js"
import"./intValue-44683b42.js"
import"./fshOpen-d34bc8a7.js"
import"./openQuickBuffByName-d09d5fd8.js"
import"./createUl-5b761c85.js"
import"./idb-6718e849.js"
import"./createButton-c1ed8050.js"
import"./createLi-99cf3233.js"
import{h as A}from"./hideElement-b044934d.js"
import"./closest-d8e60c46.js"
import{c as S}from"./closestTr-39693be5.js"
import"./indexAjaxJson-424248bd.js"
import"./cmdExport-d38d7643.js"
import{c as w}from"./csvSplit-dcc6dfc9.js"
import{g as x}from"./getArrayByClassName-6c7f9574.js"
import{g as v}from"./getMembrList-8536c1e4.js"
import{d as B,g as G}from"./getGroupStats-034a6481.js"
import"./groupViewStats-59bf9020.js"
const N=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function T(t){const s=t.cells[3],n=N.exec(o(s)),e=(new Date).getFullYear()
a(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const n=new Date
return n.setUTCDate(t[2]),n.setUTCMonth(c.indexOf(t[3])),n.setUTCFullYear(s),n.setUTCHours(t[4]),n.setUTCMinutes(t[5]),n}(n,e).toString().substr(0,21)}</span>`)}function M(t,s){return t[s]?t[s].level:0}function U(t,s,n){return M(t,n)-M(t,s)}function y(t,s){return t[s]?`<a href="${r}${t[s].id}">${s}</a>`:s}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,n){const c=n.cells[0]
e(function(t,s){const n=o(s.children[0])
return t[n]?`${$({last_login:t[n].last_login})}&nbsp;<a href="${r}${t[n].id}"><b>${n}</b></a> [${t[n].level}]`:`<b>${n}</b>`}(t,c),c)
const l=n.cells[1],d=function(t,n){const e=w(n.innerHTML)
return e.length>1&&e.sort(s(U,t)),e}(t,l)
!function(t,s){const n=s.filter(J)
n.length>0&&i(t,B(n)),a(t,`<span class="fshXSmall">Members: ${n.length}</span>`)}(c,d),function(t,n,o){const a=o.map(s(y,t))
e(`<span>${a.join(", ")}</span>`,n)}(t,l,d),T(n)}function E(e){t("groups.doGroupPaint"),x("group-action-container").map(t=>S(t)).forEach(s(D,e)),n("groups.doGroupPaint")}function L(t,s){const n=C({className:"custombutton",type:"button",value:s})
return a(t,"&nbsp;"),i(t,n),n}function R(t,s){const n=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
a(e,n)}function k(t){G(t.href).then(s(R,t))}function z(t){t.target.disabled=!0,d('#pCC a[href*="=viewstats&"]').forEach(k)}let H
function F(t){return!t.includes("#000099")}function O(t){e('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function P(t){const n=t.parentNode.parentNode.parentNode.cells[1]
if(w(o(n)).filter(F).length<H){const n=b({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(n,t)
!function(t,n){g({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(s(O,n))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],n)}}function V(){m("groups","joinAllGroupsUnderSize"),d('#pCC a[href*="confirmJoin"]').forEach(P)}function X(){const t=u('#pCC input[value="Join All Available Groups"]'),s=t.parentNode
f("enableMaxGroupSizeToJoin")&&(H=f("maxGroupSizeToJoin"),A(t),function(t){const s=L(t,`Join All Groups < ${H} Members`)
l(s,V)}(s)),function(t){const s=L(t,"Fetch Group Stats")
l(s,z)}(s),p.subcmd2===h&&V()}function _(){j()||(v(!1).then(E),function(){const t=f("minGroupLevel")
t&&a(u("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),X(),function(){const t=d("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default _
//# sourceMappingURL=groups-8dd86cd8.js.map
