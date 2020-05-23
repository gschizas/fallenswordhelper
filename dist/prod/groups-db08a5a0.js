import{v as t,W as n,aK as e,a9 as s,i as a,h as o,o as r,N as i,R as c,G as l,n as f,e as d,cf as u,a0 as p,D as h,l as m,w as b,C as g,z as C}from"./calfSystem-4b4fbec4.js"
import{c as w}from"./createInput-b0cbdcde.js"
import{o as S}from"./onlineDot-49f8ec51.js"
import"./createUl-63ded7ff.js"
import"./createButton-6ae98290.js"
import{g as x}from"./getMembrList-4e151249.js"
import{d as j,g as v}from"./getGroupStats-359c2905.js"
import"./groupViewStats-162802e1.js"
const N=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function G(t){const n=$("td",t).eq(2),s=N.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(e.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,a).toString().substr(0,21)}</span>`)}function T(t,n){const e=$("td",n).first()
return e.html(function(t,n){const e=$("b",n).text()
return t[e]?`${S({last_login:t[e].last_login})}&nbsp;<a href="${s}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,n)),e}function A(t,n){return t[n]?t[n].level:0}function B(t,n,e){return A(t,e)-A(t,n)}function M(t,n){return t[n]?`<a href="${s}${t[n].id}">${n}</a>`:n}function U(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(e,s,a){const o=T(e,a),r=$("td",a).eq(1),i=function(e,s){const a=n(s.html())
return a.length>1&&a.sort(t(B,e)),a}(e,r)
!function(t,n){const e=n.filter(U)
e.length>0&&t.append(j(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(o,i),function(n,e,s){const a=s.map(t(M,n))
e.html(`<span>${a.join(", ")}</span>`)}(e,r,i),G(a)}function J(n){$("#pCC table table table tr").has(".group-action-container").each(t(D,n))}function R(t,n){const e=w({className:"custombutton",type:"button",value:n})
return a(t,"&nbsp;"),o(t,e),e}function q(t,n){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,s=t.parentNode.parentNode.previousElementSibling
a(s,e)}function y(n){v(n.href).then(t(q,n))}function z(t){t.target.disabled=!0,i('#pCC a[href*="=viewstats&"]').forEach(y)}let L
function k(t){return!t.includes("#000099")}function E(t){g('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function F(e){const s=e.parentNode.parentNode.parentNode.cells[1]
if(n(h(s)).filter(k).length<L){const n=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
e.parentNode.replaceChild(n,e)
!function(n,e){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:n}).then(t(E,e))}(/confirmJoin\((\d+)\)/.exec(e.href)[1],n)}}function H(){p("groups","joinAllGroupsUnderSize"),i('#pCC a[href*="confirmJoin"]').forEach(F)}function X(){const t=c('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
l("enableMaxGroupSizeToJoin")&&(L=l("maxGroupSizeToJoin"),f(t),function(t){const n=R(t,`Join All Groups < ${L} Members`)
r(n,H)}(n)),function(t){const n=R(t,"Fetch Group Stats")
r(n,z)}(n),d.subcmd2===u&&H()}export default function(){C()||(x(!1).then(J),function(){const t=l("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),X(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-db08a5a0.js.map
