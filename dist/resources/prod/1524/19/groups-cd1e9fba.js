import{s as t,aE as n,$ as e,i as s,f as a,o,I as r,M as i,D as c,c as l,b$ as f,S as p,A as d,k as u,t as h,z as m,w as b}from"./calfSystem-6fc0cc1b.js"
import{c as g}from"./createInput-75e5aa25.js"
import{o as j}from"./onlineDot-22e472e6.js"
import"./currentGuildId-33ea4168.js"
import"./intValue-3f75a919.js"
import"./fshOpen-8d675aa9.js"
import"./openQuickBuffByName-b0838d7a.js"
import"./createUl-a91b6072.js"
import"./idb-92d6a2b5.js"
import"./createButton-d2526ab3.js"
import"./createLi-9b7c875f.js"
import{h as C}from"./hideElement-0911f8f2.js"
import"./indexAjaxJson-608117f0.js"
import{c as S}from"./csvSplit-a085f0bc.js"
import"./cmdExport-ce8b0402.js"
import{g as w}from"./getMembrList-24c64c1b.js"
import{d as x,g as v}from"./getGroupStats-6be7e020.js"
import"./groupViewStats-2943077d.js"
const A=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function B(t){const e=$("td",t).eq(2),s=A.exec(e.text()),a=(new Date).getFullYear()
e.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,e){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(n.indexOf(t[3])),s.setUTCFullYear(e),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,a).toString().substr(0,21)}</span>`)}function N(t,n){const s=$("td",n).first()
return s.html(function(t,n){const s=$("b",n).text()
return t[s]?`${j({last_login:t[s].last_login})}&nbsp;<a href="${e}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,n)),s}function G(t,n){return t[n]?t[n].level:0}function M(t,n,e){return G(t,e)-G(t,n)}function T(t,n){return t[n]?`<a href="${e}${t[n].id}">${n}</a>`:n}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function U(n,e,s){const a=N(n,s),o=$("td",s).eq(1),r=function(n,e){const s=S(e.html())
return s.length>1&&s.sort(t(M,n)),s}(n,o)
!function(t,n){const e=n.filter(J)
e.length>0&&t.append(x(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(a,r),function(n,e,s){const a=s.map(t(T,n))
e.html(`<span>${a.join(", ")}</span>`)}(n,o,r),B(s)}function y(n){$("#pCC table table table tr").has(".group-action-container").each(t(U,n))}function D(t,n){const e=g({className:"custombutton",type:"button",value:n})
return s(t,"&nbsp;"),a(t,e),e}function k(t,n){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,a=t.parentNode.parentNode.previousElementSibling
s(a,e)}function q(n){v(n.href).then(t(k,n))}function z(t){t.target.disabled=!0,r('#pCC a[href*="=viewstats&"]').forEach(q)}let E
function L(t){return!t.includes("#000099")}function R(t){m('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function F(n){const e=n.parentNode.parentNode.parentNode.cells[1]
if(S(d(e)).filter(L).length<E){const e=u({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
n.parentNode.replaceChild(e,n)
!function(n,e){h({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:n}).then(t(R,e))}(/confirmJoin\((\d+)\)/.exec(n.href)[1],e)}}function H(){p("groups","joinAllGroupsUnderSize"),r('#pCC a[href*="confirmJoin"]').forEach(F)}function I(){const t=i('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
c("enableMaxGroupSizeToJoin")&&(E=c("maxGroupSizeToJoin"),C(t),function(t){const n=D(t,`Join All Groups < ${E} Members`)
o(n,H)}(n)),function(t){const n=D(t,"Fetch Group Stats")
o(n,z)}(n),l.subcmd2===f&&H()}export default function(){b()||(w(!1).then(y),function(){const t=c("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),I(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-cd1e9fba.js.map
