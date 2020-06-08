import{n as t,a2 as a,t as s,f as r,l as n,A as e,p as o,x as d}from"./calfSystem-a2862afc.js"
import{t as p}from"./toLowerCase-2574a84c.js"
import{a as l}from"./addCommas-f02ec3aa.js"
import"./currentGuildId-e84c528e.js"
import"./idb-911ff7c2.js"
import{c as i}from"./createTBody-9b48ed82.js"
import{c as m}from"./createTable-6dbc7d62.js"
import{c}from"./createTr-885e990c.js"
import"./indexAjaxJson-afc1ac85.js"
import"./cmdExport-356fd6f3.js"
import"./guild-4a5b1ef9.js"
import{g as f}from"./getMembrList-daab7ad2.js"
import{d as h}from"./daAdvisor-41ada9e9.js"
import{s as u,t as b}from"./table-38a3066c.js"
function j(t,s){return`<td><a href="${a}${t.player.id}">${t.player.name}</a></td><td>${t.player.level}</td><td>${t.player.rank}</td><td>${s[6]}</td><td>${s[7]}</td><td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td><td>${s[3]}</td><td>${s[4]}</td><td>${s[8]}</td><td>${s[5]}</td>`}function y(t){let{dom:a}=t
return a||(a=c({innerHTML:j(t,t.stats.map(l))})),a}function $(t,a){const s=t.tBodies[0],r=i()
for(const t of a)r.appendChild(y(t.value))
t.replaceChild(r,s)}const C=(t,a)=>({...a,player:{...a.player,lower:p(a.player.name),rank:t[a.player.name].rank_name,level:t[a.player.name].level}})
function T(t,a){return t.r.map(s(C,a))}function v(){return e("",o),r(o,n())}function x(a){const s=r(a,m({className:"fshSmartTable fshXSmall"}))
return r(s,t("thead",{innerHTML:'\n<th data-st-sort="player.lower"><span>Member</span></th>\n<th data-st-sort="player.level"><span>Lvl</span></th>\n<th data-st-sort="player.rank"><span>Rank</span></th>\n<th data-st-sort="stats.6"><span>Gold From<br>Deposits</span></th>\n<th data-st-sort="stats.7"><span>Gold From<br>Tax</span></th>\n<th data-st-sort="stats.0"><span>Gold Total</span></th>\n<th data-st-sort="stats.1"><span>FSP</span></th>\n<th data-st-sort="stats.2"><span>Skill<br>Cast</span></th>\n<th data-st-sort="stats.3"><span>Group<br>Create</span></th>\n<th data-st-sort="stats.4"><span>Group<br>Join</span></th>\n<th data-st-sort="stats.8"><span>Relic</span></th>\n<th data-st-sort="stats.5"><span>XP Contrib</span></th>\n'})),r(s,i()),s}function g([t,a]){const r=u(function(t,a){return{data:T(t,a),tableState:{sort:{},filter:{},search:{},slice:{page:1,size:50}}}}(t,a)),n=v(),e=x(n),o=b({el:n,table:r})
o.onDisplayChange(s($,e)),o.exec()}export default function(){d()||(e("Loading...",o),Promise.all([h(0),f(!1)]).then(g))}
//# sourceMappingURL=advisor-94e7889f.js.map
