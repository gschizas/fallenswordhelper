import{q as t,aE as s,ar as e,e as a,aj as n,c as r,j as o,p as i,A as c,y as l,o as f,t as h,l as d}from"./calfSystem-70c7a660.js"
import"./toLowerCase-33399b5a.js"
import{a as p}from"./addCommas-e12eda5f.js"
import{g as u,s as m}from"./idb-d93da5f0.js"
import"./alpha-d5278d39.js"
import{d as g}from"./doSortParams-d042c16f.js"
import{p as y,s as C,a as b}from"./stringSort-03aea817.js"
function $(t){return`${t.min.toString()} - ${t.max.toString()}`}function k(t){return`<span class="fshNoWrap">${t[0]}: ${$(t[1])}</span>`}function j(t){if(function(t){return t&&e(t).length>0}(t)){let s='<span class="fshXXSmall">'
return s+=a(t).map(k).join("<br>"),s+"</span>"}return'<span class="fshGrey">**Missing**</span>'}function L(e,a){return t(e[a],{name:a,image:(n=e[a].image_id,`<img class="tip-static" src="${s}creatures/${n}.png" data-tipped="<img src='${s}creatures/${n}.png' width=200 height=200>" width=40 height=40>`),level:p(e[a].level),attack:$(e[a].attack),defense:$(e[a].defense),armor:$(e[a].armor),damage:$(e[a].damage),hp:$(e[a].hp),enhancements:j(e[a].enhancements)})
var n}function v(t){return"string"==typeof t?parseInt(t.replace(/,|#/g,""),10):t}function w(t,s){if(function(t){return!n(t.type)&&t.type>8}(t))return 1
if(function(t,s){return!n(t.type)&&s.type>8}(t,s))return-1
let e=y(t,r.sortBy,1),a=y(s,r.sortBy,1)
e=v(e),a=v(a)
return C(e-a)}let S,A
function E(){c("<span>No monster information! Please enable entity log and travel a bit to see the world</span>",S)}function _(t){return`<tr><td class="fshCenter">${t.image}</td><td>${t.name}</td><td class="fshCenter">${t.creature_class}</td><td class="fshCenter">${t.level}</td><td class="fshCenter">${t.attack}</td><td class="fshCenter">${t.defense}</td><td class="fshCenter">${t.armor}</td><td class="fshCenter">${t.damage}</td><td class="fshCenter">${t.hp}</td><td class="fshCenter">${t.enhancements}</td></tr>`}function B(){const t=l("entityTableOutput")
A&&t&&c(A.map(_).join(""),t)}function P(t){g(t)
!function(t){"string"===t?A.sort(b):A.sort(w)}(function(t){return t.getAttribute("sortType")||"string"}(t)),B()}function O(t){const{target:s}=t
if("clearEntityLog"===s.id)return m("fsh_monsterLog",""),void E();(function(t){return d("fshLink",t)&&t.hasAttribute("sortkey")})(s)&&P(s)}function T(t){t?(!function(t){A=e(t).map(h(L,t))}(t),r.sortBy="level",r.sortAsc=!0,A.sort(w),A&&(c('<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr class="fshBlack fshWhite"><td width="90%" class="fshCenter"><b>Entity Information</b></td><td width="10%">[<span id="clearEntityLog" class="fshPoint">Clear</span>]</td></tr></table><table cellspacing="1" cellpadding="2" border="0"><thead><tr class="fshVerySoftOrange"><th width="25%" class="fshLink" sortkey="name" colspan="2">Entity</th><th class="fshCenter fshLink" sortkey="creature_class">Class</th><th class="fshCenter fshLink" sortkey="level" sorttype="number">Lvl</th><th class="fshCenter">Attack</th><th class="fshCenter">Defence</th><th class="fshCenter">Armor</th><th class="fshCenter">Damage</th><th class="fshCenter">HP</th><th class="fshCenter">Enhancements</th></tr></thead><tbody id="entityTableOutput"></tbody></table>',S),f(S,O)),B()):E()}function x(t){o()&&function(t){S=t||i,S&&u("fsh_monsterLog").then(T)}(t)}export default x
//# sourceMappingURL=monstorLog-7f3c775d.js.map
