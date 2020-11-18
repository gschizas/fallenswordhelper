import{w as t,g as n,p as e,d as r,G as s,t as i,bg as a,H as o,i as c,ai as l,S as u,am as f,U as d,bh as m,b as p,o as h,j as v,aS as g}from"./calfSystem-57628ebe.js"
import{i as j}from"./isArray-26644043.js"
import{p as y}from"./playerName-d617838d.js"
import{c as b}from"./createInput-b0ce969c.js"
import{o as _}from"./onlineDot-aa286806.js"
import"./insertElementBefore-7e0a7ce8.js"
import{c as w}from"./currentGuildId-909a3fed.js"
import"./intValue-f94761c7.js"
import"./valueText-a430d398.js"
import{a as N,g as L}from"./levelHighlight-fdd81b7c.js"
import{i as S}from"./insertElementAfterBegin-8d3bd0da.js"
import{c as C}from"./createSpan-4a052a9f.js"
import{h as E}from"./hideElement-a8c1e8d6.js"
import"./all-01203f8c.js"
import{f as P}from"./functionPasses-3c1df9d8.js"
import{g as F}from"./guild-089c237a.js"
import{a as H}from"./allthen-ca11bf0c.js"
function O(n){return function(n){return t({cmd:"findplayer",subcmd:"view",search_username:n})}(n)}function T(t){return function(t){return F({subcmd:"view",guild_id:t})}(t)}function x(t){return[t,s(t),(n=t,n.rows[0].cells[0].children[0]?Number(a.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function k(t,n){return n[0]===t[2]}function A(t,n){const e=t.find(i(k,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function B(t,n){return n[0]===t}function G(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(i(B,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function I(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let M,U
const W=[()=>M,t=>l(t)||t!==U,(t,n)=>n.last_login>=u-604800,(t,n)=>n.virtual_level>=N(),(t,n)=>n.virtual_level<=L()]
function D(t,n,e){c(t.rows[0],`<td>${_({last_login:e.last_login})}</td>`),function(t,n){return W.every(e=>e(t,n))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let V
function $(){E(V)}function q(t,n){D(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function z(t,n){return n.name===t[1]}function J(t,n){const e=t.find(i(z,n))
e&&q(n,e)}function K(t,n){n.s&&j(n.r)&&q(t,n.r[0])}function Q(t,n){n.s&&q(t,{last_activity:u-n.r.last_activity,vl:n.r.virtual_level})}function R(t){return-1!==t[0]}function X(t,n){return t.concat(n.members)}function Y(t,n){const e=(r=n.r.ranks,s="id",r.filter(i(I,s,{}))).reduce(X,[])
var r,s
t[1].forEach(i(J,e))}function Z(t,n){n.s&&Y(t,n)}function tt(t){return T(t[0]).then(i(Z,t))}function nt(t){return-1===t[0]}function et(t){return t[1]!==y()?O(t[1]).then(i(K,t)):m().then(i(Q,t))}function rt(){const t=n(r,e).slice(4).map(x).reduce(A,[]).reduce(G,[])
let s=t.filter(R).map(tt)
t.find(nt)&&(s=s.concat(t.find(nt)[1].map(et))),H(s,$)}function st(t){var n
d("toprated","FindOnlinePlayers"),n=t.target,f(n),V=C({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(V,n),M=o("highlightPlayersNearMyLvl"),M&&(U=w()),rt()}const it=[()=>v(),()=>g(e),()=>g(e.children[0]),()=>g(e.children[0].rows),()=>e.children[0].rows.length>2,()=>s(e.children[0].rows[1]).startsWith("Last Updated")]
function at(){it.every(P)&&function(){const t=p("td",e)[0]
t.children[0].className="fshTopListWrap"
const n=b({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
S(t,n),h(n,st)}()}export default at
//# sourceMappingURL=toprated-d236d6fb.js.map
