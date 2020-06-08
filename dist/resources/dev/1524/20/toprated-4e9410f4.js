import{w as t,g as n,p as e,d as r,K as s,t as i,bo as a,G as o,i as c,ak as l,T as u,aq as f,V as d,br as m,P as p,b as h,o as v,j as b,aV as g}from"./calfSystem-a2862afc.js"
import{p as j}from"./playerName-72c7301a.js"
import{c as y}from"./createInput-457456bb.js"
import{o as _}from"./onlineDot-003f5d07.js"
import"./insertElementBefore-372e5ad6.js"
import{c as w}from"./currentGuildId-e84c528e.js"
import"./intValue-8b673ab3.js"
import"./valueText-0b6b2a96.js"
import{c as N,b as L,p as P}from"./levelHighlight-1bce539f.js"
import{i as C}from"./insertElementAfterBegin-195a0721.js"
import{c as E}from"./createSpan-b8f0a31d.js"
import{h as S}from"./hideElement-66d2f02e.js"
import"./all-6bd68ac2.js"
import{f as T}from"./functionPasses-a11f7325.js"
import{g as F}from"./guild-4a5b1ef9.js"
import{a as O}from"./allthen-41484118.js"
function k(n){return function(n){return t({cmd:"findplayer",subcmd:"view",search_username:n})}(n)}function x(t){return function(t){return F({subcmd:"view",guild_id:t})}(t)}function H(t){return[t,s(t),(n=t,n.rows[0].cells[0].children[0]?Number(a.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function V(t,n){return n[0]===t[2]}function B(t,n){const e=t.find(i(V,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function G(t,n){return n[0]===t}function I(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(i(G,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function M(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let W,q
const A=[()=>W,t=>l(t)||t!==q,(t,n)=>n.last_login>=u-604800,(t,n)=>n.virtual_level>=L,(t,n)=>n.virtual_level<=P]
function D(t,n,e){c(t.rows[0],`<td>${_({last_login:e.last_login})}</td>`),function(t,n){return A.every(e=>e(t,n))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let K
function U(){S(K)}function $(t,n){D(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function z(t,n){return n.name===t[1]}function J(t,n){const e=t.find(i(z,n))
e&&$(n,e)}function Q(t,n){n.s&&p(n.r)&&$(t,n.r[0])}function R(t,n){n.s&&$(t,{last_activity:u-n.r.last_activity,vl:n.r.virtual_level})}function X(t){return-1!==t[0]}function Y(t,n){return t.concat(n.members)}function Z(t,n){const e=(r=n.r.ranks,s="id",r.filter(i(M,s,{}))).reduce(Y,[])
var r,s
t[1].forEach(i(J,e))}function tt(t,n){n.s&&Z(t,n)}function nt(t){return x(t[0]).then(i(tt,t))}function et(t){return-1===t[0]}function rt(t){return t[1]!==j()?k(t[1]).then(i(Q,t)):m().then(i(R,t))}function st(){const t=n(r,e).slice(4).map(H).reduce(B,[]).reduce(I,[])
let s=t.filter(X).map(nt)
t.find(et)&&(s=s.concat(t.find(et)[1].map(rt))),O(s,U)}function it(t){var n
d("toprated","FindOnlinePlayers"),n=t.target,f(n),K=E({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(K,n),W=o("highlightPlayersNearMyLvl"),W&&(N(),q=w()),st()}const at=[()=>b(),()=>g(e),()=>g(e.children[0]),()=>g(e.children[0].rows),()=>e.children[0].rows.length>2,()=>s(e.children[0].rows[1]).startsWith("Last Updated")]
export default function(){at.every(T)&&function(){const t=h("td",e)[0]
t.children[0].className="fshTopListWrap"
const n=y({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
C(t,n),v(n,it)}()}
//# sourceMappingURL=toprated-4e9410f4.js.map
