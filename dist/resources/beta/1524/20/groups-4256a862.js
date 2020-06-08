import{aV as t,t as n,aW as s,aE as e,a1 as a,i as o,f as r,o as i,D as c,C as l,G as d,c as p,c1 as u,U as f,B as h,l as m,u as b,A as g,x as j}from"./calfSystem-05554bae.js"
import{c as C}from"./createInput-b4c4948c.js"
import{o as x}from"./onlineDot-2dc99915.js"
import"./currentGuildId-03628998.js"
import"./intValue-f723fc88.js"
import"./fshOpen-79258363.js"
import"./openQuickBuffByName-5ddc4d1b.js"
import"./createUl-8c07ba25.js"
import"./idb-862da886.js"
import"./createButton-3a781ecf.js"
import"./createLi-6810292b.js"
import{h as S}from"./hideElement-b7650daa.js"
import"./indexAjaxJson-c1c386d4.js"
import"./cmdExport-9dcb6bc5.js"
import{c as w}from"./csvSplit-d1d5e8a8.js"
import{g as G}from"./getMembrList-6b86662c.js"
import{d as v,g as B}from"./getGroupStats-0a5ba709.js"
import"./groupViewStats-839c0051.js"
const A=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const n=$("td",t).eq(2),s=A.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(e.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,a).toString().substr(0,21)}</span>`)}function T(t,n){const s=$("td",n).first()
return s.html(function(t,n){const s=$("b",n).text()
return t[s]?`${x({last_login:t[s].last_login})}&nbsp;<a href="${a}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,n)),s}function U(t,n){return t[n]?t[n].level:0}function J(t,n,s){return U(t,s)-U(t,n)}function M(t,n){return t[n]?`<a href="${a}${t[n].id}">${n}</a>`:n}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,s,e){const a=T(t,e),o=$("td",e).eq(1),r=function(t,s){const e=w(s.html())
return e.length>1&&e.sort(n(J,t)),e}(t,o)
!function(t,n){const s=n.filter(y)
s.length>0&&t.append(v(s)),t.append(`<span class="fshXSmall">Members: ${s.length}</span>`)}(a,r),function(t,s,e){const a=e.map(n(M,t))
s.html(`<span>${a.join(", ")}</span>`)}(t,o,r),N(e)}function q(e){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(D,e)),s("groups.doGroupPaint")}function E(t,n){const s=C({className:"custombutton",type:"button",value:n})
return o(t,"&nbsp;"),r(t,s),s}function L(t,n){const s=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
o(e,s)}function R(t){B(t.href).then(n(L,t))}function k(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(R)}let z
function F(t){return!t.includes("#000099")}function H(t){g('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function O(t){const s=t.parentNode.parentNode.parentNode.cells[1]
if(w(h(s)).filter(F).length<z){const s=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(s,t)
!function(t,s){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(H,s))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],s)}}function P(){f("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(O)}function V(){const t=l('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
d("enableMaxGroupSizeToJoin")&&(z=d("maxGroupSizeToJoin"),S(t),function(t){const n=E(t,`Join All Groups < ${z} Members`)
i(n,P)}(n)),function(t){const n=E(t,"Fetch Group Stats")
i(n,k)}(n),p.subcmd2===u&&P()}export default function(){j()||(G(!1).then(q),function(){const t=d("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),V(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-4256a862.js.map
