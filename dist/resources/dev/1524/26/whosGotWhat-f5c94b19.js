import{t,T as e,A as a,p as s,h as r,m as o,f as n,o as i}from"./calfSystem-4991bf5b.js"
import{t as l}from"./toLowerCase-b21b7cc8.js"
import{c}from"./createInput-befbd592.js"
import{a as d}from"./addCommas-b567f740.js"
import{c as m}from"./createTBody-d5024ad9.js"
import{c as p}from"./createTable-aefb26b4.js"
import{c as f}from"./createButton-48f285a2.js"
import"./indexAjaxJson-b9139aa9.js"
import"./cmdExport-f5c9af35.js"
import{g as u}from"./guildStore-dcedb79d.js"
import"./all-646b32fa.js"
import"./guild-b6f6e040.js"
import{l as h,d as b}from"./lastActivityToDays-0233a257.js"
import{a as v}from"./allthen-18c82be8.js"
import{c as g}from"./createSelect-3e9a0bff.js"
import{c as _}from"./createTr-857b368c.js"
import{s as y,t as j,p as x,a as P}from"./table-49023b72.js"
function T(t,e,a){const s=t.tBodies[0],r=m()
for(const t of a)r.appendChild((o=t.value,n=void 0,o.dom||(o.dom=_({innerHTML:(n=o,`<td>${n.slot}</td><td>${n.name}</td><td>${n.level}</td><td>${n.rank_name}</td><td>${n.gxp}</td><td>${n.activity}</td><td>${n.pack}</td><td>${n.stam}</td>`)})),o.dom))
var o,n
t.replaceChild(r,s)}function k(t,e){return e.equipped||(t[e.player_id]=t[e.player_id]||[],t[e.player_id].push(e)),t}function L(t,e){return{...e,rank_name:t}}function M(e){return e.members.map(t(L,e.name))}function $(t,a,s){return{...a,slot:s+1,name_lower:l(a.name),lvl_reverse:0-a.level,rank_lower:l(a.rank_name.trim()),gxp:d(a.guild_xp),gxp_reverse:0-a.guild_xp,activity:h(a.last_activity),act:a.last_activity-e,pack:(t[a.id]||[]).length,pack_reverse:0-(t[a.id]||[]).length,stam:d(a.max_stamina),stam_reverse:0-a.max_stamina}}function S([e,a]){const s=e.items.reduce(k,{})
return function(t){return t.r.ranks.flatMap(M)}(a).map(t($,s))}function C(e){const l=S(e)
a("",s)
const d=r(s,o()),m=r(d,o({className:"st-top-container"})),u=function(t){return r(t,p({className:"whosGotWhat",innerHTML:'<thead><tr><th data-st-sort="slot" class="st-sort-asc">Slot</th><th data-st-sort="name_lower">Name</th><th class="st-sort-reverse" data-st-sort="lvl_reverse">Level</th><th data-st-sort="rank_lower">Rank</th><th class="st-sort-reverse" data-st-sort="gxp_reverse">GXP</th><th class="st-sort-reverse" data-st-sort="act">Activity</th><th class="st-sort-reverse" data-st-sort="pack_reverse">Pack</th><th class="st-sort-reverse" data-st-sort="stam_reverse">Stam</th></tr></thead><tbody></tbody>'}))}(r(d,o())),h=r(d,o({className:"st-bottom-container"})),b=y({data:l,tableState:{sort:{pointer:"slot",direction:"asc"},slice:{page:1,size:25},filter:{},search:{}}})
!function(t,e){const a=g({innerHTML:'<option value="25" selected>25</option><option value="50">50</option><option value="0">All</option>'}),s=o()
r(s,a),r(t,s)
const i=x({table:e})
n(a,"change",t=>{i.changePageSize(Number(t.target.value))})}(m,b),function(t,e){const a=o({className:"fsh-search-wrapper"}),s=c({dataset:{stSearch:"name, rank_name",stSearchFlags:"i"},placeholder:"Enter search term",required:!0,type:"text"}),n=f({innerHTML:"&times;",type:"button"}),l=P({table:e})
i(n,()=>{s.value="",s.focus(),l.search("")}),r(a,s),r(a,n),r(t,a)}(m,b),function(t,e,s){const n=o()
r(t,n),x({table:e}).onSummaryChange(({page:t,size:e,filteredCount:r})=>{let o=0
r&&(o=1),a(`showing ${(t-1)*e+o} - ${Math.min(r,t*e)} of ${r} (${s.length} total)`,n)})}(h,b,l),function(t,e){const s=o(),n=f({innerHTML:"«"}),l=f({innerHTML:"‹"}),c=f({disabled:!0,innerHTML:"1"}),d=f({innerHTML:"›"}),m=f({innerHTML:"»"})
let p=1
const u=x({table:e})
u.onSummaryChange(({page:t,size:e,filteredCount:s})=>{n.disabled=!u.isPreviousPageEnabled(),l.disabled=!u.isPreviousPageEnabled(),d.disabled=!u.isNextPageEnabled(),m.disabled=!u.isNextPageEnabled(),a(t,c),p=Math.ceil(s/e)}),i(n,()=>u.selectPage(1)),i(l,()=>u.selectPreviousPage()),i(d,()=>u.selectNextPage()),i(m,()=>u.selectPage(p)),r(s,n),r(s,l),r(s,c),r(s,d),r(s,m),r(t,s)}(h,b)
const v=j({el:d,table:b})
v.onDisplayChange(t(T,u,b)),v.exec()}function H(){a("Loading...",s),v([u(),b()],C)}export default H
//# sourceMappingURL=whosGotWhat-f5c94b19.js.map
