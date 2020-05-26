import{s as t,bz as e,Q as a,z as s,p as r,bA as o,f as n,k as i,e as c,o as l}from"./calfSystem-ee582533.js"
import{t as d}from"./toLowerCase-6383ba3b.js"
import{c as m}from"./createInput-2410e798.js"
import{a as p}from"./addCommas-f872a1dc.js"
import{c as u}from"./createTBody-aa153e3a.js"
import{c as h}from"./createTable-cbb3667c.js"
import{c as f}from"./createButton-6e7396b9.js"
import"./all-b94d2d9d.js"
import{a as v}from"./allthen-f1914fd2.js"
import"./indexAjaxJson-e486d467.js"
import{c as b}from"./createTr-bfcbc414.js"
import"./cmdExport-23cec039.js"
import{g}from"./guildStore-7cd0d847.js"
import{c as _}from"./createSelect-8ae33cf3.js"
import{s as y,t as j,p as x,a as k}from"./table-8071787a.js"
function P(t,e,a){const s=t.tBodies[0],r=u()
for(const t of a)r.appendChild((o=t.value,n=void 0,o.dom||(o.dom=b({innerHTML:(n=o,`<td>${n.slot}</td><td>${n.name}</td><td>${n.level}</td><td>${n.rank_name}</td><td>${n.gxp}</td><td>${n.activity}</td><td>${n.pack}</td><td>${n.stam}</td>`)})),o.dom))
var o,n
t.replaceChild(r,s)}function L(t,e){return 11503===e.item_id&&(t[e.player_id]=t[e.player_id]||[],t[e.player_id].push(e)),t}function T(t,e){return{...e,rank_name:t}}function $(e){return e.members.map(t(T,e.name))}function M(t,s,r){return{...s,slot:r+1,name_lower:d(s.name),lvl_reverse:0-s.level,rank_lower:d(s.rank_name.trim()),gxp:p(s.guild_xp),gxp_reverse:0-s.guild_xp,activity:e(s.last_activity),act:s.last_activity-a,pack:(t[s.id]||[]).length,pack_reverse:0-(t[s.id]||[]).length,stam:p(s.current_stamina),stam_reverse:0-s.current_stamina}}function S([e,a]){const s=e.items.reduce(L,{})
return function(t){return[].concat(...t.r.ranks.map($))}(a).map(t(M,s))}function C(e){const a=S(e)
s("",r)
const o=n(r,i()),d=n(o,i({className:"st-top-container"})),p=function(t){return n(t,h({className:"whosGotWhat",innerHTML:'<thead><tr><th data-st-sort="slot" class="st-sort-asc">Slot</th><th data-st-sort="name_lower">Name</th><th class="st-sort-reverse" data-st-sort="lvl_reverse">Level</th><th data-st-sort="rank_lower">Rank</th><th class="st-sort-reverse" data-st-sort="gxp_reverse">GXP</th><th class="st-sort-reverse" data-st-sort="act">Activity</th><th class="st-sort-reverse" data-st-sort="pack_reverse">Pack</th><th class="st-sort-reverse" data-st-sort="stam_reverse">Stam</th></tr></thead><tbody></tbody>'}))}(n(o,i())),u=n(o,i({className:"st-bottom-container"})),v=y({data:a,tableState:{sort:{pointer:"slot",direction:"asc"},slice:{page:1,size:25},filter:{},search:{}}})
!function(t,e){const a=_({innerHTML:'<option value="25" selected>25</option><option value="50">50</option><option value="0">All</option>'}),s=i()
n(s,a),n(t,s)
const r=x({table:e})
c(a,"change",t=>{r.changePageSize(Number(t.target.value))})}(d,v),function(t,e){const a=i({className:"fsh-search-wrapper"}),s=m({dataset:{stSearch:"name, rank_name",stSearchFlags:"i"},placeholder:"Enter search term",required:!0,type:"text"}),r=f({innerHTML:"&times;",type:"button"}),o=k({table:e})
l(r,()=>{s.value="",s.focus(),o.search("")}),n(a,s),n(a,r),n(t,a)}(d,v),function(t,e,a){const r=i()
n(t,r),x({table:e}).onSummaryChange(({page:t,size:e,filteredCount:o})=>{let n=0
o&&(n=1),s(`showing ${(t-1)*e+n} - ${Math.min(o,t*e)} of ${o} (${a.length} total)`,r)})}(u,v,a),function(t,e){const a=i(),r=f({innerHTML:"«"}),o=f({innerHTML:"‹"}),c=f({disabled:!0,innerHTML:"1"}),d=f({innerHTML:"›"}),m=f({innerHTML:"»"})
let p=1
const u=x({table:e})
u.onSummaryChange(({page:t,size:e,filteredCount:a})=>{r.disabled=!u.isPreviousPageEnabled(),o.disabled=!u.isPreviousPageEnabled(),d.disabled=!u.isNextPageEnabled(),m.disabled=!u.isNextPageEnabled(),s(t,c),p=Math.ceil(a/e)}),l(r,()=>u.selectPage(1)),l(o,()=>u.selectPreviousPage()),l(d,()=>u.selectNextPage()),l(m,()=>u.selectPage(p)),n(a,r),n(a,o),n(a,c),n(a,d),n(a,m),n(t,a)}(u,v)
const b=j({el:o,table:v})
b.onDisplayChange(t(P,p,v)),b.exec()}export default function(){s("Loading...",r),v([g(),o()],C)}
//# sourceMappingURL=whosGotWhat-756523ed.js.map
