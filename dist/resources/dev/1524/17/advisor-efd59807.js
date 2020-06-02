import{m as t,a0 as a,s,f as r,k as n,z as e,p as o,w as d}from"./calfSystem-1c103624.js"
import{t as p}from"./toLowerCase-9f60cfa4.js"
import{a as l}from"./addCommas-708246cb.js"
import"./currentGuildId-b6fa52f3.js"
import"./idb-347cc2af.js"
import{c as i}from"./createTBody-063a5f27.js"
import{c as m}from"./createTable-930c2471.js"
import"./indexAjaxJson-ed231bc3.js"
import{c}from"./createTr-c78e849f.js"
import"./cmdExport-15d3dc9a.js"
import"./guild-3ca78693.js"
import{g as f}from"./getMembrList-d1decafe.js"
import{d as h}from"./daAdvisor-98216bb6.js"
import{s as u,t as b}from"./table-73f31aa5.js"
function j(t,s){return`<td><a href="${a}${t.player.id}">${t.player.name}</a></td><td>${t.player.level}</td><td>${t.player.rank}</td><td>${s[6]}</td><td>${s[7]}</td><td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td><td>${s[3]}</td><td>${s[4]}</td><td>${s[8]}</td><td>${s[5]}</td>`}function y(t){let{dom:a}=t
return a||(a=c({innerHTML:j(t,t.stats.map(l))})),a}function $(t,a){const s=t.tBodies[0],r=i()
for(const t of a)r.appendChild(y(t.value))
t.replaceChild(r,s)}const C=(t,a)=>({...a,player:{...a.player,lower:p(a.player.name),rank:t[a.player.name].rank_name,level:t[a.player.name].level}})
function T(t,a){return t.r.map(s(C,a))}function k(){return e("",o),r(o,n())}function v(a){const s=r(a,m({className:"fshSmartTable fshXSmall"}))
return r(s,t("thead",{innerHTML:'\n<th data-st-sort="player.lower"><span>Member</span></th>\n<th data-st-sort="player.level"><span>Lvl</span></th>\n<th data-st-sort="player.rank"><span>Rank</span></th>\n<th data-st-sort="stats.6"><span>Gold From<br>Deposits</span></th>\n<th data-st-sort="stats.7"><span>Gold From<br>Tax</span></th>\n<th data-st-sort="stats.0"><span>Gold Total</span></th>\n<th data-st-sort="stats.1"><span>FSP</span></th>\n<th data-st-sort="stats.2"><span>Skill<br>Cast</span></th>\n<th data-st-sort="stats.3"><span>Group<br>Create</span></th>\n<th data-st-sort="stats.4"><span>Group<br>Join</span></th>\n<th data-st-sort="stats.8"><span>Relic</span></th>\n<th data-st-sort="stats.5"><span>XP Contrib</span></th>\n'})),r(s,i()),s}function g([t,a]){const r=u(function(t,a){return{data:T(t,a),tableState:{sort:{},filter:{},search:{},slice:{page:1,size:50}}}}(t,a)),n=k(),e=v(n),o=b({el:n,table:r})
o.onDisplayChange(s($,e)),o.exec()}export default function(){d()||(e("Loading...",o),Promise.all([h(0),f(!1)]).then(g))}
//# sourceMappingURL=advisor-efd59807.js.map
