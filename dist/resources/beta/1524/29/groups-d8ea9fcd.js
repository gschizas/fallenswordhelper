import{aU as t,t as s,aV as e,A as n,B as o,i as a,a1 as r,h as i,aE as c,o as l,D as u,C as f,c as d,c1 as p,U as h,m,u as b,x as g,H as j}from"./calfSystem-f9a27018.js"
import{c as C}from"./createInput-491c2556.js"
import{o as $}from"./onlineDot-cd4bee30.js"
import"./currentGuildId-a542fdb9.js"
import"./intValue-f94761c7.js"
import"./fshOpen-71b2b356.js"
import"./openQuickBuffByName-77bb54c1.js"
import"./createUl-2a797db3.js"
import"./idb-5c501cd3.js"
import"./createButton-a301619e.js"
import"./createLi-543957e6.js"
import{h as S}from"./hideElement-a8c1e8d6.js"
import"./chunk-a86d7cea.js"
import"./closest-14c30e26.js"
import{c as A}from"./closestTr-0d6f3b27.js"
import"./indexAjaxJson-e32f2264.js"
import"./cmdExport-c40c0dde.js"
import{c as w}from"./csvSplit-b214d56b.js"
import{g as x}from"./getArrayByClassName-b5f38e7c.js"
import{g as v}from"./getMembrList-2275ea18.js"
import{d as B,g as G}from"./getGroupStats-9cf81ce4.js"
import"./groupViewStats-e79ccf6f.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const s=t.cells[3],e=T.exec(o(s)),n=(new Date).getFullYear()
a(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(c.indexOf(t[3])),e.setUTCFullYear(s),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,n).toString().substr(0,21)}</span>`)}function U(t,s){return t[s]?t[s].level:0}function J(t,s,e){return U(t,e)-U(t,s)}function M(t,s){return t[s]?`<a href="${r}${t[s].id}">${s}</a>`:s}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,e){const c=e.cells[0]
n(function(t,s){const e=o(s.children[0])
return t[e]?`${$({last_login:t[e].last_login})}&nbsp;<a href="${r}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,c),c)
const l=e.cells[1],u=function(t,e){const n=w(e.innerHTML)
return n.length>1&&n.sort(s(J,t)),n}(t,l)
!function(t,s){const e=s.filter(y)
e.length>0&&i(t,B(e)),a(t,`<span class="fshXSmall">Members: ${e.length}</span>`)}(c,u),function(t,e,o){const a=o.map(s(M,t))
n(`<span>${a.join(", ")}</span>`,e)}(t,l,u),N(e)}function E(n){t("groups.doGroupPaint"),x("group-action-container").map(t=>A(t)).forEach(s(D,n)),e("groups.doGroupPaint")}function L(t,s){const e=C({className:"custombutton",type:"button",value:s})
return a(t,"&nbsp;"),i(t,e),e}function k(t,s){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,n=t.parentNode.parentNode.previousElementSibling
a(n,e)}function z(t){G(t.href).then(s(k,t))}function R(t){t.target.disabled=!0,u('#pCC a[href*="=viewstats&"]').forEach(z)}function H(t){return!t.includes("#000099")}function F(t){n('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function O(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(w(o(e)).filter(H).length<d.maxGroupSizeToJoin){const e=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(e,t)
!function(t,e){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(s(F,e))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],e)}}function P(){h("groups","joinAllGroupsUnderSize"),u('#pCC a[href*="confirmJoin"]').forEach(O)}function V(){const t=f('#pCC input[value="Join All Available Groups"]')
if(!t)return
const s=t.parentNode
d.enableMaxGroupSizeToJoin&&(S(t),function(t){const s=L(t,`Join All Groups < ${d.maxGroupSizeToJoin} Members`)
l(s,P)}(s)),function(t){const s=L(t,"Fetch Group Stats")
l(s,R)}(s),d.subcmd2===p&&P()}function X(){g()||(v(!1).then(E),function(){const t=j("minGroupLevel")
t&&a(f("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),V(),function(){const t=u("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default X
//# sourceMappingURL=groups-d8ea9fcd.js.map
