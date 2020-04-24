import{r as t,l as s,h as a,a as e,v as n,aa as l,bh as i,C as r,bi as c,i as o,ac as d,z as u,b as f,p as m,e as v,aK as p,K as h,$ as b,ba as g,b7 as y,D as j}from"./calfSystem-94018cd0.js"
import{c as A}from"./createTable-f30811ff.js"
import"./all-e6dbe465.js"
import{a as B}from"./allthen-55ea9059.js"
import{l as C}from"./loadDataTables-1819f403.js"
import{g as D}from"./getMembrList-fc5e54d6.js"
import{d as S}from"./daAdvisor-8b2704d7.js"
import{r as k}from"./replaceChild-09b38220.js"
function T(s){return t("tfoot",s)}const R=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function w(t,s){return s[t]?`<a href="${l}${s[t].id}">${t}</a>`:t}function G(t,s){return s[t]?s[t].level:""}function L(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function M(t,s,a){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:R,data:s,deferRender:!0,initComplete:a,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function F(t,s){e(3,n(k,t,s))}function x(t,l,i){const r=s(),c=A({className:"fshDataTable fshXSmall hover"})
return a(r,c),a(c,l),e(3,M,[c,i,n(F,r,t)]),r}function E(t,s,a){return o(t.lastElementChild.lastElementChild,` day ${s},`),a.r}function N(t,s){return S(s).then(n(E,t,s))}function W(t,s,a){return s+t[a]}function K(t,s,a){return{...s,stats:s.stats.map(n(W,t[a].stats))}}function P(t,s){return t.map(n(K,s))}function X(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function q(t,s){return s.stats.map(n(W,t))}function z(t,s){return`${t}<td><u>${s}</u></td>`}function H(t,s){const a=s.stats.map(d)
return[w(s.player.name,t),G(s.player.name,t),L(s.player.name,t)].concat(a)}function J(t,[s,...a]){const e=function(t){return t.slice(1).reduce(P,t[0]).map(X)}(a)
x(t,function(t){return T({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(q,t[0].stats).map(d).reduce(z,"")}</tr>`})}(e),e.map(n(H,s)))}function O(t,s){return 0===s?y(t):j(t)}function _(t,s){const a=p(s.cells,O)
return a.splice(0,1,w(a[0],t),G(a[0],t),L(a[0],t)),a}function I(t,s){i("guildAdvisor.injectAdvisorDaily")
const e=function(t,s){return p(t.rows).slice(1,-1).map(n(_,s))}(t,s),l=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),e=T()
a(e,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),e}(t)
x(t,l,e),function(){const t=h("custombutton",m)
0!==t.length&&b(t[0],`<span> <a href="${g}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}(),c("guildAdvisor.injectAdvisorDaily")}function Q(t){"weekly"===v.subcmd2?function(t){i("guildAdvisor.injectAdvisorWeekly"),r('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[D(!1)].concat([1,2,3,4,5,6,7].map(n(N,t)))
B(s,n(J,t)),c("guildAdvisor.injectAdvisorWeekly")}(t):D(!1).then(n(I,t))}export default function(){if(u())return
const t=f("table",m)[1]
t&&C().then(()=>Q(t))}
//# sourceMappingURL=guildAdvisor-e3800dc9.js.map
