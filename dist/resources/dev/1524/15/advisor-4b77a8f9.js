import{m as t,$ as a,s,f as r,k as n,z as e,p as o,w as d}from"./calfSystem-ee582533.js"
import{t as p}from"./toLowerCase-6383ba3b.js"
import{a as l}from"./addCommas-f872a1dc.js"
import"./currentGuildId-0564d9a0.js"
import{c as i}from"./createTBody-aa153e3a.js"
import{c as m}from"./createTable-cbb3667c.js"
import"./indexAjaxJson-e486d467.js"
import{c}from"./createTr-bfcbc414.js"
import"./cmdExport-23cec039.js"
import{g as h}from"./getMembrList-d7782e14.js"
import{d as f}from"./daAdvisor-1d804899.js"
import{s as u,t as b}from"./table-8071787a.js"
function y(t,s){return`<td><a href="${a}${t.player.id}">${t.player.name}</a></td><td>${t.player.level}</td><td>${t.player.rank}</td><td>${s[6]}</td><td>${s[7]}</td><td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td><td>${s[3]}</td><td>${s[4]}</td><td>${s[8]}</td><td>${s[5]}</td>`}function $(t){let{dom:a}=t
return a||(a=c({innerHTML:y(t,t.stats.map(l))})),a}function j(t,a){const s=t.tBodies[0],r=i()
for(const t of a)r.appendChild($(t.value))
t.replaceChild(r,s)}const C=(t,a)=>({...a,player:{...a.player,lower:p(a.player.name),rank:t[a.player.name].rank_name,level:t[a.player.name].level}})
function T(t,a){return t.r.map(s(C,a))}function k(){return e("",o),r(o,n())}function v(a){const s=r(a,m({className:"fshSmartTable fshXSmall"}))
return r(s,t("thead",{innerHTML:'\n<th data-st-sort="player.lower"><span>Member</span></th>\n<th data-st-sort="player.level"><span>Lvl</span></th>\n<th data-st-sort="player.rank"><span>Rank</span></th>\n<th data-st-sort="stats.6"><span>Gold From<br>Deposits</span></th>\n<th data-st-sort="stats.7"><span>Gold From<br>Tax</span></th>\n<th data-st-sort="stats.0"><span>Gold Total</span></th>\n<th data-st-sort="stats.1"><span>FSP</span></th>\n<th data-st-sort="stats.2"><span>Skill<br>Cast</span></th>\n<th data-st-sort="stats.3"><span>Group<br>Create</span></th>\n<th data-st-sort="stats.4"><span>Group<br>Join</span></th>\n<th data-st-sort="stats.8"><span>Relic</span></th>\n<th data-st-sort="stats.5"><span>XP Contrib</span></th>\n'})),r(s,i()),s}function x([t,a]){const r=u(function(t,a){return{data:T(t,a),tableState:{sort:{},filter:{},search:{},slice:{page:1,size:50}}}}(t,a)),n=k(),e=v(n),o=b({el:n,table:r})
o.onDisplayChange(s(j,e)),o.exec()}export default function(){d()||(e("Loading...",o),Promise.all([f(0),h(!1)]).then(x))}
//# sourceMappingURL=advisor-4b77a8f9.js.map
