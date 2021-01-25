import{c as t}from"./closestTr-51226dd2.js"
import{c as s}from"./csvSplit-a4e91aa0.js"
import{d as e,g as n}from"./getGroupStats-7e9f175e.js"
import{g as o}from"./getArrayByClassName-3eee0c79.js"
import{af as a,t as r,ag as i,A as c,B as f,i as l,a2 as u,h as d,au as p,o as h,D as m,C as b,c as g,bZ as j,V as C,m as $,u as S,x as A,H as w}from"./calfSystem-26bcf570.js"
import{o as x}from"./onlineDot-018fc1c9.js"
import{g as v}from"./getMembrList-d5b53258.js"
import{c as B}from"./createInput-538cc410.js"
import{h as G}from"./hideElement-7c48eb54.js"
import"./closest-331833f9.js"
import"./chunk-b2ca1969.js"
import"./createButton-426dccef.js"
import"./createLi-19fc157a.js"
import"./createUl-720b8c49.js"
import"./openQuickBuffByName-effe4147.js"
import"./fshOpen-56a6fafa.js"
import"./groupViewStats-6aabf859.js"
import"./intValue-da5ad0eb.js"
import"./currentGuildId-b9dbffa6.js"
import"./cmdExport-3b45fb85.js"
import"./indexAjaxJson-4dbe92a4.js"
import"./idb-47b3fdf8.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const s=t.cells[3],e=T.exec(f(s)),n=(new Date).getFullYear()
l(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(p.indexOf(t[3])),e.setUTCFullYear(s),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,n).toString().substr(0,21)}</span>`)}function J(t,s){return t[s]?t[s].level:0}function M(t,s,e){return J(t,e)-J(t,s)}function y(t,s){return t[s]?`<a href="${u}${t[s].id}">${s}</a>`:s}function U(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,n){const o=n.cells[0]
c(function(t,s){const e=f(s.children[0])
return t[e]?`${x({last_login:t[e].last_login})}&nbsp;<a href="${u}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,o),o)
const a=n.cells[1],i=function(t,e){const n=s(e.innerHTML)
return n.length>1&&n.sort(r(M,t)),n}(t,a)
!function(t,s){const n=s.filter(U)
n.length>0&&d(t,e(n)),l(t,`<span class="fshXSmall">Members: ${n.length}</span>`)}(o,i),function(t,s,e){const n=e.map(r(y,t))
c(`<span>${n.join(", ")}</span>`,s)}(t,a,i),N(n)}function L(s){a("groups.doGroupPaint"),o("group-action-container").map((s=>t(s))).forEach(r(D,s)),i("groups.doGroupPaint")}function k(t,s){const e=B({className:"custombutton",type:"button",value:s})
return l(t,"&nbsp;"),d(t,e),e}function z(t,s){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,n=t.parentNode.parentNode.previousElementSibling
l(n,e)}function E(t){n(t.href).then(r(z,t))}function R(t){t.target.disabled=!0,m('#pCC a[href*="=viewstats&"]').forEach(E)}function H(t){return!t.includes("#000099")}function F(t){c('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function O(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(s(f(e)).filter(H).length<g.maxGroupSizeToJoin){const s=$({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(s,t)
!function(t,s){S({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(r(F,s))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],s)}}function P(){C("groups","joinAllGroupsUnderSize"),m('#pCC a[href*="confirmJoin"]').forEach(O)}function V(){const t=b('#pCC input[value="Join All Available Groups"]')
if(!t)return
const s=t.parentNode
g.enableMaxGroupSizeToJoin&&(G(t),function(t){const s=k(t,`Join All Groups < ${g.maxGroupSizeToJoin} Members`)
h(s,P)}(s)),function(t){const s=k(t,"Fetch Group Stats")
h(s,R)}(s),g.subcmd2===j&&P()}function X(){A()||(v(!1).then(L),function(){const t=w("minGroupLevel")
t&&l(b("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),V(),function(){const t=m("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default X
//# sourceMappingURL=groups-0c043678.js.map
