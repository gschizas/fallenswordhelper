import{bg as t,u as n,bh as s,W as e,aM as a,a9 as o,i as r,f as i,o as c,M as l,R as f,F as u,m as d,c as p,cn as h,a0 as m,C as b,k as g,v as C,B as S,y as w}from"./calfSystem-d96a3efd.js"
import{c as x}from"./createInput-2717f905.js"
import{o as j}from"./onlineDot-17edd2c6.js"
import"./createUl-78e0780b.js"
import"./createButton-e6d20fb1.js"
import{g as v}from"./getMembrList-5baa5a87.js"
import{d as G,g as M}from"./getGroupStats-c4f3e3f6.js"
import"./groupViewStats-fc9bca6b.js"
const B=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const n=$("td",t).eq(2),s=B.exec(n.text()),e=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(a.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,e).toString().substr(0,21)}</span>`)}function T(t,n){const s=$("td",n).first()
return s.html(function(t,n){const s=$("b",n).text()
return t[s]?`${j({last_login:t[s].last_login})}&nbsp;<a href="${o}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,n)),s}function A(t,n){return t[n]?t[n].level:0}function U(t,n,s){return A(t,s)-A(t,n)}function y(t,n){return t[n]?`<a href="${o}${t[n].id}">${n}</a>`:n}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function R(t,s,a){const o=T(t,a),r=$("td",a).eq(1),i=function(t,s){const a=e(s.html())
return a.length>1&&a.sort(n(U,t)),a}(t,r)
!function(t,n){const s=n.filter(J)
s.length>0&&t.append(G(s)),t.append(`<span class="fshXSmall">Members: ${s.length}</span>`)}(o,i),function(t,s,e){const a=e.map(n(y,t))
s.html(`<span>${a.join(", ")}</span>`)}(t,r,i),N(a)}function q(e){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(R,e)),s("groups.doGroupPaint")}function D(t,n){const s=x({className:"custombutton",type:"button",value:n})
return r(t,"&nbsp;"),i(t,s),s}function k(t,n){const s=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
r(e,s)}function z(t){M(t.href).then(n(k,t))}function L(t){t.target.disabled=!0,l('#pCC a[href*="=viewstats&"]').forEach(z)}let F
function E(t){return!t.includes("#000099")}function H(t){S('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function P(t){const s=t.parentNode.parentNode.parentNode.cells[1]
if(e(b(s)).filter(E).length<F){const s=g({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(s,t)
!function(t,s){C({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(H,s))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],s)}}function X(){m("groups","joinAllGroupsUnderSize"),l('#pCC a[href*="confirmJoin"]').forEach(P)}function _(){const t=f('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
u("enableMaxGroupSizeToJoin")&&(F=u("maxGroupSizeToJoin"),d(t),function(t){const n=D(t,`Join All Groups < ${F} Members`)
c(n,X)}(n)),function(t){const n=D(t,"Fetch Group Stats")
c(n,L)}(n),p.subcmd2===h&&X()}export default function(){w()||(v(!1).then(q),function(){const t=u("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),_(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-22fc6ef2.js.map
