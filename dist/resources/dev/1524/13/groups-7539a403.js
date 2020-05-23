import{bh as t,v as n,bi as s,X as e,aN as a,aa as o,i as r,h as i,o as c,N as l,S as f,G as u,n as d,e as p,co as h,a1 as m,D as g,l as b,w as C,C as S,z as w}from"./calfSystem-01eb06ed.js"
import{c as x}from"./createInput-7fd54c66.js"
import{o as j}from"./onlineDot-15ff94f9.js"
import"./createUl-c1a39af0.js"
import"./createButton-33c18cfd.js"
import{g as v}from"./getMembrList-38374103.js"
import{d as G,g as N}from"./getGroupStats-eae8ae02.js"
import"./groupViewStats-118f3795.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function A(t){const n=$("td",t).eq(2),s=T.exec(n.text()),e=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(a.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,e).toString().substr(0,21)}</span>`)}function B(t,n){const s=$("td",n).first()
return s.html(function(t,n){const s=$("b",n).text()
return t[s]?`${j({last_login:t[s].last_login})}&nbsp;<a href="${o}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,n)),s}function M(t,n){return t[n]?t[n].level:0}function U(t,n,s){return M(t,s)-M(t,n)}function D(t,n){return t[n]?`<a href="${o}${t[n].id}">${n}</a>`:n}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function q(t,s,a){const o=B(t,a),r=$("td",a).eq(1),i=function(t,s){const a=e(s.html())
return a.length>1&&a.sort(n(U,t)),a}(t,r)
!function(t,n){const s=n.filter(J)
s.length>0&&t.append(G(s)),t.append(`<span class="fshXSmall">Members: ${s.length}</span>`)}(o,i),function(t,s,e){const a=e.map(n(D,t))
s.html(`<span>${a.join(", ")}</span>`)}(t,r,i),A(a)}function y(e){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(q,e)),s("groups.doGroupPaint")}function z(t,n){const s=x({className:"custombutton",type:"button",value:n})
return r(t,"&nbsp;"),i(t,s),s}function R(t,n){const s=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
r(e,s)}function L(t){N(t.href).then(n(R,t))}function k(t){t.target.disabled=!0,l('#pCC a[href*="=viewstats&"]').forEach(L)}let X
function E(t){return!t.includes("#000099")}function F(t){S('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function H(t){const s=t.parentNode.parentNode.parentNode.cells[1]
if(e(g(s)).filter(E).length<X){const s=b({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(s,t)
!function(t,s){C({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(F,s))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],s)}}function P(){m("groups","joinAllGroupsUnderSize"),l('#pCC a[href*="confirmJoin"]').forEach(H)}function _(){const t=f('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
u("enableMaxGroupSizeToJoin")&&(X=u("maxGroupSizeToJoin"),d(t),function(t){const n=z(t,`Join All Groups < ${X} Members`)
c(n,P)}(n)),function(t){const n=z(t,"Fetch Group Stats")
c(n,k)}(n),p.subcmd2===h&&P()}export default function(){w()||(v(!1).then(y),function(){const t=u("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),_(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-7539a403.js.map
