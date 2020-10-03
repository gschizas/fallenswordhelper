import{aX as t,t as s,aY as n,A as e,B as o,i as a,a2 as r,h as i,aI as c,o as l,D as f,C as u,H as p,c as d,c4 as h,V as m,m as b,u as g,x as j}from"./calfSystem-4991bf5b.js"
import{c as C}from"./createInput-befbd592.js"
import{o as $}from"./onlineDot-7a595667.js"
import"./currentGuildId-56c2c861.js"
import"./intValue-e4cdd281.js"
import"./fshOpen-a7890139.js"
import"./openQuickBuffByName-94fca028.js"
import"./createUl-f7da9962.js"
import"./idb-ee31c042.js"
import"./createButton-48f285a2.js"
import"./createLi-674aae30.js"
import{h as A}from"./hideElement-891c9603.js"
import"./chunk-5f9a7027.js"
import"./closest-c2515a48.js"
import{c as S}from"./closestTr-72e28412.js"
import"./indexAjaxJson-b9139aa9.js"
import"./cmdExport-f5c9af35.js"
import{c as w}from"./csvSplit-653f6227.js"
import{g as x}from"./getArrayByClassName-7efc50e3.js"
import{g as v}from"./getMembrList-8964b15c.js"
import{d as B,g as G}from"./getGroupStats-455cf92c.js"
import"./groupViewStats-20e7691a.js"
const N=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function T(t){const s=t.cells[3],n=N.exec(o(s)),e=(new Date).getFullYear()
a(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const n=new Date
return n.setUTCDate(t[2]),n.setUTCMonth(c.indexOf(t[3])),n.setUTCFullYear(s),n.setUTCHours(t[4]),n.setUTCMinutes(t[5]),n}(n,e).toString().substr(0,21)}</span>`)}function M(t,s){return t[s]?t[s].level:0}function y(t,s,n){return M(t,n)-M(t,s)}function J(t,s){return t[s]?`<a href="${r}${t[s].id}">${s}</a>`:s}function U(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,n){const c=n.cells[0]
e(function(t,s){const n=o(s.children[0])
return t[n]?`${$({last_login:t[n].last_login})}&nbsp;<a href="${r}${t[n].id}"><b>${n}</b></a> [${t[n].level}]`:`<b>${n}</b>`}(t,c),c)
const l=n.cells[1],f=function(t,n){const e=w(n.innerHTML)
return e.length>1&&e.sort(s(y,t)),e}(t,l)
!function(t,s){const n=s.filter(U)
n.length>0&&i(t,B(n)),a(t,`<span class="fshXSmall">Members: ${n.length}</span>`)}(c,f),function(t,n,o){const a=o.map(s(J,t))
e(`<span>${a.join(", ")}</span>`,n)}(t,l,f),T(n)}function L(e){t("groups.doGroupPaint"),x("group-action-container").map(t=>S(t)).forEach(s(D,e)),n("groups.doGroupPaint")}function k(t,s){const n=C({className:"custombutton",type:"button",value:s})
return a(t,"&nbsp;"),i(t,n),n}function E(t,s){const n=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
a(e,n)}function R(t){G(t.href).then(s(E,t))}function z(t){t.target.disabled=!0,f('#pCC a[href*="=viewstats&"]').forEach(R)}let H
function X(t){return!t.includes("#000099")}function F(t){e('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function I(t){const n=t.parentNode.parentNode.parentNode.cells[1]
if(w(o(n)).filter(X).length<H){const n=b({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(n,t)
!function(t,n){g({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(s(F,n))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],n)}}function O(){m("groups","joinAllGroupsUnderSize"),f('#pCC a[href*="confirmJoin"]').forEach(I)}function P(){const t=u('#pCC input[value="Join All Available Groups"]'),s=t.parentNode
p("enableMaxGroupSizeToJoin")&&(H=p("maxGroupSizeToJoin"),A(t),function(t){const s=k(t,`Join All Groups < ${H} Members`)
l(s,O)}(s)),function(t){const s=k(t,"Fetch Group Stats")
l(s,z)}(s),d.subcmd2===h&&O()}function V(){j()||(v(!1).then(L),function(){const t=p("minGroupLevel")
t&&a(u("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),P(),function(){const t=f("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default V
//# sourceMappingURL=groups-0b9e472b.js.map
