import{q as t,aD as e,aq as s,e as n,ai as a,c as r,j as i,p as o,A as c,y as l,o as h,t as f,l as d}from"./calfSystem-019de1cf.js"
import"./toLowerCase-dda30e6b.js"
import{a as p}from"./addCommas-8cd7d96d.js"
import{g as u,s as m}from"./idb-1bb3cee2.js"
import"./alpha-ec0cb412.js"
import{d as g}from"./doSortParams-6f8a3671.js"
import{p as y,s as b,a as C}from"./stringSort-79797248.js"
function $(t){return`${t.min.toString()} - ${t.max.toString()}`}function k(t){return`<span class="fshNoWrap">${t[0]}: ${$(t[1])}</span>`}function j(t){if(function(t){return t&&s(t).length>0}(t)){let e='<span class="fshXXSmall">'
return e+=n(t).map(k).join("<br>"),e+"</span>"}return'<span class="fshGrey">**Missing**</span>'}function L(s,n){return t(s[n],{name:n,image:(a=s[n].image_id,`<img class="tip-static" src="${e}creatures/${a}.png" data-tipped="<img src='${e}creatures/${a}.png' width=200 height=200>" width=40 height=40>`),level:p(s[n].level),attack:$(s[n].attack),defense:$(s[n].defense),armor:$(s[n].armor),damage:$(s[n].damage),hp:$(s[n].hp),enhancements:j(s[n].enhancements)})
var a}function v(t){return"string"==typeof t?parseInt(t.replace(/,|#/g,""),10):t}function w(t,e){if(function(t){return!a(t.type)&&t.type>8}(t))return 1
if(function(t,e){return!a(t.type)&&e.type>8}(t,e))return-1
let s=y(t,r.sortBy,1),n=y(e,r.sortBy,1)
s=v(s),n=v(n)
return b(s-n)}let S,A
function E(){c("<span>No monster information! Please enable entity log and travel a bit to see the world</span>",S)}function _(t){return`<tr><td class="fshCenter">${t.image}</td><td>${t.name}</td><td class="fshCenter">${t.creature_class}</td><td class="fshCenter">${t.level}</td><td class="fshCenter">${t.attack}</td><td class="fshCenter">${t.defense}</td><td class="fshCenter">${t.armor}</td><td class="fshCenter">${t.damage}</td><td class="fshCenter">${t.hp}</td><td class="fshCenter">${t.enhancements}</td></tr>`}function B(){const t=l("entityTableOutput")
A&&t&&c(A.map(_).join(""),t)}function P(t){g(t)
!function(t){"string"===t?A.sort(C):A.sort(w)}(function(t){return t.getAttribute("sortType")||"string"}(t)),B()}function D(t){const{target:e}=t
if("clearEntityLog"===e.id)return m("fsh_monsterLog",""),void E();(function(t){return d("fshLink",t)&&t.hasAttribute("sortkey")})(e)&&P(e)}function O(t){t?(!function(t){A=s(t).map(f(L,t))}(t),r.sortBy="level",r.sortAsc=!0,A.sort(w),A&&(c('<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr class="fshBlack fshWhite"><td width="90%" class="fshCenter"><b>Entity Information</b></td><td width="10%">[<span id="clearEntityLog" class="fshPoint">Clear</span>]</td></tr></table><table cellspacing="1" cellpadding="2" border="0"><thead><tr class="fshVerySoftOrange"><th width="25%" class="fshLink" sortkey="name" colspan="2">Entity</th><th class="fshCenter fshLink" sortkey="creature_class">Class</th><th class="fshCenter fshLink" sortkey="level" sorttype="number">Lvl</th><th class="fshCenter">Attack</th><th class="fshCenter">Defence</th><th class="fshCenter">Armor</th><th class="fshCenter">Damage</th><th class="fshCenter">HP</th><th class="fshCenter">Enhancements</th></tr></thead><tbody id="entityTableOutput"></tbody></table>',S),h(S,D)),B()):E()}export default function(t){i()&&function(t){S=t||o,S&&u("fsh_monsterLog").then(O)}(t)}
//# sourceMappingURL=monstorLog-cdf7196a.js.map
