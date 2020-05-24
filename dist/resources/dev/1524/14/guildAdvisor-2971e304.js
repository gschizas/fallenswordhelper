import{q as t,k as s,f as a,a as e,u as n,a9 as l,bg as i,B as r,bh as c,i as o,ab as d,y as u,b as f,p as m,c as p,aJ as v,J as h,_ as b,b9 as g,b6 as y,C as B}from"./calfSystem-d96a3efd.js"
import{c as j}from"./createTable-13920811.js"
import"./all-a5e007ad.js"
import{a as A}from"./allthen-182523ad.js"
import{l as C}from"./loadDataTables-366dff61.js"
import{g as k}from"./getMembrList-5baa5a87.js"
import{d as D}from"./daAdvisor-99f78de3.js"
import{r as S}from"./replaceChild-fe0814cd.js"
function T(s){return t("tfoot",s)}const R=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function w(t,s){return s[t]?`<a href="${l}${s[t].id}">${t}</a>`:t}function G(t,s){return s[t]?s[t].level:""}function L(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function M(t,s,a){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:R,data:s,deferRender:!0,initComplete:a,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function F(t,s){e(3,n(S,t,s))}function x(t,l,i){const r=s(),c=j({className:"fshDataTable fshXSmall hover"})
return a(r,c),a(c,l),e(3,M,[c,i,n(F,r,t)]),r}function E(t,s,a){return o(t.lastElementChild.lastElementChild,` day ${s},`),a.r}function J(t,s){return D(s).then(n(E,t,s))}function N(t,s,a){return s+t[a]}function W(t,s,a){return{...s,stats:s.stats.map(n(N,t[a].stats))}}function q(t,s){return t.map(n(W,s))}function P(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function X(t,s){return s.stats.map(n(N,t))}function _(t,s){return`${t}<td><u>${s}</u></td>`}function H(t,s){const a=s.stats.map(d)
return[w(s.player.name,t),G(s.player.name,t),L(s.player.name,t)].concat(a)}function O(t,[s,...a]){const e=function(t){return t.slice(1).reduce(q,t[0]).map(P)}(a)
x(t,function(t){return T({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(X,t[0].stats).map(d).reduce(_,"")}</tr>`})}(e),e.map(n(H,s)))}function z(t,s){return 0===s?y(t):B(t)}function I(t,s){const a=v(s.cells,z)
return a.splice(0,1,w(a[0],t),G(a[0],t),L(a[0],t)),a}function K(t,s){i("guildAdvisor.injectAdvisorDaily")
const e=function(t,s){return v(t.rows).slice(1,-1).map(n(I,s))}(t,s),l=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),e=T()
a(e,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),e}(t)
x(t,l,e),function(){const t=h("custombutton",m)
0!==t.length&&b(t[0],`<span> <a href="${g}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}(),c("guildAdvisor.injectAdvisorDaily")}function Q(t){"weekly"===p.subcmd2?function(t){i("guildAdvisor.injectAdvisorWeekly"),r('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[k(!1)].concat([1,2,3,4,5,6,7].map(n(J,t)))
A(s,n(O,t)),c("guildAdvisor.injectAdvisorWeekly")}(t):k(!1).then(n(K,t))}export default function(){if(u())return
const t=f("table",m)[1]
t&&C().then(()=>Q(t))}
//# sourceMappingURL=guildAdvisor-2971e304.js.map
