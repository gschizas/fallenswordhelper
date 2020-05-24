import{q as t,ab as a,a9 as s,u as r,f as n,k as e,B as o,p as d,y as p}from"./calfSystem-d96a3efd.js"
import{t as l}from"./toLowerCase-a0540d2c.js"
import{c as i}from"./createTBody-f70881cb.js"
import{c as h}from"./createTable-13920811.js"
import{c as m}from"./createTr-441d9d7e.js"
import{g as f}from"./getMembrList-5baa5a87.js"
import{d as c}from"./daAdvisor-99f78de3.js"
import{s as u,t as b}from"./table-182551f4.js"
function y(t,a){return`<td><a href="${s}${t.player.id}">${t.player.name}</a></td><td>${t.player.level}</td><td>${t.player.rank}</td><td>${a[6]}</td><td>${a[7]}</td><td>${a[0]}</td><td>${a[1]}</td><td>${a[2]}</td><td>${a[3]}</td><td>${a[4]}</td><td>${a[8]}</td><td>${a[5]}</td>`}function $(t){let{dom:s}=t
return s||(s=m({innerHTML:y(t,t.stats.map(a))})),s}function j(t,a){const s=t.tBodies[0],r=i()
for(const t of a)r.appendChild($(t.value))
t.replaceChild(r,s)}const T=(t,a)=>({...a,player:{...a.player,lower:l(a.player.name),rank:t[a.player.name].rank_name,level:t[a.player.name].level}})
function k(t,a){return t.r.map(r(T,a))}function v(){return o("",d),n(d,e())}function C(a){const s=n(a,h({className:"fshSmartTable fshXSmall"}))
return n(s,t("thead",{innerHTML:'\n<th data-st-sort="player.lower"><span>Member</span></th>\n<th data-st-sort="player.level"><span>Lvl</span></th>\n<th data-st-sort="player.rank"><span>Rank</span></th>\n<th data-st-sort="stats.6"><span>Gold From<br>Deposits</span></th>\n<th data-st-sort="stats.7"><span>Gold From<br>Tax</span></th>\n<th data-st-sort="stats.0"><span>Gold Total</span></th>\n<th data-st-sort="stats.1"><span>FSP</span></th>\n<th data-st-sort="stats.2"><span>Skill<br>Cast</span></th>\n<th data-st-sort="stats.3"><span>Group<br>Create</span></th>\n<th data-st-sort="stats.4"><span>Group<br>Join</span></th>\n<th data-st-sort="stats.8"><span>Relic</span></th>\n<th data-st-sort="stats.5"><span>XP Contrib</span></th>\n'})),n(s,i()),s}function L([t,a]){const s=u(function(t,a){return{data:k(t,a),tableState:{sort:{},filter:{},search:{},slice:{page:1,size:50}}}}(t,a)),n=v(),e=C(n),o=b({el:n,table:s})
o.onDisplayChange(r(j,e)),o.exec()}export default function(){p()||(o("Loading...",d),Promise.all([c(0),f(!1)]).then(L))}
//# sourceMappingURL=advisor-804a8d12.js.map
