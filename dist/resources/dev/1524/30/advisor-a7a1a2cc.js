import{n as t,a2 as a,t as s,h as r,m as e,A as n,p as o,x as d}from"./calfSystem-54df10e3.js"
import{t as p}from"./toLowerCase-5e186769.js"
import{a as l}from"./addCommas-508f0c08.js"
import"./currentGuildId-7eae4191.js"
import"./idb-7f0d2b39.js"
import{c as i}from"./createTBody-effa7e62.js"
import{c as m}from"./createTable-a5bfc655.js"
import"./indexAjaxJson-9f23f983.js"
import"./cmdExport-064541e3.js"
import"./guild-bcc0307e.js"
import{g as f}from"./getMembrList-c71eddc1.js"
import{d as c}from"./daAdvisor-869def49.js"
import{c as h}from"./createTr-b23f9a12.js"
import{s as u,t as b}from"./table-aa9fec1b.js"
function j(t,s){return`<td><a href="${a}${t.player.id}">${t.player.name}</a></td><td>${t.player.level}</td><td>${t.player.rank}</td><td>${s[6]}</td><td>${s[7]}</td><td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td><td>${s[3]}</td><td>${s[4]}</td><td>${s[8]}</td><td>${s[5]}</td>`}function y(t){let{dom:a}=t
return a||(a=h({innerHTML:j(t,t.stats.map(l))})),a}function $(t,a){const s=t.tBodies[0],r=i()
for(const t of a)r.appendChild(y(t.value))
t.replaceChild(r,s)}const C=(t,a)=>({...a,player:{...a.player,lower:p(a.player.name),rank:t[a.player.name].rank_name,level:t[a.player.name].level}})
function T(t,a){return t.r.map(s(C,a))}function v(){return n("",o),r(o,e())}function x(a){const s=r(a,m({className:"fshSmartTable fshXSmall"}))
return r(s,t("thead",{innerHTML:'\n<th data-st-sort="player.lower"><span>Member</span></th>\n<th data-st-sort="player.level"><span>Lvl</span></th>\n<th data-st-sort="player.rank"><span>Rank</span></th>\n<th data-st-sort="stats.6"><span>Gold From<br>Deposits</span></th>\n<th data-st-sort="stats.7"><span>Gold From<br>Tax</span></th>\n<th data-st-sort="stats.0"><span>Gold Total</span></th>\n<th data-st-sort="stats.1"><span>FSP</span></th>\n<th data-st-sort="stats.2"><span>Skill<br>Cast</span></th>\n<th data-st-sort="stats.3"><span>Group<br>Create</span></th>\n<th data-st-sort="stats.4"><span>Group<br>Join</span></th>\n<th data-st-sort="stats.8"><span>Relic</span></th>\n<th data-st-sort="stats.5"><span>XP Contrib</span></th>\n'})),r(s,i()),s}function g([t,a]){const r=u(function(t,a){return{data:T(t,a),tableState:{sort:{},filter:{},search:{},slice:{page:1,size:50}}}}(t,a)),e=v(),n=x(e),o=b({el:e,table:r})
o.onDisplayChange(s($,n)),o.exec()}function k(){d()||(n("Loading...",o),Promise.all([c(0),f(!1)]).then(g))}export default k
//# sourceMappingURL=advisor-a7a1a2cc.js.map
