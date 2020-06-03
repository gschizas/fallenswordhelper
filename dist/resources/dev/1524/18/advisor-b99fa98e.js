import{m as t,a0 as a,s,f as r,k as e,z as n,p as o,w as d}from"./calfSystem-5545a3e6.js"
import{t as p}from"./toLowerCase-57ae178d.js"
import{a as l}from"./addCommas-757dfba4.js"
import"./currentGuildId-2b105bba.js"
import"./idb-ab1a88c6.js"
import{c as i}from"./createTBody-14d36590.js"
import{c as m}from"./createTable-b1e7ce39.js"
import"./indexAjaxJson-06c0d970.js"
import{c}from"./createTr-687ae138.js"
import"./cmdExport-2a172ff1.js"
import"./guild-1eee44a3.js"
import{g as h}from"./getMembrList-964e1c8b.js"
import{d as f}from"./daAdvisor-71a110bb.js"
import{s as b,t as u}from"./table-2f069d27.js"
function j(t,s){return`<td><a href="${a}${t.player.id}">${t.player.name}</a></td><td>${t.player.level}</td><td>${t.player.rank}</td><td>${s[6]}</td><td>${s[7]}</td><td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td><td>${s[3]}</td><td>${s[4]}</td><td>${s[8]}</td><td>${s[5]}</td>`}function y(t){let{dom:a}=t
return a||(a=c({innerHTML:j(t,t.stats.map(l))})),a}function $(t,a){const s=t.tBodies[0],r=i()
for(const t of a)r.appendChild(y(t.value))
t.replaceChild(r,s)}const C=(t,a)=>({...a,player:{...a.player,lower:p(a.player.name),rank:t[a.player.name].rank_name,level:t[a.player.name].level}})
function T(t,a){return t.r.map(s(C,a))}function k(){return n("",o),r(o,e())}function v(a){const s=r(a,m({className:"fshSmartTable fshXSmall"}))
return r(s,t("thead",{innerHTML:'\n<th data-st-sort="player.lower"><span>Member</span></th>\n<th data-st-sort="player.level"><span>Lvl</span></th>\n<th data-st-sort="player.rank"><span>Rank</span></th>\n<th data-st-sort="stats.6"><span>Gold From<br>Deposits</span></th>\n<th data-st-sort="stats.7"><span>Gold From<br>Tax</span></th>\n<th data-st-sort="stats.0"><span>Gold Total</span></th>\n<th data-st-sort="stats.1"><span>FSP</span></th>\n<th data-st-sort="stats.2"><span>Skill<br>Cast</span></th>\n<th data-st-sort="stats.3"><span>Group<br>Create</span></th>\n<th data-st-sort="stats.4"><span>Group<br>Join</span></th>\n<th data-st-sort="stats.8"><span>Relic</span></th>\n<th data-st-sort="stats.5"><span>XP Contrib</span></th>\n'})),r(s,i()),s}function g([t,a]){const r=b(function(t,a){return{data:T(t,a),tableState:{sort:{},filter:{},search:{},slice:{page:1,size:50}}}}(t,a)),e=k(),n=v(e),o=u({el:e,table:r})
o.onDisplayChange(s($,n)),o.exec()}export default function(){d()||(n("Loading...",o),Promise.all([f(0),h(!1)]).then(g))}
//# sourceMappingURL=advisor-b99fa98e.js.map
