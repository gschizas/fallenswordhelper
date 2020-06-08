import{n as t,l as s,f as a,a as e,t as n,a1 as r,A as c,i,x as l,b as o,p as d,c as u,M as f,I as m,a6 as p,K as h,B as v}from"./calfSystem-03970067.js"
import{a as b}from"./addCommas-623b93c1.js"
import"./currentGuildId-cce6862b.js"
import"./idb-3dad9172.js"
import{c as g}from"./createTable-fdc4e68e.js"
import{i as j}from"./insertHtmlAfterEnd-d9794923.js"
import"./indexAjaxJson-d04ad897.js"
import"./cmdExport-4773c3fd.js"
import"./all-34a43a38.js"
import{l as B}from"./loadDataTables-a4c6ac52.js"
import{g as y}from"./guild-7e15ffba.js"
import{a as C}from"./allthen-0b78a490.js"
import{g as S}from"./getMembrList-3c92fb67.js"
import{r as T}from"./replaceChild-8aafc48e.js"
function w(s){return t("tfoot",s)}function x(t){return function(t){return y({subcmd:"advisor",subcmd2:"view",period:t})}(t)}const D=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function R(t,s){return s[t]?`<a href="${r}${s[t].id}">${t}</a>`:t}function k(t,s){return s[t]?s[t].level:""}function A(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function G(t,s,a){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:D,data:s,deferRender:!0,initComplete:a,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function M(t,s){e(3,n(T,t,s))}function E(t,r,c){const i=s(),l=g({className:"fshDataTable fshXSmall hover"})
return a(i,l),a(l,r),e(3,G,[l,c,n(M,i,t)]),i}function L(t,s,a){return i(t.lastElementChild.lastElementChild,` day ${s},`),a.r}function F(t,s){return x(s).then(n(L,t,s))}function N(t,s,a){return s+t[a]}function H(t,s,a){return{...s,stats:s.stats.map(n(N,t[a].stats))}}function I(t,s){return t.map(n(H,s))}function J(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function P(t,s){return s.stats.map(n(N,t))}function X(t,s){return`${t}<td><u>${s}</u></td>`}function q(t,s){const a=s.stats.map(b)
return[R(s.player.name,t),k(s.player.name,t),A(s.player.name,t)].concat(a)}function K(t,[s,...a]){const e=function(t){return t.slice(1).reduce(I,t[0]).map(J)}(a)
E(t,function(t){return w({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(P,t[0].stats).map(b).reduce(X,"")}</tr>`})}(e),e.map(n(q,s)))}function O(t,s){return 0===s?h(t):v(t)}function W(t,s){const a=f(s.cells,O)
return a.splice(0,1,R(a[0],t),k(a[0],t),A(a[0],t)),a}function _(t,s){const e=function(t,s){return f(t.rows).slice(1,-1).map(n(W,s))}(t,s),r=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),e=w()
a(e,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),e}(t)
E(t,r,e),function(){const t=m("custombutton",d)
0!==t.length&&j(t[0],`<span> <a href="${p}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}()}function z(t){"weekly"===u.subcmd2?function(t){c('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[S(!1)].concat([1,2,3,4,5,6,7].map(n(F,t)))
C(s,n(K,t))}(t):S(!1).then(n(_,t))}export default function(){if(l())return
const t=o("table",d)[1]
t&&B().then(()=>z(t))}
//# sourceMappingURL=guildAdvisor-1dc2ac40.js.map
