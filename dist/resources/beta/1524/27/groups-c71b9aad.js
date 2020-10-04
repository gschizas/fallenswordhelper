import{aV as t,t as s,aW as n,A as e,B as o,i as a,a2 as r,h as i,aF as c,o as l,D as u,C as d,c as f,c2 as p,V as h,m,u as b,x as g,H as j}from"./calfSystem-70c7a660.js"
import{c as C}from"./createInput-1c8df108.js"
import{o as $}from"./onlineDot-0c0af287.js"
import"./currentGuildId-b3e9b6a5.js"
import"./intValue-ef353ded.js"
import"./fshOpen-da9a149e.js"
import"./openQuickBuffByName-caa214c8.js"
import"./createUl-41b45dbb.js"
import"./idb-d93da5f0.js"
import"./createButton-e241a765.js"
import"./createLi-ab74d72c.js"
import{h as S}from"./hideElement-b0b3e820.js"
import"./chunk-001468bc.js"
import"./closest-79b9364e.js"
import{c as A}from"./closestTr-48756f86.js"
import"./indexAjaxJson-4ca9de3e.js"
import"./cmdExport-31b9da33.js"
import{c as w}from"./csvSplit-c9226810.js"
import{g as x}from"./getArrayByClassName-0b280c78.js"
import{g as v}from"./getMembrList-af016afb.js"
import{d as B,g as G}from"./getGroupStats-23687841.js"
import"./groupViewStats-05616b2c.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const s=t.cells[3],n=T.exec(o(s)),e=(new Date).getFullYear()
a(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const n=new Date
return n.setUTCDate(t[2]),n.setUTCMonth(c.indexOf(t[3])),n.setUTCFullYear(s),n.setUTCHours(t[4]),n.setUTCMinutes(t[5]),n}(n,e).toString().substr(0,21)}</span>`)}function J(t,s){return t[s]?t[s].level:0}function M(t,s,n){return J(t,n)-J(t,s)}function y(t,s){return t[s]?`<a href="${r}${t[s].id}">${s}</a>`:s}function U(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,n){const c=n.cells[0]
e(function(t,s){const n=o(s.children[0])
return t[n]?`${$({last_login:t[n].last_login})}&nbsp;<a href="${r}${t[n].id}"><b>${n}</b></a> [${t[n].level}]`:`<b>${n}</b>`}(t,c),c)
const l=n.cells[1],u=function(t,n){const e=w(n.innerHTML)
return e.length>1&&e.sort(s(M,t)),e}(t,l)
!function(t,s){const n=s.filter(U)
n.length>0&&i(t,B(n)),a(t,`<span class="fshXSmall">Members: ${n.length}</span>`)}(c,u),function(t,n,o){const a=o.map(s(y,t))
e(`<span>${a.join(", ")}</span>`,n)}(t,l,u),N(n)}function L(e){t("groups.doGroupPaint"),x("group-action-container").map(t=>A(t)).forEach(s(D,e)),n("groups.doGroupPaint")}function k(t,s){const n=C({className:"custombutton",type:"button",value:s})
return a(t,"&nbsp;"),i(t,n),n}function z(t,s){const n=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
a(e,n)}function E(t){G(t.href).then(s(z,t))}function R(t){t.target.disabled=!0,u('#pCC a[href*="=viewstats&"]').forEach(E)}function H(t){return!t.includes("#000099")}function F(t){e('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function V(t){const n=t.parentNode.parentNode.parentNode.cells[1]
if(w(o(n)).filter(H).length<f.maxGroupSizeToJoin){const n=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(n,t)
!function(t,n){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(s(F,n))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],n)}}function O(){h("groups","joinAllGroupsUnderSize"),u('#pCC a[href*="confirmJoin"]').forEach(V)}function P(){const t=d('#pCC input[value="Join All Available Groups"]'),s=t.parentNode
f.enableMaxGroupSizeToJoin&&(S(t),function(t){const s=k(t,`Join All Groups < ${f.maxGroupSizeToJoin} Members`)
l(s,O)}(s)),function(t){const s=k(t,"Fetch Group Stats")
l(s,R)}(s),f.subcmd2===p&&O()}function X(){g()||(v(!1).then(L),function(){const t=j("minGroupLevel")
t&&a(d("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),P(),function(){const t=u("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default X
//# sourceMappingURL=groups-c71b9aad.js.map
