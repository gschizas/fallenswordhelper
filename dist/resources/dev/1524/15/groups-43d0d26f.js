import{bb as t,s as n,bc as e,aA as s,$ as a,i as o,f as r,o as i,I as c,M as l,D as p,c as d,cb as f,S as u,A as h,k as m,t as b,z as g,w as j}from"./calfSystem-ee582533.js"
import{c as C}from"./createInput-2410e798.js"
import{o as S}from"./onlineDot-6ce6d139.js"
import"./currentGuildId-0564d9a0.js"
import"./intValue-a842cf8a.js"
import"./fshOpen-f1f6c477.js"
import"./openQuickBuffByName-60dde0f6.js"
import"./createUl-25b39286.js"
import"./createButton-6e7396b9.js"
import"./createLi-7e31709a.js"
import{h as w}from"./hideElement-faecef36.js"
import"./indexAjaxJson-e486d467.js"
import{c as x}from"./csvSplit-7018cdb4.js"
import"./cmdExport-23cec039.js"
import{g as v}from"./getMembrList-d7782e14.js"
import{d as A,g as G}from"./getGroupStats-4919d05e.js"
import"./groupViewStats-839ced79.js"
const B=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const n=$("td",t).eq(2),e=B.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(s.indexOf(t[3])),e.setUTCFullYear(n),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,a).toString().substr(0,21)}</span>`)}function M(t,n){const e=$("td",n).first()
return e.html(function(t,n){const e=$("b",n).text()
return t[e]?`${S({last_login:t[e].last_login})}&nbsp;<a href="${a}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,n)),e}function T(t,n){return t[n]?t[n].level:0}function J(t,n,e){return T(t,e)-T(t,n)}function U(t,n){return t[n]?`<a href="${a}${t[n].id}">${n}</a>`:n}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,e,s){const a=M(t,s),o=$("td",s).eq(1),r=function(t,e){const s=x(e.html())
return s.length>1&&s.sort(n(J,t)),s}(t,o)
!function(t,n){const e=n.filter(y)
e.length>0&&t.append(A(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(a,r),function(t,e,s){const a=s.map(n(U,t))
e.html(`<span>${a.join(", ")}</span>`)}(t,o,r),N(s)}function k(s){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(D,s)),e("groups.doGroupPaint")}function q(t,n){const e=C({className:"custombutton",type:"button",value:n})
return o(t,"&nbsp;"),r(t,e),e}function z(t,n){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,s=t.parentNode.parentNode.previousElementSibling
o(s,e)}function L(t){G(t.href).then(n(z,t))}function R(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(L)}let E
function F(t){return!t.includes("#000099")}function H(t){g('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function I(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(x(h(e)).filter(F).length<E){const e=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(e,t)
!function(t,e){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(H,e))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],e)}}function O(){u("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(I)}function P(){const t=l('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
p("enableMaxGroupSizeToJoin")&&(E=p("maxGroupSizeToJoin"),w(t),function(t){const n=q(t,`Join All Groups < ${E} Members`)
i(n,O)}(n)),function(t){const n=q(t,"Fetch Group Stats")
i(n,R)}(n),d.subcmd2===f&&O()}export default function(){j()||(v(!1).then(k),function(){const t=p("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),P(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-43d0d26f.js.map
