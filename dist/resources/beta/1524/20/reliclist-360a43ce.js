import{u as t,v as e,C as n,M as r,K as i,ai as a,bl as s,l as c,bm as l,bn as o,A as d,p as u,t as m,ap as f,ao as h,bo as p}from"./calfSystem-05554bae.js"
import{d as b}from"./dataRows-2cd1da8f.js"
import{p as $}from"./padZ-14d8d7ee.js"
import"./closest-a50421eb.js"
import"./all-e13706ab.js"
import{s as v}from"./splitTime-c50162dc.js"
import{a as N}from"./allthen-feed7e5f.js"
import{c as j}from"./closestTable-607ac1a3.js"
import{t as g}from"./textNodes-cb3ee45c.js"
function _(e){return t({cmd:"guild",subcmd:"reliclist",page:e})}function x(t){const e=c({innerHTML:t}),n=function(t){const e=i(t).match(/(.*) \((\d+), (\d+)\)/)
return{name:e[1],x:Number(e[2]),y:Number(e[3])}}(e.children[1]),a=Number(i(e.children[2]).match(/(\d+)/)[1]),s=function(t){return r(t.childNodes).filter(g).map(i).map(t=>t.split(" "))}(e)
return{attributes:function(t){return t.filter(t=>l.includes(t[1])).map(t=>({id:l.indexOf(t[1]),is_percent:t[0].endsWith("%"),value:parseInt(t[0],10)}))}(s),enhancements:function(t){return t.filter(t=>o.includes(t[1])).map(t=>({id:o.indexOf(t[1]),value:Number(t[0])}))}(s),location:n,min_level:a}}function y(t){const e=function(t){const e=t.cells[0].children[0],n=x(e.dataset.tipped)
return{attributes:n.attributes,enhancements:n.enhancements,id:Number(e.src.match(/\/(\d+)\.gif/)[1]),location:n.location,min_level:n.min_level,name:i(t.cells[1].children[0])}}(t),n=function(t){const e=t.match(/(\d+) days, (\d+) hours, (\d+) mins, (\d+) secs/)
if(e)return 24*Number(e[1])*60*60+60*Number(e[2])*60+60*Number(e[3])+Number(e[4])}(i(t.cells[3]))
return a(n)||(e.time=n,e.guild=function(t){const e=t.children[0].rows[0].cells[1].children[0]
return{id:e.href.match(s)[1],name:i(e)}}(t.cells[2])),e}function C(t){const e=n(".header",t),r=j(e)
return b(r.rows,4,0).map(y)}function G(t){const n=t.map(e).map(C)
return[].concat(...n)}function w(t){const i=e(t),a=n('#pCC select[name="page"]',i),s=r(a.children).map(t=>Number(t.value)).filter(t=>0!==t)
return N([t].concat(s.map(_)),G)}function T(t,e){return e.id===t}function L(t){return t.attributes&&t.attributes.find(m(T,6))}function S(t,e){if(t){const n=t.find(m(T,e))
if(n)return n.value}return""}function k(t){return`<tr><td>${t.min_level}</td><td>${function(t){return`<a href="${f}relics${h}view&relic_id=${t.id}">`+t.name+"</a>"}(t)}</td><td>${n=t.guild,n?`<a href="${p}${n.id}">${n.name}</a>`:""}</td><td>${e=t.attributes,[6,0,4,5,7,8].map(m(S,e)).join("</td><td>")}</td><td>${function(t){if(!t)return""
const e=v(t)
return`${$(e[0])}d ${$(e[1])}h ${$(e[2])}m ${$(e[3])}s`}(t.time)}</td></tr>`
var e,n}function A(t){t.sort((t,e)=>t.min_level-e.min_level),d(function(t){return`<style>#pCC .reliclist {border-collapse: collapse; border-spacing: 0;}.reliclist, .reliclist th, .reliclist td {border: 1px solid black;}.reliclist th, .reliclist td {padding: 5px;}</style><table class="reliclist"><thead><tr><th>Level</th><th>Name</th><th>Guild</th><th>Stam<br>Gain</th><th>Atk</th><th>Dmg</th><th>Stam</th><th>Gold<br>Gain</th><th>XP<br>Gain</th><th>Time</th></tr></thead><tbody>${t.filter(L).map(k).join("")}</tbody></table>`}(t),u)}export default function(){d("Loading...",u),_(0).then(w).then(A)}
//# sourceMappingURL=reliclist-360a43ce.js.map
