import{w as t,g as n,p as e,d as r,K as s,t as i,bl as a,G as o,i as c,ai as l,S as u,am as f,U as d,bp as m,b as p,o as h,j as v,aT as b}from"./calfSystem-05554bae.js"
import{i as g}from"./isArray-9377ced3.js"
import{p as j}from"./playerName-0e65dbb6.js"
import{c as y}from"./createInput-b4c4948c.js"
import{o as _}from"./onlineDot-2dc99915.js"
import"./insertElementBefore-2ba0b318.js"
import{c as w}from"./currentGuildId-03628998.js"
import"./intValue-f723fc88.js"
import"./valueText-d9bb024d.js"
import{c as N,b as L,p as S}from"./levelHighlight-5d27ef2e.js"
import{i as C}from"./insertElementAfterBegin-1acc7ec9.js"
import{c as E}from"./createSpan-472d43ae.js"
import{h as P}from"./hideElement-b7650daa.js"
import"./all-e13706ab.js"
import{f as T}from"./functionPasses-a445c50c.js"
import{g as F}from"./guild-2d1ac38d.js"
import{a as O}from"./allthen-feed7e5f.js"
function x(n){return function(n){return t({cmd:"findplayer",subcmd:"view",search_username:n})}(n)}function H(t){return function(t){return F({subcmd:"view",guild_id:t})}(t)}function k(t){return[t,s(t),(n=t,n.rows[0].cells[0].children[0]?Number(a.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function A(t,n){return n[0]===t[2]}function B(t,n){const e=t.find(i(A,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function G(t,n){return n[0]===t}function I(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(i(G,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function M(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let U,W
const D=[()=>U,t=>l(t)||t!==W,(t,n)=>n.last_login>=u-604800,(t,n)=>n.virtual_level>=L,(t,n)=>n.virtual_level<=S]
function K(t,n,e){c(t.rows[0],`<td>${_({last_login:e.last_login})}</td>`),function(t,n){return D.every(e=>e(t,n))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let V
function $(){P(V)}function q(t,n){K(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function z(t,n){return n.name===t[1]}function J(t,n){const e=t.find(i(z,n))
e&&q(n,e)}function Q(t,n){n.s&&g(n.r)&&q(t,n.r[0])}function R(t,n){n.s&&q(t,{last_activity:u-n.r.last_activity,vl:n.r.virtual_level})}function X(t){return-1!==t[0]}function Y(t,n){return t.concat(n.members)}function Z(t,n){const e=(r=n.r.ranks,s="id",r.filter(i(M,s,{}))).reduce(Y,[])
var r,s
t[1].forEach(i(J,e))}function tt(t,n){n.s&&Z(t,n)}function nt(t){return H(t[0]).then(i(tt,t))}function et(t){return-1===t[0]}function rt(t){return t[1]!==j()?x(t[1]).then(i(Q,t)):m().then(i(R,t))}function st(){const t=n(r,e).slice(4).map(k).reduce(B,[]).reduce(I,[])
let s=t.filter(X).map(nt)
t.find(et)&&(s=s.concat(t.find(et)[1].map(rt))),O(s,$)}function it(t){var n
d("toprated","FindOnlinePlayers"),n=t.target,f(n),V=E({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(V,n),U=o("highlightPlayersNearMyLvl"),U&&(N(),W=w()),st()}const at=[()=>v(),()=>b(e),()=>b(e.children[0]),()=>b(e.children[0].rows),()=>e.children[0].rows.length>2,()=>s(e.children[0].rows[1]).startsWith("Last Updated")]
export default function(){at.every(T)&&function(){const t=p("td",e)[0]
t.children[0].className="fshTopListWrap"
const n=y({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
C(t,n),h(n,it)}()}
//# sourceMappingURL=toprated-231de2bc.js.map
