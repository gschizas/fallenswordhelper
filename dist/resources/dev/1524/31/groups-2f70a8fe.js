import{c as t}from"./closestTr-e70c5c37.js"
import{c as s}from"./csvSplit-aa512e64.js"
import{d as e,g as n}from"./getGroupStats-82205add.js"
import{g as o}from"./getArrayByClassName-1bdcec20.js"
import{af as a,t as r,ag as i,A as c,B as l,i as f,a2 as u,h as d,az as p,o as h,D as m,C as b,c as g,b$ as j,V as C,m as $,u as S,x as A,H as w}from"./calfSystem-393ab895.js"
import{o as x}from"./onlineDot-9b46cf0c.js"
import{g as v}from"./getMembrList-32a78217.js"
import{c as B}from"./createInput-f7e07c00.js"
import{h as G}from"./hideElement-d4551277.js"
import"./closest-77701dcf.js"
import"./chunk-a5250b9a.js"
import"./createButton-3f9a1ed2.js"
import"./createLi-f8ee049c.js"
import"./createUl-7863af9d.js"
import"./openQuickBuffByName-47bff80e.js"
import"./fshOpen-bec182a3.js"
import"./groupViewStats-7e6214e3.js"
import"./intValue-e7ef611d.js"
import"./currentGuildId-469c60c3.js"
import"./cmdExport-ef0399c5.js"
import"./indexAjaxJson-f78a3fe6.js"
import"./idb-46b78b1e.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const s=t.cells[3],e=T.exec(l(s)),n=(new Date).getFullYear()
f(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(p.indexOf(t[3])),e.setUTCFullYear(s),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,n).toString().substr(0,21)}</span>`)}function J(t,s){return t[s]?t[s].level:0}function M(t,s,e){return J(t,e)-J(t,s)}function y(t,s){return t[s]?`<a href="${u}${t[s].id}">${s}</a>`:s}function U(t){return"[none]"!==t&&-1===t.indexOf("<font")}function z(t,n){const o=n.cells[0]
c(function(t,s){const e=l(s.children[0])
return t[e]?`${x({last_login:t[e].last_login})}&nbsp;<a href="${u}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,o),o)
const a=n.cells[1],i=function(t,e){const n=s(e.innerHTML)
return n.length>1&&n.sort(r(M,t)),n}(t,a)
!function(t,s){const n=s.filter(U)
n.length>0&&d(t,e(n)),f(t,`<span class="fshXSmall">Members: ${n.length}</span>`)}(o,i),function(t,s,e){const n=e.map(r(y,t))
c(`<span>${n.join(", ")}</span>`,s)}(t,a,i),N(n)}function D(s){a("groups.doGroupPaint"),o("group-action-container").map((s=>t(s))).forEach(r(z,s)),i("groups.doGroupPaint")}function L(t,s){const e=B({className:"custombutton",type:"button",value:s})
return f(t,"&nbsp;"),d(t,e),e}function k(t,s){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,n=t.parentNode.parentNode.previousElementSibling
f(n,e)}function E(t){n(t.href).then(r(k,t))}function R(t){t.target.disabled=!0,m('#pCC a[href*="=viewstats&"]').forEach(E)}function H(t){return!t.includes("#000099")}function F(t){c('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function O(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(s(l(e)).filter(H).length<g.maxGroupSizeToJoin){const s=$({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(s,t)
!function(t,s){S({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(r(F,s))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],s)}}function P(){C("groups","joinAllGroupsUnderSize"),m('#pCC a[href*="confirmJoin"]').forEach(O)}function V(){const t=b('#pCC input[value="Join All Available Groups"]')
if(!t)return
const s=t.parentNode
g.enableMaxGroupSizeToJoin&&(G(t),function(t){const s=L(t,`Join All Groups < ${g.maxGroupSizeToJoin} Members`)
h(s,P)}(s)),function(t){const s=L(t,"Fetch Group Stats")
h(s,R)}(s),g.subcmd2===j&&P()}function X(){A()||(v(!1).then(D),function(){const t=w("minGroupLevel")
t&&f(b("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),V(),function(){const t=m("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default X
//# sourceMappingURL=groups-2f70a8fe.js.map
