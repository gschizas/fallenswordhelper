import{aV as t,t as s,aW as n,A as e,B as o,i as a,a1 as r,h as i,aE as c,o as l,D as f,C as u,H as d,c as p,c2 as h,U as m,m as b,u as g,x as j}from"./calfSystem-cf4d22a7.js"
import{c as C}from"./createInput-6dbf94aa.js"
import{o as $}from"./onlineDot-d0dbf176.js"
import"./currentGuildId-5763962b.js"
import"./intValue-e4cdd281.js"
import"./fshOpen-a7890139.js"
import"./openQuickBuffByName-905195be.js"
import"./createUl-47f4cf49.js"
import"./idb-4798970d.js"
import"./createButton-28cc4a62.js"
import"./createLi-c2c5249d.js"
import{h as A}from"./hideElement-891c9603.js"
import"./chunk-5f9a7027.js"
import"./closest-c2515a48.js"
import{c as S}from"./closestTr-c0ecc50a.js"
import"./indexAjaxJson-451a313a.js"
import"./cmdExport-b7dc8f76.js"
import{c as w}from"./csvSplit-653f6227.js"
import{g as x}from"./getArrayByClassName-9fa4b21c.js"
import{g as v}from"./getMembrList-5556413d.js"
import{d as B,g as G}from"./getGroupStats-e0fa1db3.js"
import"./groupViewStats-bc1654c0.js"
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
//# sourceMappingURL=groups-436e5bb2.js.map
