import{c as t}from"./createInput-f7e07c00.js"
import{a as n}from"./allthen-3a9178b8.js"
import{w as e,g as r,p as s,d as i,G as a,t as o,bw as c,H as l,i as u,aM as f,T as d,aS as m,V as p,bx as h,P as v,b as g,o as b,j,ad as y}from"./calfSystem-393ab895.js"
import{g as _}from"./guild-f28a431e.js"
import{p as w}from"./playerName-03162bd7.js"
import{c as N}from"./currentGuildId-469c60c3.js"
import{o as L}from"./onlineDot-9b46cf0c.js"
import{a as P,g as S}from"./levelHighlight-6a86539a.js"
import{c as C}from"./createSpan-f9f70e5d.js"
import{h as E}from"./hideElement-d4551277.js"
import{f as T}from"./functionPasses-75c75ad9.js"
import{i as x}from"./insertElementAfterBegin-b64fd488.js"
import"./all-6dfbd6b8.js"
import"./intValue-e7ef611d.js"
import"./valueText-89c9d82f.js"
import"./insertElementBefore-43970b1f.js"
function F(t){return function(t){return e({cmd:"findplayer",subcmd:"view",search_username:t})}(t)}function H(t){return function(t){return _({subcmd:"view",guild_id:t})}(t)}function O(t){return[t,a(t),(n=t,n.rows[0].cells[0].children[0]?Number(c.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function M(t,n){return n[0]===t[2]}function k(t,n){const e=t.find(o(M,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function B(t,n){return n[0]===t}function G(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(o(B,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function I(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let V,W
const A=[()=>V,t=>f(t)||t!==W,(t,n)=>n.last_login>=d-604800,(t,n)=>n.virtual_level>=P(),(t,n)=>n.virtual_level<=S()]
function D(t,n,e){u(t.rows[0],`<td>${L({last_login:e.last_login})}</td>`),function(t,n){return A.every((e=>e(t,n)))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let U
function $(){E(U)}function q(t,n){D(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function z(t,n){return n.name===t[1]}function J(t,n){const e=t.find(o(z,n))
e&&q(n,e)}function K(t,n){n.s&&v(n.r)&&q(t,n.r[0])}function Q(t,n){n.s&&q(t,{last_activity:d-n.r.last_activity,vl:n.r.virtual_level})}function R(t){return-1!==t[0]}function X(t,n){return t.concat(n.members)}function Y(t,n){const e=(r=n.r.ranks,s="id",r.filter(o(I,s,{}))).reduce(X,[])
var r,s
t[1].forEach(o(J,e))}function Z(t,n){n.s&&Y(t,n)}function tt(t){return H(t[0]).then(o(Z,t))}function nt(t){return-1===t[0]}function et(t){return t[1]!==w()?F(t[1]).then(o(K,t)):h().then(o(Q,t))}function rt(){const t=r(i,s).slice(4).map(O).reduce(k,[]).reduce(G,[])
let e=t.filter(R).map(tt)
t.find(nt)&&(e=e.concat(t.find(nt)[1].map(et))),n(e,$)}function st(t){var n
p("toprated","FindOnlinePlayers"),n=t.target,m(n),U=C({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(U,n),V=l("highlightPlayersNearMyLvl"),V&&(W=N()),rt()}const it=[()=>j(),()=>y(s),()=>y(s.children[0]),()=>y(s.children[0].rows),()=>s.children[0].rows.length>2,()=>a(s.children[0].rows[1]).startsWith("Last Updated")]
function at(){it.every(T)&&function(){const n=g("td",s)[0]
n.children[0].className="fshTopListWrap"
const e=t({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
x(n,e),b(e,st)}()}export default at
//# sourceMappingURL=toprated-47c69fcf.js.map
