import{t,A as s,B as e,i as n,a1 as a,h as o,aE as r,o as i,D as c,C as l,H as f,c as u,bZ as d,U as p,m as h,u as m,x as b}from"./calfSystem-a5fc99d4.js"
import{c as g}from"./createInput-2b13b662.js"
import{o as j}from"./onlineDot-0c100c3d.js"
import"./currentGuildId-c73fd152.js"
import"./intValue-e4cdd281.js"
import"./fshOpen-a7890139.js"
import"./openQuickBuffByName-58a2f3ec.js"
import"./createUl-f5b6cede.js"
import"./idb-b13ab254.js"
import"./createButton-5993a089.js"
import"./createLi-a116a945.js"
import{h as C}from"./hideElement-891c9603.js"
import"./chunk-5f9a7027.js"
import"./closest-c2515a48.js"
import{c as $}from"./closestTr-a52072b1.js"
import"./indexAjaxJson-a651394e.js"
import"./cmdExport-a361aa41.js"
import{c as A}from"./csvSplit-653f6227.js"
import{g as S}from"./getArrayByClassName-7db9f7c4.js"
import{g as w}from"./getMembrList-8c336a6e.js"
import{d as x,g as v}from"./getGroupStats-be6b0476.js"
import"./groupViewStats-e7f47cf7.js"
const B=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const s=t.cells[3],a=B.exec(e(s)),o=(new Date).getFullYear()
n(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(r.indexOf(t[3])),e.setUTCFullYear(s),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(a,o).toString().substr(0,21)}</span>`)}function T(t,s){return t[s]?t[s].level:0}function G(t,s,e){return T(t,e)-T(t,s)}function M(t,s){return t[s]?`<a href="${a}${t[s].id}">${s}</a>`:s}function U(t){return"[none]"!==t&&-1===t.indexOf("<font")}function y(r,i){const c=i.cells[0]
s(function(t,s){const n=e(s.children[0])
return t[n]?`${j({last_login:t[n].last_login})}&nbsp;<a href="${a}${t[n].id}"><b>${n}</b></a> [${t[n].level}]`:`<b>${n}</b>`}(r,c),c)
const l=i.cells[1],f=function(s,e){const n=A(e.innerHTML)
return n.length>1&&n.sort(t(G,s)),n}(r,l)
!function(t,s){const e=s.filter(U)
e.length>0&&o(t,x(e)),n(t,`<span class="fshXSmall">Members: ${e.length}</span>`)}(c,f),function(e,n,a){const o=a.map(t(M,e))
s(`<span>${o.join(", ")}</span>`,n)}(r,l,f),N(i)}function J(s){S("group-action-container").map(t=>$(t)).forEach(t(y,s))}function D(t,s){const e=g({className:"custombutton",type:"button",value:s})
return n(t,"&nbsp;"),o(t,e),e}function E(t,s){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,a=t.parentNode.parentNode.previousElementSibling
n(a,e)}function L(s){v(s.href).then(t(E,s))}function k(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(L)}let R
function z(t){return!t.includes("#000099")}function H(t){s('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function F(s){const n=s.parentNode.parentNode.parentNode.cells[1]
if(A(e(n)).filter(z).length<R){const e=h({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
s.parentNode.replaceChild(e,s)
!function(s,e){m({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:s}).then(t(H,e))}(/confirmJoin\((\d+)\)/.exec(s.href)[1],e)}}function O(){p("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(F)}function X(){const t=l('#pCC input[value="Join All Available Groups"]'),s=t.parentNode
f("enableMaxGroupSizeToJoin")&&(R=f("maxGroupSizeToJoin"),C(t),function(t){const s=D(t,`Join All Groups < ${R} Members`)
i(s,O)}(s)),function(t){const s=D(t,"Fetch Group Stats")
i(s,k)}(s),u.subcmd2===d&&O()}function Z(){b()||(w(!1).then(J),function(){const t=f("minGroupLevel")
t&&n(l("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),X(),function(){const t=c("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default Z
//# sourceMappingURL=groups-548ec0e9.js.map
