import{n as t,m as s,h as a,a as e,t as n,a2 as r,aX as i,A as l,aY as c,i as o,x as d,b as u,p as f,c as m,M as p,I as v,a9 as h,K as b,B as j}from"./calfSystem-9c7241dc.js"
import{a as g}from"./addCommas-22ea816a.js"
import"./currentGuildId-00053b50.js"
import"./idb-5f8a9591.js"
import{c as y}from"./createTable-711dc1b7.js"
import"./indexAjaxJson-82fdd15d.js"
import"./cmdExport-cec76f08.js"
import{i as A}from"./insertHtmlAfterEnd-1e4cd611.js"
import"./all-fed72729.js"
import{l as B}from"./loadDataTables-d7f0915e.js"
import"./guild-92790ca6.js"
import{a as C}from"./allthen-c94a6cae.js"
import{g as D}from"./getMembrList-885dcf81.js"
import{d as S}from"./daAdvisor-390730b9.js"
import{r as k}from"./replaceChild-cc923121.js"
function T(s){return t("tfoot",s)}const x=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function R(t,s){return s[t]?`<a href="${r}${s[t].id}">${t}</a>`:t}function w(t,s){return s[t]?s[t].level:""}function G(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function M(t,s,a){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:x,data:s,deferRender:!0,initComplete:a,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function E(t,s){e(3,n(k,t,s))}function L(t,r,i){const l=s(),c=y({className:"fshDataTable fshXSmall hover"})
return a(l,c),a(c,r),e(3,M,[c,i,n(E,l,t)]),l}function F(t,s,a){return o(t.lastElementChild.lastElementChild,` day ${s},`),a.r}function N(t,s){return S(s).then(n(F,t,s))}function W(t,s,a){return s+t[a]}function X(t,s,a){return{...s,stats:s.stats.map(n(W,t[a].stats))}}function H(t,s){return t.map(n(X,s))}function I(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function J(t,s){return s.stats.map(n(W,t))}function P(t,s){return`${t}<td><u>${s}</u></td>`}function q(t,s){const a=s.stats.map(g)
return[R(s.player.name,t),w(s.player.name,t),G(s.player.name,t)].concat(a)}function K(t,[s,...a]){const e=function(t){return t.slice(1).reduce(H,t[0]).map(I)}(a)
L(t,function(t){return T({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(J,t[0].stats).map(g).reduce(P,"")}</tr>`})}(e),e.map(n(q,s)))}function O(t,s){return 0===s?b(t):j(t)}function Y(t,s){const a=p(s.cells,O)
return a.splice(0,1,R(a[0],t),w(a[0],t),G(a[0],t)),a}function _(t,s){i("guildAdvisor.injectAdvisorDaily")
const e=function(t,s){return p(t.rows).slice(1,-1).map(n(Y,s))}(t,s),r=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),e=T()
a(e,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),e}(t)
L(t,r,e),function(){const t=v("custombutton",f)
0!==t.length&&A(t[0],`<span> <a href="${h}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}(),c("guildAdvisor.injectAdvisorDaily")}function z(t){"weekly"===m.subcmd2?function(t){i("guildAdvisor.injectAdvisorWeekly"),l('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[D(!1)].concat([1,2,3,4,5,6,7].map(n(N,t)))
C(s,n(K,t)),c("guildAdvisor.injectAdvisorWeekly")}(t):D(!1).then(n(_,t))}export default function(){if(d())return
const t=u("table",f)[1]
t&&B().then(()=>z(t))}
//# sourceMappingURL=guildAdvisor-0cb56f79.js.map
