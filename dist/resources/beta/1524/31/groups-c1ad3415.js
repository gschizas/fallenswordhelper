import{c as t}from"./closestTr-d8faa348.js"
import{c as s}from"./csvSplit-aa512e64.js"
import{d as e,g as n}from"./getGroupStats-23812a19.js"
import{g as a}from"./getArrayByClassName-2a13cfae.js"
import{ae as o,t as r,af as i,A as c,B as l,i as f,a1 as u,h as d,at as p,o as h,D as m,C as b,c as g,bY as j,U as C,m as $,u as S,x as A,H as w}from"./calfSystem-47fc08ae.js"
import{o as x}from"./onlineDot-b5276d0b.js"
import{g as v}from"./getMembrList-55873124.js"
import{c as B}from"./createInput-e0371f2c.js"
import{h as G}from"./hideElement-d4551277.js"
import"./closest-77701dcf.js"
import"./chunk-a5250b9a.js"
import"./createButton-ee808427.js"
import"./createLi-582e821e.js"
import"./createUl-9aef984f.js"
import"./openQuickBuffByName-af8be47a.js"
import"./fshOpen-bec182a3.js"
import"./groupViewStats-e633cd97.js"
import"./intValue-e7ef611d.js"
import"./currentGuildId-72bd2a1a.js"
import"./cmdExport-ca6a6b3e.js"
import"./indexAjaxJson-be24760c.js"
import"./idb-b72d80f0.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const s=t.cells[3],e=T.exec(l(s)),n=(new Date).getFullYear()
f(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(p.indexOf(t[3])),e.setUTCFullYear(s),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,n).toString().substr(0,21)}</span>`)}function J(t,s){return t[s]?t[s].level:0}function M(t,s,e){return J(t,e)-J(t,s)}function U(t,s){return t[s]?`<a href="${u}${t[s].id}">${s}</a>`:s}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,n){const a=n.cells[0]
c(function(t,s){const e=l(s.children[0])
return t[e]?`${x({last_login:t[e].last_login})}&nbsp;<a href="${u}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,a),a)
const o=n.cells[1],i=function(t,e){const n=s(e.innerHTML)
return n.length>1&&n.sort(r(M,t)),n}(t,o)
!function(t,s){const n=s.filter(y)
n.length>0&&d(t,e(n)),f(t,`<span class="fshXSmall">Members: ${n.length}</span>`)}(a,i),function(t,s,e){const n=e.map(r(U,t))
c(`<span>${n.join(", ")}</span>`,s)}(t,o,i),N(n)}function L(s){o("groups.doGroupPaint"),a("group-action-container").map((s=>t(s))).forEach(r(D,s)),i("groups.doGroupPaint")}function k(t,s){const e=B({className:"custombutton",type:"button",value:s})
return f(t,"&nbsp;"),d(t,e),e}function z(t,s){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,n=t.parentNode.parentNode.previousElementSibling
f(n,e)}function E(t){n(t.href).then(r(z,t))}function R(t){t.target.disabled=!0,m('#pCC a[href*="=viewstats&"]').forEach(E)}function H(t){return!t.includes("#000099")}function F(t){c('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function O(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(s(l(e)).filter(H).length<g.maxGroupSizeToJoin){const s=$({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(s,t)
!function(t,s){S({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(r(F,s))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],s)}}function P(){C("groups","joinAllGroupsUnderSize"),m('#pCC a[href*="confirmJoin"]').forEach(O)}function X(){const t=b('#pCC input[value="Join All Available Groups"]')
if(!t)return
const s=t.parentNode
g.enableMaxGroupSizeToJoin&&(G(t),function(t){const s=k(t,`Join All Groups < ${g.maxGroupSizeToJoin} Members`)
h(s,P)}(s)),function(t){const s=k(t,"Fetch Group Stats")
h(s,R)}(s),g.subcmd2===j&&P()}function Y(){A()||(v(!1).then(L),function(){const t=w("minGroupLevel")
t&&f(b("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),X(),function(){const t=m("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default Y
//# sourceMappingURL=groups-c1ad3415.js.map
