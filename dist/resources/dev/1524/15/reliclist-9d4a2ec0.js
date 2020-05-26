import{t,u as e,M as n,ay as i,aQ as r,a9 as a,k as s,bj as c,bx as l,z as d,p as o,s as u,ai as m,ah as f,by as h}from"./calfSystem-ee582533.js"
import{d as p}from"./dataRows-b7cf82e5.js"
import{p as b}from"./padZ-55be60ec.js"
import"./closest-d675e111.js"
import{c as $}from"./closestTable-ffc1b5cf.js"
import"./all-b94d2d9d.js"
import{a as N}from"./allthen-f1914fd2.js"
import{s as v}from"./splitTime-a8f60ceb.js"
function g(e){return t({cmd:"guild",subcmd:"reliclist",page:e})}function j(t){const e=s({innerHTML:t}),n=function(t){const e=r(t).match(/(.*) \((\d+), (\d+)\)/)
return{name:e[1],x:Number(e[2]),y:Number(e[3])}}(e.children[1]),a=Number(r(e.children[2]).match(/(\d+)/)[1]),d=function(t){return i(t.childNodes).filter(t=>t.nodeType===Node.TEXT_NODE).map(r).map(t=>t.split(" "))}(e)
return{attributes:function(t){return t.filter(t=>c.includes(t[1])).map(t=>({id:c.indexOf(t[1]),is_percent:t[0].endsWith("%"),value:parseInt(t[0],10)}))}(d),enhancements:function(t){return t.filter(t=>l.includes(t[1])).map(t=>({id:l.indexOf(t[1]),value:Number(t[0])}))}(d),location:n,min_level:a}}function y(t){const e=function(t){const e=t.cells[0].children[0],n=j(e.dataset.tipped)
return{attributes:n.attributes,enhancements:n.enhancements,id:Number(e.src.match(/\/(\d+)\.gif/)[1]),location:n.location,min_level:n.min_level,name:r(t.cells[1].children[0])}}(t),n=function(t){const e=t.match(/(\d+) days, (\d+) hours, (\d+) mins, (\d+) secs/)
if(e)return 24*Number(e[1])*60*60+60*Number(e[2])*60+60*Number(e[3])+Number(e[4])}(r(t.cells[3]))
return a(n)||(e.time=n,e.guild=function(t){const e=t.children[0].rows[0].cells[1].children[0]
return{id:e.href.match(/&guild_id=(\d+)/)[1],name:r(e)}}(t.cells[2])),e}function _(t){const e=n(".header",t),i=$(e)
return p(i.rows,4,0).map(y)}function x(t){const n=t.map(e).map(_)
return[].concat(...n)}function T(t){const r=e(t),a=n('#pCC select[name="page"]',r),s=i(a.children).map(t=>Number(t.value)).filter(t=>0!==t)
return N([t].concat(s.map(g)),x)}function G(t,e){return e.id===t}function w(t){return t.attributes&&t.attributes.find(u(G,6))}function C(t,e){if(t){const n=t.find(u(G,e))
if(n)return n.value}return""}function k(t){return`<tr><td>${t.min_level}</td><td>${function(t){return`<a href="${m}relics${f}view&relic_id=${t.id}">`+t.name+"</a>"}(t)}</td><td>${n=t.guild,n?`<a href="${h}${n.id}">${n.name}</a>`:""}</td><td>${e=t.attributes,[6,0,4,5,7,8].map(u(C,e)).join("</td><td>")}</td><td>${function(t){if(!t)return""
const e=v(t)
return`${b(e[0])}d ${b(e[1])}h ${b(e[2])}m ${b(e[3])}s`}(t.time)}</td></tr>`
var e,n}function L(t){t.sort((t,e)=>t.min_level-e.min_level),d(function(t){return`<style>#pCC .reliclist {border-collapse: collapse; border-spacing: 0;}.reliclist, .reliclist th, .reliclist td {border: 1px solid black;}.reliclist th, .reliclist td {padding: 5px;}</style><table class="reliclist"><thead><tr><th>Level</th><th>Name</th><th>Guild</th><th>Stam<br>Gain</th><th>Atk</th><th>Dmg</th><th>Stam</th><th>Gold<br>Gain</th><th>XP<br>Gain</th><th>Time</th></tr></thead><tbody>${t.filter(w).map(k).join("")}</tbody></table>`}(t),o)}export default function(){d("Loading...",o),g(0).then(T).then(L)}
//# sourceMappingURL=reliclist-9d4a2ec0.js.map
