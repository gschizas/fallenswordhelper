import{t,aE as n,a1 as e,i as s,f as a,o,D as r,C as i,G as c,c as l,bY as d,U as f,B as p,l as u,u as h,A as m,x as b}from"./calfSystem-03970067.js"
import{c as g}from"./createInput-7a44ee58.js"
import{o as j}from"./onlineDot-e09bcdeb.js"
import"./currentGuildId-cce6862b.js"
import"./intValue-0d844fc4.js"
import"./fshOpen-526cc69f.js"
import"./openQuickBuffByName-d2028079.js"
import"./createUl-ac0a6ac2.js"
import"./idb-3dad9172.js"
import"./createButton-082f5876.js"
import"./createLi-1e5d4784.js"
import{h as C}from"./hideElement-ee7e2bbb.js"
import"./indexAjaxJson-d04ad897.js"
import"./cmdExport-4773c3fd.js"
import{c as x}from"./csvSplit-a1c5f5ec.js"
import{g as S}from"./getMembrList-3c92fb67.js"
import{d as w,g as v}from"./getGroupStats-7b21e6cd.js"
import"./groupViewStats-bddb9c75.js"
const B=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function A(t){const e=$("td",t).eq(2),s=B.exec(e.text()),a=(new Date).getFullYear()
e.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,e){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(n.indexOf(t[3])),s.setUTCFullYear(e),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,a).toString().substr(0,21)}</span>`)}function G(t,n){const s=$("td",n).first()
return s.html(function(t,n){const s=$("b",n).text()
return t[s]?`${j({last_login:t[s].last_login})}&nbsp;<a href="${e}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,n)),s}function N(t,n){return t[n]?t[n].level:0}function T(t,n,e){return N(t,e)-N(t,n)}function U(t,n){return t[n]?`<a href="${e}${t[n].id}">${n}</a>`:n}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function M(n,e,s){const a=G(n,s),o=$("td",s).eq(1),r=function(n,e){const s=x(e.html())
return s.length>1&&s.sort(t(T,n)),s}(n,o)
!function(t,n){const e=n.filter(J)
e.length>0&&t.append(w(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(a,r),function(n,e,s){const a=s.map(t(U,n))
e.html(`<span>${a.join(", ")}</span>`)}(n,o,r),A(s)}function y(n){$("#pCC table table table tr").has(".group-action-container").each(t(M,n))}function D(t,n){const e=g({className:"custombutton",type:"button",value:n})
return s(t,"&nbsp;"),a(t,e),e}function q(t,n){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,a=t.parentNode.parentNode.previousElementSibling
s(a,e)}function E(n){v(n.href).then(t(q,n))}function L(t){t.target.disabled=!0,r('#pCC a[href*="=viewstats&"]').forEach(E)}let R
function k(t){return!t.includes("#000099")}function z(t){m('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function F(n){const e=n.parentNode.parentNode.parentNode.cells[1]
if(x(p(e)).filter(k).length<R){const e=u({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
n.parentNode.replaceChild(e,n)
!function(n,e){h({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:n}).then(t(z,e))}(/confirmJoin\((\d+)\)/.exec(n.href)[1],e)}}function H(){f("groups","joinAllGroupsUnderSize"),r('#pCC a[href*="confirmJoin"]').forEach(F)}function O(){const t=i('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
c("enableMaxGroupSizeToJoin")&&(R=c("maxGroupSizeToJoin"),C(t),function(t){const n=D(t,`Join All Groups < ${R} Members`)
o(n,H)}(n)),function(t){const n=D(t,"Fetch Group Stats")
o(n,L)}(n),l.subcmd2===d&&H()}export default function(){b()||(S(!1).then(y),function(){const t=c("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),O(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-31d73bc6.js.map
