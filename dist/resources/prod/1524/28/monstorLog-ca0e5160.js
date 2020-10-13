import{q as t,aD as e,aq as s,e as a,ai as n,c as r,j as i,p as o,A as c,y as l,o as h,t as f,l as d}from"./calfSystem-a5da5210.js"
import"./toLowerCase-27ea448e.js"
import{a as p}from"./addCommas-8259c1a9.js"
import{g as u,s as m}from"./idb-2c141566.js"
import"./alpha-08ee6ec8.js"
import{d as g}from"./doSortParams-bead940f.js"
import{p as y,s as C,a as b}from"./stringSort-c63b1ae8.js"
function $(t){return`${t.min.toString()} - ${t.max.toString()}`}function k(t){return`<span class="fshNoWrap">${t[0]}: ${$(t[1])}</span>`}function j(t){if(function(t){return t&&s(t).length>0}(t)){let e='<span class="fshXXSmall">'
return e+=a(t).map(k).join("<br>"),e+"</span>"}return'<span class="fshGrey">**Missing**</span>'}function L(s,a){return t(s[a],{name:a,image:(n=s[a].image_id,`<img class="tip-static" src="${e}creatures/${n}.png" data-tipped="<img src='${e}creatures/${n}.png' width=200 height=200>" width=40 height=40>`),level:p(s[a].level),attack:$(s[a].attack),defense:$(s[a].defense),armor:$(s[a].armor),damage:$(s[a].damage),hp:$(s[a].hp),enhancements:j(s[a].enhancements)})
var n}function v(t){return"string"==typeof t?parseInt(t.replace(/,|#/g,""),10):t}function w(t,e){if(function(t){return!n(t.type)&&t.type>8}(t))return 1
if(function(t,e){return!n(t.type)&&e.type>8}(t,e))return-1
let s=y(t,r.sortBy,1),a=y(e,r.sortBy,1)
s=v(s),a=v(a)
return C(s-a)}let S,A
function E(){c("<span>No monster information! Please enable entity log and travel a bit to see the world</span>",S)}function _(t){return`<tr><td class="fshCenter">${t.image}</td><td>${t.name}</td><td class="fshCenter">${t.creature_class}</td><td class="fshCenter">${t.level}</td><td class="fshCenter">${t.attack}</td><td class="fshCenter">${t.defense}</td><td class="fshCenter">${t.armor}</td><td class="fshCenter">${t.damage}</td><td class="fshCenter">${t.hp}</td><td class="fshCenter">${t.enhancements}</td></tr>`}function B(){const t=l("entityTableOutput")
A&&t&&c(A.map(_).join(""),t)}function P(t){g(t)
!function(t){"string"===t?A.sort(b):A.sort(w)}(function(t){return t.getAttribute("sortType")||"string"}(t)),B()}function D(t){const{target:e}=t
if("clearEntityLog"===e.id)return m("fsh_monsterLog",""),void E();(function(t){return d("fshLink",t)&&t.hasAttribute("sortkey")})(e)&&P(e)}function O(t){t?(!function(t){A=s(t).map(f(L,t))}(t),r.sortBy="level",r.sortAsc=!0,A.sort(w),A&&(c('<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr class="fshBlack fshWhite"><td width="90%" class="fshCenter"><b>Entity Information</b></td><td width="10%">[<span id="clearEntityLog" class="fshPoint">Clear</span>]</td></tr></table><table cellspacing="1" cellpadding="2" border="0"><thead><tr class="fshVerySoftOrange"><th width="25%" class="fshLink" sortkey="name" colspan="2">Entity</th><th class="fshCenter fshLink" sortkey="creature_class">Class</th><th class="fshCenter fshLink" sortkey="level" sorttype="number">Lvl</th><th class="fshCenter">Attack</th><th class="fshCenter">Defence</th><th class="fshCenter">Armor</th><th class="fshCenter">Damage</th><th class="fshCenter">HP</th><th class="fshCenter">Enhancements</th></tr></thead><tbody id="entityTableOutput"></tbody></table>',S),h(S,D)),B()):E()}function T(t){i()&&function(t){S=t||o,S&&u("fsh_monsterLog").then(O)}(t)}export default T
//# sourceMappingURL=monstorLog-ca0e5160.js.map
