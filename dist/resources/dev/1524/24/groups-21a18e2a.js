import{aX as t,t as s,aY as e,A as n,B as o,i as a,a2 as r,h as i,aI as c,o as l,D as d,C as f,H as u,c as p,c4 as h,V as m,m as b,u as g,x as j}from"./calfSystem-38898f3e.js"
import{c as C}from"./createInput-c92705dc.js"
import{o as $}from"./onlineDot-e1f61292.js"
import"./currentGuildId-7855dbba.js"
import"./intValue-44683b42.js"
import"./fshOpen-d34bc8a7.js"
import"./openQuickBuffByName-a5e51df0.js"
import"./createUl-ea06d8e3.js"
import"./idb-ccc44752.js"
import"./createButton-ee9aa2e8.js"
import"./createLi-51008dca.js"
import{h as A}from"./hideElement-b044934d.js"
import"./closest-d8e60c46.js"
import{c as S}from"./closestTr-4d04f2f4.js"
import"./indexAjaxJson-2402e0e9.js"
import"./cmdExport-2f232ad1.js"
import{c as w}from"./csvSplit-dcc6dfc9.js"
import{g as x}from"./getArrayByClassName-25f769e2.js"
import{g as v}from"./getMembrList-822d0963.js"
import{d as B,g as G}from"./getGroupStats-1e098fea.js"
import"./groupViewStats-f7412e33.js"
const N=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function T(t){const s=t.cells[3],e=N.exec(o(s)),n=(new Date).getFullYear()
a(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(c.indexOf(t[3])),e.setUTCFullYear(s),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,n).toString().substr(0,21)}</span>`)}function M(t,s){return t[s]?t[s].level:0}function y(t,s,e){return M(t,e)-M(t,s)}function J(t,s){return t[s]?`<a href="${r}${t[s].id}">${s}</a>`:s}function U(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,e){const c=e.cells[0]
n(function(t,s){const e=o(s.children[0])
return t[e]?`${$({last_login:t[e].last_login})}&nbsp;<a href="${r}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,c),c)
const l=e.cells[1],d=function(t,e){const n=w(e.innerHTML)
return n.length>1&&n.sort(s(y,t)),n}(t,l)
!function(t,s){const e=s.filter(U)
e.length>0&&i(t,B(e)),a(t,`<span class="fshXSmall">Members: ${e.length}</span>`)}(c,d),function(t,e,o){const a=o.map(s(J,t))
n(`<span>${a.join(", ")}</span>`,e)}(t,l,d),T(e)}function L(n){t("groups.doGroupPaint"),x("group-action-container").map(t=>S(t)).forEach(s(D,n)),e("groups.doGroupPaint")}function E(t,s){const e=C({className:"custombutton",type:"button",value:s})
return a(t,"&nbsp;"),i(t,e),e}function R(t,s){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,n=t.parentNode.parentNode.previousElementSibling
a(n,e)}function k(t){G(t.href).then(s(R,t))}function z(t){t.target.disabled=!0,d('#pCC a[href*="=viewstats&"]').forEach(k)}let H
function X(t){return!t.includes("#000099")}function F(t){n('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function I(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(w(o(e)).filter(X).length<H){const e=b({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(e,t)
!function(t,e){g({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(s(F,e))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],e)}}function O(){m("groups","joinAllGroupsUnderSize"),d('#pCC a[href*="confirmJoin"]').forEach(I)}function P(){const t=f('#pCC input[value="Join All Available Groups"]'),s=t.parentNode
u("enableMaxGroupSizeToJoin")&&(H=u("maxGroupSizeToJoin"),A(t),function(t){const s=E(t,`Join All Groups < ${H} Members`)
l(s,O)}(s)),function(t){const s=E(t,"Fetch Group Stats")
l(s,z)}(s),p.subcmd2===h&&O()}function V(){j()||(v(!1).then(L),function(){const t=u("minGroupLevel")
t&&a(f("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),P(),function(){const t=d("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default V
//# sourceMappingURL=groups-21a18e2a.js.map
