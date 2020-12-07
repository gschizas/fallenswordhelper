import{aU as t,t as s,aV as e,A as n,B as o,i as a,a1 as r,h as i,aE as c,o as l,D as u,C as d,c as f,c1 as p,U as h,m,u as b,x as g,H as j}from"./calfSystem-ebf4b17d.js"
import{c as C}from"./createInput-31c9c0fc.js"
import{o as $}from"./onlineDot-08128370.js"
import"./currentGuildId-f7450bbe.js"
import"./intValue-e8157483.js"
import"./fshOpen-3e1a5fea.js"
import"./openQuickBuffByName-2e10a304.js"
import"./createUl-9ed188c7.js"
import"./idb-b7d9067e.js"
import"./createButton-b3c6a5bd.js"
import"./createLi-298ce08d.js"
import{h as S}from"./hideElement-f7381055.js"
import"./chunk-c85463de.js"
import"./closest-3bdef2f3.js"
import{c as A}from"./closestTr-24d1e04a.js"
import"./indexAjaxJson-91b10960.js"
import"./cmdExport-6e99c1e8.js"
import{c as w}from"./csvSplit-1d6bbc93.js"
import{g as x}from"./getArrayByClassName-f55d7526.js"
import{g as v}from"./getMembrList-ba3d7d3d.js"
import{d as B,g as G}from"./getGroupStats-83a4a156.js"
import"./groupViewStats-bff0a45d.js"
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
if(w(o(e)).filter(H).length<f.maxGroupSizeToJoin){const e=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(e,t)
!function(t,e){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(s(F,e))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],e)}}function P(){h("groups","joinAllGroupsUnderSize"),u('#pCC a[href*="confirmJoin"]').forEach(O)}function V(){const t=d('#pCC input[value="Join All Available Groups"]')
if(!t)return
const s=t.parentNode
f.enableMaxGroupSizeToJoin&&(S(t),function(t){const s=L(t,`Join All Groups < ${f.maxGroupSizeToJoin} Members`)
l(s,P)}(s)),function(t){const s=L(t,"Fetch Group Stats")
l(s,R)}(s),f.subcmd2===p&&P()}function X(){g()||(v(!1).then(E),function(){const t=j("minGroupLevel")
t&&a(d("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),V(),function(){const t=u("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default X
//# sourceMappingURL=groups-0fced1ee.js.map
