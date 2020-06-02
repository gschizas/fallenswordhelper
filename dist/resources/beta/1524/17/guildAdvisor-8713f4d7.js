import{m as t,k as s,f as e,a,s as n,$ as r,aW as i,z as l,aX as o,i as c,w as d,b as u,p as f,c as m,aD as p,F as v,a4 as h,a8 as b,A as g}from"./calfSystem-02ae8657.js"
import{a as j}from"./addCommas-b37f5163.js"
import"./currentGuildId-a8ad9d1f.js"
import"./idb-ac1635f3.js"
import{c as y}from"./createTable-c905097e.js"
import"./all-5d0e9d43.js"
import{a as A}from"./allthen-9e407c02.js"
import"./indexAjaxJson-8dbd2034.js"
import{i as B}from"./insertHtmlAfterEnd-23545b48.js"
import"./cmdExport-de6d587e.js"
import{l as C}from"./loadDataTables-267f1793.js"
import{g as D}from"./guild-148115ef.js"
import{g as k}from"./getMembrList-1f91f8c8.js"
import{r as S}from"./replaceChild-6278e4e6.js"
function w(s){return t("tfoot",s)}function T(t){return function(t){return D({subcmd:"advisor",subcmd2:"view",period:t})}(t)}const R=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function x(t,s){return s[t]?`<a href="${r}${s[t].id}">${t}</a>`:t}function G(t,s){return s[t]?s[t].level:""}function E(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function F(t,s,e){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:R,data:s,deferRender:!0,initComplete:e,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function L(t,s){a(3,n(S,t,s))}function M(t,r,i){const l=s(),o=y({className:"fshDataTable fshXSmall hover"})
return e(l,o),e(o,r),a(3,F,[o,i,n(L,l,t)]),l}function W(t,s,e){return c(t.lastElementChild.lastElementChild,` day ${s},`),e.r}function N(t,s){return T(s).then(n(W,t,s))}function X(t,s,e){return s+t[e]}function H(t,s,e){return{...s,stats:s.stats.map(n(X,t[e].stats))}}function J(t,s){return t.map(n(H,s))}function P(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function q(t,s){return s.stats.map(n(X,t))}function z(t,s){return`${t}<td><u>${s}</u></td>`}function I(t,s){const e=s.stats.map(j)
return[x(s.player.name,t),G(s.player.name,t),E(s.player.name,t)].concat(e)}function O(t,[s,...e]){const a=function(t){return t.slice(1).reduce(J,t[0]).map(P)}(e)
M(t,function(t){return w({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(q,t[0].stats).map(j).reduce(z,"")}</tr>`})}(a),a.map(n(I,s)))}function _(t,s){return 0===s?b(t):g(t)}function K(t,s){const e=p(s.cells,_)
return e.splice(0,1,x(e[0],t),G(e[0],t),E(e[0],t)),e}function Q(t,s){i("guildAdvisor.injectAdvisorDaily")
const a=function(t,s){return p(t.rows).slice(1,-1).map(n(K,s))}(t,s),r=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),a=w()
e(a,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),a}(t)
M(t,r,a),function(){const t=v("custombutton",f)
0!==t.length&&B(t[0],`<span> <a href="${h}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}(),o("guildAdvisor.injectAdvisorDaily")}function U(t){"weekly"===m.subcmd2?function(t){i("guildAdvisor.injectAdvisorWeekly"),l('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[k(!1)].concat([1,2,3,4,5,6,7].map(n(N,t)))
A(s,n(O,t)),o("guildAdvisor.injectAdvisorWeekly")}(t):k(!1).then(n(Q,t))}export default function(){if(d())return
const t=u("table",f)[1]
t&&C().then(()=>U(t))}
//# sourceMappingURL=guildAdvisor-8713f4d7.js.map
