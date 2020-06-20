import{t,aE as n,a1 as s,i as e,h as a,o,D as r,C as i,G as c,c as l,bZ as f,U as p,B as d,m as u,u as h,A as m,x as b}from"./calfSystem-2741d97b.js"
import{c as g}from"./createInput-0f2d72fe.js"
import{o as j}from"./onlineDot-f6177bb2.js"
import"./currentGuildId-2c5ea0ad.js"
import"./intValue-1a593541.js"
import"./fshOpen-591841c3.js"
import"./openQuickBuffByName-85bc7291.js"
import"./createUl-f9269e30.js"
import"./idb-cb4fc9f9.js"
import"./createButton-3011f1ad.js"
import"./createLi-31c092b1.js"
import{h as C}from"./hideElement-6a4f37a8.js"
import"./indexAjaxJson-2aa42945.js"
import"./cmdExport-b57576c3.js"
import{c as x}from"./csvSplit-566a136d.js"
import{g as S}from"./getMembrList-864a54a8.js"
import{d as w,g as v}from"./getGroupStats-b72badc6.js"
import"./groupViewStats-31925435.js"
const B=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function A(t){const s=$("td",t).eq(2),e=B.exec(s.text()),a=(new Date).getFullYear()
s.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(n.indexOf(t[3])),e.setUTCFullYear(s),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,a).toString().substr(0,21)}</span>`)}function G(t,n){const e=$("td",n).first()
return e.html(function(t,n){const e=$("b",n).text()
return t[e]?`${j({last_login:t[e].last_login})}&nbsp;<a href="${s}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,n)),e}function N(t,n){return t[n]?t[n].level:0}function T(t,n,s){return N(t,s)-N(t,n)}function U(t,n){return t[n]?`<a href="${s}${t[n].id}">${n}</a>`:n}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function M(n,s,e){const a=G(n,e),o=$("td",e).eq(1),r=function(n,s){const e=x(s.html())
return e.length>1&&e.sort(t(T,n)),e}(n,o)
!function(t,n){const s=n.filter(J)
s.length>0&&t.append(w(s)),t.append(`<span class="fshXSmall">Members: ${s.length}</span>`)}(a,r),function(n,s,e){const a=e.map(t(U,n))
s.html(`<span>${a.join(", ")}</span>`)}(n,o,r),A(e)}function y(n){$("#pCC table table table tr").has(".group-action-container").each(t(M,n))}function D(t,n){const s=g({className:"custombutton",type:"button",value:n})
return e(t,"&nbsp;"),a(t,s),s}function q(t,n){const s=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,a=t.parentNode.parentNode.previousElementSibling
e(a,s)}function E(n){v(n.href).then(t(q,n))}function L(t){t.target.disabled=!0,r('#pCC a[href*="=viewstats&"]').forEach(E)}let R
function k(t){return!t.includes("#000099")}function z(t){m('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function F(n){const s=n.parentNode.parentNode.parentNode.cells[1]
if(x(d(s)).filter(k).length<R){const s=u({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
n.parentNode.replaceChild(s,n)
!function(n,s){h({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:n}).then(t(z,s))}(/confirmJoin\((\d+)\)/.exec(n.href)[1],s)}}function H(){p("groups","joinAllGroupsUnderSize"),r('#pCC a[href*="confirmJoin"]').forEach(F)}function O(){const t=i('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
c("enableMaxGroupSizeToJoin")&&(R=c("maxGroupSizeToJoin"),C(t),function(t){const n=D(t,`Join All Groups < ${R} Members`)
o(n,H)}(n)),function(t){const n=D(t,"Fetch Group Stats")
o(n,L)}(n),l.subcmd2===f&&H()}export default function(){b()||(S(!1).then(y),function(){const t=c("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),O(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-fd12612d.js.map
