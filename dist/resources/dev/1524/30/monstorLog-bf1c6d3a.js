import{q as t,aH as s,au as e,e as n,ak as a,c as r,j as o,p as i,A as c,y as f,o as l,t as h,l as d}from"./calfSystem-54df10e3.js"
import"./toLowerCase-5e186769.js"
import{a as u}from"./addCommas-508f0c08.js"
import{g as p,s as m}from"./idb-7f0d2b39.js"
import"./alpha-e9f582ea.js"
import{d as g}from"./doSortParams-3b94fca6.js"
import{p as y,s as C,a as b}from"./stringSort-07149a08.js"
function $(t){return`${t.min.toString()} - ${t.max.toString()}`}function k(t){return`<span class="fshNoWrap">${t[0]}: ${$(t[1])}</span>`}function j(t){if(function(t){return t&&e(t).length>0}(t)){let s='<span class="fshXXSmall">'
return s+=n(t).map(k).join("<br>"),s+"</span>"}return'<span class="fshGrey">**Missing**</span>'}function L(e,n){return t(e[n],{name:n,image:(a=e[n].image_id,`<img class="tip-static" src="${s}creatures/${a}.png" data-tipped="<img src='${s}creatures/${a}.png' width=200 height=200>" width=40 height=40>`),level:u(e[n].level),attack:$(e[n].attack),defense:$(e[n].defense),armor:$(e[n].armor),damage:$(e[n].damage),hp:$(e[n].hp),enhancements:j(e[n].enhancements)})
var a}function v(t){return"string"==typeof t?parseInt(t.replace(/,|#/g,""),10):t}function w(t,s){if(function(t){return!a(t.type)&&t.type>8}(t))return 1
if(function(t,s){return!a(t.type)&&s.type>8}(t,s))return-1
let e=y(t,r.sortBy,1),n=y(s,r.sortBy,1)
e=v(e),n=v(n)
return C(e-n)}let S,A
function E(){c("<span>No monster information! Please enable entity log and travel a bit to see the world</span>",S)}function _(t){return`<tr><td class="fshCenter">${t.image}</td><td>${t.name}</td><td class="fshCenter">${t.creature_class}</td><td class="fshCenter">${t.level}</td><td class="fshCenter">${t.attack}</td><td class="fshCenter">${t.defense}</td><td class="fshCenter">${t.armor}</td><td class="fshCenter">${t.damage}</td><td class="fshCenter">${t.hp}</td><td class="fshCenter">${t.enhancements}</td></tr>`}function B(){const t=f("entityTableOutput")
A&&t&&c(A.map(_).join(""),t)}function P(t){g(t)
!function(t){"string"===t?A.sort(b):A.sort(w)}(function(t){return t.getAttribute("sortType")||"string"}(t)),B()}function O(t){const{target:s}=t
if("clearEntityLog"===s.id)return m("fsh_monsterLog",""),void E();(function(t){return d("fshLink",t)&&t.hasAttribute("sortkey")})(s)&&P(s)}function T(t){t?(!function(t){A=e(t).map(h(L,t))}(t),r.sortBy="level",r.sortAsc=!0,A.sort(w),A&&(c('<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr class="fshBlack fshWhite"><td width="90%" class="fshCenter"><b>Entity Information</b></td><td width="10%">[<span id="clearEntityLog" class="fshPoint">Clear</span>]</td></tr></table><table cellspacing="1" cellpadding="2" border="0"><thead><tr class="fshVerySoftOrange"><th width="25%" class="fshLink" sortkey="name" colspan="2">Entity</th><th class="fshCenter fshLink" sortkey="creature_class">Class</th><th class="fshCenter fshLink" sortkey="level" sorttype="number">Lvl</th><th class="fshCenter">Attack</th><th class="fshCenter">Defence</th><th class="fshCenter">Armor</th><th class="fshCenter">Damage</th><th class="fshCenter">HP</th><th class="fshCenter">Enhancements</th></tr></thead><tbody id="entityTableOutput"></tbody></table>',S),l(S,O)),B()):E()}function x(t){o()&&function(t){S=t||i,S&&p("fsh_monsterLog").then(T)}(t)}export default x
//# sourceMappingURL=monstorLog-bf1c6d3a.js.map
