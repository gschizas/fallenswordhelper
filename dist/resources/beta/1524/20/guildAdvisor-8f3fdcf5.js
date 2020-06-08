import{n as t,l as s,f as e,a,t as n,a1 as r,aV as i,A as l,aW as c,i as o,x as d,b as u,p as f,c as m,M as p,I as v,a6 as h,K as b,B as g}from"./calfSystem-05554bae.js"
import{a as j}from"./addCommas-1723dd41.js"
import"./currentGuildId-03628998.js"
import"./idb-862da886.js"
import{c as y}from"./createTable-db205e04.js"
import{i as A}from"./insertHtmlAfterEnd-1461aee3.js"
import"./indexAjaxJson-c1c386d4.js"
import"./cmdExport-9dcb6bc5.js"
import"./all-e13706ab.js"
import{l as B}from"./loadDataTables-bfb23461.js"
import{g as C}from"./guild-2d1ac38d.js"
import{a as D}from"./allthen-feed7e5f.js"
import{g as S}from"./getMembrList-6b86662c.js"
import{r as k}from"./replaceChild-6fe0e05a.js"
function T(s){return t("tfoot",s)}function w(t){return function(t){return C({subcmd:"advisor",subcmd2:"view",period:t})}(t)}const x=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function R(t,s){return s[t]?`<a href="${r}${s[t].id}">${t}</a>`:t}function G(t,s){return s[t]?s[t].level:""}function M(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function E(t,s,e){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:x,data:s,deferRender:!0,initComplete:e,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function L(t,s){a(3,n(k,t,s))}function F(t,r,i){const l=s(),c=y({className:"fshDataTable fshXSmall hover"})
return e(l,c),e(c,r),a(3,E,[c,i,n(L,l,t)]),l}function W(t,s,e){return o(t.lastElementChild.lastElementChild,` day ${s},`),e.r}function N(t,s){return w(s).then(n(W,t,s))}function H(t,s,e){return s+t[e]}function I(t,s,e){return{...s,stats:s.stats.map(n(H,t[e].stats))}}function J(t,s){return t.map(n(I,s))}function P(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function X(t,s){return s.stats.map(n(H,t))}function q(t,s){return`${t}<td><u>${s}</u></td>`}function K(t,s){const e=s.stats.map(j)
return[R(s.player.name,t),G(s.player.name,t),M(s.player.name,t)].concat(e)}function O(t,[s,...e]){const a=function(t){return t.slice(1).reduce(J,t[0]).map(P)}(e)
F(t,function(t){return T({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(X,t[0].stats).map(j).reduce(q,"")}</tr>`})}(a),a.map(n(K,s)))}function V(t,s){return 0===s?b(t):g(t)}function _(t,s){const e=p(s.cells,V)
return e.splice(0,1,R(e[0],t),G(e[0],t),M(e[0],t)),e}function z(t,s){i("guildAdvisor.injectAdvisorDaily")
const a=function(t,s){return p(t.rows).slice(1,-1).map(n(_,s))}(t,s),r=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),a=T()
e(a,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),a}(t)
F(t,r,a),function(){const t=v("custombutton",f)
0!==t.length&&A(t[0],`<span> <a href="${h}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}(),c("guildAdvisor.injectAdvisorDaily")}function Q(t){"weekly"===m.subcmd2?function(t){i("guildAdvisor.injectAdvisorWeekly"),l('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[S(!1)].concat([1,2,3,4,5,6,7].map(n(N,t)))
D(s,n(O,t)),c("guildAdvisor.injectAdvisorWeekly")}(t):S(!1).then(n(z,t))}export default function(){if(d())return
const t=u("table",f)[1]
t&&B().then(()=>Q(t))}
//# sourceMappingURL=guildAdvisor-8f3fdcf5.js.map
