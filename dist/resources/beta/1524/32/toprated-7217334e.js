import{c as t}from"./createInput-538cc410.js"
import{a as n}from"./allthen-975bc488.js"
import{w as e,g as r,p as s,d as i,G as a,t as o,bu as c,H as l,i as u,aI as f,T as d,aM as m,V as p,bv as h,b as v,o as b,j as g,ad as j}from"./calfSystem-26bcf570.js"
import{g as y}from"./guild-611eec4f.js"
import{i as _}from"./isArray-73a21c38.js"
import{p as w}from"./playerName-7d235e41.js"
import{c as N}from"./currentGuildId-b9dbffa6.js"
import{o as L}from"./onlineDot-018fc1c9.js"
import{a as C,g as E}from"./levelHighlight-6dccc69c.js"
import{c as P}from"./createSpan-d92b45d9.js"
import{h as S}from"./hideElement-7c48eb54.js"
import{f as T}from"./functionPasses-388b0a8b.js"
import{i as F}from"./insertElementAfterBegin-3ba6aba1.js"
import"./all-31b59575.js"
import"./intValue-da5ad0eb.js"
import"./valueText-60aa9d22.js"
import"./insertElementBefore-aa28f497.js"
function H(t){return function(t){return e({cmd:"findplayer",subcmd:"view",search_username:t})}(t)}function O(t){return function(t){return y({subcmd:"view",guild_id:t})}(t)}function x(t){return[t,a(t),(n=t,n.rows[0].cells[0].children[0]?Number(c.exec(n.rows[0].cells[0].children[0].href)[1]):-1)]
var n}function I(t,n){return n[0]===t[2]}function M(t,n){const e=t.find(o(I,n))
return e?e[1].push(n):t.push([n[2],[n]]),t}function k(t,n){return n[0]===t}function A(t,n){let e=n[0]
n[1].length<5&&(e=-1)
const r=t.find(o(k,e))
return r?r[1]=r[1].concat(n[1]):t.push([e,n[1]]),t}function B(t,n,e){const r=function(t,n){return t?n[t]:n}(t,e)
if(!n[r])return n[r]=!0,!0}let G,V
const W=[()=>G,t=>f(t)||t!==V,(t,n)=>n.last_login>=d-604800,(t,n)=>n.virtual_level>=C(),(t,n)=>n.virtual_level<=E()]
function D(t,n,e){u(t.rows[0],`<td>${L({last_login:e.last_login})}</td>`),function(t,n){return W.every((e=>e(t,n)))}(n,e)&&t.parentNode.parentNode.classList.add("lvlHighlight")}let U
function $(){S(U)}function q(t,n){D(t[0],t[2],{last_login:String(n.last_activity),virtual_level:n.vl})}function z(t,n){return n.name===t[1]}function J(t,n){const e=t.find(o(z,n))
e&&q(n,e)}function K(t,n){n.s&&_(n.r)&&q(t,n.r[0])}function Q(t,n){n.s&&q(t,{last_activity:d-n.r.last_activity,vl:n.r.virtual_level})}function R(t){return-1!==t[0]}function X(t,n){return t.concat(n.members)}function Y(t,n){const e=(r=n.r.ranks,s="id",r.filter(o(B,s,{}))).reduce(X,[])
var r,s
t[1].forEach(o(J,e))}function Z(t,n){n.s&&Y(t,n)}function tt(t){return O(t[0]).then(o(Z,t))}function nt(t){return-1===t[0]}function et(t){return t[1]!==w()?H(t[1]).then(o(K,t)):h().then(o(Q,t))}function rt(){const t=r(i,s).slice(4).map(x).reduce(M,[]).reduce(A,[])
let e=t.filter(R).map(tt)
t.find(nt)&&(e=e.concat(t.find(nt)[1].map(et))),n(e,$)}function st(t){var n
p("toprated","FindOnlinePlayers"),n=t.target,m(n),U=P({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),n.parentNode.replaceChild(U,n),G=l("highlightPlayersNearMyLvl"),G&&(V=N()),rt()}const it=[()=>g(),()=>j(s),()=>j(s.children[0]),()=>j(s.children[0].rows),()=>s.children[0].rows.length>2,()=>a(s.children[0].rows[1]).startsWith("Last Updated")]
function at(){it.every(T)&&function(){const n=v("td",s)[0]
n.children[0].className="fshTopListWrap"
const e=t({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
F(n,e),b(e,st)}()}export default at
//# sourceMappingURL=toprated-7217334e.js.map
