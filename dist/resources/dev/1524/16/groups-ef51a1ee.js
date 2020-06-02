import{aY as t,s as n,aZ as s,aI as e,a0 as a,i as o,f as r,o as i,I as c,N as l,D as d,c as p,c5 as f,T as u,A as h,k as m,t as b,z as g,w as j}from"./calfSystem-d49dbbd3.js"
import{c as C}from"./createInput-1699d448.js"
import{o as S}from"./onlineDot-ccdd1fa5.js"
import"./currentGuildId-fb556ea3.js"
import"./intValue-2ed328c8.js"
import"./fshOpen-61afeb3b.js"
import"./openQuickBuffByName-b2ea945d.js"
import"./createUl-679c9bc5.js"
import"./idb-a6d1a1ba.js"
import"./createButton-27be9a2a.js"
import"./createLi-db4bb92d.js"
import{h as w}from"./hideElement-a25240d4.js"
import"./indexAjaxJson-6ef1f9f4.js"
import{c as x}from"./csvSplit-0254185d.js"
import"./cmdExport-1b537f9c.js"
import{g as v}from"./getMembrList-819169ef.js"
import{d as G,g as N}from"./getGroupStats-c29fb5ac.js"
import"./groupViewStats-e8ea5aa4.js"
const A=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function B(t){const n=$("td",t).eq(2),s=A.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(e.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,a).toString().substr(0,21)}</span>`)}function T(t,n){const s=$("td",n).first()
return s.html(function(t,n){const s=$("b",n).text()
return t[s]?`${S({last_login:t[s].last_login})}&nbsp;<a href="${a}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,n)),s}function J(t,n){return t[n]?t[n].level:0}function M(t,n,s){return J(t,s)-J(t,n)}function U(t,n){return t[n]?`<a href="${a}${t[n].id}">${n}</a>`:n}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,s,e){const a=T(t,e),o=$("td",e).eq(1),r=function(t,s){const e=x(s.html())
return e.length>1&&e.sort(n(M,t)),e}(t,o)
!function(t,n){const s=n.filter(y)
s.length>0&&t.append(G(s)),t.append(`<span class="fshXSmall">Members: ${s.length}</span>`)}(a,r),function(t,s,e){const a=e.map(n(U,t))
s.html(`<span>${a.join(", ")}</span>`)}(t,o,r),B(e)}function k(e){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(D,e)),s("groups.doGroupPaint")}function q(t,n){const s=C({className:"custombutton",type:"button",value:n})
return o(t,"&nbsp;"),r(t,s),s}function z(t,n){const s=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
o(e,s)}function L(t){N(t.href).then(n(z,t))}function R(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(L)}let E
function I(t){return!t.includes("#000099")}function F(t){g('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function H(t){const s=t.parentNode.parentNode.parentNode.cells[1]
if(x(h(s)).filter(I).length<E){const s=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(s,t)
!function(t,s){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(F,s))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],s)}}function O(){u("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(H)}function P(){const t=l('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
d("enableMaxGroupSizeToJoin")&&(E=d("maxGroupSizeToJoin"),w(t),function(t){const n=q(t,`Join All Groups < ${E} Members`)
i(n,O)}(n)),function(t){const n=q(t,"Fetch Group Stats")
i(n,R)}(n),p.subcmd2===f&&O()}export default function(){j()||(v(!1).then(k),function(){const t=d("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),P(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-ef51a1ee.js.map
