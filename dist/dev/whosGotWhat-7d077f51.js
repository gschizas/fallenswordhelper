import{v as t,ac as e,bN as a,az as s,C as r,p as n,bO as o,h as i,l as c,f as l,o as d}from"./calfSystem-94018cd0.js"
import{t as m}from"./toLowerCase-5662df04.js"
import{c as p}from"./createInput-cfb8faf0.js"
import{c as u}from"./createTBody-4db6f281.js"
import{c as f}from"./createTable-f30811ff.js"
import{c as h}from"./createButton-080d3bb7.js"
import"./all-e6dbe465.js"
import{a as v}from"./allthen-55ea9059.js"
import{c as b}from"./createTr-d40f5baa.js"
import{g}from"./guildStore-a2f15cc6.js"
import{c as _}from"./createSelect-ac84aa43.js"
import{s as y,t as P,p as k,a as j}from"./table-982bd26c.js"
function x(t,e,a){const s=t.tBodies[0],r=u()
for(const t of a)r.appendChild((n=t.value,o=void 0,n.dom||(n.dom=b({innerHTML:(o=n,`<td>${o.slot}</td>`+`<td>${o.name}</td>`+`<td>${o.level}</td>`+`<td>${o.rank_name}</td>`+`<td>${o.gxp}</td>`+`<td>${o.activity}</td>`+`<td>${o.pack}</td>`+`<td>${o.stam}</td>`)})),n.dom))
var n,o
t.replaceChild(r,s)}function L(t,e){return 11503===e.item_id&&(t[e.player_id]=t[e.player_id]||[],t[e.player_id].push(e)),t}function T(t,e){return{...e,rank_name:t}}function $(e){return e.members.map(t(T,e.name))}function M(t,r,n){return{...r,slot:n+1,name_lower:m(r.name),lvl_reverse:0-r.level,rank_lower:m(r.rank_name.trim()),gxp:e(r.guild_xp),gxp_reverse:0-r.guild_xp,activity:a(r.last_activity),act:r.last_activity-s,pack:(t[r.id]||[]).length,pack_reverse:0-(t[r.id]||[]).length,stam:e(r.current_stamina),stam_reverse:0-r.current_stamina}}function S([e,a]){const s=e.items.reduce(L,{})
return function(t){return[].concat(...t.r.ranks.map($))}(a).map(t(M,s))}function N(e){const a=S(e)
r("",n)
const s=i(n,c()),o=i(s,c({className:"st-top-container"})),m=function(t){return i(t,f({className:"whosGotWhat",innerHTML:'<thead><tr><th data-st-sort="slot" class="st-sort-asc">Slot</th><th data-st-sort="name_lower">Name</th><th class="st-sort-reverse" data-st-sort="lvl_reverse">Level</th><th data-st-sort="rank_lower">Rank</th><th class="st-sort-reverse" data-st-sort="gxp_reverse">GXP</th><th class="st-sort-reverse" data-st-sort="act">Activity</th><th class="st-sort-reverse" data-st-sort="pack_reverse">Pack</th><th class="st-sort-reverse" data-st-sort="stam_reverse">Stam</th></tr></thead><tbody></tbody>'}))}(i(s,c())),u=i(s,c({className:"st-bottom-container"})),v=y({data:a,tableState:{sort:{pointer:"slot",direction:"asc"},slice:{page:1,size:25},filter:{},search:{}}})
!function(t,e){const a=_({innerHTML:'<option value="25" selected>25</option><option value="50">50</option><option value="0">All</option>'}),s=c()
i(s,a),i(t,s)
const r=k({table:e})
l(a,"change",t=>{r.changePageSize(Number(t.target.value))})}(o,v),function(t,e){const a=c({className:"fsh-search-wrapper"}),s=p({dataset:{stSearch:"name, rank_name",stSearchFlags:"i"},placeholder:"Enter search term",required:!0,type:"text"}),r=h({innerHTML:"&times;",type:"button"}),n=j({table:e})
d(r,()=>{s.value="",s.focus(),n.search("")}),i(a,s),i(a,r),i(t,a)}(o,v),function(t,e,a){const s=c()
i(t,s),k({table:e}).onSummaryChange(({page:t,size:e,filteredCount:n})=>{let o=0
n&&(o=1),r(`showing ${(t-1)*e+o} - ${Math.min(n,t*e)} of ${n} (${a.length} total)`,s)})}(u,v,a),function(t,e){const a=c(),s=h({innerHTML:"«"}),n=h({innerHTML:"‹"}),o=h({disabled:!0,innerHTML:"1"}),l=h({innerHTML:"›"}),m=h({innerHTML:"»"})
let p=1
const u=k({table:e})
u.onSummaryChange(({page:t,size:e,filteredCount:a})=>{s.disabled=!u.isPreviousPageEnabled(),n.disabled=!u.isPreviousPageEnabled(),l.disabled=!u.isNextPageEnabled(),m.disabled=!u.isNextPageEnabled(),r(t,o),p=Math.ceil(a/e)}),d(s,()=>u.selectPage(1)),d(n,()=>u.selectPreviousPage()),d(l,()=>u.selectNextPage()),d(m,()=>u.selectPage(p)),i(a,s),i(a,n),i(a,o),i(a,l),i(a,m),i(t,a)}(u,v)
const b=P({el:s,table:v})
b.onDisplayChange(t(x,m,v)),b.exec()}export default function(){r("Loading...",n),v([g(),o()],N)}
//# sourceMappingURL=whosGotWhat-7d077f51.js.map
