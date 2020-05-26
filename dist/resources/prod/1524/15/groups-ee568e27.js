import{s as t,ax as n,_ as e,i as s,f as a,o,I as r,L as i,D as c,c as l,c2 as f,R as d,A as p,k as u,t as h,z as m,w as b}from"./calfSystem-740ec4d2.js"
import{c as g}from"./createInput-e6e1d6b3.js"
import{o as j}from"./onlineDot-176ac2e8.js"
import"./currentGuildId-ce4d8404.js"
import"./intValue-576c2dec.js"
import"./fshOpen-78430220.js"
import"./openQuickBuffByName-e399773d.js"
import"./createUl-ebfbcd93.js"
import"./createButton-cf2f339d.js"
import"./createLi-1ed628b4.js"
import{h as C}from"./hideElement-f48178cf.js"
import"./indexAjaxJson-1e1af708.js"
import{c as x}from"./csvSplit-dbbb8019.js"
import"./cmdExport-7c541a4f.js"
import{g as S}from"./getMembrList-cd652176.js"
import{d as w,g as v}from"./getGroupStats-ee5c54b1.js"
import"./groupViewStats-f71b0e85.js"
const A=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function B(t){const e=$("td",t).eq(2),s=A.exec(e.text()),a=(new Date).getFullYear()
e.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,e){const s=new Date
return s.setUTCDate(t[2]),s.setUTCMonth(n.indexOf(t[3])),s.setUTCFullYear(e),s.setUTCHours(t[4]),s.setUTCMinutes(t[5]),s}(s,a).toString().substr(0,21)}</span>`)}function N(t,n){const s=$("td",n).first()
return s.html(function(t,n){const s=$("b",n).text()
return t[s]?`${j({last_login:t[s].last_login})}&nbsp;<a href="${e}${t[s].id}"><b>${s}</b></a> [${t[s].level}]`:`<b>${s}</b>`}(t,n)),s}function G(t,n){return t[n]?t[n].level:0}function T(t,n,e){return G(t,e)-G(t,n)}function J(t,n){return t[n]?`<a href="${e}${t[n].id}">${n}</a>`:n}function M(t){return"[none]"!==t&&-1===t.indexOf("<font")}function U(n,e,s){const a=N(n,s),o=$("td",s).eq(1),r=function(n,e){const s=x(e.html())
return s.length>1&&s.sort(t(T,n)),s}(n,o)
!function(t,n){const e=n.filter(M)
e.length>0&&t.append(w(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(a,r),function(n,e,s){const a=s.map(t(J,n))
e.html(`<span>${a.join(", ")}</span>`)}(n,o,r),B(s)}function y(n){$("#pCC table table table tr").has(".group-action-container").each(t(U,n))}function D(t,n){const e=g({className:"custombutton",type:"button",value:n})
return s(t,"&nbsp;"),a(t,e),e}function L(t,n){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${n.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${n.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${n.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${n.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${n.hp}</td><td colspan="2"></td></tr></table>`,a=t.parentNode.parentNode.previousElementSibling
s(a,e)}function R(n){v(n.href).then(t(L,n))}function k(t){t.target.disabled=!0,r('#pCC a[href*="=viewstats&"]').forEach(R)}let q
function z(t){return!t.includes("#000099")}function E(t){m('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function _(n){const e=n.parentNode.parentNode.parentNode.cells[1]
if(x(p(e)).filter(z).length<q){const e=u({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
n.parentNode.replaceChild(e,n)
!function(n,e){h({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:n}).then(t(E,e))}(/confirmJoin\((\d+)\)/.exec(n.href)[1],e)}}function F(){d("groups","joinAllGroupsUnderSize"),r('#pCC a[href*="confirmJoin"]').forEach(_)}function H(){const t=i('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
c("enableMaxGroupSizeToJoin")&&(q=c("maxGroupSizeToJoin"),C(t),function(t){const n=D(t,`Join All Groups < ${q} Members`)
o(n,F)}(n)),function(t){const n=D(t,"Fetch Group Stats")
o(n,k)}(n),l.subcmd2===f&&F()}export default function(){b()||(S(!1).then(y),function(){const t=c("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),H(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-ee568e27.js.map
