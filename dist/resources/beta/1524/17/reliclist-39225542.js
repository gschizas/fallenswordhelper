import{t,u as e,M as n,aD as r,a8 as i,ah as a,k as s,bl as c,bm as l,z as d,p as o,s as u,ao as m,an as f,bn as h}from"./calfSystem-02ae8657.js"
import{d as p}from"./dataRows-1cf551f5.js"
import{p as b}from"./padZ-ee453f37.js"
import"./closest-8af29cf3.js"
import{c as $}from"./closestTable-704cfbde.js"
import"./all-5d0e9d43.js"
import{a as v}from"./allthen-9e407c02.js"
import{t as N}from"./textNodes-7ca5316b.js"
import{s as g}from"./splitTime-3800c4e0.js"
function j(e){return t({cmd:"guild",subcmd:"reliclist",page:e})}function _(t){const e=s({innerHTML:t}),n=function(t){const e=i(t).match(/(.*) \((\d+), (\d+)\)/)
return{name:e[1],x:Number(e[2]),y:Number(e[3])}}(e.children[1]),a=Number(i(e.children[2]).match(/(\d+)/)[1]),d=function(t){return r(t.childNodes).filter(N).map(i).map(t=>t.split(" "))}(e)
return{attributes:function(t){return t.filter(t=>c.includes(t[1])).map(t=>({id:c.indexOf(t[1]),is_percent:t[0].endsWith("%"),value:parseInt(t[0],10)}))}(d),enhancements:function(t){return t.filter(t=>l.includes(t[1])).map(t=>({id:l.indexOf(t[1]),value:Number(t[0])}))}(d),location:n,min_level:a}}function x(t){const e=function(t){const e=t.cells[0].children[0],n=_(e.dataset.tipped)
return{attributes:n.attributes,enhancements:n.enhancements,id:Number(e.src.match(/\/(\d+)\.gif/)[1]),location:n.location,min_level:n.min_level,name:i(t.cells[1].children[0])}}(t),n=function(t){const e=t.match(/(\d+) days, (\d+) hours, (\d+) mins, (\d+) secs/)
if(e)return 24*Number(e[1])*60*60+60*Number(e[2])*60+60*Number(e[3])+Number(e[4])}(i(t.cells[3]))
return a(n)||(e.time=n,e.guild=function(t){const e=t.children[0].rows[0].cells[1].children[0]
return{id:e.href.match(/&guild_id=(\d+)/)[1],name:i(e)}}(t.cells[2])),e}function y(t){const e=n(".header",t),r=$(e)
return p(r.rows,4,0).map(x)}function G(t){const n=t.map(e).map(y)
return[].concat(...n)}function w(t){const i=e(t),a=n('#pCC select[name="page"]',i),s=r(a.children).map(t=>Number(t.value)).filter(t=>0!==t)
return v([t].concat(s.map(j)),G)}function C(t,e){return e.id===t}function T(t){return t.attributes&&t.attributes.find(u(C,6))}function k(t,e){if(t){const n=t.find(u(C,e))
if(n)return n.value}return""}function L(t){return`<tr><td>${t.min_level}</td><td>${function(t){return`<a href="${m}relics${f}view&relic_id=${t.id}">`+t.name+"</a>"}(t)}</td><td>${n=t.guild,n?`<a href="${h}${n.id}">${n.name}</a>`:""}</td><td>${e=t.attributes,[6,0,4,5,7,8].map(u(k,e)).join("</td><td>")}</td><td>${function(t){if(!t)return""
const e=g(t)
return`${b(e[0])}d ${b(e[1])}h ${b(e[2])}m ${b(e[3])}s`}(t.time)}</td></tr>`
var e,n}function S(t){t.sort((t,e)=>t.min_level-e.min_level),d(function(t){return`<style>#pCC .reliclist {border-collapse: collapse; border-spacing: 0;}.reliclist, .reliclist th, .reliclist td {border: 1px solid black;}.reliclist th, .reliclist td {padding: 5px;}</style><table class="reliclist"><thead><tr><th>Level</th><th>Name</th><th>Guild</th><th>Stam<br>Gain</th><th>Atk</th><th>Dmg</th><th>Stam</th><th>Gold<br>Gain</th><th>XP<br>Gain</th><th>Time</th></tr></thead><tbody>${t.filter(T).map(L).join("")}</tbody></table>`}(t),o)}export default function(){d("Loading...",o),j(0).then(w).then(S)}
//# sourceMappingURL=reliclist-39225542.js.map
