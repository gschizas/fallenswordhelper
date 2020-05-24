import{aO as t,aE as e,aa as s,au as n,n as a,al as r,c as i,j as c,ag as o,p as l,B as h,z as f,o as d,u,ai as p}from"./calfSystem-d587d232.js"
import"./toLowerCase-f57cc259.js"
import"./alpha-7dc073eb.js"
import{d as m}from"./doSortParams-8eece205.js"
import{p as g,s as y,a as C}from"./stringSort-e9162850.js"
function b(t){return`${t.min.toString()} - ${t.max.toString()}`}function $(t){return`<span class="fshNoWrap">${t[0]}: ${b(t[1])}</span>`}function k(t){if(function(t){return t&&n(t).length>0}(t)){let e='<span class="fshXXSmall">'
return e+=a(t).map($).join("<br>"),e+"</span>"}return'<span class="fshGrey">**Missing**</span>'}function L(n,a){return t(n[a],{name:a,image:(r=n[a].image_id,`<img class="tip-static" src="${e}creatures/${r}.png" data-tipped="<img src='${e}creatures/${r}.png' width=200 height=200>" width=40 height=40>`),level:s(n[a].level),attack:b(n[a].attack),defense:b(n[a].defense),armor:b(n[a].armor),damage:b(n[a].damage),hp:b(n[a].hp),enhancements:k(n[a].enhancements)})
var r}function v(t){return"string"==typeof t?parseInt(t.replace(/,|#/g,""),10):t}function j(t,e){if(function(t){return!r(t.type)&&t.type>8}(t))return 1
if(function(t,e){return!r(t.type)&&e.type>8}(t,e))return-1
let s=g(t,i.sortBy,1),n=g(e,i.sortBy,1)
s=v(s),n=v(n)
return y(s-n)}let w,S
function E(){h("<span>No monster information! Please enable entity log and travel a bit to see the world</span>",w)}function A(t){return`<tr><td class="fshCenter">${t.image}</td><td>${t.name}</td><td class="fshCenter">${t.creature_class}</td><td class="fshCenter">${t.level}</td><td class="fshCenter">${t.attack}</td><td class="fshCenter">${t.defense}</td><td class="fshCenter">${t.armor}</td><td class="fshCenter">${t.damage}</td><td class="fshCenter">${t.hp}</td><td class="fshCenter">${t.enhancements}</td></tr>`}function B(){const t=f("entityTableOutput")
S&&t&&h(S.map(A).join(""),t)}function _(t){m(t)
!function(t){"string"===t?S.sort(C):S.sort(j)}(function(t){return t.getAttribute("sortType")||"string"}(t)),B()}function O(t){const{target:e}=t
if("clearEntityLog"===e.id)return p("fsh_monsterLog",""),void E();(function(t){return t.classList.contains("fshLink")&&t.hasAttribute("sortkey")})(e)&&_(e)}function P(t){t?(!function(t){S=n(t).map(u(L,t))}(t),i.sortBy="level",i.sortAsc=!0,S.sort(j),S&&(h('<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr class="fshBlack fshWhite"><td width="90%" class="fshCenter"><b>Entity Information</b></td><td width="10%">[<span id="clearEntityLog" class="fshPoint">Clear</span>]</td></tr></table><table cellspacing="1" cellpadding="2" border="0"><thead><tr class="fshVerySoftOrange"><th width="25%" class="fshLink" sortkey="name" colspan="2">Entity</th><th class="fshCenter fshLink" sortkey="creature_class">Class</th><th class="fshCenter fshLink" sortkey="level" sorttype="number">Lvl</th><th class="fshCenter">Attack</th><th class="fshCenter">Defence</th><th class="fshCenter">Armor</th><th class="fshCenter">Damage</th><th class="fshCenter">HP</th><th class="fshCenter">Enhancements</th></tr></thead><tbody id="entityTableOutput"></tbody></table>',w),d(w,O)),B()):E()}export default function(t){c()&&function(t){w=t||l,w&&o("fsh_monsterLog").then(P)}(t)}
//# sourceMappingURL=monstorLog-e3520b14.js.map
