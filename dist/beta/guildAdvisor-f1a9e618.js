import{r as t,aI as s,l as a,h as e,a as n,v as r,a9 as i,bd as l,C as c,be as o,i as d,ab as u,z as f,b as m,p as v,e as p,aH as h,K as b,_ as g,b6 as y,bk as B,D as C}from"./calfSystem-2fb02284.js"
import{c as j}from"./createTable-1d111f1d.js"
import"./all-88cb4e71.js"
import{a as A}from"./allthen-1b0c8f52.js"
import{l as D}from"./loadDataTables-b8097ab6.js"
import{g as k}from"./getMembrList-79859c5b.js"
import{r as S}from"./replaceChild-f422b6b2.js"
function T(s){return t("tfoot",s)}function w(t){return function(t){return s({subcmd:"advisor",subcmd2:"view",period:t})}(t)}const R=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function G(t,s){return s[t]?`<a href="${i}${s[t].id}">${t}</a>`:t}function L(t,s){return s[t]?s[t].level:""}function M(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function F(t,s,a){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:R,data:s,deferRender:!0,initComplete:a,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function x(t,s){n(3,r(S,t,s))}function E(t,s,i){const l=a(),c=j({className:"fshDataTable fshXSmall hover"})
return e(l,c),e(c,s),n(3,F,[c,i,r(x,l,t)]),l}function N(t,s,a){return d(t.lastElementChild.lastElementChild,` day ${s},`),a.r}function W(t,s){return w(s).then(r(N,t,s))}function H(t,s,a){return s+t[a]}function P(t,s,a){return{...s,stats:s.stats.map(r(H,t[a].stats))}}function X(t,s){return t.map(r(P,s))}function _(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function q(t,s){return s.stats.map(r(H,t))}function z(t,s){return`${t}<td><u>${s}</u></td>`}function I(t,s){const a=s.stats.map(u)
return[G(s.player.name,t),L(s.player.name,t),M(s.player.name,t)].concat(a)}function J(t,[s,...a]){const e=function(t){return t.slice(1).reduce(X,t[0]).map(_)}(a)
E(t,function(t){return T({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(q,t[0].stats).map(u).reduce(z,"")}</tr>`})}(e),e.map(r(I,s)))}function K(t,s){return 0===s?B(t):C(t)}function O(t,s){const a=h(s.cells,K)
return a.splice(0,1,G(a[0],t),L(a[0],t),M(a[0],t)),a}function Q(t,s){l("guildAdvisor.injectAdvisorDaily")
const a=function(t,s){return h(t.rows).slice(1,-1).map(r(O,s))}(t,s),n=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),a=T()
e(a,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),a}(t)
E(t,n,a),function(){const t=b("custombutton",v)
0!==t.length&&g(t[0],`<span> <a href="${y}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}(),o("guildAdvisor.injectAdvisorDaily")}function U(t){"weekly"===p.subcmd2?function(t){l("guildAdvisor.injectAdvisorWeekly"),c('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[k(!1)].concat([1,2,3,4,5,6,7].map(r(W,t)))
A(s,r(J,t)),o("guildAdvisor.injectAdvisorWeekly")}(t):k(!1).then(r(Q,t))}export default function(){if(f())return
const t=m("table",v)[1]
t&&D().then(()=>U(t))}
//# sourceMappingURL=guildAdvisor-f1a9e618.js.map
