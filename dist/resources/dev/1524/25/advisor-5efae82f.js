import{n as t,a2 as a,t as s,h as r,m as n,A as e,p as o,x as d}from"./calfSystem-69dd5601.js"
import{t as p}from"./toLowerCase-c42114e1.js"
import{a as l}from"./addCommas-bdfe3cd5.js"
import"./currentGuildId-a0138513.js"
import"./idb-874fe815.js"
import{c as i}from"./createTBody-c786127c.js"
import{c as m}from"./createTable-ba9c0bc4.js"
import"./indexAjaxJson-2e5777a1.js"
import"./cmdExport-88c93b51.js"
import"./guild-bc028c80.js"
import{g as c}from"./getMembrList-c4f4787c.js"
import{d as h}from"./daAdvisor-32b4e069.js"
import{c as f}from"./createTr-54ff93cf.js"
import{s as u,t as b}from"./table-d6ea83f4.js"
function j(t,s){return`<td><a href="${a}${t.player.id}">${t.player.name}</a></td><td>${t.player.level}</td><td>${t.player.rank}</td><td>${s[6]}</td><td>${s[7]}</td><td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td><td>${s[3]}</td><td>${s[4]}</td><td>${s[8]}</td><td>${s[5]}</td>`}function y(t){let{dom:a}=t
return a||(a=f({innerHTML:j(t,t.stats.map(l))})),a}function $(t,a){const s=t.tBodies[0],r=i()
for(const t of a)r.appendChild(y(t.value))
t.replaceChild(r,s)}const C=(t,a)=>({...a,player:{...a.player,lower:p(a.player.name),rank:t[a.player.name].rank_name,level:t[a.player.name].level}})
function T(t,a){return t.r.map(s(C,a))}function v(){return e("",o),r(o,n())}function x(a){const s=r(a,m({className:"fshSmartTable fshXSmall"}))
return r(s,t("thead",{innerHTML:'\n<th data-st-sort="player.lower"><span>Member</span></th>\n<th data-st-sort="player.level"><span>Lvl</span></th>\n<th data-st-sort="player.rank"><span>Rank</span></th>\n<th data-st-sort="stats.6"><span>Gold From<br>Deposits</span></th>\n<th data-st-sort="stats.7"><span>Gold From<br>Tax</span></th>\n<th data-st-sort="stats.0"><span>Gold Total</span></th>\n<th data-st-sort="stats.1"><span>FSP</span></th>\n<th data-st-sort="stats.2"><span>Skill<br>Cast</span></th>\n<th data-st-sort="stats.3"><span>Group<br>Create</span></th>\n<th data-st-sort="stats.4"><span>Group<br>Join</span></th>\n<th data-st-sort="stats.8"><span>Relic</span></th>\n<th data-st-sort="stats.5"><span>XP Contrib</span></th>\n'})),r(s,i()),s}function g([t,a]){const r=u(function(t,a){return{data:T(t,a),tableState:{sort:{},filter:{},search:{},slice:{page:1,size:50}}}}(t,a)),n=v(),e=x(n),o=b({el:n,table:r})
o.onDisplayChange(s($,e)),o.exec()}function k(){d()||(e("Loading...",o),Promise.all([h(0),c(!1)]).then(g))}export default k
//# sourceMappingURL=advisor-5efae82f.js.map
