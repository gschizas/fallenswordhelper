import{q as t,aH as s,k as a,f as e,a as n,u as r,a8 as l,B as c,i,aa as o,y as d,b as u,p as f,c as m,aG as p,J as h,Z as v,b5 as b,bh as g,C as y}from"./calfSystem-d587d232.js"
import{c as B}from"./createTable-5f8e2bd3.js"
import"./all-39781966.js"
import{a as C}from"./allthen-ba816a7b.js"
import{l as S}from"./loadDataTables-043f4b86.js"
import{g as T}from"./getMembrList-bff94964.js"
import{r as j}from"./replaceChild-c380221c.js"
function k(s){return t("tfoot",s)}function w(t){return function(t){return s({subcmd:"advisor",subcmd2:"view",period:t})}(t)}const D=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function R(t,s){return s[t]?`<a href="${l}${s[t].id}">${t}</a>`:t}function G(t,s){return s[t]?s[t].level:""}function L(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function M(t,s,a){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:D,data:s,deferRender:!0,initComplete:a,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function F(t,s){n(3,r(j,t,s))}function x(t,s,l){const c=a(),i=B({className:"fshDataTable fshXSmall hover"})
return e(c,i),e(i,s),n(3,M,[i,l,r(F,c,t)]),c}function A(t,s,a){return i(t.lastElementChild.lastElementChild,` day ${s},`),a.r}function E(t,s){return w(s).then(r(A,t,s))}function N(t,s,a){return s+t[a]}function q(t,s,a){return{...s,stats:s.stats.map(r(N,t[a].stats))}}function H(t,s){return t.map(r(q,s))}function J(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function P(t,s){return s.stats.map(r(N,t))}function X(t,s){return`${t}<td><u>${s}</u></td>`}function O(t,s){const a=s.stats.map(o)
return[R(s.player.name,t),G(s.player.name,t),L(s.player.name,t)].concat(a)}function W(t,[s,...a]){const e=function(t){return t.slice(1).reduce(H,t[0]).map(J)}(a)
x(t,function(t){return k({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(P,t[0].stats).map(o).reduce(X,"")}</tr>`})}(e),e.map(r(O,s)))}function Z(t,s){return 0===s?g(t):y(t)}function _(t,s){const a=p(s.cells,Z)
return a.splice(0,1,R(a[0],t),G(a[0],t),L(a[0],t)),a}function z(t,s){const a=function(t,s){return p(t.rows).slice(1,-1).map(r(_,s))}(t,s),n=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),a=k()
e(a,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),a}(t)
x(t,n,a),function(){const t=h("custombutton",f)
0!==t.length&&v(t[0],`<span> <a href="${b}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}()}function I(t){"weekly"===m.subcmd2?function(t){c('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[T(!1)].concat([1,2,3,4,5,6,7].map(r(E,t)))
C(s,r(W,t))}(t):T(!1).then(r(z,t))}export default function(){if(d())return
const t=u("table",f)[1]
t&&S().then(()=>I(t))}
//# sourceMappingURL=guildAdvisor-e6784e68.js.map
