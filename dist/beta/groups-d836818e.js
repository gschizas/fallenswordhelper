import{bd as t,v as n,be as s,W as e,aK as a,a9 as o,i as r,h as i,o as c,N as l,R as u,G as f,n as d,e as p,ck as h,a0 as m,D as b,l as g,w as C,C as w,z as S}from"./calfSystem-07c25a1c.js"
import{c as x}from"./createInput-2b2e8237.js"
import{o as j}from"./onlineDot-5308cdcc.js"
import"./createUl-06e31567.js"
import"./createButton-ffeacb28.js"
import{g as v}from"./getMembrList-a4cf03c7.js"
import{d as G,g as N}from"./getGroupStats-57ae4f76.js"
import"./groupViewStats-83bbf950.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function A(t){const n=$("td",t).eq(2),s=T.exec(n.text()),e=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(a.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,e).toString().substr(0,21)}</span>`)}function B(t,n){const s=$("td",n).first()
return s.html(function(t,n){const s=$("b",n).text()
return t[s]?`${j({last_login:t[s].last_login})}&nbsp;<a href="${o}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,n)),s}function M(t,n){return t[n]?t[n].level:0}function U(t,n,s){return M(t,s)-M(t,n)}function D(t,n){return t[n]?`<a href="${o}${t[n].id}">${n}</a>`:n}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function R(t,s,a){const o=B(t,a),r=$("td",a).eq(1),i=function(t,s){const a=e(s.html())
return a.length>1&&a.sort(n(U,t)),a}(t,r)
!function(t,n){const s=n.filter(J)
s.length>0&&t.append(G(s)),t.append(`<span class="fshXSmall">Members: ${s.length}</span>`)}(o,i),function(t,s,e){const a=e.map(n(D,t))
s.html(`<span>${a.join(", ")}</span>`)}(t,r,i),A(a)}function q(e){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(R,e)),s("groups.doGroupPaint")}function y(t,n){const s=x({className:"custombutton",type:"button",value:n})
return r(t,"&nbsp;"),i(t,s),s}function z(t,n){const s='<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td>'+`<td class="fshRight">${n.attack}</td>`+'<td class="fshBrown">Defense</td>'+`<td class="fshRight">${n.defense}</td>`+'</tr><tr><td class="fshBrown">Armor</td>'+`<td class="fshRight">${n.armor}</td>`+'<td class="fshBrown">Damage</td>'+`<td class="fshRight">${n.damage}</td>`+'</tr><tr><td class="fshBrown">HP</td>'+`<td class="fshRight">${n.hp}</td>`+'<td colspan="2"></td></tr></table>',e=t.parentNode.parentNode.previousElementSibling
r(e,s)}function k(t){N(t.href).then(n(z,t))}function L(t){t.target.disabled=!0,l('#pCC a[href*="=viewstats&"]').forEach(k)}let E
function F(t){return!t.includes("#000099")}function H(t){w('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function P(t){const s=t.parentNode.parentNode.parentNode.cells[1]
if(e(b(s)).filter(F).length<E){const s=g({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(s,t),function(t,s){C({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(H,s))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],s)}}function X(){m("groups","joinAllGroupsUnderSize"),l('#pCC a[href*="confirmJoin"]').forEach(P)}function _(){const t=u('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
f("enableMaxGroupSizeToJoin")&&(E=f("maxGroupSizeToJoin"),d(t),function(t){const n=y(t,`Join All Groups < ${E} Members`)
c(n,X)}(n)),function(t){const n=y(t,"Fetch Group Stats")
c(n,L)}(n),p.subcmd2===h&&X()}export default function(){S()||(v(!1).then(q),function(){const t=f("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),_(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-d836818e.js.map
