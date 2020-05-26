import{m as t,aw as s,k as a,f as e,a as n,s as r,_ as c,z as l,i,w as o,b as d,p as u,c as f,av as m,F as p,aP as h,aS as v,A as b}from"./calfSystem-740ec4d2.js"
import{a as g}from"./addCommas-49286cf6.js"
import"./currentGuildId-ce4d8404.js"
import{c as j}from"./createTable-0cac6208.js"
import"./all-30e677b0.js"
import{a as y}from"./allthen-0a5c5fb9.js"
import"./indexAjaxJson-1e1af708.js"
import{i as B}from"./insertHtmlAfterEnd-85b35954.js"
import"./cmdExport-7c541a4f.js"
import{l as C}from"./loadDataTables-89aea7e0.js"
import{g as S}from"./getMembrList-cd652176.js"
import{r as w}from"./replaceChild-2d27eba2.js"
function T(s){return t("tfoot",s)}function k(t){return function(t){return s({subcmd:"advisor",subcmd2:"view",period:t})}(t)}const D=[{title:'<div class="fshBold">Member</div>'},{title:'<div class="fshBold">Lvl</div>',class:"dt-center"},{title:'<div class="fshBold">Rank</div>',class:"dt-center dt-nowrap"},{title:'<div class="fshBold">Gold From Deposits</div>',class:"dt-center"},{title:'<div class="fshBold">Gold From Tax</div>',class:"dt-center"},{title:'<div class="fshBold">Gold Total</div>',class:"dt-center"},{title:'<div class="fshBold">FSP</div>',class:"dt-center"},{title:'<div class="fshBold">Skill Cast</div>',class:"dt-center"},{title:'<div class="fshBold">Group Create</div>',class:"dt-center"},{title:'<div class="fshBold">Group Join</div>',class:"dt-center"},{title:'<div class="fshBold">Relic</div>',class:"dt-center"},{title:'<div class="fshBold">XP Contrib</div>',class:"dt-center"}]
function R(t,s){return s[t]?`<a href="${c}${s[t].id}">${t}</a>`:t}function x(t,s){return s[t]?s[t].level:""}function A(t,s){return s[t]?`<div class="fshAdvRank">${s[t].rank_name.trim()}</div>`:""}function G(t,s,a){$(t).DataTable({autoWidth:!1,columnDefs:[{targets:[1,3,4,5,6,7,8,9,10,11],orderSequence:["desc","asc"]}],columns:D,data:s,deferRender:!0,initComplete:a,lengthMenu:[[25,50,-1],[25,50,"All"]],pageLength:25,stateDuration:0,stateSave:!0})}function E(t,s){n(3,r(w,t,s))}function F(t,s,c){const l=a(),i=j({className:"fshDataTable fshXSmall hover"})
return e(l,i),e(i,s),n(3,G,[i,c,r(E,l,t)]),l}function L(t,s,a){return i(t.lastElementChild.lastElementChild,` day ${s},`),a.r}function M(t,s){return k(s).then(r(L,t,s))}function N(t,s,a){return s+t[a]}function P(t,s,a){return{...s,stats:s.stats.map(r(N,t[a].stats))}}function H(t,s){return t.map(r(P,s))}function J(t){return{player:t.player,stats:[t.stats[6],t.stats[7],t.stats[6]+t.stats[7],t.stats[1],t.stats[2],t.stats[3],t.stats[4],t.stats[8],t.stats[5]]}}function X(t,s){return s.stats.map(r(N,t))}function _(t,s){return`${t}<td><u>${s}</u></td>`}function q(t,s){const a=s.stats.map(g)
return[R(s.player.name,t),x(s.player.name,t),A(s.player.name,t)].concat(a)}function z(t,[s,...a]){const e=function(t){return t.slice(1).reduce(H,t[0]).map(J)}(a)
F(t,function(t){return T({innerHTML:`<tr><td class="fshRight" colspan="3">Total: </td>${t.slice(1).reduce(X,t[0].stats).map(g).reduce(_,"")}</tr>`})}(e),e.map(r(q,s)))}function I(t,s){return 0===s?v(t):b(t)}function O(t,s){const a=m(s.cells,I)
return a.splice(0,1,R(a[0],t),x(a[0],t),A(a[0],t)),a}function W(t,s){const a=function(t,s){return m(t.rows).slice(1,-1).map(r(O,s))}(t,s),n=function(t){const s=t.rows[t.rows.length-1].cloneNode(!0),a=T()
e(a,s)
const n=s.cells[0]
return n.className="fshRight",n.setAttribute("colspan","3"),a}(t)
F(t,n,a),function(){const t=p("custombutton",u)
0!==t.length&&B(t[0],`<span> <a href="${h}guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`)}()}function K(t){"weekly"===f.subcmd2?function(t){l('<span class="fshCurveContainer fshFlex"><span class="fshCurveEle fshCurveLbl fshOldSpinner"></span><span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span></span>',t)
const s=[S(!1)].concat([1,2,3,4,5,6,7].map(r(M,t)))
y(s,r(z,t))}(t):S(!1).then(r(W,t))}export default function(){if(o())return
const t=d("table",u)[1]
t&&C().then(()=>K(t))}
//# sourceMappingURL=guildAdvisor-916531bd.js.map
