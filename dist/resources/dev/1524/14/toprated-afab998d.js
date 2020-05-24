import{x as n,aK as t,g as e,p as s,d as a,b6 as r,u as i,F as c,b3 as l,i as o,am as u,ay as f,as as d,T as h,m as p,a0 as m,ac as v,bN as g,Q as y,a7 as _,b,l as w,o as N,j,b4 as L}from"./calfSystem-d96a3efd.js"
import{c as C}from"./createInput-2717f905.js"
import{o as F}from"./onlineDot-17edd2c6.js"
import{c as O,b as P,p as S}from"./levelHighlight-580474a6.js"
import"./all-a5e007ad.js"
import{a as T}from"./allthen-182523ad.js"
function x(t){return function(t){return n({cmd:"findplayer",subcmd:"view",search_username:t})}(t)}function H(n){return function(n){return t({subcmd:"view",guild_id:n})}(n)}function k(n){return[n,r(n),(t=n,t.rows[0].cells[0].children[0]?Number(/guild_id=(\d+)/.exec(t.rows[0].cells[0].children[0].href)[1]):-1)]
var t}function E(n,t){return t[0]===n[2]}function M(n,t){const e=n.find(i(E,t))
return e?e[1].push(t):n.push([t[2],[t]]),n}function W(n,t){return t[0]===n}function D(n,t){let e=t[0]
t[1].length<5&&(e=-1)
const s=n.find(i(W,e))
return s?s[1]=s[1].concat(t[1]):n.push([e,t[1]]),n}function I(n,t,e){const s=function(n,t){return n?t[n]:t}(n,e)
if(!t[s])return t[s]=!0,!0}let K,Q
const U=[()=>K,n=>u(n)||n!==Q,(n,t)=>t.last_login>=f-604800,(n,t)=>t.virtual_level>=P,(n,t)=>t.virtual_level<=S]
function $(n,t,e){o(n.rows[0],`<td>${F({last_login:e.last_login})}</td>`),function(n,t){return U.every(e=>e(n,t))}(t,e)&&n.parentNode.parentNode.classList.add("lvlHighlight")}let q
function z(){p(q)}function A(n,t){$(n[0],n[2],{last_login:String(t.last_activity),virtual_level:t.vl})}function B(n,t){return t.name===n[1]}function G(n,t){const e=n.find(i(B,t))
e&&A(t,e)}function J(n,t){t.s&&y(t.r)&&A(n,t.r[0])}function R(n,t){t.s&&A(n,{last_activity:f-t.r.last_activity,vl:t.r.virtual_level})}function V(n){return-1!==n[0]}function X(n,t){return n.concat(t.members)}function Y(n,t){const e=(s=t.r.ranks,a="id",s.filter(i(I,a,{}))).reduce(X,[])
var s,a
n[1].forEach(i(G,e))}function Z(n,t){t.s&&Y(n,t)}function nn(n){return H(n[0]).then(i(Z,n))}function tn(n){return-1===n[0]}function en(n){return n[1]!==v()?x(n[1]).then(i(J,n)):g().then(i(R,n))}function sn(){const n=e(a,s).slice(4).map(k).reduce(M,[]).reduce(D,[])
let t=n.filter(V).map(nn)
n.find(tn)&&(t=t.concat(n.find(tn)[1].map(en))),T(t,z)}function an(n){var t
m("toprated","FindOnlinePlayers"),t=n.target,d(t),q=h({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),t.parentNode.replaceChild(q,t),K=c("highlightPlayersNearMyLvl"),K&&(O(),Q=l()),sn()}const rn=[()=>j(),()=>L(s),()=>L(s.children[0]),()=>L(s.children[0].rows),()=>s.children[0].rows.length>2,()=>r(s.children[0].rows[1]).startsWith("Last Updated")]
export default function(){rn.every(_)&&function(){const n=b("td",s)[0]
n.children[0].className="fshTopListWrap"
const t=C({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
w(n,t),N(t,an)}()}
//# sourceMappingURL=toprated-afab998d.js.map
