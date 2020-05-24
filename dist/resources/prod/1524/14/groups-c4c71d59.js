import{u as t,V as n,aJ as e,a8 as s,i as a,f as o,o as r,M as i,Q as c,F as l,m as f,c as u,ce as d,$ as p,C as h,k as m,v as b,B as g,y as C}from"./calfSystem-d587d232.js"
import{c as S}from"./createInput-f5f615ed.js"
import{o as w}from"./onlineDot-c976faff.js"
import"./createUl-8fcf56ef.js"
import"./createButton-04c4f16f.js"
import{g as x}from"./getMembrList-bff94964.js"
import{d as j,g as v}from"./getGroupStats-b3af346e.js"
import"./groupViewStats-e7b3f27d.js"
const B=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function M(t){const n=$("td",t).eq(2),s=B.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(e.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,a).toString().substr(0,21)}</span>`)}function N(t,n){const e=$("td",n).first()
return e.html(function(t,n){const e=$("b",n).text()
return t[e]?`${w({last_login:t[e].last_login})}&nbsp;<a href="${s}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,n)),e}function T(t,n){return t[n]?t[n].level:0}function A(t,n,e){return T(t,e)-T(t,n)}function G(t,n){return t[n]?`<a href="${s}${t[n].id}">${n}</a>`:n}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function U(e,s,a){const o=N(e,a),r=$("td",a).eq(1),i=function(e,s){const a=n(s.html())
return a.length>1&&a.sort(t(A,e)),a}(e,r)
!function(t,n){const e=n.filter(J)
e.length>0&&t.append(j(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(o,i),function(n,e,s){const a=s.map(t(G,n))
e.html(`<span>${a.join(", ")}</span>`)}(e,r,i),M(a)}function y(n){$("#pCC table table table tr").has(".group-action-container").each(t(U,n))}function q(t,n){const e=S({className:"custombutton",type:"button",value:n})
return a(t,"&nbsp;"),o(t,e),e}function D(t,n){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,s=t.parentNode.parentNode.previousElementSibling
a(s,e)}function R(n){v(n.href).then(t(D,n))}function k(t){t.target.disabled=!0,i('#pCC a[href*="=viewstats&"]').forEach(R)}let z
function L(t){return!t.includes("#000099")}function F(t){g('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function E(e){const s=e.parentNode.parentNode.parentNode.cells[1]
if(n(h(s)).filter(L).length<z){const n=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
e.parentNode.replaceChild(n,e)
!function(n,e){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:n}).then(t(F,e))}(/confirmJoin\((\d+)\)/.exec(e.href)[1],n)}}function H(){p("groups","joinAllGroupsUnderSize"),i('#pCC a[href*="confirmJoin"]').forEach(E)}function X(){const t=c('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
l("enableMaxGroupSizeToJoin")&&(z=l("maxGroupSizeToJoin"),f(t),function(t){const n=q(t,`Join All Groups < ${z} Members`)
r(n,H)}(n)),function(t){const n=q(t,"Fetch Group Stats")
r(n,k)}(n),u.subcmd2===d&&H()}export default function(){C()||(x(!1).then(y),function(){const t=l("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),X(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-c4c71d59.js.map
