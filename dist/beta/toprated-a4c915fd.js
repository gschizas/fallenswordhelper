import{y as n,aI as t,g as e,p as r,c as s,bk as a,v as i,G as c,b3 as o,i as l,am as u,aw as f,aq as d,T as h,n as p,a0 as m,ac as v,bK as g,a7 as b,b as y,m as _,o as w,j,b4 as N}from"./calfSystem-70c0e373.js"
import{i as L}from"./isArray-4a5a2451.js"
import{c as C}from"./createInput-0bc2f786.js"
import{o as F}from"./onlineDot-cbb49e00.js"
import{c as O,b as P,p as S}from"./levelHighlight-669e8d98.js"
import"./all-0a0c0fc9.js"
import{a as T}from"./allthen-4e324603.js"
function k(t){return function(t){return n({cmd:"findplayer",subcmd:"view",search_username:t})}(t)}function H(n){return function(n){return t({subcmd:"view",guild_id:n})}(n)}function x(n){return[n,a(n),(t=n,t.rows[0].cells[0].children[0]?Number(/guild_id=(\d+)/.exec(t.rows[0].cells[0].children[0].href)[1]):-1)]
var t}function E(n,t){return t[0]===n[2]}function I(n,t){const e=n.find(i(E,t))
return e?e[1].push(t):n.push([t[2],[t]]),n}function M(n,t){return t[0]===n}function W(n,t){let e=t[0]
t[1].length<5&&(e=-1)
const r=n.find(i(M,e))
return r?r[1]=r[1].concat(t[1]):n.push([e,t[1]]),n}function q(n,t,e){const r=function(n,t){return n?t[n]:t}(n,e)
if(!t[r])return t[r]=!0,!0}let A,D
const G=[()=>A,n=>u(n)||n!==D,(n,t)=>t.last_login>=f-604800,(n,t)=>t.virtual_level>=P,(n,t)=>t.virtual_level<=S]
function K(n,t,e){l(n.rows[0],`<td>${F({last_login:e.last_login})}</td>`),function(n,t){return G.every(e=>e(n,t))}(t,e)&&n.parentNode.parentNode.classList.add("lvlHighlight")}let U
function $(){p(U)}function z(n,t){K(n[0],n[2],{last_login:String(t.last_activity),virtual_level:t.vl})}function B(n,t){return t.name===n[1]}function J(n,t){const e=n.find(i(B,t))
e&&z(t,e)}function Q(n,t){t.s&&L(t.r)&&z(n,t.r[0])}function R(n,t){t.s&&z(n,{last_activity:f-t.r.last_activity,vl:t.r.virtual_level})}function V(n){return-1!==n[0]}function X(n,t){return n.concat(t.members)}function Y(n,t){const e=(r=t.r.ranks,s="id",r.filter(i(q,s,{}))).reduce(X,[])
var r,s
n[1].forEach(i(J,e))}function Z(n,t){t.s&&Y(n,t)}function nn(n){return H(n[0]).then(i(Z,n))}function tn(n){return-1===n[0]}function en(n){return n[1]!==v()?k(n[1]).then(i(Q,n)):g().then(i(R,n))}function rn(){const n=e(s,r).slice(4).map(x).reduce(I,[]).reduce(W,[])
let t=n.filter(V).map(nn)
n.find(tn)&&(t=t.concat(n.find(tn)[1].map(en))),T(t,$)}function sn(n){var t
m("toprated","FindOnlinePlayers"),t=n.target,d(t),U=h({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),t.parentNode.replaceChild(U,t),A=c("highlightPlayersNearMyLvl"),A&&(O(),D=o()),rn()}const an=[()=>j(),()=>N(r),()=>N(r.children[0]),()=>N(r.children[0].rows),()=>r.children[0].rows.length>2,()=>a(r.children[0].rows[1]).startsWith("Last Updated")]
export default function(){an.every(b)&&function(){const n=y("td",r)[0]
n.children[0].className="fshTopListWrap"
const t=C({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
_(n,t),w(t,sn)}()}
//# sourceMappingURL=toprated-a4c915fd.js.map
