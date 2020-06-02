import{m as t,k as s,f as a,a as e,s as n,a0 as r,aY as i,z as c,aZ as l,i as o,w as d,b as u,p as f,c as m,a3 as p,F as v,a9 as h,a4 as b,A as j}from"./calfSystem-1c103624.js"
import{a as g}from"./addCommas-708246cb.js"
import"./currentGuildId-b6fa52f3.js"
import"./idb-347cc2af.js"
import{c as y}from"./createTable-930c2471.js"
import"./all-bf5942c7.js"
import{a as A}from"./allthen-a3d432e8.js"
import"./indexAjaxJson-ed231bc3.js"
import{i as B}from"./insertHtmlAfterEnd-cca1ed99.js"
import"./cmdExport-15d3dc9a.js"
import{l as C}from"./loadDataTables-fc57660c.js"
import"./guild-3ca78693.js"
import{g as k}from"./getMembrList-d1decafe.js"
import{d as D}from"./daAdvisor-98216bb6.js"
import{r as S}from"./replaceChild-ab85c6cd.js"
function T(s){return t("tfoot",s)}const w=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function R(t,s){return s[t]?`<a href="${r}${s[t].id}">${t}</a>`:t}function x(t,s){return s[t]?s[t].level:""}function G(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function E(t,s,a){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:w,data:s,deferRender:!0,initComplete:a,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function F(t,s){e(3,n(S,t,s))}function L(t,r,i){const c=s(),l=y({className:"fshDataTable fshXSmall hover"})
return a(c,l),a(l,r),e(3,E,[l,i,n(F,c,t)]),c}function M(t,s,a){return o(t.lastElementChild.lastElementChild,` day ${s},`),a.r}function N(t,s){return D(s).then(n(M,t,s))}function W(t,s,a){return s+t[a]}function H(t,s,a){return{...s,stats:s.stats.map(n(W,t[a].stats))}}function J(t,s){return t.map(n(H,s))}function P(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function X(t,s){return s.stats.map(n(W,t))}function q(t,s){return`${t}<td><u>${s}</u></td>`}function z(t,s){const a=s.stats.map(g)
return[R(s.player.name,t),x(s.player.name,t),G(s.player.name,t)].concat(a)}function I(t,[s,...a]){const e=function(t){return t.slice(1).reduce(J,t[0]).map(P)}(a)
L(t,function(t){return T({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(X,t[0].stats).map(g).reduce(q,"")}</tr>`})}(e),e.map(n(z,s)))}function O(t,s){return 0===s?b(t):j(t)}function Y(t,s){const a=p(s.cells,O)
return a.splice(0,1,R(a[0],t),x(a[0],t),G(a[0],t)),a}function Z(t,s){i("guildAdvisor.injectAdvisorDaily")
const e=function(t,s){return p(t.rows).slice(1,-1).map(n(Y,s))}(t,s),r=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),e=T()
a(e,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),e}(t)
L(t,r,e),function(){const t=v("custombutton",f)
0!==t.length&&B(t[0],`<span> <a href="${h}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}(),l("guildAdvisor.injectAdvisorDaily")}function _(t){"weekly"===m.subcmd2?function(t){i("guildAdvisor.injectAdvisorWeekly"),c('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[k(!1)].concat([1,2,3,4,5,6,7].map(n(N,t)))
A(s,n(I,t)),l("guildAdvisor.injectAdvisorWeekly")}(t):k(!1).then(n(Z,t))}export default function(){if(d())return
const t=u("table",f)[1]
t&&C().then(()=>_(t))}
//# sourceMappingURL=guildAdvisor-d83ebb37.js.map
