import{r as t,ac as a,aa as s,v as r,h as n,l as e,C as o,p as d,z as p}from"./calfSystem-0e5d6faf.js"
import{t as l}from"./toLowerCase-adcc7aa6.js"
import{c as i}from"./createTBody-06cfd36a.js"
import{c as h}from"./createTable-0ea5d31f.js"
import{c}from"./createTr-7ca77502.js"
import{g as m}from"./getMembrList-e4793951.js"
import{d as f}from"./daAdvisor-c5368ad5.js"
import{s as u,t as y}from"./table-3d262889.js"
function $(t,a){return"<td>"+`<a href="${s}${t.player.id}">${t.player.name}</a>`+"</td>"+`<td>${t.player.level}</td>`+`<td>${t.player.rank}</td>`+`<td>${a[6]}</td>`+`<td>${a[7]}</td>`+`<td>${a[0]}</td>`+`<td>${a[1]}</td>`+`<td>${a[2]}</td>`+`<td>${a[3]}</td>`+`<td>${a[4]}</td>`+`<td>${a[8]}</td>`+`<td>${a[5]}</td>`}function b(t){let{dom:s}=t
return s||(s=c({innerHTML:$(t,t.stats.map(a))})),s}function j(t,a){const s=t.tBodies[0],r=i()
for(const t of a)r.appendChild(b(t.value))
t.replaceChild(r,s)}const v=(t,a)=>({...a,player:{...a.player,lower:l(a.player.name),rank:t[a.player.name].rank_name,level:t[a.player.name].level}})
function C(t,a){return t.r.map(r(v,a))}function T(){return o("",d),n(d,e())}function k(a){const s=n(a,h({className:"fshSmartTable fshXSmall"}))
return n(s,t("thead",{innerHTML:'\n<th data-st-sort="player.lower"><span>Member</span></th>\n<th data-st-sort="player.level"><span>Lvl</span></th>\n<th data-st-sort="player.rank"><span>Rank</span></th>\n<th data-st-sort="stats.6"><span>Gold From<br>Deposits</span></th>\n<th data-st-sort="stats.7"><span>Gold From<br>Tax</span></th>\n<th data-st-sort="stats.0"><span>Gold Total</span></th>\n<th data-st-sort="stats.1"><span>FSP</span></th>\n<th data-st-sort="stats.2"><span>Skill<br>Cast</span></th>\n<th data-st-sort="stats.3"><span>Group<br>Create</span></th>\n<th data-st-sort="stats.4"><span>Group<br>Join</span></th>\n<th data-st-sort="stats.8"><span>Relic</span></th>\n<th data-st-sort="stats.5"><span>XP Contrib</span></th>\n'})),n(s,i()),s}function L([t,a]){const s=u(function(t,a){return{data:C(t,a),tableState:{sort:{},filter:{},search:{},slice:{page:1,size:50}}}}(t,a)),n=T(),e=k(n),o=y({el:n,table:s})
o.onDisplayChange(r(j,e)),o.exec()}export default function(){p()||(o("Loading...",d),Promise.all([f(0),m(!1)]).then(L))}
//# sourceMappingURL=advisor-ff4c8fee.js.map
