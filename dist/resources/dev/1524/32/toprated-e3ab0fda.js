import{c as t}from"./createInput-85638c5e.js"
import{a as n}from"./allthen-975bc488.js"
import{w as e,g as r,p as s,d as i,G as a,t as o,bx as c,H as l,i as u,aN as f,U as d,aT as m,W as p,by as h,Q as v,b as g,o as b,j,ae as y}from"./calfSystem-19a5d332.js"
import{g as _}from"./guild-88fea2a0.js"
import{p as w}from"./playerName-09521e4e.js"
import{c as N}from"./currentGuildId-daa4c793.js"
import{o as L}from"./onlineDot-f2638c3d.js"
import{a as C,g as E}from"./levelHighlight-4a80f9f7.js"
import{c as P}from"./createSpan-58506d04.js"
import{h as S}from"./hideElement-7c48eb54.js"
import{f as T}from"./functionPasses-388b0a8b.js"
import{i as x}from"./insertElementAfterBegin-635560b5.js"
import"./all-31b59575.js"
import"./intValue-da5ad0eb.js"
import"./valueText-c9c4edc1.js"
import"./insertElementBefore-aa28f497.js"
function F(t){return function(t){return e({cmd:"findplayer",subcmd:"view",search_username:t})}(t)}function H(t){return function(t){return _({subcmd:"view",guild_id:t})}(t)}function O(t){return[t,a(t),(n=t,n.rows[0].cells[0].children[0]?Number(c.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function W(t,n){return n[0]===t[2]}function k(t,n){const e=t.find(o(W,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function B(t,n){return n[0]===t}function G(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(o(B,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function I(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let M,U
const A=[()=>M,t=>f(t)||t!==U,(t,n)=>n.last_login>=d-604800,(t,n)=>n.virtual_level>=C(),(t,n)=>n.virtual_level<=E()]
function D(t,n,e){u(t.rows[0],`<td>${L({last_login:e.last_login})}</td>`),function(t,n){return A.every((e=>e(t,n)))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let Q
function V(){S(Q)}function $(t,n){D(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function q(t,n){return n.name===t[1]}function z(t,n){const e=t.find(o(q,n))
e&&$(n,e)}function J(t,n){n.s&&v(n.r)&&$(t,n.r[0])}function K(t,n){n.s&&$(t,{last_activity:d-n.r.last_activity,vl:n.r.virtual_level})}function R(t){return-1!==t[0]}function X(t,n){return t.concat(n.members)}function Y(t,n){const e=(r=n.r.ranks,s="id",r.filter(o(I,s,{}))).reduce(X,[])
var r,s
t[1].forEach(o(z,e))}function Z(t,n){n.s&&Y(t,n)}function tt(t){return H(t[0]).then(o(Z,t))}function nt(t){return-1===t[0]}function et(t){return t[1]!==w()?F(t[1]).then(o(J,t)):h().then(o(K,t))}function rt(){const t=r(i,s).slice(4).map(O).reduce(k,[]).reduce(G,[])
let e=t.filter(R).map(tt)
t.find(nt)&&(e=e.concat(t.find(nt)[1].map(et))),n(e,V)}function st(t){var n
p("toprated","FindOnlinePlayers"),n=t.target,m(n),Q=P({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(Q,n),M=l("highlightPlayersNearMyLvl"),M&&(U=N()),rt()}const it=[()=>j(),()=>y(s),()=>y(s.children[0]),()=>y(s.children[0].rows),()=>s.children[0].rows.length>2,()=>a(s.children[0].rows[1]).startsWith("Last Updated")]
function at(){it.every(T)&&function(){const n=g("td",s)[0]
n.children[0].className="fshTopListWrap"
const e=t({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
x(n,e),b(e,st)}()}export default at
//# sourceMappingURL=toprated-e3ab0fda.js.map
