import{a2 as t,t as e,T as a,A as s,p as r,h as o,m as n,f as i,o as c}from"./calfSystem-02c48ff5.js"
import{t as l}from"./toLowerCase-0a22477f.js"
import{c as d}from"./createInput-6ef511c8.js"
import{a as m}from"./addCommas-0aacc5f1.js"
import{c as p}from"./createTBody-41a1ab82.js"
import{c as f}from"./createTable-b0dd7860.js"
import{c as u}from"./createButton-b782218b.js"
import"./indexAjaxJson-afad01c3.js"
import"./cmdExport-3fceba30.js"
import{g as h}from"./guildStore-440c18f5.js"
import"./all-01203f8c.js"
import"./guild-49f69973.js"
import{l as v,d as g}from"./lastActivityToDays-87330ce2.js"
import{a as b}from"./allthen-ca11bf0c.js"
import{c as _}from"./createSelect-1dc3a40f.js"
import{c as y}from"./createTr-50ae3636.js"
import{s as j,t as x,p as P,a as T}from"./table-48470593.js"
function $(e,a,s){const r=e.tBodies[0],o=p()
for(const e of s)o.appendChild((n=e.value,i=void 0,n.dom||(n.dom=y({innerHTML:(i=n,`<td>${i.slot}</td><td><a href="${t}${i.id}">${i.name}</a></td><td>${i.level}</td><td>${i.rank_name}</td><td>${i.gxp}</td><td>${i.activity}</td><td>${i.pack}</td><td>${i.stam}</td>`)})),n.dom))
var n,i
e.replaceChild(o,r)}function k(t,e){return e.equipped||(t[e.player_id]=t[e.player_id]||[],t[e.player_id].push(e)),t}function L(t,e){return{...e,rank_name:t}}function M(t){return t.members.map(e(L,t.name))}function S(t,e,s){return{...e,slot:s+1,name_lower:l(e.name),lvl_reverse:0-e.level,rank_lower:l(e.rank_name.trim()),gxp:m(e.guild_xp),gxp_reverse:0-e.guild_xp,activity:v(e.last_activity),act:e.last_activity-a,pack:(t[e.id]||[]).length,pack_reverse:0-(t[e.id]||[]).length,stam:m(e.max_stamina),stam_reverse:0-e.max_stamina}}function C([t,a]){const s=t.items.reduce(k,{})
return function(t){return t.r.ranks.flatMap(M)}(a).map(e(S,s))}function H(t){const a=C(t)
s("",r)
const l=o(r,n()),m=o(l,n({className:"st-top-container"})),p=function(t){return o(t,f({className:"whosGotWhat",innerHTML:'<thead><tr><th data-st-sort="slot" class="st-sort-asc">Slot</th><th data-st-sort="name_lower">Name</th><th class="st-sort-reverse" data-st-sort="lvl_reverse">Level</th><th data-st-sort="rank_lower">Rank</th><th class="st-sort-reverse" data-st-sort="gxp_reverse">GXP</th><th class="st-sort-reverse" data-st-sort="act">Activity</th><th class="st-sort-reverse" data-st-sort="pack_reverse">Pack</th><th class="st-sort-reverse" data-st-sort="stam_reverse">Stam</th></tr></thead><tbody></tbody>'}))}(o(l,n())),h=o(l,n({className:"st-bottom-container"})),v=j({data:a,tableState:{sort:{pointer:"slot",direction:"asc"},slice:{page:1,size:0},filter:{},search:{}}})
!function(t,e){const a=_({innerHTML:'<option value="25">25</option><option value="50">50</option><option value="0" selected>All</option>'}),s=n()
o(s,a),o(t,s)
const r=P({table:e})
i(a,"change",t=>{r.changePageSize(Number(t.target.value))})}(m,v),function(t,e){const a=n({className:"fsh-search-wrapper"}),s=d({dataset:{stSearch:"name, rank_name",stSearchFlags:"i"},placeholder:"Enter search term",required:!0,type:"text"}),r=u({innerHTML:"&times;",type:"button"}),i=T({table:e})
c(r,()=>{s.value="",s.focus(),i.search("")}),o(a,s),o(a,r),o(t,a)}(m,v),function(t,e,a){const r=n()
o(t,r),P({table:e}).onSummaryChange(({page:t,size:e,filteredCount:o})=>{let n=0
o&&(n=1),s(`showing ${(t-1)*e+n} - ${Math.min(o,t*e)} of ${o} (${a.length} total)`,r)})}(h,v,a),function(t,e){const a=n(),r=u({innerHTML:"«"}),i=u({innerHTML:"‹"}),l=u({disabled:!0,innerHTML:"1"}),d=u({innerHTML:"›"}),m=u({innerHTML:"»"})
let p=1
const f=P({table:e})
f.onSummaryChange(({page:t,size:e,filteredCount:a})=>{r.disabled=!f.isPreviousPageEnabled(),i.disabled=!f.isPreviousPageEnabled(),d.disabled=!f.isNextPageEnabled(),m.disabled=!f.isNextPageEnabled(),s(t,l),p=Math.ceil(a/e)}),c(r,()=>f.selectPage(1)),c(i,()=>f.selectPreviousPage()),c(d,()=>f.selectNextPage()),c(m,()=>f.selectPage(p)),o(a,r),o(a,i),o(a,l),o(a,d),o(a,m),o(t,a)}(h,v)
const g=x({el:l,table:v})
g.onDisplayChange(e($,p,v)),g.exec()}function N(){s("Loading...",r),b([h(),g()],H)}export default N
//# sourceMappingURL=whosGotWhat-e1ed9a9d.js.map
