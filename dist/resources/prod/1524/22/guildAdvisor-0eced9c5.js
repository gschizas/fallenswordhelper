import{n as t,m as s,h as e,a,t as n,a1 as r,A as i,i as l,x as c,b as o,p as d,c as u,M as f,I as m,a6 as p,K as h,B as v}from"./calfSystem-d04e4be4.js"
import{a as b}from"./addCommas-d05e6f0b.js"
import"./currentGuildId-9ae9b1fe.js"
import"./idb-0492f5ed.js"
import{c as g}from"./createTable-4846a76e.js"
import"./indexAjaxJson-73d427c9.js"
import"./cmdExport-9eb7477e.js"
import{i as j}from"./insertHtmlAfterEnd-8f464ed1.js"
import"./all-f846cd86.js"
import{l as B}from"./loadDataTables-b5e9e533.js"
import{g as y}from"./guild-84a28d12.js"
import{a as C}from"./allthen-086eab8e.js"
import{g as S}from"./getMembrList-2684ae4e.js"
import{r as T}from"./replaceChild-79f70a01.js"
function w(s){return t("tfoot",s)}function x(t){return function(t){return y({subcmd:"advisor",subcmd2:"view",period:t})}(t)}const D=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function R(t,s){return s[t]?`<a href="${r}${s[t].id}">${t}</a>`:t}function k(t,s){return s[t]?s[t].level:""}function A(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function G(t,s,e){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:D,data:s,deferRender:!0,initComplete:e,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function M(t,s){a(3,n(T,t,s))}function E(t,r,i){const l=s(),c=g({className:"fshDataTable fshXSmall hover"})
return e(l,c),e(c,r),a(3,G,[c,i,n(M,l,t)]),l}function L(t,s,e){return l(t.lastElementChild.lastElementChild,` day ${s},`),e.r}function F(t,s){return x(s).then(n(L,t,s))}function N(t,s,e){return s+t[e]}function H(t,s,e){return{...s,stats:s.stats.map(n(N,t[e].stats))}}function I(t,s){return t.map(n(H,s))}function J(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function P(t,s){return s.stats.map(n(N,t))}function X(t,s){return`${t}<td><u>${s}</u></td>`}function q(t,s){const e=s.stats.map(b)
return[R(s.player.name,t),k(s.player.name,t),A(s.player.name,t)].concat(e)}function K(t,[s,...e]){const a=function(t){return t.slice(1).reduce(I,t[0]).map(J)}(e)
E(t,function(t){return w({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(P,t[0].stats).map(b).reduce(X,"")}</tr>`})}(a),a.map(n(q,s)))}function O(t,s){return 0===s?h(t):v(t)}function W(t,s){const e=f(s.cells,O)
return e.splice(0,1,R(e[0],t),k(e[0],t),A(e[0],t)),e}function _(t,s){const a=function(t,s){return f(t.rows).slice(1,-1).map(n(W,s))}(t,s),r=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),a=w()
e(a,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),a}(t)
E(t,r,a),function(){const t=m("custombutton",d)
0!==t.length&&j(t[0],`<span> <a href="${p}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}()}function z(t){"weekly"===u.subcmd2?function(t){i('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[S(!1)].concat([1,2,3,4,5,6,7].map(n(F,t)))
C(s,n(K,t))}(t):S(!1).then(n(_,t))}export default function(){if(c())return
const t=o("table",d)[1]
t&&B().then(()=>z(t))}
//# sourceMappingURL=guildAdvisor-0eced9c5.js.map
