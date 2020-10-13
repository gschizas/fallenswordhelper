import{aU as t,t as s,aV as n,A as e,B as a,i as o,a1 as r,h as i,aE as c,o as l,D as f,C as u,c as p,c1 as d,U as h,m,u as b,x as g,H as j}from"./calfSystem-964f4fc9.js"
import{c as C}from"./createInput-cbbea5aa.js"
import{o as $}from"./onlineDot-8bb6540e.js"
import"./currentGuildId-26c6bca8.js"
import"./intValue-f4d85578.js"
import"./fshOpen-027ef4bd.js"
import"./openQuickBuffByName-6421c857.js"
import"./createUl-ad078013.js"
import"./idb-be8b4ca8.js"
import"./createButton-342296b6.js"
import"./createLi-8aac306c.js"
import{h as S}from"./hideElement-c14a94c9.js"
import"./chunk-07c9710c.js"
import"./closest-9ef1a6fc.js"
import{c as A}from"./closestTr-e4403fab.js"
import"./indexAjaxJson-0d030f07.js"
import"./cmdExport-f2adfd05.js"
import{c as w}from"./csvSplit-ab694daa.js"
import{g as x}from"./getArrayByClassName-022b52a0.js"
import{g as v}from"./getMembrList-9beba7b7.js"
import{d as B,g as G}from"./getGroupStats-04696f09.js"
import"./groupViewStats-c14e9448.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const s=t.cells[3],n=T.exec(a(s)),e=(new Date).getFullYear()
o(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const n=new Date
return n.setUTCDate(t[2]),n.setUTCMonth(c.indexOf(t[3])),n.setUTCFullYear(s),n.setUTCHours(t[4]),n.setUTCMinutes(t[5]),n}(n,e).toString().substr(0,21)}</span>`)}function U(t,s){return t[s]?t[s].level:0}function J(t,s,n){return U(t,n)-U(t,s)}function M(t,s){return t[s]?`<a href="${r}${t[s].id}">${s}</a>`:s}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,n){const c=n.cells[0]
e(function(t,s){const n=a(s.children[0])
return t[n]?`${$({last_login:t[n].last_login})}&nbsp;<a href="${r}${t[n].id}"><b>${n}</b></a> [${t[n].level}]`:`<b>${n}</b>`}(t,c),c)
const l=n.cells[1],f=function(t,n){const e=w(n.innerHTML)
return e.length>1&&e.sort(s(J,t)),e}(t,l)
!function(t,s){const n=s.filter(y)
n.length>0&&i(t,B(n)),o(t,`<span class="fshXSmall">Members: ${n.length}</span>`)}(c,f),function(t,n,a){const o=a.map(s(M,t))
e(`<span>${o.join(", ")}</span>`,n)}(t,l,f),N(n)}function E(e){t("groups.doGroupPaint"),x("group-action-container").map(t=>A(t)).forEach(s(D,e)),n("groups.doGroupPaint")}function L(t,s){const n=C({className:"custombutton",type:"button",value:s})
return o(t,"&nbsp;"),i(t,n),n}function k(t,s){const n=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
o(e,n)}function z(t){G(t.href).then(s(k,t))}function R(t){t.target.disabled=!0,f('#pCC a[href*="=viewstats&"]').forEach(z)}function H(t){return!t.includes("#000099")}function F(t){e('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function O(t){const n=t.parentNode.parentNode.parentNode.cells[1]
if(w(a(n)).filter(H).length<p.maxGroupSizeToJoin){const n=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(n,t)
!function(t,n){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(s(F,n))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],n)}}function P(){h("groups","joinAllGroupsUnderSize"),f('#pCC a[href*="confirmJoin"]').forEach(O)}function V(){const t=u('#pCC input[value="Join All Available Groups"]'),s=t.parentNode
p.enableMaxGroupSizeToJoin&&(S(t),function(t){const s=L(t,`Join All Groups < ${p.maxGroupSizeToJoin} Members`)
l(s,P)}(s)),function(t){const s=L(t,"Fetch Group Stats")
l(s,R)}(s),p.subcmd2===d&&P()}function X(){g()||(v(!1).then(E),function(){const t=j("minGroupLevel")
t&&o(u("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),V(),function(){const t=f("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default X
//# sourceMappingURL=groups-c166a893.js.map
