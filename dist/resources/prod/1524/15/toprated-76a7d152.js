import{v as t,aw as n,g as e,p as r,d as s,aS as i,s as a,D as o,i as c,a8 as l,P as u,ac as f,R as d,br as m,b as p,o as h,j as v,aN as b}from"./calfSystem-740ec4d2.js"
import{i as g}from"./isArray-3eb52569.js"
import{p as j}from"./playerName-a172b8d3.js"
import{c as y}from"./createInput-e6e1d6b3.js"
import{o as _}from"./onlineDot-176ac2e8.js"
import{c as w}from"./currentGuildId-ce4d8404.js"
import"./intValue-576c2dec.js"
import"./valueText-3095af99.js"
import{c as N,b as L,p as P}from"./levelHighlight-2bc51b91.js"
import"./insertElementBefore-d3961941.js"
import{i as S}from"./insertElementAfterBegin-08e27acb.js"
import{c as C}from"./createSpan-b29fd959.js"
import{h as E}from"./hideElement-f48178cf.js"
import"./all-30e677b0.js"
import{a as F}from"./allthen-0a5c5fb9.js"
import{f as O}from"./functionPasses-09107a62.js"
function T(n){return function(n){return t({cmd:"findplayer",subcmd:"view",search_username:n})}(n)}function x(t){return function(t){return n({subcmd:"view",guild_id:t})}(t)}function H(t){return[t,i(t),(n=t,n.rows[0].cells[0].children[0]?Number(/guild_id=(\d+)/.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function k(t,n){return n[0]===t[2]}function A(t,n){const e=t.find(a(k,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function B(t,n){return n[0]===t}function D(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(a(B,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function I(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let M,W
const G=[()=>M,t=>l(t)||t!==W,(t,n)=>n.last_login>=u-604800,(t,n)=>n.virtual_level>=L,(t,n)=>n.virtual_level<=P]
function R(t,n,e){c(t.rows[0],`<td>${_({last_login:e.last_login})}</td>`),function(t,n){return G.every(e=>e(t,n))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let U
function V(){E(U)}function $(t,n){R(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function q(t,n){return n.name===t[1]}function z(t,n){const e=t.find(a(q,n))
e&&$(n,e)}function J(t,n){n.s&&g(n.r)&&$(t,n.r[0])}function K(t,n){n.s&&$(t,{last_activity:u-n.r.last_activity,vl:n.r.virtual_level})}function Q(t){return-1!==t[0]}function X(t,n){return t.concat(n.members)}function Y(t,n){const e=(r=n.r.ranks,s="id",r.filter(a(I,s,{}))).reduce(X,[])
var r,s
t[1].forEach(a(z,e))}function Z(t,n){n.s&&Y(t,n)}function tt(t){return x(t[0]).then(a(Z,t))}function nt(t){return-1===t[0]}function et(t){return t[1]!==j()?T(t[1]).then(a(J,t)):m().then(a(K,t))}function rt(){const t=e(s,r).slice(4).map(H).reduce(A,[]).reduce(D,[])
let n=t.filter(Q).map(tt)
t.find(nt)&&(n=n.concat(t.find(nt)[1].map(et))),F(n,V)}function st(t){var n
d("toprated","FindOnlinePlayers"),n=t.target,f(n),U=C({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(U,n),M=o("highlightPlayersNearMyLvl"),M&&(N(),W=w()),rt()}const it=[()=>v(),()=>b(r),()=>b(r.children[0]),()=>b(r.children[0].rows),()=>r.children[0].rows.length>2,()=>i(r.children[0].rows[1]).startsWith("Last Updated")]
export default function(){it.every(O)&&function(){const t=p("td",r)[0]
t.children[0].className="fshTopListWrap"
const n=y({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
S(t,n),h(n,st)}()}
//# sourceMappingURL=toprated-76a7d152.js.map
