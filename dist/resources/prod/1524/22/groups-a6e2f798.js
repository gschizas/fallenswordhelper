import{t,aE as e,a1 as n,i as s,h as a,o,D as r,C as i,G as c,c as l,bZ as d,U as f,B as p,m as u,u as h,A as m,x as b}from"./calfSystem-d04e4be4.js"
import{c as g}from"./createInput-06f9cad3.js"
import{o as j}from"./onlineDot-b6dabd61.js"
import"./currentGuildId-9ae9b1fe.js"
import"./intValue-ec94378e.js"
import"./fshOpen-9117b13c.js"
import"./openQuickBuffByName-3b6db0bb.js"
import"./createUl-0f36c584.js"
import"./idb-0492f5ed.js"
import"./createButton-d330fff9.js"
import"./createLi-392dacb2.js"
import{h as C}from"./hideElement-54f4258c.js"
import"./indexAjaxJson-73d427c9.js"
import"./cmdExport-9eb7477e.js"
import{c as x}from"./csvSplit-ebdb220a.js"
import{g as S}from"./getMembrList-2684ae4e.js"
import{d as w,g as v}from"./getGroupStats-3582358e.js"
import"./groupViewStats-f367d3e1.js"
const B=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function A(t){const n=$("td",t).eq(2),s=B.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(e.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,a).toString().substr(0,21)}</span>`)}function G(t,e){const s=$("td",e).first()
return s.html(function(t,e){const s=$("b",e).text()
return t[s]?`${j({last_login:t[s].last_login})}&nbsp;<a href="${n}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,e)),s}function N(t,e){return t[e]?t[e].level:0}function T(t,e,n){return N(t,n)-N(t,e)}function U(t,e){return t[e]?`<a href="${n}${t[e].id}">${e}</a>`:e}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function M(e,n,s){const a=G(e,s),o=$("td",s).eq(1),r=function(e,n){const s=x(n.html())
return s.length>1&&s.sort(t(T,e)),s}(e,o)
!function(t,e){const n=e.filter(J)
n.length>0&&t.append(w(n)),t.append(`<span class="fshXSmall">Members: ${n.length}</span>`)}(a,r),function(e,n,s){const a=s.map(t(U,e))
n.html(`<span>${a.join(", ")}</span>`)}(e,o,r),A(s)}function y(e){$("#pCC table table table tr").has(".group-action-container").each(t(M,e))}function D(t,e){const n=g({className:"custombutton",type:"button",value:e})
return s(t,"&nbsp;"),a(t,n),n}function q(t,e){const n=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${e.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${e.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${e.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${e.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${e.hp}</td><td colspan="2"></td></tr></table>`,a=t.parentNode.parentNode.previousElementSibling
s(a,n)}function E(e){v(e.href).then(t(q,e))}function L(t){t.target.disabled=!0,r('#pCC a[href*="=viewstats&"]').forEach(E)}let R
function k(t){return!t.includes("#000099")}function z(t){m('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function F(e){const n=e.parentNode.parentNode.parentNode.cells[1]
if(x(p(n)).filter(k).length<R){const n=u({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
e.parentNode.replaceChild(n,e)
!function(e,n){h({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:e}).then(t(z,n))}(/confirmJoin\((\d+)\)/.exec(e.href)[1],n)}}function H(){f("groups","joinAllGroupsUnderSize"),r('#pCC a[href*="confirmJoin"]').forEach(F)}function O(){const t=i('#pCC input[value="Join All Available Groups"]'),e=t.parentNode
c("enableMaxGroupSizeToJoin")&&(R=c("maxGroupSizeToJoin"),C(t),function(t){const e=D(t,`Join All Groups < ${R} Members`)
o(e,H)}(e)),function(t){const e=D(t,"Fetch Group Stats")
o(e,L)}(e),l.subcmd2===d&&H()}export default function(){b()||(S(!1).then(y),function(){const t=c("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),O(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-a6e2f798.js.map
