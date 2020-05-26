import{m as t,aw as s,k as a,f as e,a as n,s as r,_ as i,ba as l,z as c,bb as o,i as d,w as u,b as f,p as m,c as p,av as v,F as h,aP as b,aS as g,A as j}from"./calfSystem-1262535f.js"
import{a as y}from"./addCommas-feda1131.js"
import"./currentGuildId-5a28bdba.js"
import{c as A}from"./createTable-34bb0f34.js"
import"./all-c00b9c25.js"
import{a as B}from"./allthen-2a364862.js"
import"./indexAjaxJson-f27fbe77.js"
import{i as C}from"./insertHtmlAfterEnd-2dcd57ed.js"
import"./cmdExport-721bbaf9.js"
import{l as S}from"./loadDataTables-96074b55.js"
import{g as k}from"./getMembrList-c5d771e6.js"
import{r as w}from"./replaceChild-b197dd1c.js"
function D(s){return t("tfoot",s)}function T(t){return function(t){return s({subcmd:"advisor",subcmd2:"view",period:t})}(t)}const R=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function x(t,s){return s[t]?`<a href="${i}${s[t].id}">${t}</a>`:t}function G(t,s){return s[t]?s[t].level:""}function E(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function F(t,s,a){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:R,data:s,deferRender:!0,initComplete:a,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function L(t,s){n(3,r(w,t,s))}function M(t,s,i){const l=a(),c=A({className:"fshDataTable fshXSmall hover"})
return e(l,c),e(c,s),n(3,F,[c,i,r(L,l,t)]),l}function N(t,s,a){return d(t.lastElementChild.lastElementChild,` day ${s},`),a.r}function P(t,s){return T(s).then(r(N,t,s))}function W(t,s,a){return s+t[a]}function H(t,s,a){return{...s,stats:s.stats.map(r(W,t[a].stats))}}function J(t,s){return t.map(r(H,s))}function X(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function _(t,s){return s.stats.map(r(W,t))}function q(t,s){return`${t}<td><u>${s}</u></td>`}function z(t,s){const a=s.stats.map(y)
return[x(s.player.name,t),G(s.player.name,t),E(s.player.name,t)].concat(a)}function I(t,[s,...a]){const e=function(t){return t.slice(1).reduce(J,t[0]).map(X)}(a)
M(t,function(t){return D({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(_,t[0].stats).map(y).reduce(q,"")}</tr>`})}(e),e.map(r(z,s)))}function O(t,s){return 0===s?g(t):j(t)}function K(t,s){const a=v(s.cells,O)
return a.splice(0,1,x(a[0],t),G(a[0],t),E(a[0],t)),a}function Q(t,s){l("guildAdvisor.injectAdvisorDaily")
const a=function(t,s){return v(t.rows).slice(1,-1).map(r(K,s))}(t,s),n=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),a=D()
e(a,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),a}(t)
M(t,n,a),function(){const t=h("custombutton",m)
0!==t.length&&C(t[0],`<span> <a href="${b}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}(),o("guildAdvisor.injectAdvisorDaily")}function U(t){"weekly"===p.subcmd2?function(t){l("guildAdvisor.injectAdvisorWeekly"),c('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[k(!1)].concat([1,2,3,4,5,6,7].map(r(P,t)))
B(s,r(I,t)),o("guildAdvisor.injectAdvisorWeekly")}(t):k(!1).then(r(Q,t))}export default function(){if(u())return
const t=f("table",m)[1]
t&&S().then(()=>U(t))}
//# sourceMappingURL=guildAdvisor-88819fee.js.map
