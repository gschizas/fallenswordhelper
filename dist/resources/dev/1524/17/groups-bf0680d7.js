import{aY as t,s as n,aZ as e,aI as s,a0 as a,i as o,f as r,o as i,I as c,N as l,D as f,c as p,c4 as d,T as u,A as h,k as m,t as b,z as g,w as j}from"./calfSystem-1c103624.js"
import{c as C}from"./createInput-7f1f4562.js"
import{o as S}from"./onlineDot-764e0ffe.js"
import"./currentGuildId-b6fa52f3.js"
import"./intValue-f5e62e5b.js"
import"./fshOpen-19720760.js"
import"./openQuickBuffByName-f6a38ccb.js"
import"./createUl-16e74031.js"
import"./idb-347cc2af.js"
import"./createButton-c8469336.js"
import"./createLi-04a1a597.js"
import{h as w}from"./hideElement-e9cdcfef.js"
import"./indexAjaxJson-ed231bc3.js"
import{c as x}from"./csvSplit-0d83582d.js"
import"./cmdExport-15d3dc9a.js"
import{g as v}from"./getMembrList-d1decafe.js"
import{d as G,g as N}from"./getGroupStats-28e852e0.js"
import"./groupViewStats-21979267.js"
const A=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function B(t){const n=$("td",t).eq(2),e=A.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(s.indexOf(t[3])),e.setUTCFullYear(n),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,a).toString().substr(0,21)}</span>`)}function T(t,n){const e=$("td",n).first()
return e.html(function(t,n){const e=$("b",n).text()
return t[e]?`${S({last_login:t[e].last_login})}&nbsp;<a href="${a}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,n)),e}function J(t,n){return t[n]?t[n].level:0}function M(t,n,e){return J(t,e)-J(t,n)}function U(t,n){return t[n]?`<a href="${a}${t[n].id}">${n}</a>`:n}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,e,s){const a=T(t,s),o=$("td",s).eq(1),r=function(t,e){const s=x(e.html())
return s.length>1&&s.sort(n(M,t)),s}(t,o)
!function(t,n){const e=n.filter(y)
e.length>0&&t.append(G(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(a,r),function(t,e,s){const a=s.map(n(U,t))
e.html(`<span>${a.join(", ")}</span>`)}(t,o,r),B(s)}function k(s){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(D,s)),e("groups.doGroupPaint")}function q(t,n){const e=C({className:"custombutton",type:"button",value:n})
return o(t,"&nbsp;"),r(t,e),e}function z(t,n){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,s=t.parentNode.parentNode.previousElementSibling
o(s,e)}function L(t){N(t.href).then(n(z,t))}function R(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(L)}let E
function I(t){return!t.includes("#000099")}function F(t){g('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function H(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(x(h(e)).filter(I).length<E){const e=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(e,t)
!function(t,e){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(F,e))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],e)}}function O(){u("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(H)}function P(){const t=l('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
f("enableMaxGroupSizeToJoin")&&(E=f("maxGroupSizeToJoin"),w(t),function(t){const n=q(t,`Join All Groups < ${E} Members`)
i(n,O)}(n)),function(t){const n=q(t,"Fetch Group Stats")
i(n,R)}(n),p.subcmd2===d&&O()}export default function(){j()||(v(!1).then(k),function(){const t=f("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),P(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-bf0680d7.js.map
