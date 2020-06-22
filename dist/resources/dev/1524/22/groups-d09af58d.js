import{aX as t,t as n,aY as e,aI as s,a2 as a,i as o,h as r,o as i,D as c,C as l,G as f,c as p,c4 as d,V as u,B as h,m,u as b,A as g,x as j}from"./calfSystem-4cc738f8.js"
import{c as C}from"./createInput-8a96566e.js"
import{o as x}from"./onlineDot-7fc3dfe9.js"
import"./currentGuildId-53b525a7.js"
import"./intValue-209ea1ab.js"
import"./fshOpen-91ef7542.js"
import"./openQuickBuffByName-ecb987ca.js"
import"./createUl-a7d90b4b.js"
import"./idb-670c0cca.js"
import"./createButton-8ff4d3ce.js"
import"./createLi-05521fe0.js"
import{h as S}from"./hideElement-22c940e2.js"
import"./indexAjaxJson-39fb942e.js"
import"./cmdExport-3370ea6e.js"
import{c as w}from"./csvSplit-afd1c5e2.js"
import{g as G}from"./getMembrList-51ef4f9e.js"
import{d as v,g as B}from"./getGroupStats-5c855c3e.js"
import"./groupViewStats-7d14dd2f.js"
const A=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const n=$("td",t).eq(2),e=A.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(s.indexOf(t[3])),e.setUTCFullYear(n),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,a).toString().substr(0,21)}</span>`)}function T(t,n){const e=$("td",n).first()
return e.html(function(t,n){const e=$("b",n).text()
return t[e]?`${x({last_login:t[e].last_login})}&nbsp;<a href="${a}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,n)),e}function J(t,n){return t[n]?t[n].level:0}function M(t,n,e){return J(t,e)-J(t,n)}function U(t,n){return t[n]?`<a href="${a}${t[n].id}">${n}</a>`:n}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,e,s){const a=T(t,s),o=$("td",s).eq(1),r=function(t,e){const s=w(e.html())
return s.length>1&&s.sort(n(M,t)),s}(t,o)
!function(t,n){const e=n.filter(y)
e.length>0&&t.append(v(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(a,r),function(t,e,s){const a=s.map(n(U,t))
e.html(`<span>${a.join(", ")}</span>`)}(t,o,r),N(s)}function q(s){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(D,s)),e("groups.doGroupPaint")}function L(t,n){const e=C({className:"custombutton",type:"button",value:n})
return o(t,"&nbsp;"),r(t,e),e}function R(t,n){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,s=t.parentNode.parentNode.previousElementSibling
o(s,e)}function k(t){B(t.href).then(n(R,t))}function z(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(k)}let E
function X(t){return!t.includes("#000099")}function F(t){g('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function H(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(w(h(e)).filter(X).length<E){const e=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(e,t)
!function(t,e){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(F,e))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],e)}}function I(){u("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(H)}function O(){const t=l('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
f("enableMaxGroupSizeToJoin")&&(E=f("maxGroupSizeToJoin"),S(t),function(t){const n=L(t,`Join All Groups < ${E} Members`)
i(n,I)}(n)),function(t){const n=L(t,"Fetch Group Stats")
i(n,z)}(n),p.subcmd2===d&&I()}export default function(){j()||(G(!1).then(q),function(){const t=f("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),O(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-d09af58d.js.map
