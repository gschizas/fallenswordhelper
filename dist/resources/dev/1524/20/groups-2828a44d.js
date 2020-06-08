import{aX as t,t as n,aY as s,aI as e,a2 as a,i as o,f as r,o as i,D as c,C as l,G as f,c as p,c3 as d,V as u,B as h,l as m,u as b,A as g,x as j}from"./calfSystem-a2862afc.js"
import{c as C}from"./createInput-457456bb.js"
import{o as x}from"./onlineDot-003f5d07.js"
import"./currentGuildId-e84c528e.js"
import"./intValue-8b673ab3.js"
import"./fshOpen-a1ebd7c1.js"
import"./openQuickBuffByName-808f9233.js"
import"./createUl-1aaeeb73.js"
import"./idb-911ff7c2.js"
import"./createButton-62b6c44a.js"
import"./createLi-bf7f453f.js"
import{h as S}from"./hideElement-66d2f02e.js"
import"./indexAjaxJson-afc1ac85.js"
import"./cmdExport-356fd6f3.js"
import{c as w}from"./csvSplit-f4c1f44b.js"
import{g as G}from"./getMembrList-daab7ad2.js"
import{d as v,g as B}from"./getGroupStats-cbd31dac.js"
import"./groupViewStats-496448bb.js"
const A=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const n=$("td",t).eq(2),s=A.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(e.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,a).toString().substr(0,21)}</span>`)}function T(t,n){const s=$("td",n).first()
return s.html(function(t,n){const s=$("b",n).text()
return t[s]?`${x({last_login:t[s].last_login})}&nbsp;<a href="${a}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,n)),s}function J(t,n){return t[n]?t[n].level:0}function M(t,n,s){return J(t,s)-J(t,n)}function U(t,n){return t[n]?`<a href="${a}${t[n].id}">${n}</a>`:n}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,s,e){const a=T(t,e),o=$("td",e).eq(1),r=function(t,s){const e=w(s.html())
return e.length>1&&e.sort(n(M,t)),e}(t,o)
!function(t,n){const s=n.filter(y)
s.length>0&&t.append(v(s)),t.append(`<span class="fshXSmall">Members: ${s.length}</span>`)}(a,r),function(t,s,e){const a=e.map(n(U,t))
s.html(`<span>${a.join(", ")}</span>`)}(t,o,r),N(e)}function q(e){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(D,e)),s("groups.doGroupPaint")}function L(t,n){const s=C({className:"custombutton",type:"button",value:n})
return o(t,"&nbsp;"),r(t,s),s}function R(t,n){const s=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
o(e,s)}function k(t){B(t.href).then(n(R,t))}function z(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(k)}let E
function X(t){return!t.includes("#000099")}function F(t){g('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function H(t){const s=t.parentNode.parentNode.parentNode.cells[1]
if(w(h(s)).filter(X).length<E){const s=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(s,t)
!function(t,s){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(F,s))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],s)}}function I(){u("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(H)}function O(){const t=l('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
f("enableMaxGroupSizeToJoin")&&(E=f("maxGroupSizeToJoin"),S(t),function(t){const n=L(t,`Join All Groups < ${E} Members`)
i(n,I)}(n)),function(t){const n=L(t,"Fetch Group Stats")
i(n,z)}(n),p.subcmd2===d&&I()}export default function(){j()||(G(!1).then(q),function(){const t=f("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),O(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-2828a44d.js.map
