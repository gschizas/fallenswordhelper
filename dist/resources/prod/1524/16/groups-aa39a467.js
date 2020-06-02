import{s as t,aE as e,$ as n,i as s,f as a,o,I as r,M as i,D as c,c as f,b$ as l,S as d,A as p,k as u,t as h,z as m,w as b}from"./calfSystem-be09bdff.js"
import{c as g}from"./createInput-e2c4d8a7.js"
import{o as j}from"./onlineDot-39b7f8ab.js"
import"./currentGuildId-a5ce9ac2.js"
import"./intValue-b1f59eab.js"
import"./fshOpen-d27f23b3.js"
import"./openQuickBuffByName-cbbf176e.js"
import"./createUl-56f7f17c.js"
import"./idb-a63ec135.js"
import"./createButton-37baa643.js"
import"./createLi-e0f45f24.js"
import{h as C}from"./hideElement-dd1f789a.js"
import"./indexAjaxJson-f8cc1f1e.js"
import{c as S}from"./csvSplit-e4a6d9be.js"
import"./cmdExport-8189e42d.js"
import{g as w}from"./getMembrList-48de369a.js"
import{d as x,g as v}from"./getGroupStats-d88d21df.js"
import"./groupViewStats-1f55ee17.js"
const A=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function B(t){const n=$("td",t).eq(2),s=A.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(e.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,a).toString().substr(0,21)}</span>`)}function N(t,e){const s=$("td",e).first()
return s.html(function(t,e){const s=$("b",e).text()
return t[s]?`${j({last_login:t[s].last_login})}&nbsp;<a href="${n}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,e)),s}function G(t,e){return t[e]?t[e].level:0}function M(t,e,n){return G(t,n)-G(t,e)}function T(t,e){return t[e]?`<a href="${n}${t[e].id}">${e}</a>`:e}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function U(e,n,s){const a=N(e,s),o=$("td",s).eq(1),r=function(e,n){const s=S(n.html())
return s.length>1&&s.sort(t(M,e)),s}(e,o)
!function(t,e){const n=e.filter(J)
n.length>0&&t.append(x(n)),t.append(`<span class="fshXSmall">Members: ${n.length}</span>`)}(a,r),function(e,n,s){const a=s.map(t(T,e))
n.html(`<span>${a.join(", ")}</span>`)}(e,o,r),B(s)}function y(e){$("#pCC table table table tr").has(".group-action-container").each(t(U,e))}function D(t,e){const n=g({className:"custombutton",type:"button",value:e})
return s(t,"&nbsp;"),a(t,n),n}function k(t,e){const n=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${e.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${e.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${e.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${e.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${e.hp}</td><td colspan="2"></td></tr></table>`,a=t.parentNode.parentNode.previousElementSibling
s(a,n)}function q(e){v(e.href).then(t(k,e))}function z(t){t.target.disabled=!0,r('#pCC a[href*="=viewstats&"]').forEach(q)}let E
function L(t){return!t.includes("#000099")}function R(t){m('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function F(e){const n=e.parentNode.parentNode.parentNode.cells[1]
if(S(p(n)).filter(L).length<E){const n=u({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
e.parentNode.replaceChild(n,e)
!function(e,n){h({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:e}).then(t(R,n))}(/confirmJoin\((\d+)\)/.exec(e.href)[1],n)}}function H(){d("groups","joinAllGroupsUnderSize"),r('#pCC a[href*="confirmJoin"]').forEach(F)}function I(){const t=i('#pCC input[value="Join All Available Groups"]'),e=t.parentNode
c("enableMaxGroupSizeToJoin")&&(E=c("maxGroupSizeToJoin"),C(t),function(t){const e=D(t,`Join All Groups < ${E} Members`)
o(e,H)}(e)),function(t){const e=D(t,"Fetch Group Stats")
o(e,z)}(e),f.subcmd2===l&&H()}export default function(){b()||(w(!1).then(y),function(){const t=c("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),I(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-aa39a467.js.map
