import{u as t,v as e,C as n,M as i,G as r,ai as a,bl as s,m as l,bm as c,bn as o,A as d,p as u,t as m,ap as f,ao as h,bo as p}from"./calfSystem-019a589c.js"
import{d as b}from"./dataRows-faf31497.js"
import{p as $}from"./padZ-cba8efb8.js"
import"./closest-d8e60c46.js"
import{c as v}from"./closestTable-b1fa1c92.js"
import"./all-e4fd8fad.js"
import{s as N}from"./splitTime-95f1d273.js"
import{a as j}from"./allthen-c22b3f9e.js"
import{t as g}from"./textNodes-eebe83f9.js"
function y(e){return t({cmd:"guild",subcmd:"reliclist",page:e})}function x(t){const e=l({innerHTML:t}),n=function(t){const e=r(t).match(/(.*) \((\d+), (\d+)\)/)
return{name:e[1],x:Number(e[2]),y:Number(e[3])}}(e.children[1]),a=Number(r(e.children[2]).match(/(\d+)/)[1]),s=function(t){return i(t.childNodes).filter(g).map(r).map(t=>t.split(" "))}(e)
return{attributes:function(t){return t.filter(t=>c.includes(t[1])).map(t=>({id:c.indexOf(t[1]),is_percent:t[0].endsWith("%"),value:parseInt(t[0],10)}))}(s),enhancements:function(t){return t.filter(t=>o.includes(t[1])).map(t=>({id:o.indexOf(t[1]),value:Number(t[0])}))}(s),location:n,min_level:a}}function _(t){const e=function(t){const e=t.cells[0].children[0],n=x(e.dataset.tipped)
return{attributes:n.attributes,enhancements:n.enhancements,id:Number(e.src.match(/\/(\d+)\.gif/)[1]),location:n.location,min_level:n.min_level,name:r(t.cells[1].children[0])}}(t),n=function(t){const e=t.match(/(\d+) days, (\d+) hours, (\d+) mins, (\d+) secs/)
if(e)return 24*Number(e[1])*60*60+60*Number(e[2])*60+60*Number(e[3])+Number(e[4])}(r(t.cells[3]))
return a(n)||(e.time=n,e.guild=function(t){const e=t.children[0].rows[0].cells[1].children[0]
return{id:e.href.match(s)[1],name:r(e)}}(t.cells[2])),e}function G(t){const e=n(".header",t),i=v(e)
return b(i.rows,4,0).map(_)}function w(t){const n=t.map(e).map(G)
return[].concat(...n)}function C(t){const r=e(t),a=n('#pCC select[name="page"]',r),s=i(a.children).map(t=>Number(t.value)).filter(t=>0!==t)
return j([t].concat(s.map(y)),w)}function T(t,e){return e.id===t}function L(t){return t.attributes&&t.attributes.find(m(T,6))}function S(t,e){if(t){const n=t.find(m(T,e))
if(n)return n.value}return""}function k(t){return`<tr><td>${t.min_level}</td><td>${function(t){return`<a href="${f}relics${h}view&relic_id=${t.id}">`+t.name+"</a>"}(t)}</td><td>${n=t.guild,n?`<a href="${p}${n.id}">${n.name}</a>`:""}</td><td>${e=t.attributes,[6,0,4,5,7,8].map(m(S,e)).join("</td><td>")}</td><td>${function(t){if(!t)return""
const e=N(t)
return`${$(e[0])}d ${$(e[1])}h ${$(e[2])}m ${$(e[3])}s`}(t.time)}</td></tr>`
var e,n}function A(t){t.sort((t,e)=>t.min_level-e.min_level),d(function(t){return`<style>#pCC .reliclist {\n        border-collapse: collapse;\n        border-spacing: 0;\n        table-layout: fixed;\n      }\n      .reliclist, .reliclist th, .reliclist td {\n        border: 1px solid black;\n      }\n      .reliclist th, .reliclist td {\n        padding: 5px;\n      }\n      .reliclist th:nth-of-type(10), .reliclist td:nth-of-type(10) {\n        width: 100px;\n      }</style><table class="reliclist"><thead><tr><th>Level</th><th>Name</th><th>Guild</th><th>Stam<br>Gain</th><th>Atk</th><th>Dmg</th><th>Stam</th><th>Gold<br>Gain</th><th>XP<br>Gain</th><th>Time</th></tr></thead><tbody>${t.filter(L).map(k).join("")}</tbody></table>`}(t),u)}function M(){d("Loading...",u),y(0).then(C).then(A)}export default M
//# sourceMappingURL=reliclist-39f96862.js.map
