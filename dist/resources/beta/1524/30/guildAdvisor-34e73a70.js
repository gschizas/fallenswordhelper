import{n as t,m as s,h as e,a,t as n,a1 as r,aU as i,A as l,aV as o,i as c,x as d,b as u,p as f,c as m,M as p,J as v,a6 as h,G as b,B as g}from"./calfSystem-ebf4b17d.js"
import{a as j}from"./addCommas-508f0c08.js"
import"./currentGuildId-f7450bbe.js"
import"./idb-b7d9067e.js"
import{c as y}from"./createTable-eb87c534.js"
import"./indexAjaxJson-91b10960.js"
import"./cmdExport-6e99c1e8.js"
import{i as A}from"./insertHtmlAfterEnd-e822003d.js"
import"./all-36f83e81.js"
import{l as B}from"./loadDataTables-1e8f9239.js"
import{g as C}from"./guild-baf2ff75.js"
import{a as D}from"./allthen-7d061027.js"
import{g as S}from"./getMembrList-ba3d7d3d.js"
import{r as k}from"./replaceChild-1b71706a.js"
function T(s){return t("tfoot",s)}function w(t){return function(t){return C({subcmd:"advisor",subcmd2:"view",period:t})}(t)}const x=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function G(t,s){return s[t]?`<a href="${r}${s[t].id}">${t}</a>`:t}function R(t,s){return s[t]?s[t].level:""}function M(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function E(t,s,e){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:x,data:s,deferRender:!0,initComplete:e,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function L(t,s){a(3,n(k,t,s))}function F(t,r,i){const l=s(),o=y({className:"fshDataTable fshXSmall hover"})
return e(l,o),e(o,r),a(3,E,[o,i,n(L,l,t)]),l}function J(t,s,e){return c(t.lastElementChild.lastElementChild,` day ${s},`),e.r}function N(t,s){return w(s).then(n(J,t,s))}function W(t,s,e){return s+t[e]}function H(t,s,e){return{...s,stats:s.stats.map(n(W,t[e].stats))}}function P(t,s){return t.map(n(H,s))}function X(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function q(t,s){return s.stats.map(n(W,t))}function I(t,s){return`${t}<td><u>${s}</u></td>`}function O(t,s){const e=s.stats.map(j)
return[G(s.player.name,t),R(s.player.name,t),M(s.player.name,t)].concat(e)}function U(t,[s,...e]){const a=function(t){return t.slice(1).reduce(P,t[0]).map(X)}(e)
F(t,function(t){return T({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(q,t[0].stats).map(j).reduce(I,"")}</tr>`})}(a),a.map(n(O,s)))}function V(t,s){return 0===s?b(t):g(t)}function _(t,s){const e=p(s.cells,V)
return e.splice(0,1,G(e[0],t),R(e[0],t),M(e[0],t)),e}function z(t,s){i("guildAdvisor.injectAdvisorDaily")
const a=function(t,s){return p(t.rows).slice(1,-1).map(n(_,s))}(t,s),r=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),a=T()
e(a,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),a}(t)
F(t,r,a),function(){const t=v("custombutton",f)
0!==t.length&&A(t[0],`<span> <a href="${h}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}(),o("guildAdvisor.injectAdvisorDaily")}function K(t){"weekly"===m.subcmd2?function(t){i("guildAdvisor.injectAdvisorWeekly"),l('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[S(!1)].concat([1,2,3,4,5,6,7].map(n(N,t)))
D(s,n(U,t)),o("guildAdvisor.injectAdvisorWeekly")}(t):S(!1).then(n(z,t))}function Q(){if(d())return
const t=u("table",f)[1]
t&&B().then(()=>K(t))}export default Q
//# sourceMappingURL=guildAdvisor-34e73a70.js.map
