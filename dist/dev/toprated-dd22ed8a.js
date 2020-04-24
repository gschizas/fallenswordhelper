import{y as n,aL as t,g as e,p as a,c as r,b7 as s,v as i,G as c,b4 as o,i as l,an as u,az as f,at as d,U as h,n as p,a1 as v,ad as m,bO as b,R as g,a8 as y,b as _,m as w,o as L,j as N,b5 as j}from"./calfSystem-9b1fa4ca.js"
import{c as C}from"./createInput-097870f4.js"
import{o as O}from"./onlineDot-ae55259c.js"
import{c as F,b as P,p as S}from"./levelHighlight-e81bb645.js"
import"./all-d7ba558a.js"
import{a as H}from"./allthen-db530ef8.js"
function T(t){return function(t){return n({cmd:"findplayer",subcmd:"view",search_username:t})}(t)}function k(n){return function(n){return t({subcmd:"view",guild_id:n})}(n)}function x(n){return[n,s(n),(t=n,t.rows[0].cells[0].children[0]?Number(/guild_id=(\d+)/.exec(t.rows[0].cells[0].children[0].href)[1]):-1)]
var t}function E(n,t){return t[0]===n[2]}function M(n,t){const e=n.find(i(E,t))
return e?e[1].push(t):n.push([t[2],[t]]),n}function U(n,t){return t[0]===n}function W(n,t){let e=t[0]
t[1].length<5&&(e=-1)
const a=n.find(i(U,e))
return a?a[1]=a[1].concat(t[1]):n.push([e,t[1]]),n}function z(n,t,e){const a=function(n,t){return n?t[n]:t}(n,e)
if(!t[a])return t[a]=!0,!0}let D,G
const I=[()=>D,n=>u(n)||n!==G,(n,t)=>t.last_login>=f-604800,(n,t)=>t.virtual_level>=P,(n,t)=>t.virtual_level<=S]
function R(n,t,e){l(n.rows[0],`<td>${O({last_login:e.last_login})}</td>`),function(n,t){return I.every(e=>e(n,t))}(t,e)&&n.parentNode.parentNode.classList.add("lvlHighlight")}let $
function q(){p($)}function A(n,t){R(n[0],n[2],{last_login:String(t.last_activity),virtual_level:t.vl})}function B(n,t){return t.name===n[1]}function J(n,t){const e=n.find(i(B,t))
e&&A(t,e)}function K(n,t){t.s&&g(t.r)&&A(n,t.r[0])}function Q(n,t){t.s&&A(n,{last_activity:f-t.r.last_activity,vl:t.r.virtual_level})}function V(n){return-1!==n[0]}function X(n,t){return n.concat(t.members)}function Y(n,t){const e=(a=t.r.ranks,r="id",a.filter(i(z,r,{}))).reduce(X,[])
var a,r
n[1].forEach(i(J,e))}function Z(n,t){t.s&&Y(n,t)}function nn(n){return k(n[0]).then(i(Z,n))}function tn(n){return-1===n[0]}function en(n){return n[1]!==m()?T(n[1]).then(i(K,n)):b().then(i(Q,n))}function an(){const n=e(r,a).slice(4).map(x).reduce(M,[]).reduce(W,[])
let t=n.filter(V).map(nn)
n.find(tn)&&(t=t.concat(n.find(tn)[1].map(en))),H(t,q)}function rn(n){var t
v("toprated","FindOnlinePlayers"),t=n.target,d(t),$=h({className:"fshCurveContainer fshTopListSpinner",innerHTML:'<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'}),t.parentNode.replaceChild($,t),D=c("highlightPlayersNearMyLvl"),D&&(F(),G=o()),an()}const sn=[()=>N(),()=>j(a),()=>j(a.children[0]),()=>j(a.children[0].rows),()=>a.children[0].rows.length>2,()=>s(a.children[0].rows[1]).startsWith("Last Updated")]
export default function(){sn.every(y)&&function(){const n=_("td",a)[0]
n.children[0].className="fshTopListWrap"
const t=C({id:"fshFindOnlinePlayers",className:"custombutton tip-static",type:"button",value:"Find Online Players",dataset:{tipped:"Fetch the online status of the top 250 players (warning ... takes a few seconds)."}})
w(n,t),L(t,rn)}()}
//# sourceMappingURL=toprated-dd22ed8a.js.map
