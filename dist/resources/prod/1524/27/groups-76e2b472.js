import{t,A as s,B as e,i as n,a2 as o,h as a,aF as r,o as i,D as c,C as l,c as f,bZ as u,V as d,m as p,u as h,x as m,H as b}from"./calfSystem-3bdf319e.js"
import{c as g}from"./createInput-52b88e62.js"
import{o as j}from"./onlineDot-d9e2b3a9.js"
import"./currentGuildId-e8170186.js"
import"./intValue-ef353ded.js"
import"./fshOpen-da9a149e.js"
import"./openQuickBuffByName-223a30ec.js"
import"./createUl-4c832f49.js"
import"./idb-31fb041e.js"
import"./createButton-ef816a4f.js"
import"./createLi-ffa2cc54.js"
import{h as C}from"./hideElement-b0b3e820.js"
import"./chunk-001468bc.js"
import"./closest-79b9364e.js"
import{c as $}from"./closestTr-51fa459d.js"
import"./indexAjaxJson-5033dc48.js"
import"./cmdExport-7ba590c1.js"
import{c as S}from"./csvSplit-c9226810.js"
import{g as A}from"./getArrayByClassName-1fb66d0d.js"
import{g as w}from"./getMembrList-3ee4310f.js"
import{d as x,g as v}from"./getGroupStats-9db23c63.js"
import"./groupViewStats-0d5a3c82.js"
const B=/([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/
function T(t){const s=t.cells[3],o=B.exec(e(s)),a=(new Date).getFullYear()
n(s,`<br><span class="fshBlue fshXSmall">Local: ${function(t,s){const e=new Date
return e.setUTCDate(t[2]),e.setUTCMonth(r.indexOf(t[3])),e.setUTCFullYear(s),e.setUTCHours(t[4]),e.setUTCMinutes(t[5]),e}(o,a).toString().substr(0,21)}</span>`)}function N(t,s){return t[s]?t[s].level:0}function G(t,s,e){return N(t,e)-N(t,s)}function J(t,s){return t[s]?`<a href="${o}${t[s].id}">${s}</a>`:s}function M(t){return"[none]"!==t&&-1===t.indexOf("<font")}function y(r,i){const c=i.cells[0]
s(function(t,s){const n=e(s.children[0])
return t[n]?`${j({last_login:t[n].last_login})}&nbsp;<a href="${o}${t[n].id}"><b>${n}</b></a> [${t[n].level}]`:`<b>${n}</b>`}(r,c),c)
const l=i.cells[1],f=function(s,e){const n=S(e.innerHTML)
return n.length>1&&n.sort(t(G,s)),n}(r,l)
!function(t,s){const e=s.filter(M)
e.length>0&&a(t,x(e)),n(t,`<span class="fshXSmall">Members: ${e.length}</span>`)}(c,f),function(e,n,o){const a=o.map(t(J,e))
s(`<span>${a.join(", ")}</span>`,n)}(r,l,f),T(i)}function U(s){A("group-action-container").map(t=>$(t)).forEach(t(y,s))}function D(t,s){const e=g({className:"custombutton",type:"button",value:s})
return n(t,"&nbsp;"),a(t,e),e}function L(t,s){const e=`<table class="fshgrpstat"><tr><td class="fshBrown">Attack</td><td class="fshRight">${s.attack}</td><td class="fshBrown">Defense</td><td class="fshRight">${s.defense}</td></tr><tr><td class="fshBrown">Armor</td><td class="fshRight">${s.armor}</td><td class="fshBrown">Damage</td><td class="fshRight">${s.damage}</td></tr><tr><td class="fshBrown">HP</td><td class="fshRight">${s.hp}</td><td colspan="2"></td></tr></table>`,o=t.parentNode.parentNode.previousElementSibling
n(o,e)}function k(s){v(s.href).then(t(L,s))}function z(t){t.target.disabled=!0,c('#pCC a[href*="=viewstats&"]').forEach(k)}function E(t){return!t.includes("#000099")}function R(t){s('<span class="fshXSmall fshBlue" style="line-height: 19px;">Joined</span>',t)}function H(s){const n=s.parentNode.parentNode.parentNode.cells[1]
if(S(e(n)).filter(E).length<f.maxGroupSizeToJoin){const e=p({className:"group-action-link fshRelative",innerHTML:'<span class="fshSpinner fshSpinner12"></span>',style:{height:"19px",width:"19px"}})
s.parentNode.replaceChild(e,s)
!function(s,e){h({cmd:"guild",subcmd:"groups",subcmd2:"join",group_id:s}).then(t(R,e))}(/confirmJoin\((\d+)\)/.exec(s.href)[1],e)}}function F(){d("groups","joinAllGroupsUnderSize"),c('#pCC a[href*="confirmJoin"]').forEach(H)}function O(){const t=l('#pCC input[value="Join All Available Groups"]'),s=t.parentNode
f.enableMaxGroupSizeToJoin&&(C(t),function(t){const s=D(t,`Join All Groups < ${f.maxGroupSizeToJoin} Members`)
i(s,F)}(s)),function(t){const s=D(t,"Fetch Group Stats")
i(s,z)}(s),f.subcmd2===u&&F()}function V(){m()||(w(!1).then(U),function(){const t=b("minGroupLevel")
t&&n(l("#pCC > table > tbody > tr > td > table td"),`<div class="fshBlue"> Current Min Level Setting: ${t}</div>`)}(),O(),function(){const t=c("#pCC td.header-dark")
t[0].setAttribute("width","20%"),t[1].setAttribute("width","44%"),t[2].setAttribute("width","7%"),t[3].setAttribute("width","22%"),t[4].setAttribute("width","7%")}())}export default V
//# sourceMappingURL=groups-76e2b472.js.map
