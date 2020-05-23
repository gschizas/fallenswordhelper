import{r as t,ac as a,aa as s,v as r,h as n,l as e,C as o,p as d,z as p}from"./calfSystem-70b0df7f.js"
import{t as l}from"./toLowerCase-28f7d145.js"
import{c as i}from"./createTBody-9634aab5.js"
import{c as h}from"./createTable-1e93d178.js"
import{c as m}from"./createTr-cac59b2b.js"
import{g as c}from"./getMembrList-e5ee3d0f.js"
import{d as f}from"./daAdvisor-41bf86cf.js"
import{s as u,t as b}from"./table-dee35a52.js"
function y(t,a){return"<td>"+`<a href="${s}${t.player.id}">${t.player.name}</a>`+"</td>"+`<td>${t.player.level}</td>`+`<td>${t.player.rank}</td>`+`<td>${a[6]}</td>`+`<td>${a[7]}</td>`+`<td>${a[0]}</td>`+`<td>${a[1]}</td>`+`<td>${a[2]}</td>`+`<td>${a[3]}</td>`+`<td>${a[4]}</td>`+`<td>${a[8]}</td>`+`<td>${a[5]}</td>`}function $(t){let{dom:s}=t
return s||(s=m({innerHTML:y(t,t.stats.map(a))})),s}function j(t,a){const s=t.tBodies[0],r=i()
for(const t of a)r.appendChild($(t.value))
t.replaceChild(r,s)}const v=(t,a)=>({...a,player:{...a.player,lower:l(a.player.name),rank:t[a.player.name].rank_name,level:t[a.player.name].level}})
function C(t,a){return t.r.map(r(v,a))}function T(){return o("",d),n(d,e())}function k(a){const s=n(a,h({className:"fshSmartTable fshXSmall"}))
return n(s,t("thead",{innerHTML:'\n<th data-st-sort="player.lower"><span>Member</span></th>\n<th data-st-sort="player.level"><span>Lvl</span></th>\n<th data-st-sort="player.rank"><span>Rank</span></th>\n<th data-st-sort="stats.6"><span>Gold From<br>Deposits</span></th>\n<th data-st-sort="stats.7"><span>Gold From<br>Tax</span></th>\n<th data-st-sort="stats.0"><span>Gold Total</span></th>\n<th data-st-sort="stats.1"><span>FSP</span></th>\n<th data-st-sort="stats.2"><span>Skill<br>Cast</span></th>\n<th data-st-sort="stats.3"><span>Group<br>Create</span></th>\n<th data-st-sort="stats.4"><span>Group<br>Join</span></th>\n<th data-st-sort="stats.8"><span>Relic</span></th>\n<th data-st-sort="stats.5"><span>XP Contrib</span></th>\n'})),n(s,i()),s}function L([t,a]){const s=u(function(t,a){return{data:C(t,a),tableState:{sort:{},filter:{},search:{},slice:{page:1,size:50}}}}(t,a)),n=T(),e=k(n),o=b({el:n,table:s})
o.onDisplayChange(r(j,e)),o.exec()}export default function(){p()||(o("Loading...",d),Promise.all([f(0),c(!1)]).then(L))}
//# sourceMappingURL=advisor-e6fd45db.js.map
