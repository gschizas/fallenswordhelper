import{w as t,g as n,p as e,d as r,K as s,t as a,bj as i,G as o,i as c,ai as l,S as f,am as u,U as d,bk as m,b as p,o as h,j as v,aT as g}from"./calfSystem-2741d97b.js"
import{i as j}from"./isArray-aedaa0a2.js"
import{p as b}from"./playerName-5fbf0efe.js"
import{c as y}from"./createInput-0f2d72fe.js"
import{o as _}from"./onlineDot-f6177bb2.js"
import"./insertElementBefore-1ac41a54.js"
import{c as w}from"./currentGuildId-2c5ea0ad.js"
import"./intValue-1a593541.js"
import"./valueText-9aacf9d4.js"
import{c as N,b as L,p as S}from"./levelHighlight-7f319ff9.js"
import{i as C}from"./insertElementAfterBegin-83c570c6.js"
import{c as E}from"./createSpan-b0f81047.js"
import{h as P}from"./hideElement-6a4f37a8.js"
import"./all-75af160a.js"
import{f as T}from"./functionPasses-751d475f.js"
import{g as F}from"./guild-579c1e27.js"
import{a as O}from"./allthen-dcd66ca6.js"
function k(n){return function(n){return t({cmd:"findplayer",subcmd:"view",search_username:n})}(n)}function x(t){return function(t){return F({subcmd:"view",guild_id:t})}(t)}function H(t){return[t,s(t),(n=t,n.rows[0].cells[0].children[0]?Number(i.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function A(t,n){return n[0]===t[2]}function B(t,n){const e=t.find(a(A,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function G(t,n){return n[0]===t}function I(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(a(G,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function M(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let U,W
const D=[()=>U,t=>l(t)||t!==W,(t,n)=>n.last_login>=f-604800,(t,n)=>n.virtual_level>=L,(t,n)=>n.virtual_level<=S]
function K(t,n,e){c(t.rows[0],`<td>${_({last_login:e.last_login})}</td>`),function(t,n){return D.every(e=>e(t,n))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let V
function $(){P(V)}function q(t,n){K(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function z(t,n){return n.name===t[1]}function J(t,n){const e=t.find(a(z,n))
e&&q(n,e)}function Q(t,n){n.s&&j(n.r)&&q(t,n.r[0])}function R(t,n){n.s&&q(t,{last_activity:f-n.r.last_activity,vl:n.r.virtual_level})}function X(t){return-1!==t[0]}function Y(t,n){return t.concat(n.members)}function Z(t,n){const e=(r=n.r.ranks,s="id",r.filter(a(M,s,{}))).reduce(Y,[])
var r,s
t[1].forEach(a(J,e))}function tt(t,n){n.s&&Z(t,n)}function nt(t){return x(t[0]).then(a(tt,t))}function et(t){return-1===t[0]}function rt(t){return t[1]!==b()?k(t[1]).then(a(Q,t)):m().then(a(R,t))}function st(){const t=n(r,e).slice(4).map(H).reduce(B,[]).reduce(I,[])
let s=t.filter(X).map(nt)
t.find(et)&&(s=s.concat(t.find(et)[1].map(rt))),O(s,$)}function at(t){var n
d("toprated","FindOnlinePlayers"),n=t.target,u(n),V=E({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(V,n),U=o("highlightPlayersNearMyLvl"),U&&(N(),W=w()),st()}const it=[()=>v(),()=>g(e),()=>g(e.children[0]),()=>g(e.children[0].rows),()=>e.children[0].rows.length>2,()=>s(e.children[0].rows[1]).startsWith("Last Updated")]
export default function(){it.every(T)&&function(){const t=p("td",e)[0]
t.children[0].className="fshTopListWrap"
const n=y({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
C(t,n),h(n,at)}()}
//# sourceMappingURL=toprated-e8436776.js.map
