import{bh as t,v as n,bi as e,X as s,aN as a,aa as o,i as r,h as i,o as c,N as l,S as u,G as f,n as d,e as p,co as h,a1 as m,D as b,l as g,w as C,C as S,z as w}from"./calfSystem-70b0df7f.js"
import{c as x}from"./createInput-9a444f78.js"
import{o as j}from"./onlineDot-75119c69.js"
import"./createUl-64948536.js"
import"./createButton-e6779a69.js"
import{g as v}from"./getMembrList-e5ee3d0f.js"
import{d as G,g as N}from"./getGroupStats-ed84a032.js"
import"./groupViewStats-62ee3e4b.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function A(t){const n=$("td",t).eq(2),e=T.exec(n.text()),s=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(a.indexOf(t[3])),e.setUTCFullYear(n),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,s).toString().substr(0,21)}</span>`)}function B(t,n){const e=$("td",n).first()
return e.html(function(t,n){const e=$("b",n).text()
return t[e]?`${j({last_login:t[e].last_login})}&nbsp;<a href="${o}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,n)),e}function M(t,n){return t[n]?t[n].level:0}function U(t,n,e){return M(t,e)-M(t,n)}function D(t,n){return t[n]?`<a href="${o}${t[n].id}">${n}</a>`:n}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function q(t,e,a){const o=B(t,a),r=$("td",a).eq(1),i=function(t,e){const a=s(e.html())
return a.length>1&&a.sort(n(U,t)),a}(t,r)
!function(t,n){const e=n.filter(J)
e.length>0&&t.append(G(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(o,i),function(t,e,s){const a=s.map(n(D,t))
e.html(`<span>${a.join(", ")}</span>`)}(t,r,i),A(a)}function y(s){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(q,s)),e("groups.doGroupPaint")}function z(t,n){const e=x({className:"custombutton",type:"button",value:n})
return r(t,"&nbsp;"),i(t,e),e}function R(t,n){const e='<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td>'+`<td class="fshRight">${n.attack}</td>`+'<td class="fshBrown">Defense</td>'+`<td class="fshRight">${n.defense}</td>`+'</tr><tr><td class="fshBrown">Armor</td>'+`<td class="fshRight">${n.armor}</td>`+'<td class="fshBrown">Damage</td>'+`<td class="fshRight">${n.damage}</td>`+'</tr><tr><td class="fshBrown">HP</td>'+`<td class="fshRight">${n.hp}</td>`+'<td colspan="2"></td></tr></table>',s=t.parentNode.parentNode.previousElementSibling
r(s,e)}function L(t){N(t.href).then(n(R,t))}function k(t){t.target.disabled=!0,l('#pCC a[href*="=viewstats&"]').forEach(L)}let X
function E(t){return!t.includes("#000099")}function F(t){S('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function H(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(s(b(e)).filter(E).length<X){const e=g({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(e,t),function(t,e){C({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(F,e))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],e)}}function P(){m("groups","joinAllGroupsUnderSize"),l('#pCC a[href*="confirmJoin"]').forEach(H)}function _(){const t=u('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
f("enableMaxGroupSizeToJoin")&&(X=f("maxGroupSizeToJoin"),d(t),function(t){const n=z(t,`Join All Groups < ${X} Members`)
c(n,P)}(n)),function(t){const n=z(t,"Fetch Group Stats")
c(n,k)}(n),p.subcmd2===h&&P()}export default function(){w()||(v(!1).then(y),function(){const t=f("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),_(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-e06ee415.js.map
