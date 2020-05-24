import{x as n,aH as t,g as e,p as r,d as s,bj as a,u as i,F as o,b2 as c,i as l,al as u,av as f,ap as d,S as h,m as p,$ as m,ab as v,bJ as g,a6 as b,b as y,l as _,o as w,j,b3 as N}from"./calfSystem-371c414c.js"
import{i as L}from"./isArray-f2e9e1ad.js"
import{c as C}from"./createInput-d378f9d2.js"
import{o as F}from"./onlineDot-b47e695a.js"
import{c as S,b as H,p as O}from"./levelHighlight-cee6b23a.js"
import"./all-93023d41.js"
import{a as P}from"./allthen-691ee788.js"
function x(t){return function(t){return n({cmd:"findplayer",subcmd:"view",search_username:t})}(t)}function T(n){return function(n){return t({subcmd:"view",guild_id:n})}(n)}function k(n){return[n,a(n),(t=n,t.rows[0].cells[0].children[0]?Number(/guild_id=(\d+)/.exec(t.rows[0].cells[0].children[0].href)[1]):-1)]
var t}function E(n,t){return t[0]===n[2]}function M(n,t){const e=n.find(i(E,t))
return e?e[1].push(t):n.push([t[2],[t]]),n}function W(n,t){return t[0]===n}function $(n,t){let e=t[0]
t[1].length<5&&(e=-1)
const r=n.find(i(W,e))
return r?r[1]=r[1].concat(t[1]):n.push([e,t[1]]),n}function A(n,t,e){const r=function(n,t){return n?t[n]:t}(n,e)
if(!t[r])return t[r]=!0,!0}let D,I
const J=[()=>D,n=>u(n)||n!==I,(n,t)=>t.last_login>=f-604800,(n,t)=>t.virtual_level>=H,(n,t)=>t.virtual_level<=O]
function U(n,t,e){l(n.rows[0],`<td>${F({last_login:e.last_login})}</td>`),function(n,t){return J.every(e=>e(n,t))}(t,e)&&n.parentNode.parentNode.classList.add("lvlHighlight")}let q
function z(){p(q)}function B(n,t){U(n[0],n[2],{last_login:String(t.last_activity),virtual_level:t.vl})}function G(n,t){return t.name===n[1]}function K(n,t){const e=n.find(i(G,t))
e&&B(t,e)}function Q(n,t){t.s&&L(t.r)&&B(n,t.r[0])}function R(n,t){t.s&&B(n,{last_activity:f-t.r.last_activity,vl:t.r.virtual_level})}function V(n){return-1!==n[0]}function X(n,t){return n.concat(t.members)}function Y(n,t){const e=(r=t.r.ranks,s="id",r.filter(i(A,s,{}))).reduce(X,[])
var r,s
n[1].forEach(i(K,e))}function Z(n,t){t.s&&Y(n,t)}function nn(n){return T(n[0]).then(i(Z,n))}function tn(n){return-1===n[0]}function en(n){return n[1]!==v()?x(n[1]).then(i(Q,n)):g().then(i(R,n))}function rn(){const n=e(s,r).slice(4).map(k).reduce(M,[]).reduce($,[])
let t=n.filter(V).map(nn)
n.find(tn)&&(t=t.concat(n.find(tn)[1].map(en))),P(t,z)}function sn(n){var t
m("toprated","FindOnlinePlayers"),t=n.target,d(t),q=h({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),t.parentNode.replaceChild(q,t),D=o("highlightPlayersNearMyLvl"),D&&(S(),I=c()),rn()}const an=[()=>j(),()=>N(r),()=>N(r.children[0]),()=>N(r.children[0].rows),()=>r.children[0].rows.length>2,()=>a(r.children[0].rows[1]).startsWith("Last Updated")]
export default function(){an.every(b)&&function(){const n=y("td",r)[0]
n.children[0].className="fshTopListWrap"
const t=C({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
_(n,t),w(t,sn)}()}
//# sourceMappingURL=toprated-0588770a.js.map
