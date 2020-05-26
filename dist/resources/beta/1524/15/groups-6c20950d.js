import{ba as t,s as n,bb as s,ax as e,_ as a,i as o,f as r,o as i,I as c,L as l,D as d,c as f,c6 as p,R as u,A as h,k as m,t as b,z as g,w as j}from"./calfSystem-1262535f.js"
import{c as C}from"./createInput-62cab8cf.js"
import{o as x}from"./onlineDot-7b6024de.js"
import"./currentGuildId-5a28bdba.js"
import"./intValue-c4584407.js"
import"./fshOpen-6d67ed12.js"
import"./openQuickBuffByName-05521d4e.js"
import"./createUl-17d107e3.js"
import"./createButton-641ff4d6.js"
import"./createLi-03da7c3b.js"
import{h as S}from"./hideElement-405c1665.js"
import"./indexAjaxJson-f27fbe77.js"
import{c as w}from"./csvSplit-b1d72ffd.js"
import"./cmdExport-721bbaf9.js"
import{g as v}from"./getMembrList-c5d771e6.js"
import{d as G,g as A}from"./getGroupStats-ddf9ec31.js"
import"./groupViewStats-a19cc2a0.js"
const B=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const n=$("td",t).eq(2),s=B.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(e.indexOf(t[3])),s.setUTCFullYear(n),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,a).toString().substr(0,21)}</span>`)}function T(t,n){const s=$("td",n).first()
return s.html(function(t,n){const s=$("b",n).text()
return t[s]?`${x({last_login:t[s].last_login})}&nbsp;<a href="${a}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,n)),s}function J(t,n){return t[n]?t[n].level:0}function M(t,n,s){return J(t,s)-J(t,n)}function U(t,n){return t[n]?`<a href="${a}${t[n].id}">${n}</a>`:n}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,s,e){const a=T(t,e),o=$("td",e).eq(1),r=function(t,s){const e=w(s.html())
return e.length>1&&e.sort(n(M,t)),e}(t,o)
!function(t,n){const s=n.filter(y)
s.length>0&&t.append(G(s)),t.append(`<span class="fshXSmall">Members: ${s.length}</span>`)}(a,r),function(t,s,e){const a=e.map(n(U,t))
s.html(`<span>${a.join(", ")}</span>`)}(t,o,r),N(e)}function L(e){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(D,e)),s("groups.doGroupPaint")}function R(t,n){const s=C({className:"custombutton",type:"button",value:n})
return o(t,"&nbsp;"),r(t,s),s}function k(t,n){const s=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,e=t.parentNode.parentNode.previousElementSibling
o(e,s)}function q(t){A(t.href).then(n(k,t))}function z(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(q)}let E
function _(t){return!t.includes("#000099")}function F(t){g('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function H(t){const s=t.parentNode.parentNode.parentNode.cells[1]
if(w(h(s)).filter(_).length<E){const s=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(s,t)
!function(t,s){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(F,s))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],s)}}function I(){u("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(H)}function O(){const t=l('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
d("enableMaxGroupSizeToJoin")&&(E=d("maxGroupSizeToJoin"),S(t),function(t){const n=R(t,`Join All Groups < ${E} Members`)
i(n,I)}(n)),function(t){const n=R(t,"Fetch Group Stats")
i(n,z)}(n),f.subcmd2===p&&I()}export default function(){j()||(v(!1).then(L),function(){const t=d("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),O(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-6c20950d.js.map
