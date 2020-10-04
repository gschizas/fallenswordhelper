import{aX as t,t as s,aY as e,A as n,B as o,i as a,a3 as r,h as i,aJ as c,o as l,D as u,C as d,c as f,c4 as p,W as h,m,u as b,x as g,H as j}from"./calfSystem-ec5e5725.js"
import{c as C}from"./createInput-a9a25c4d.js"
import{o as $}from"./onlineDot-e6873f1e.js"
import"./currentGuildId-4732beaa.js"
import"./intValue-ef353ded.js"
import"./fshOpen-da9a149e.js"
import"./openQuickBuffByName-9db0dd32.js"
import"./createUl-94da6fbb.js"
import"./idb-cecca562.js"
import"./createButton-142ef647.js"
import"./createLi-3233a571.js"
import{h as S}from"./hideElement-b0b3e820.js"
import"./chunk-001468bc.js"
import"./closest-79b9364e.js"
import{c as A}from"./closestTr-039240ce.js"
import"./indexAjaxJson-b7f888c6.js"
import"./cmdExport-2a00007a.js"
import{c as w}from"./csvSplit-c9226810.js"
import{g as x}from"./getArrayByClassName-bb31bc41.js"
import{g as v}from"./getMembrList-1882a728.js"
import{d as B,g as G}from"./getGroupStats-46cc7ba4.js"
import"./groupViewStats-8aca1ce7.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const s=t.cells[3],e=T.exec(o(s)),n=(new Date).getFullYear()
a(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(c.indexOf(t[3])),e.setUTCFullYear(s),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,n).toString().substr(0,21)}</span>`)}function J(t,s){return t[s]?t[s].level:0}function M(t,s,e){return J(t,e)-J(t,s)}function y(t,s){return t[s]?`<a href="${r}${t[s].id}">${s}</a>`:s}function U(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,e){const c=e.cells[0]
n(function(t,s){const e=o(s.children[0])
return t[e]?`${$({last_login:t[e].last_login})}&nbsp;<a href="${r}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,c),c)
const l=e.cells[1],u=function(t,e){const n=w(e.innerHTML)
return n.length>1&&n.sort(s(M,t)),n}(t,l)
!function(t,s){const e=s.filter(U)
e.length>0&&i(t,B(e)),a(t,`<span class="fshXSmall">Members: ${e.length}</span>`)}(c,u),function(t,e,o){const a=o.map(s(y,t))
n(`<span>${a.join(", ")}</span>`,e)}(t,l,u),N(e)}function L(n){t("groups.doGroupPaint"),x("group-action-container").map(t=>A(t)).forEach(s(D,n)),e("groups.doGroupPaint")}function k(t,s){const e=C({className:"custombutton",type:"button",value:s})
return a(t,"&nbsp;"),i(t,e),e}function z(t,s){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,n=t.parentNode.parentNode.previousElementSibling
a(n,e)}function E(t){G(t.href).then(s(z,t))}function R(t){t.target.disabled=!0,u('#pCC a[href*="=viewstats&"]').forEach(E)}function H(t){return!t.includes("#000099")}function X(t){n('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function F(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(w(o(e)).filter(H).length<f.maxGroupSizeToJoin){const e=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(e,t)
!function(t,e){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(s(X,e))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],e)}}function O(){h("groups","joinAllGroupsUnderSize"),u('#pCC a[href*="confirmJoin"]').forEach(F)}function P(){const t=d('#pCC input[value="Join All Available Groups"]'),s=t.parentNode
f.enableMaxGroupSizeToJoin&&(S(t),function(t){const s=k(t,`Join All Groups < ${f.maxGroupSizeToJoin} Members`)
l(s,O)}(s)),function(t){const s=k(t,"Fetch Group Stats")
l(s,R)}(s),f.subcmd2===p&&O()}function Y(){g()||(v(!1).then(L),function(){const t=j("minGroupLevel")
t&&a(d("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),P(),function(){const t=u("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default Y
//# sourceMappingURL=groups-9d192220.js.map
