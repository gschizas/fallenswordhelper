import{w as t,g as n,p as e,d as r,K as s,t as i,bo as a,G as o,i as c,ak as l,T as u,aq as f,V as d,br as m,P as p,b as h,o as v,j as b,aV as g}from"./calfSystem-9c7241dc.js"
import{p as j}from"./playerName-ddecc25a.js"
import{c as y}from"./createInput-6e753077.js"
import{o as _}from"./onlineDot-4bf0b1ba.js"
import"./insertElementBefore-686b8559.js"
import{c as w}from"./currentGuildId-00053b50.js"
import"./intValue-4cb61c79.js"
import"./valueText-2c80175b.js"
import{c as N,b as L,p as P}from"./levelHighlight-032034e0.js"
import{i as C}from"./insertElementAfterBegin-2637f36b.js"
import{c as E}from"./createSpan-dd12772b.js"
import{h as S}from"./hideElement-2e2ee272.js"
import"./all-fed72729.js"
import{f as T}from"./functionPasses-4d550982.js"
import{g as F}from"./guild-92790ca6.js"
import{a as O}from"./allthen-c94a6cae.js"
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
//# sourceMappingURL=toprated-e2d75d1c.js.map
