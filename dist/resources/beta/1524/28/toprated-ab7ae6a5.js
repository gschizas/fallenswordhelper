import{w as t,g as n,p as e,d as r,G as s,t as i,bi as a,H as o,i as c,ai as l,S as f,am as u,U as d,bm as m,b as p,o as h,j as v,aS as g}from"./calfSystem-964f4fc9.js"
import{i as b}from"./isArray-40d05c68.js"
import{p as j}from"./playerName-19c0b1a7.js"
import{c as y}from"./createInput-cbbea5aa.js"
import{o as _}from"./onlineDot-8bb6540e.js"
import"./insertElementBefore-eada6f05.js"
import{c as w}from"./currentGuildId-26c6bca8.js"
import"./intValue-f4d85578.js"
import"./valueText-9fa15adc.js"
import{a as N,g as L}from"./levelHighlight-1826a720.js"
import{i as S}from"./insertElementAfterBegin-15a62f25.js"
import{c as C}from"./createSpan-f18d72eb.js"
import{h as E}from"./hideElement-c14a94c9.js"
import"./all-7e2b4bf6.js"
import{f as P}from"./functionPasses-fa3457f1.js"
import{g as F}from"./guild-980e47e7.js"
import{a as H}from"./allthen-7191069a.js"
function O(n){return function(n){return t({cmd:"findplayer",subcmd:"view",search_username:n})}(n)}function T(t){return function(t){return F({subcmd:"view",guild_id:t})}(t)}function x(t){return[t,s(t),(n=t,n.rows[0].cells[0].children[0]?Number(a.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function k(t,n){return n[0]===t[2]}function A(t,n){const e=t.find(i(k,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function B(t,n){return n[0]===t}function G(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(i(B,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function I(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let M,U
const W=[()=>M,t=>l(t)||t!==U,(t,n)=>n.last_login>=f-604800,(t,n)=>n.virtual_level>=N(),(t,n)=>n.virtual_level<=L()]
function D(t,n,e){c(t.rows[0],`<td>${_({last_login:e.last_login})}</td>`),function(t,n){return W.every(e=>e(t,n))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let V
function $(){E(V)}function q(t,n){D(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function z(t,n){return n.name===t[1]}function J(t,n){const e=t.find(i(z,n))
e&&q(n,e)}function K(t,n){n.s&&b(n.r)&&q(t,n.r[0])}function Q(t,n){n.s&&q(t,{last_activity:f-n.r.last_activity,vl:n.r.virtual_level})}function R(t){return-1!==t[0]}function X(t,n){return t.concat(n.members)}function Y(t,n){const e=(r=n.r.ranks,s="id",r.filter(i(I,s,{}))).reduce(X,[])
var r,s
t[1].forEach(i(J,e))}function Z(t,n){n.s&&Y(t,n)}function tt(t){return T(t[0]).then(i(Z,t))}function nt(t){return-1===t[0]}function et(t){return t[1]!==j()?O(t[1]).then(i(K,t)):m().then(i(Q,t))}function rt(){const t=n(r,e).slice(4).map(x).reduce(A,[]).reduce(G,[])
let s=t.filter(R).map(tt)
t.find(nt)&&(s=s.concat(t.find(nt)[1].map(et))),H(s,$)}function st(t){var n
d("toprated","FindOnlinePlayers"),n=t.target,u(n),V=C({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(V,n),M=o("highlightPlayersNearMyLvl"),M&&(U=w()),rt()}const it=[()=>v(),()=>g(e),()=>g(e.children[0]),()=>g(e.children[0].rows),()=>e.children[0].rows.length>2,()=>s(e.children[0].rows[1]).startsWith("Last Updated")]
function at(){it.every(P)&&function(){const t=p("td",e)[0]
t.children[0].className="fshTopListWrap"
const n=y({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
S(t,n),h(n,st)}()}export default at
//# sourceMappingURL=toprated-ab7ae6a5.js.map
