import{t,T as e,A as a,p as s,h as r,m as o,f as n,o as i}from"./calfSystem-4cc738f8.js"
import{t as c}from"./toLowerCase-e8c3179d.js"
import{c as l}from"./createInput-8a96566e.js"
import{a as d}from"./addCommas-c5c5d2c5.js"
import{c as m}from"./createTBody-e25839cf.js"
import{c as p}from"./createTable-8f45252e.js"
import{c as u}from"./createButton-8ff4d3ce.js"
import"./indexAjaxJson-39fb942e.js"
import"./cmdExport-3370ea6e.js"
import{g as f}from"./guildStore-36c52711.js"
import"./all-4929a748.js"
import"./guild-152cc6b9.js"
import{l as h,d as v}from"./lastActivityToDays-d2a8efcb.js"
import{a as g}from"./allthen-58353ff8.js"
import{c as b}from"./createSelect-560e9a5a.js"
import{c as _}from"./createTr-93950bb7.js"
import{s as y,t as j,p as x,a as P}from"./table-6ae710cf.js"
function T(t,e,a){const s=t.tBodies[0],r=m()
for(const t of a)r.appendChild((o=t.value,n=void 0,o.dom||(o.dom=_({innerHTML:(n=o,`<td>${n.slot}</td><td>${n.name}</td><td>${n.level}</td><td>${n.rank_name}</td><td>${n.gxp}</td><td>${n.activity}</td><td>${n.pack}</td><td>${n.stam}</td>`)})),o.dom))
var o,n
t.replaceChild(r,s)}function k(t,e){return 11503===e.item_id&&(t[e.player_id]=t[e.player_id]||[],t[e.player_id].push(e)),t}function L(t,e){return{...e,rank_name:t}}function $(e){return e.members.map(t(L,e.name))}function M(t,a,s){return{...a,slot:s+1,name_lower:c(a.name),lvl_reverse:0-a.level,rank_lower:c(a.rank_name.trim()),gxp:d(a.guild_xp),gxp_reverse:0-a.guild_xp,activity:h(a.last_activity),act:a.last_activity-e,pack:(t[a.id]||[]).length,pack_reverse:0-(t[a.id]||[]).length,stam:d(a.current_stamina),stam_reverse:0-a.current_stamina}}function S([e,a]){const s=e.items.reduce(k,{})
return function(t){return[].concat(...t.r.ranks.map($))}(a).map(t(M,s))}function C(e){const c=S(e)
a("",s)
const d=r(s,o()),m=r(d,o({className:"st-top-container"})),f=function(t){return r(t,p({className:"whosGotWhat",innerHTML:'<thead><tr><th data-st-sort="slot" class="st-sort-asc">Slot</th><th data-st-sort="name_lower">Name</th><th class="st-sort-reverse" data-st-sort="lvl_reverse">Level</th><th data-st-sort="rank_lower">Rank</th><th class="st-sort-reverse" data-st-sort="gxp_reverse">GXP</th><th class="st-sort-reverse" data-st-sort="act">Activity</th><th class="st-sort-reverse" data-st-sort="pack_reverse">Pack</th><th class="st-sort-reverse" data-st-sort="stam_reverse">Stam</th></tr></thead><tbody></tbody>'}))}(r(d,o())),h=r(d,o({className:"st-bottom-container"})),v=y({data:c,tableState:{sort:{pointer:"slot",direction:"asc"},slice:{page:1,size:25},filter:{},search:{}}})
!function(t,e){const a=b({innerHTML:'<option value="25" selected>25</option><option value="50">50</option><option value="0">All</option>'}),s=o()
r(s,a),r(t,s)
const i=x({table:e})
n(a,"change",t=>{i.changePageSize(Number(t.target.value))})}(m,v),function(t,e){const a=o({className:"fsh-search-wrapper"}),s=l({dataset:{stSearch:"name, rank_name",stSearchFlags:"i"},placeholder:"Enter search term",required:!0,type:"text"}),n=u({innerHTML:"&times;",type:"button"}),c=P({table:e})
i(n,()=>{s.value="",s.focus(),c.search("")}),r(a,s),r(a,n),r(t,a)}(m,v),function(t,e,s){const n=o()
r(t,n),x({table:e}).onSummaryChange(({page:t,size:e,filteredCount:r})=>{let o=0
r&&(o=1),a(`showing ${(t-1)*e+o} - ${Math.min(r,t*e)} of ${r} (${s.length} total)`,n)})}(h,v,c),function(t,e){const s=o(),n=u({innerHTML:"«"}),c=u({innerHTML:"‹"}),l=u({disabled:!0,innerHTML:"1"}),d=u({innerHTML:"›"}),m=u({innerHTML:"»"})
let p=1
const f=x({table:e})
f.onSummaryChange(({page:t,size:e,filteredCount:s})=>{n.disabled=!f.isPreviousPageEnabled(),c.disabled=!f.isPreviousPageEnabled(),d.disabled=!f.isNextPageEnabled(),m.disabled=!f.isNextPageEnabled(),a(t,l),p=Math.ceil(s/e)}),i(n,()=>f.selectPage(1)),i(c,()=>f.selectPreviousPage()),i(d,()=>f.selectNextPage()),i(m,()=>f.selectPage(p)),r(s,n),r(s,c),r(s,l),r(s,d),r(s,m),r(t,s)}(h,v)
const g=j({el:d,table:v})
g.onDisplayChange(t(T,f,v)),g.exec()}export default function(){a("Loading...",s),g([f(),v()],C)}
//# sourceMappingURL=whosGotWhat-df5c7f95.js.map
