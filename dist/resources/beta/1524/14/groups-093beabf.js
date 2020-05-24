import{bc as t,u as n,bd as s,V as e,aJ as a,a8 as o,i as r,f as i,o as c,M as l,Q as u,F as d,m as f,c as p,cj as h,$ as m,C as b,k as g,v as C,B as S,y as w}from"./calfSystem-371c414c.js"
import{c as j}from"./createInput-d378f9d2.js"
import{o as x}from"./onlineDot-b47e695a.js"
import"./createUl-49043902.js"
import"./createButton-957980b2.js"
import{g as v}from"./getMembrList-4a06ce80.js"
import{d as G,g as B}from"./getGroupStats-108452d1.js"
import"./groupViewStats-34247847.js"
const M=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const n=$("td",t).eq(2),s=M.exec(n.text()),e=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(a.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,e).toString().substr(0,21)}</span>`)}function T(t,n){const s=$("td",n).first()
return s.html(function(t,n){const s=$("b",n).text()
return t[s]?`${x({last_login:t[s].last_login})}&nbsp;<a href="${o}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,n)),s}function A(t,n){return t[n]?t[n].level:0}function J(t,n,s){return A(t,s)-A(t,n)}function U(t,n){return t[n]?`<a href="${o}${t[n].id}">${n}</a>`:n}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function q(t,s,a){const o=T(t,a),r=$("td",a).eq(1),i=function(t,s){const a=e(s.html())
return a.length>1&&a.sort(n(J,t)),a}(t,r)
!function(t,n){const s=n.filter(y)
s.length>0&&t.append(G(s)),t.append(`<span class="fshXSmall">Members: ${s.length}</span>`)}(o,i),function(t,s,e){const a=e.map(n(U,t))
s.html(`<span>${a.join(", ")}</span>`)}(t,r,i),N(a)}function D(e){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(q,e)),s("groups.doGroupPaint")}function R(t,n){const s=j({className:"custombutton",type:"button",value:n})
return r(t,"&nbsp;"),i(t,s),s}function k(t,n){const s=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
r(e,s)}function z(t){B(t.href).then(n(k,t))}function L(t){t.target.disabled=!0,l('#pCC a[href*="=viewstats&"]').forEach(z)}let F
function E(t){return!t.includes("#000099")}function H(t){S('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function P(t){const s=t.parentNode.parentNode.parentNode.cells[1]
if(e(b(s)).filter(E).length<F){const s=g({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(s,t)
!function(t,s){C({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(H,s))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],s)}}function X(){m("groups","joinAllGroupsUnderSize"),l('#pCC a[href*="confirmJoin"]').forEach(P)}function _(){const t=u('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
d("enableMaxGroupSizeToJoin")&&(F=d("maxGroupSizeToJoin"),f(t),function(t){const n=R(t,`Join All Groups < ${F} Members`)
c(n,X)}(n)),function(t){const n=R(t,"Fetch Group Stats")
c(n,L)}(n),p.subcmd2===h&&X()}export default function(){w()||(v(!1).then(D),function(){const t=d("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),_(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-093beabf.js.map
