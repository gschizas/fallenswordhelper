import{v as t,az as n,g as e,p as r,d as s,aQ as i,s as a,D as o,i as c,a9 as l,Q as u,af as f,S as d,bB as m,L as p,b as h,o as v,j as g,aO as j}from"./calfSystem-ee582533.js"
import{p as b}from"./playerName-e40f24e0.js"
import{c as y}from"./createInput-2410e798.js"
import{o as _}from"./onlineDot-6ce6d139.js"
import{c as w}from"./currentGuildId-0564d9a0.js"
import"./intValue-a842cf8a.js"
import"./valueText-a2e47d93.js"
import{c as N,b as L,p as S}from"./levelHighlight-f61a008a.js"
import"./insertElementBefore-7ed837be.js"
import{i as C}from"./insertElementAfterBegin-115e10be.js"
import{c as E}from"./createSpan-63b97269.js"
import{h as O}from"./hideElement-faecef36.js"
import"./all-b94d2d9d.js"
import{a as P}from"./allthen-f1914fd2.js"
import{f as F}from"./functionPasses-b1aaa5dd.js"
function T(n){return function(n){return t({cmd:"findplayer",subcmd:"view",search_username:n})}(n)}function x(t){return function(t){return n({subcmd:"view",guild_id:t})}(t)}function B(t){return[t,i(t),(n=t,n.rows[0].cells[0].children[0]?Number(/guild_id=(\d+)/.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function H(t,n){return n[0]===t[2]}function k(t,n){const e=t.find(a(H,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function D(t,n){return n[0]===t}function I(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(a(D,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function M(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let Q,W
const z=[()=>Q,t=>l(t)||t!==W,(t,n)=>n.last_login>=u-604800,(t,n)=>n.virtual_level>=L,(t,n)=>n.virtual_level<=S]
function A(t,n,e){c(t.rows[0],`<td>${_({last_login:e.last_login})}</td>`),function(t,n){return z.every(e=>e(t,n))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let G
function U(){O(G)}function V(t,n){A(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function $(t,n){return n.name===t[1]}function q(t,n){const e=t.find(a($,n))
e&&V(n,e)}function J(t,n){n.s&&p(n.r)&&V(t,n.r[0])}function K(t,n){n.s&&V(t,{last_activity:u-n.r.last_activity,vl:n.r.virtual_level})}function R(t){return-1!==t[0]}function X(t,n){return t.concat(n.members)}function Y(t,n){const e=(r=n.r.ranks,s="id",r.filter(a(M,s,{}))).reduce(X,[])
var r,s
t[1].forEach(a(q,e))}function Z(t,n){n.s&&Y(t,n)}function tt(t){return x(t[0]).then(a(Z,t))}function nt(t){return-1===t[0]}function et(t){return t[1]!==b()?T(t[1]).then(a(J,t)):m().then(a(K,t))}function rt(){const t=e(s,r).slice(4).map(B).reduce(k,[]).reduce(I,[])
let n=t.filter(R).map(tt)
t.find(nt)&&(n=n.concat(t.find(nt)[1].map(et))),P(n,U)}function st(t){var n
d("toprated","FindOnlinePlayers"),n=t.target,f(n),G=E({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(G,n),Q=o("highlightPlayersNearMyLvl"),Q&&(N(),W=w()),rt()}const it=[()=>g(),()=>j(r),()=>j(r.children[0]),()=>j(r.children[0].rows),()=>r.children[0].rows.length>2,()=>i(r.children[0].rows[1]).startsWith("Last Updated")]
export default function(){it.every(F)&&function(){const t=h("td",r)[0]
t.children[0].className="fshTopListWrap"
const n=y({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
C(t,n),v(n,st)}()}
//# sourceMappingURL=toprated-42f8fc6e.js.map
