import{w as t,g as n,p as e,d as r,G as s,t as i,bo as a,H as o,i as c,ak as l,T as u,aq as f,V as d,br as m,P as p,b as h,o as v,j as g,aV as j}from"./calfSystem-69dd5601.js"
import{p as b}from"./playerName-688c2cbc.js"
import{c as y}from"./createInput-31301338.js"
import{o as _}from"./onlineDot-0fddc3bd.js"
import"./insertElementBefore-286ff14c.js"
import{c as w}from"./currentGuildId-a0138513.js"
import"./intValue-65d3c36c.js"
import"./valueText-1de8e1c5.js"
import{a as N,g as L}from"./levelHighlight-809d03f9.js"
import{i as P}from"./insertElementAfterBegin-c6f715e1.js"
import{c as C}from"./createSpan-71b557d6.js"
import{h as E}from"./hideElement-c8e0696f.js"
import"./all-3791b7d5.js"
import{f as S}from"./functionPasses-2024f108.js"
import{g as T}from"./guild-bc028c80.js"
import{a as F}from"./allthen-ad810e11.js"
function H(n){return function(n){return t({cmd:"findplayer",subcmd:"view",search_username:n})}(n)}function O(t){return function(t){return T({subcmd:"view",guild_id:t})}(t)}function k(t){return[t,s(t),(n=t,n.rows[0].cells[0].children[0]?Number(a.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function x(t,n){return n[0]===t[2]}function V(t,n){const e=t.find(i(x,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function B(t,n){return n[0]===t}function G(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(i(B,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function I(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let M,W
const q=[()=>M,t=>l(t)||t!==W,(t,n)=>n.last_login>=u-604800,(t,n)=>n.virtual_level>=N(),(t,n)=>n.virtual_level<=L()]
function A(t,n,e){c(t.rows[0],`<td>${_({last_login:e.last_login})}</td>`),function(t,n){return q.every(e=>e(t,n))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let D
function U(){E(D)}function $(t,n){A(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function z(t,n){return n.name===t[1]}function J(t,n){const e=t.find(i(z,n))
e&&$(n,e)}function K(t,n){n.s&&p(n.r)&&$(t,n.r[0])}function Q(t,n){n.s&&$(t,{last_activity:u-n.r.last_activity,vl:n.r.virtual_level})}function R(t){return-1!==t[0]}function X(t,n){return t.concat(n.members)}function Y(t,n){const e=(r=n.r.ranks,s="id",r.filter(i(I,s,{}))).reduce(X,[])
var r,s
t[1].forEach(i(J,e))}function Z(t,n){n.s&&Y(t,n)}function tt(t){return O(t[0]).then(i(Z,t))}function nt(t){return-1===t[0]}function et(t){return t[1]!==b()?H(t[1]).then(i(K,t)):m().then(i(Q,t))}function rt(){const t=n(r,e).slice(4).map(k).reduce(V,[]).reduce(G,[])
let s=t.filter(R).map(tt)
t.find(nt)&&(s=s.concat(t.find(nt)[1].map(et))),F(s,U)}function st(t){var n
d("toprated","FindOnlinePlayers"),n=t.target,f(n),D=C({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(D,n),M=o("highlightPlayersNearMyLvl"),M&&(W=w()),rt()}const it=[()=>g(),()=>j(e),()=>j(e.children[0]),()=>j(e.children[0].rows),()=>e.children[0].rows.length>2,()=>s(e.children[0].rows[1]).startsWith("Last Updated")]
function at(){it.every(S)&&function(){const t=h("td",e)[0]
t.children[0].className="fshTopListWrap"
const n=y({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
P(t,n),v(n,st)}()}export default at
//# sourceMappingURL=toprated-a8e7fe03.js.map
