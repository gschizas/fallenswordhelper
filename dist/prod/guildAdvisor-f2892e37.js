import{r as t,aI as s,l as a,h as e,a as n,v as r,a9 as l,C as c,i,ab as o,z as d,b as u,p as f,e as m,aH as p,K as h,_ as v,b6 as b,bi as g,D as y}from"./calfSystem-72fdbe97.js"
import{c as B}from"./createTable-8595230a.js"
import"./all-2c2dffdd.js"
import{a as C}from"./allthen-59a5f241.js"
import{l as S}from"./loadDataTables-4b1480e6.js"
import{g as D}from"./getMembrList-4c65de64.js"
import{r as T}from"./replaceChild-96d4f16d.js"
function j(s){return t("tfoot",s)}function w(t){return function(t){return s({subcmd:"advisor",subcmd2:"view",period:t})}(t)}const R=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function k(t,s){return s[t]?`<a href="${l}${s[t].id}">${t}</a>`:t}function G(t,s){return s[t]?s[t].level:""}function L(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function M(t,s,a){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:R,data:s,deferRender:!0,initComplete:a,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function F(t,s){n(3,r(T,t,s))}function x(t,s,l){const c=a(),i=B({className:"fshDataTable fshXSmall hover"})
return e(c,i),e(i,s),n(3,M,[i,l,r(F,c,t)]),c}function A(t,s,a){return i(t.lastElementChild.lastElementChild,` day ${s},`),a.r}function E(t,s){return w(s).then(r(A,t,s))}function N(t,s,a){return s+t[a]}function H(t,s,a){return{...s,stats:s.stats.map(r(N,t[a].stats))}}function P(t,s){return t.map(r(H,s))}function X(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function _(t,s){return s.stats.map(r(N,t))}function q(t,s){return`${t}<td><u>${s}</u></td>`}function z(t,s){const a=s.stats.map(o)
return[k(s.player.name,t),G(s.player.name,t),L(s.player.name,t)].concat(a)}function I(t,[s,...a]){const e=function(t){return t.slice(1).reduce(P,t[0]).map(X)}(a)
x(t,function(t){return j({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(_,t[0].stats).map(o).reduce(q,"")}</tr>`})}(e),e.map(r(z,s)))}function J(t,s){return 0===s?g(t):y(t)}function K(t,s){const a=p(s.cells,J)
return a.splice(0,1,k(a[0],t),G(a[0],t),L(a[0],t)),a}function O(t,s){const a=function(t,s){return p(t.rows).slice(1,-1).map(r(K,s))}(t,s),n=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),a=j()
e(a,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),a}(t)
x(t,n,a),function(){const t=h("custombutton",f)
0!==t.length&&v(t[0],`<span> <a href="${b}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}()}function W(t){"weekly"===m.subcmd2?function(t){c('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[D(!1)].concat([1,2,3,4,5,6,7].map(r(E,t)))
C(s,r(I,t))}(t):D(!1).then(r(O,t))}export default function(){if(d())return
const t=u("table",f)[1]
t&&S().then(()=>W(t))}
//# sourceMappingURL=guildAdvisor-f2892e37.js.map
