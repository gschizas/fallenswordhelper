import{aV as t,t as n,aW as e,aE as s,a1 as a,i as o,h as r,o as i,D as c,C as l,G as p,c as d,c2 as f,U as u,B as h,m,u as b,A as g,x as j}from"./calfSystem-89b939c8.js"
import{c as C}from"./createInput-efc68c10.js"
import{o as x}from"./onlineDot-3ced5a13.js"
import"./currentGuildId-ae8f3699.js"
import"./intValue-cd93b930.js"
import"./fshOpen-e0d843ec.js"
import"./openQuickBuffByName-47f4b290.js"
import"./createUl-f8d9693f.js"
import"./idb-9be3057e.js"
import"./createButton-01e8c8ad.js"
import"./createLi-985f971f.js"
import{h as S}from"./hideElement-d2b16586.js"
import"./indexAjaxJson-dab169e3.js"
import"./cmdExport-788e7045.js"
import{c as w}from"./csvSplit-7b854e44.js"
import{g as G}from"./getMembrList-2a0664e8.js"
import{d as v,g as B}from"./getGroupStats-1deeeabc.js"
import"./groupViewStats-5b0d6cc7.js"
const A=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function N(t){const n=$("td",t).eq(2),e=A.exec(n.text()),a=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(s.indexOf(t[3])),e.setUTCFullYear(n),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,a).toString().substr(0,21)}</span>`)}function T(t,n){const e=$("td",n).first()
return e.html(function(t,n){const e=$("b",n).text()
return t[e]?`${x({last_login:t[e].last_login})}&nbsp;<a href="${a}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,n)),e}function U(t,n){return t[n]?t[n].level:0}function J(t,n,e){return U(t,e)-U(t,n)}function M(t,n){return t[n]?`<a href="${a}${t[n].id}">${n}</a>`:n}function y(t){return"[none]"!==t&&-1===t.indexOf("<font")}function D(t,e,s){const a=T(t,s),o=$("td",s).eq(1),r=function(t,e){const s=w(e.html())
return s.length>1&&s.sort(n(J,t)),s}(t,o)
!function(t,n){const e=n.filter(y)
e.length>0&&t.append(v(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(a,r),function(t,e,s){const a=s.map(n(M,t))
e.html(`<span>${a.join(", ")}</span>`)}(t,o,r),N(s)}function q(s){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(D,s)),e("groups.doGroupPaint")}function E(t,n){const e=C({className:"custombutton",type:"button",value:n})
return o(t,"&nbsp;"),r(t,e),e}function L(t,n){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,s=t.parentNode.parentNode.previousElementSibling
o(s,e)}function R(t){B(t.href).then(n(L,t))}function k(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(R)}let z
function F(t){return!t.includes("#000099")}function H(t){g('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function O(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(w(h(e)).filter(F).length<z){const e=m({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(e,t)
!function(t,e){b({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(H,e))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],e)}}function P(){u("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(O)}function V(){const t=l('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
p("enableMaxGroupSizeToJoin")&&(z=p("maxGroupSizeToJoin"),S(t),function(t){const n=E(t,`Join All Groups < ${z} Members`)
i(n,P)}(n)),function(t){const n=E(t,"Fetch Group Stats")
i(n,k)}(n),d.subcmd2===f&&P()}export default function(){j()||(G(!1).then(q),function(){const t=p("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),V(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-48fc601b.js.map
