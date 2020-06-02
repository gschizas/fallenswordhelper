import{aW as t,s as n,aX as e,aE as s,$ as a,i as o,f as r,o as i,I as c,M as l,D as p,c as f,c3 as d,S as u,A as h,k as m,t as b,z as g,w as j}from"./calfSystem-9554b525.js"
import{c as C}from"./createInput-73435eda.js"
import{o as S}from"./onlineDot-0eab3784.js"
import"./currentGuildId-7c7a6b86.js"
import"./intValue-bb872327.js"
import"./fshOpen-cf721236.js"
import"./openQuickBuffByName-72f82ff2.js"
import"./createUl-260acec8.js"
import"./idb-e27acc21.js"
import"./createButton-6939b69a.js"
import"./createLi-83e7dd59.js"
import{h as w}from"./hideElement-adf57e3b.js"
import"./indexAjaxJson-24e555fb.js"
import{c as x}from"./csvSplit-6b438d23.js"
import"./cmdExport-d8ee0a12.js"
import{g as v}from"./getMembrList-a47eb3dc.js"
import{d as G,g as A}from"./getGroupStats-5741e428.js"
import"./groupViewStats-f33f19af.js"
const B=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const n=$("td",t).eq(2),e=B.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(s.indexOf(t[3])),e.setUTCFullYear(n),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,a).toString().substr(0,21)}</span>`)}function M(t,n){const e=$("td",n).first()
return e.html(function(t,n){const e=$("b",n).text()
return t[e]?`${S({last_login:t[e].last_login})}&nbsp;<a href="${a}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,n)),e}function T(t,n){return t[n]?t[n].level:0}function J(t,n,e){return T(t,e)-T(t,n)}function U(t,n){return t[n]?`<a href="${a}${t[n].id}">${n}</a>`:n}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,e,s){const a=M(t,s),o=$("td",s).eq(1),r=function(t,e){const s=x(e.html())
return s.length>1&&s.sort(n(J,t)),s}(t,o)
!function(t,n){const e=n.filter(y)
e.length>0&&t.append(G(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(a,r),function(t,e,s){const a=s.map(n(U,t))
e.html(`<span>${a.join(", ")}</span>`)}(t,o,r),N(s)}function k(s){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(D,s)),e("groups.doGroupPaint")}function q(t,n){const e=C({className:"custombutton",type:"button",value:n})
return o(t,"&nbsp;"),r(t,e),e}function z(t,n){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,s=t.parentNode.parentNode.previousElementSibling
o(s,e)}function E(t){A(t.href).then(n(z,t))}function L(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(E)}let R
function X(t){return!t.includes("#000099")}function F(t){g('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function H(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(x(h(e)).filter(X).length<R){const e=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(e,t)
!function(t,e){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(F,e))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],e)}}function I(){u("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(H)}function O(){const t=l('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
p("enableMaxGroupSizeToJoin")&&(R=p("maxGroupSizeToJoin"),w(t),function(t){const n=q(t,`Join All Groups < ${R} Members`)
i(n,I)}(n)),function(t){const n=q(t,"Fetch Group Stats")
i(n,L)}(n),f.subcmd2===d&&I()}export default function(){j()||(v(!1).then(k),function(){const t=p("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),O(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-ad0b1485.js.map
