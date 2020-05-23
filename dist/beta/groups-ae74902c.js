import{bd as t,v as n,be as e,W as s,aK as a,a9 as o,i as r,h as i,o as c,N as l,R as d,G as u,n as f,e as p,ck as h,a0 as m,D as b,l as g,w as C,C as w,z as S}from"./calfSystem-fb94ddf0.js"
import{c as x}from"./createInput-ba8eca60.js"
import{o as j}from"./onlineDot-f63d817a.js"
import"./createUl-65b855dd.js"
import"./createButton-9e7c1e0f.js"
import{g as v}from"./getMembrList-bd693852.js"
import{d as G,g as N}from"./getGroupStats-e66e6538.js"
import"./groupViewStats-28e77f71.js"
const T=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function A(t){const n=$("td",t).eq(2),e=T.exec(n.text()),s=(new Date).getFullYear()
n.append(`<br><span class="fshBlue fshXSmall">Local: ${function(t,n){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(a.indexOf(t[3])),e.setUTCFullYear(n),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(e,s).toString().substr(0,21)}</span>`)}function B(t,n){const e=$("td",n).first()
return e.html(function(t,n){const e=$("b",n).text()
return t[e]?`${j({last_login:t[e].last_login})}&nbsp;<a href="${o}${t[e].id}"><b>${e}</b></a> [${t[e].level}]`:`<b>${e}</b>`}(t,n)),e}function M(t,n){return t[n]?t[n].level:0}function U(t,n,e){return M(t,e)-M(t,n)}function D(t,n){return t[n]?`<a href="${o}${t[n].id}">${n}</a>`:n}function J(t){return"[none]"!==t&&-1===t.indexOf("<font")}function R(t,e,a){const o=B(t,a),r=$("td",a).eq(1),i=function(t,e){const a=s(e.html())
return a.length>1&&a.sort(n(U,t)),a}(t,r)
!function(t,n){const e=n.filter(J)
e.length>0&&t.append(G(e)),t.append(`<span class="fshXSmall">Members: ${e.length}</span>`)}(o,i),function(t,e,s){const a=s.map(n(D,t))
e.html(`<span>${a.join(", ")}</span>`)}(t,r,i),A(a)}function q(s){t("groups.doGroupPaint"),$("#pCC table table table tr").has(".group-action-container").each(n(R,s)),e("groups.doGroupPaint")}function y(t,n){const e=x({className:"custombutton",type:"button",value:n})
return r(t,"&nbsp;"),i(t,e),e}function z(t,n){const e='<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td>'+`<td class="fshRight">${n.attack}</td>`+'<td class="fshBrown">Defense</td>'+`<td class="fshRight">${n.defense}</td>`+'</tr><tr><td class="fshBrown">Armor</td>'+`<td class="fshRight">${n.armor}</td>`+'<td class="fshBrown">Damage</td>'+`<td class="fshRight">${n.damage}</td>`+'</tr><tr><td class="fshBrown">HP</td>'+`<td class="fshRight">${n.hp}</td>`+'<td colspan="2"></td></tr></table>',s=t.parentNode.parentNode.previousElementSibling
r(s,e)}function k(t){N(t.href).then(n(z,t))}function L(t){t.target.disabled=!0,l('#pCC a[href*="=viewstats&"]').forEach(k)}let E
function F(t){return!t.includes("#000099")}function H(t){w('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function P(t){const e=t.parentNode.parentNode.parentNode.cells[1]
if(s(b(e)).filter(F).length<E){const e=g({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
t.parentNode.replaceChild(e,t),function(t,e){C({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:t}).then(n(H,e))}(/confirmJoin\((\d+)\)/.exec(t.href)[1],e)}}function X(){m("groups","joinAllGroupsUnderSize"),l('#pCC a[href*="confirmJoin"]').forEach(P)}function _(){const t=d('#pCC input[value="Join All Available Groups"]'),n=t.parentNode
u("enableMaxGroupSizeToJoin")&&(E=u("maxGroupSizeToJoin"),f(t),function(t){const n=y(t,`Join All Groups < ${E} Members`)
c(n,X)}(n)),function(t){const n=y(t,"Fetch Group Stats")
c(n,L)}(n),p.subcmd2===h&&X()}export default function(){S()||(v(!1).then(q),function(){const t=u("minGroupLevel")
t&&$("#pCC > table > tbody > tr > td > table td").first().append(`<span style="color:blue"> Current Min Level Setting: ${t}</span>`)}(),_(),function(){const t=$("#pCC td.header-dark")
t.eq(0).attr("width","20%"),t.eq(1).attr("width","51%"),t.eq(2).attr("width","22%"),t.eq(3).attr("width","7%")}())}
//# sourceMappingURL=groups-ae74902c.js.map
