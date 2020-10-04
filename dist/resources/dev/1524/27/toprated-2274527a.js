import{w as t,g as n,p as e,d as r,G as s,t as i,bm as a,H as o,i as c,al as l,U as u,ar as f,W as d,bp as m,P as p,b as h,o as v,j as g,aV as j}from"./calfSystem-ec5e5725.js"
import{p as b}from"./playerName-6b140f29.js"
import{c as y}from"./createInput-a9a25c4d.js"
import{o as _}from"./onlineDot-e6873f1e.js"
import"./insertElementBefore-543d9ef0.js"
import{c as w}from"./currentGuildId-4732beaa.js"
import"./intValue-ef353ded.js"
import"./valueText-f1c6f878.js"
import{a as N,g as L}from"./levelHighlight-ec2201dc.js"
import{i as P}from"./insertElementAfterBegin-21a4a979.js"
import{c as C}from"./createSpan-a26e8f7c.js"
import{h as E}from"./hideElement-b0b3e820.js"
import"./all-e81516b4.js"
import{f as S}from"./functionPasses-2e458a5d.js"
import{g as F}from"./guild-571b0c45.js"
import{a as H}from"./allthen-dd6cac31.js"
function O(n){return function(n){return t({cmd:"findplayer",subcmd:"view",search_username:n})}(n)}function T(t){return function(t){return F({subcmd:"view",guild_id:t})}(t)}function x(t){return[t,s(t),(n=t,n.rows[0].cells[0].children[0]?Number(a.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function W(t,n){return n[0]===t[2]}function k(t,n){const e=t.find(i(W,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function B(t,n){return n[0]===t}function G(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(i(B,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function I(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let M,U
const V=[()=>M,t=>l(t)||t!==U,(t,n)=>n.last_login>=u-604800,(t,n)=>n.virtual_level>=N(),(t,n)=>n.virtual_level<=L()]
function A(t,n,e){c(t.rows[0],`<td>${_({last_login:e.last_login})}</td>`),function(t,n){return V.every(e=>e(t,n))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let D
function $(){E(D)}function q(t,n){A(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function z(t,n){return n.name===t[1]}function J(t,n){const e=t.find(i(z,n))
e&&q(n,e)}function K(t,n){n.s&&p(n.r)&&q(t,n.r[0])}function Q(t,n){n.s&&q(t,{last_activity:u-n.r.last_activity,vl:n.r.virtual_level})}function R(t){return-1!==t[0]}function X(t,n){return t.concat(n.members)}function Y(t,n){const e=(r=n.r.ranks,s="id",r.filter(i(I,s,{}))).reduce(X,[])
var r,s
t[1].forEach(i(J,e))}function Z(t,n){n.s&&Y(t,n)}function tt(t){return T(t[0]).then(i(Z,t))}function nt(t){return-1===t[0]}function et(t){return t[1]!==b()?O(t[1]).then(i(K,t)):m().then(i(Q,t))}function rt(){const t=n(r,e).slice(4).map(x).reduce(k,[]).reduce(G,[])
let s=t.filter(R).map(tt)
t.find(nt)&&(s=s.concat(t.find(nt)[1].map(et))),H(s,$)}function st(t){var n
d("toprated","FindOnlinePlayers"),n=t.target,f(n),D=C({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(D,n),M=o("highlightPlayersNearMyLvl"),M&&(U=w()),rt()}const it=[()=>g(),()=>j(e),()=>j(e.children[0]),()=>j(e.children[0].rows),()=>e.children[0].rows.length>2,()=>s(e.children[0].rows[1]).startsWith("Last Updated")]
function at(){it.every(S)&&function(){const t=h("td",e)[0]
t.children[0].className="fshTopListWrap"
const n=y({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
P(t,n),v(n,st)}()}export default at
//# sourceMappingURL=toprated-2274527a.js.map
