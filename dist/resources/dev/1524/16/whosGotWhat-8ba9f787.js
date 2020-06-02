import{s as t,R as e,z as a,p as s,f as r,k as o,e as n,o as i}from"./calfSystem-d49dbbd3.js"
import{t as c}from"./toLowerCase-e686322a.js"
import{c as l}from"./createInput-1699d448.js"
import{a as d}from"./addCommas-ab251bb7.js"
import{c as m}from"./createTBody-6de354b5.js"
import{c as p}from"./createTable-86f16c48.js"
import{c as u}from"./createButton-27be9a2a.js"
import"./all-042a202c.js"
import{a as f}from"./allthen-d63ed67c.js"
import"./indexAjaxJson-6ef1f9f4.js"
import{c as h}from"./createTr-1481671b.js"
import"./cmdExport-1b537f9c.js"
import{g as v}from"./guildStore-783e895e.js"
import"./guild-5830ca1d.js"
import{l as g,d as b}from"./lastActivityToDays-533d368c.js"
import{c as _}from"./createSelect-82713053.js"
import{s as y,t as j,p as x,a as k}from"./table-e01ca96e.js"
function P(t,e,a){const s=t.tBodies[0],r=m()
for(const t of a)r.appendChild((o=t.value,n=void 0,o.dom||(o.dom=h({innerHTML:(n=o,`<td>${n.slot}</td><td>${n.name}</td><td>${n.level}</td><td>${n.rank_name}</td><td>${n.gxp}</td><td>${n.activity}</td><td>${n.pack}</td><td>${n.stam}</td>`)})),o.dom))
var o,n
t.replaceChild(r,s)}function T(t,e){return 11503===e.item_id&&(t[e.player_id]=t[e.player_id]||[],t[e.player_id].push(e)),t}function L(t,e){return{...e,rank_name:t}}function $(e){return e.members.map(t(L,e.name))}function M(t,a,s){return{...a,slot:s+1,name_lower:c(a.name),lvl_reverse:0-a.level,rank_lower:c(a.rank_name.trim()),gxp:d(a.guild_xp),gxp_reverse:0-a.guild_xp,activity:g(a.last_activity),act:a.last_activity-e,pack:(t[a.id]||[]).length,pack_reverse:0-(t[a.id]||[]).length,stam:d(a.current_stamina),stam_reverse:0-a.current_stamina}}function S([e,a]){const s=e.items.reduce(T,{})
return function(t){return[].concat(...t.r.ranks.map($))}(a).map(t(M,s))}function C(e){const c=S(e)
a("",s)
const d=r(s,o()),m=r(d,o({className:"st-top-container"})),f=function(t){return r(t,p({className:"whosGotWhat",innerHTML:'<thead><tr><th data-st-sort="slot" class="st-sort-asc">Slot</th><th data-st-sort="name_lower">Name</th><th class="st-sort-reverse" data-st-sort="lvl_reverse">Level</th><th data-st-sort="rank_lower">Rank</th><th class="st-sort-reverse" data-st-sort="gxp_reverse">GXP</th><th class="st-sort-reverse" data-st-sort="act">Activity</th><th class="st-sort-reverse" data-st-sort="pack_reverse">Pack</th><th class="st-sort-reverse" data-st-sort="stam_reverse">Stam</th></tr></thead><tbody></tbody>'}))}(r(d,o())),h=r(d,o({className:"st-bottom-container"})),v=y({data:c,tableState:{sort:{pointer:"slot",direction:"asc"},slice:{page:1,size:25},filter:{},search:{}}})
!function(t,e){const a=_({innerHTML:'<option value="25" selected>25</option><option value="50">50</option><option value="0">All</option>'}),s=o()
r(s,a),r(t,s)
const i=x({table:e})
n(a,"change",t=>{i.changePageSize(Number(t.target.value))})}(m,v),function(t,e){const a=o({className:"fsh-search-wrapper"}),s=l({dataset:{stSearch:"name, rank_name",stSearchFlags:"i"},placeholder:"Enter search term",required:!0,type:"text"}),n=u({innerHTML:"&times;",type:"button"}),c=k({table:e})
i(n,()=>{s.value="",s.focus(),c.search("")}),r(a,s),r(a,n),r(t,a)}(m,v),function(t,e,s){const n=o()
r(t,n),x({table:e}).onSummaryChange(({page:t,size:e,filteredCount:r})=>{let o=0
r&&(o=1),a(`showing ${(t-1)*e+o} - ${Math.min(r,t*e)} of ${r} (${s.length} total)`,n)})}(h,v,c),function(t,e){const s=o(),n=u({innerHTML:"«"}),c=u({innerHTML:"‹"}),l=u({disabled:!0,innerHTML:"1"}),d=u({innerHTML:"›"}),m=u({innerHTML:"»"})
let p=1
const f=x({table:e})
f.onSummaryChange(({page:t,size:e,filteredCount:s})=>{n.disabled=!f.isPreviousPageEnabled(),c.disabled=!f.isPreviousPageEnabled(),d.disabled=!f.isNextPageEnabled(),m.disabled=!f.isNextPageEnabled(),a(t,l),p=Math.ceil(s/e)}),i(n,()=>f.selectPage(1)),i(c,()=>f.selectPreviousPage()),i(d,()=>f.selectNextPage()),i(m,()=>f.selectPage(p)),r(s,n),r(s,c),r(s,l),r(s,d),r(s,m),r(t,s)}(h,v)
const g=j({el:d,table:v})
g.onDisplayChange(t(P,f,v)),g.exec()}export default function(){a("Loading...",s),f([v(),b()],C)}
//# sourceMappingURL=whosGotWhat-8ba9f787.js.map
