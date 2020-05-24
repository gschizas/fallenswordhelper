import{q as t,aH as s,k as a,f as e,a as n,u as i,a8 as r,bc as l,B as c,bd as o,i as d,aa as u,y as f,b as m,p as v,c as p,aG as h,J as b,Z as g,b5 as y,bj as B,C as j}from"./calfSystem-371c414c.js"
import{c as C}from"./createTable-ad174066.js"
import"./all-93023d41.js"
import{a as A}from"./allthen-691ee788.js"
import{l as k}from"./loadDataTables-60dc642e.js"
import{g as D}from"./getMembrList-4a06ce80.js"
import{r as S}from"./replaceChild-3ec9ba37.js"
function T(s){return t("tfoot",s)}function w(t){return function(t){return s({subcmd:"advisor",subcmd2:"view",period:t})}(t)}const R=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function G(t,s){return s[t]?`<a href="${r}${s[t].id}">${t}</a>`:t}function L(t,s){return s[t]?s[t].level:""}function M(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function F(t,s,a){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:R,data:s,deferRender:!0,initComplete:a,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function x(t,s){n(3,i(S,t,s))}function E(t,s,r){const l=a(),c=C({className:"fshDataTable fshXSmall hover"})
return e(l,c),e(c,s),n(3,F,[c,r,i(x,l,t)]),l}function N(t,s,a){return d(t.lastElementChild.lastElementChild,` day ${s},`),a.r}function W(t,s){return w(s).then(i(N,t,s))}function q(t,s,a){return s+t[a]}function H(t,s,a){return{...s,stats:s.stats.map(i(q,t[a].stats))}}function J(t,s){return t.map(i(H,s))}function P(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function X(t,s){return s.stats.map(i(q,t))}function O(t,s){return`${t}<td><u>${s}</u></td>`}function Z(t,s){const a=s.stats.map(u)
return[G(s.player.name,t),L(s.player.name,t),M(s.player.name,t)].concat(a)}function _(t,[s,...a]){const e=function(t){return t.slice(1).reduce(J,t[0]).map(P)}(a)
E(t,function(t){return T({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(X,t[0].stats).map(u).reduce(O,"")}</tr>`})}(e),e.map(i(Z,s)))}function z(t,s){return 0===s?B(t):j(t)}function I(t,s){const a=h(s.cells,z)
return a.splice(0,1,G(a[0],t),L(a[0],t),M(a[0],t)),a}function K(t,s){l("guildAdvisor.injectAdvisorDaily")
const a=function(t,s){return h(t.rows).slice(1,-1).map(i(I,s))}(t,s),n=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),a=T()
e(a,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),a}(t)
E(t,n,a),function(){const t=b("custombutton",v)
0!==t.length&&g(t[0],`<span> <a href="${y}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}(),o("guildAdvisor.injectAdvisorDaily")}function Q(t){"weekly"===p.subcmd2?function(t){l("guildAdvisor.injectAdvisorWeekly"),c('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[D(!1)].concat([1,2,3,4,5,6,7].map(i(W,t)))
A(s,i(_,t)),o("guildAdvisor.injectAdvisorWeekly")}(t):D(!1).then(i(K,t))}export default function(){if(f())return
const t=m("table",v)[1]
t&&k().then(()=>Q(t))}
//# sourceMappingURL=guildAdvisor-64222d2f.js.map
