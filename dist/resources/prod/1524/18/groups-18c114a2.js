import{s as t,aE as n,$ as s,i as e,f as a,o,I as r,M as i,D as c,c as l,b$ as d,S as f,A as p,k as u,t as h,z as m,w as b}from"./calfSystem-8b6534a5.js"
import{c as g}from"./createInput-a695d53e.js"
import{o as j}from"./onlineDot-a637a47c.js"
import"./currentGuildId-4a8535f4.js"
import"./intValue-bb1f2246.js"
import"./fshOpen-b5a7c2c8.js"
import"./openQuickBuffByName-ccc15ff1.js"
import"./createUl-56d1bad6.js"
import"./idb-abce8d8d.js"
import"./createButton-04628709.js"
import"./createLi-696c646d.js"
import{h as C}from"./hideElement-551a92b9.js"
import"./indexAjaxJson-b43ddbcc.js"
import{c as S}from"./csvSplit-69b90268.js"
import"./cmdExport-a4cd29b8.js"
import{g as w}from"./getMembrList-fd92f287.js"
import{d as x,g as v}from"./getGroupStats-796bc466.js"
import"./groupViewStats-e821bbf3.js"
const A=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function B(t){const s=$("td",t).eq(2),e=A.exec(s.text()),a=(new Date).getFullYear()
s.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(n.indexOf(t[3])),e.setUTCFullYear(s),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,a).toString().substr(0,21)}</span>`)}function N(t,n){const e=$("td",n).first()
return e.html(function(t,n){const e=$("b",n).text()
return t[e]?`${j({last_login:t[e].last_login})}&nbsp;<a href="${s}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,n)),e}function G(t,n){return t[n]?t[n].level:0}function M(t,n,s){return G(t,s)-G(t,n)}function T(t,n){return t[n]?`<a href="${s}${t[n].id}">${n}</a>`:n}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function U(n,s,e){const a=N(n,e),o=$("td",e).eq(1),r=function(n,s){const e=S(s.html())
return e.length>1&&e.sort(t(M,n)),e}(n,o)
!function(t,n){const s=n.filter(J)
s.length>0&&t.append(x(s)),t.append(`<span class="fshXSmall">Members: ${s.length}</span>`)}(a,r),function(n,s,e){const a=e.map(t(T,n))
s.html(`<span>${a.join(", ")}</span>`)}(n,o,r),B(e)}function y(n){$("#pCC table table table tr").has(".group-action-container").each(t(U,n))}function D(t,n){const s=g({className:"custombutton",type:"button",value:n})
return e(t,"&nbsp;"),a(t,s),s}function k(t,n){const s=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,a=t.parentNode.parentNode.previousElementSibling
e(a,s)}function q(n){v(n.href).then(t(k,n))}function z(t){t.target.disabled=!0,r('#pCC a[href*="=viewstats&"]').forEach(q)}let E
function L(t){return!t.includes("#000099")}function R(t){m('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function F(n){const s=n.parentNode.parentNode.parentNode.cells[1]
if(S(p(s)).filter(L).length<E){const s=u({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
n.parentNode.replaceChild(s,n)
!function(n,s){h({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:n}).then(t(R,s))}(/confirmJoin\((\d+)\)/.exec(n.href)[1],s)}}function H(){f("groups","joinAllGroupsUnderSize"),r('#pCC a[href*="confirmJoin"]').forEach(F)}function I(){const t=i('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
c("enableMaxGroupSizeToJoin")&&(E=c("maxGroupSizeToJoin"),C(t),function(t){const n=D(t,`Join All Groups < ${E} Members`)
o(n,H)}(n)),function(t){const n=D(t,"Fetch Group Stats")
o(n,z)}(n),l.subcmd2===d&&H()}export default function(){b()||(w(!1).then(y),function(){const t=c("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),I(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-18c114a2.js.map
