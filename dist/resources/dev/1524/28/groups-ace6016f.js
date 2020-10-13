import{aW as t,t as s,aX as n,A as e,B as o,i as a,a2 as r,h as i,aI as c,o as l,D as f,C as d,c as u,c3 as p,V as h,m,u as b,x as g,H as j}from"./calfSystem-b136673a.js"
import{c as C}from"./createInput-08c848a9.js"
import{o as $}from"./onlineDot-3f2bf154.js"
import"./currentGuildId-4405d1bb.js"
import"./intValue-f4d85578.js"
import"./fshOpen-027ef4bd.js"
import"./openQuickBuffByName-1b8ea02b.js"
import"./createUl-cedddfb2.js"
import"./idb-c31665cb.js"
import"./createButton-f2fbc414.js"
import"./createLi-e3c856b3.js"
import{h as S}from"./hideElement-c14a94c9.js"
import"./chunk-07c9710c.js"
import"./closest-9ef1a6fc.js"
import{c as A}from"./closestTr-ea8b5479.js"
import"./indexAjaxJson-ea0d9bb9.js"
import"./cmdExport-bd5eafa5.js"
import{c as w}from"./csvSplit-ab694daa.js"
import{g as x}from"./getArrayByClassName-d5f86271.js"
import{g as v}from"./getMembrList-aed8efd6.js"
import{d as B,g as G}from"./getGroupStats-bab517d9.js"
import"./groupViewStats-f032a99d.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const s=t.cells[3],n=T.exec(o(s)),e=(new Date).getFullYear()
a(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const n=new Date
return n.setUTCDate(t[2]),n.setUTCMonth(c.indexOf(t[3])),n.setUTCFullYear(s),n.setUTCHours(t[4]),n.setUTCMinutes(t[5]),n}(n,e).toString().substr(0,21)}</span>`)}function J(t,s){return t[s]?t[s].level:0}function M(t,s,n){return J(t,n)-J(t,s)}function y(t,s){return t[s]?`<a href="${r}${t[s].id}">${s}</a>`:s}function U(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,n){const c=n.cells[0]
e(function(t,s){const n=o(s.children[0])
return t[n]?`${$({last_login:t[n].last_login})}&nbsp;<a href="${r}${t[n].id}"><b>${n}</b></a> [${t[n].level}]`:`<b>${n}</b>`}(t,c),c)
const l=n.cells[1],f=function(t,n){const e=w(n.innerHTML)
return e.length>1&&e.sort(s(M,t)),e}(t,l)
!function(t,s){const n=s.filter(U)
n.length>0&&i(t,B(n)),a(t,`<span class="fshXSmall">Members: ${n.length}</span>`)}(c,f),function(t,n,o){const a=o.map(s(y,t))
e(`<span>${a.join(", ")}</span>`,n)}(t,l,f),N(n)}function L(e){t("groups.doGroupPaint"),x("group-action-container").map(t=>A(t)).forEach(s(D,e)),n("groups.doGroupPaint")}function k(t,s){const n=C({className:"custombutton",type:"button",value:s})
return a(t,"&nbsp;"),i(t,n),n}function z(t,s){const n=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
a(e,n)}function E(t){G(t.href).then(s(z,t))}function R(t){t.target.disabled=!0,f('#pCC a[href*="=viewstats&"]').forEach(E)}function H(t){return!t.includes("#000099")}function X(t){e('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function F(t){const n=t.parentNode.parentNode.parentNode.cells[1]
if(w(o(n)).filter(H).length<u.maxGroupSizeToJoin){const n=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(n,t)
!function(t,n){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(s(X,n))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],n)}}function I(){h("groups","joinAllGroupsUnderSize"),f('#pCC a[href*="confirmJoin"]').forEach(F)}function O(){const t=d('#pCC input[value="Join All Available Groups"]'),s=t.parentNode
u.enableMaxGroupSizeToJoin&&(S(t),function(t){const s=k(t,`Join All Groups < ${u.maxGroupSizeToJoin} Members`)
l(s,I)}(s)),function(t){const s=k(t,"Fetch Group Stats")
l(s,R)}(s),u.subcmd2===p&&I()}function P(){g()||(v(!1).then(L),function(){const t=j("minGroupLevel")
t&&a(d("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),O(),function(){const t=f("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default P
//# sourceMappingURL=groups-ace6016f.js.map
