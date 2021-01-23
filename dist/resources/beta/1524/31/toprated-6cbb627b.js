import{c as t}from"./createInput-e0371f2c.js"
import{a as n}from"./allthen-3a9178b8.js"
import{w as e,g as r,p as s,d as i,G as a,t as o,bt as c,H as l,i as u,aH as f,S as d,aL as m,U as p,bu as h,b as v,o as g,j as b,ac as j}from"./calfSystem-47fc08ae.js"
import{g as y}from"./guild-36586aac.js"
import{i as _}from"./isArray-551d6583.js"
import{p as w}from"./playerName-118d0325.js"
import{c as N}from"./currentGuildId-72bd2a1a.js"
import{o as L}from"./onlineDot-b5276d0b.js"
import{a as S,g as C}from"./levelHighlight-9f8be46e.js"
import{c as E}from"./createSpan-6b0a8c35.js"
import{h as H}from"./hideElement-d4551277.js"
import{f as P}from"./functionPasses-75c75ad9.js"
import{i as F}from"./insertElementAfterBegin-dabff013.js"
import"./all-6dfbd6b8.js"
import"./intValue-e7ef611d.js"
import"./valueText-d53d9568.js"
import"./insertElementBefore-43970b1f.js"
function O(t){return function(t){return e({cmd:"findplayer",subcmd:"view",search_username:t})}(t)}function T(t){return function(t){return y({subcmd:"view",guild_id:t})}(t)}function x(t){return[t,a(t),(n=t,n.rows[0].cells[0].children[0]?Number(c.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function k(t,n){return n[0]===t[2]}function A(t,n){const e=t.find(o(k,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function B(t,n){return n[0]===t}function G(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(o(B,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function I(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let M,U
const W=[()=>M,t=>f(t)||t!==U,(t,n)=>n.last_login>=d-604800,(t,n)=>n.virtual_level>=S(),(t,n)=>n.virtual_level<=C()]
function D(t,n,e){u(t.rows[0],`<td>${L({last_login:e.last_login})}</td>`),function(t,n){return W.every((e=>e(t,n)))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let V
function $(){H(V)}function q(t,n){D(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function z(t,n){return n.name===t[1]}function J(t,n){const e=t.find(o(z,n))
e&&q(n,e)}function K(t,n){n.s&&_(n.r)&&q(t,n.r[0])}function Q(t,n){n.s&&q(t,{last_activity:d-n.r.last_activity,vl:n.r.virtual_level})}function R(t){return-1!==t[0]}function X(t,n){return t.concat(n.members)}function Y(t,n){const e=(r=n.r.ranks,s="id",r.filter(o(I,s,{}))).reduce(X,[])
var r,s
t[1].forEach(o(J,e))}function Z(t,n){n.s&&Y(t,n)}function tt(t){return T(t[0]).then(o(Z,t))}function nt(t){return-1===t[0]}function et(t){return t[1]!==w()?O(t[1]).then(o(K,t)):h().then(o(Q,t))}function rt(){const t=r(i,s).slice(4).map(x).reduce(A,[]).reduce(G,[])
let e=t.filter(R).map(tt)
t.find(nt)&&(e=e.concat(t.find(nt)[1].map(et))),n(e,$)}function st(t){var n
p("toprated","FindOnlinePlayers"),n=t.target,m(n),V=E({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(V,n),M=l("highlightPlayersNearMyLvl"),M&&(U=N()),rt()}const it=[()=>b(),()=>j(s),()=>j(s.children[0]),()=>j(s.children[0].rows),()=>s.children[0].rows.length>2,()=>a(s.children[0].rows[1]).startsWith("Last Updated")]
function at(){it.every(P)&&function(){const n=v("td",s)[0]
n.children[0].className="fshTopListWrap"
const e=t({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
F(n,e),g(e,st)}()}export default at
//# sourceMappingURL=toprated-6cbb627b.js.map
