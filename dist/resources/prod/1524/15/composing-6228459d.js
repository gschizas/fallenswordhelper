import{q as e,z as t,s as n,at as s,ah as o,V as a,bT as i,L as c,k as r,K as l,R as m,i as p,b8 as u,I as d,f,o as g,p as h,y as b,c as v,bU as C,A as S,ay as k,j as E,D as j,x,F as N}from"./calfSystem-740ec4d2.js"
import{c as y}from"./createInput-e6e1d6b3.js"
import{i as A}from"./insertElementBefore-d3961941.js"
import{c as L}from"./createTable-0cac6208.js"
import{p as q,a as I}from"./pubsub-c43ae41e.js"
import{g as B}from"./getArrayByClassName-c703ad24.js"
import{r as F,g as T}from"./rnd-1c872e21.js"
import{i as $}from"./insertHtmlAfterEnd-85b35954.js"
import{i as P}from"./insertElementAfter-c1c5f2c6.js"
function w(e,n){t("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${T(1,11)}_${T(1,51)}.png)`,t(`Creating '<span class="fshBold">${n}</span>' Potion`,e.children[2]),t("",e.children[3])}function Q(e){const n=e.parentNode
n&&(t('<div class="fshScs">Success</div>',n),w(n.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function R(e,n){const s=e.parentNode
s&&(n.error?t(`<div class="fshScs">${n.error}</div>`,s):Q(e))}function _(t){var s;(s=t.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:F()}})).then(n(R,t))}function z(e,n){t("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),_(n),q("quickcreate")}function D(e,t){e.classList.add("left-"+t.toString())}function H(e){D(e,o(".quickCreate .sendLink").length)}function K(e){const t=e.target,{templateId:n}=t.dataset
n&&function(e,t){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<e.value))for(let s=0;s<e.value;s+=1)n[s].value=t,z(n[s].nextElementSibling.nextElementSibling,n[s])}(t,n)}function M(e,t,n,s){var o,a
return 0===s&&b(e[1],t.insertCell(-1)),f(t.insertCell(-1),(o=(s+1).toString(),a=e[0],y({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),t}function U(e,t,s,o){return e.reduce(n(M,o),s.insertRow(-1)),s}function V(e){return[e.value,e.text]}function G(e,t,s){const o=function(e,t,s){const o=L({id:"fshFastCompose"})
return D(o,s),e.reduce(n(U,t,s),o)}(d("#composing-template-multi option").map(V),t,s)
f(e,o),g(h,K),I("quickcreate",n(H,o))}function J(e){m("composing","FastCompose"),p(e,"<br>")
const t=B("composing-potion-time",document),n=t.filter(u("ETA: n/a")).length
n>0?G(e,t,n):p(e,"No open slots!")}const O=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function W(e,t){const n=O.exec(S(t))
if(n){const t=1e3*(3600*n[1]+60*n[2]+Number(n[3]))+k
return e.concat(t)}return e.concat(0)}function X(e){a(i,e)}function Y(e){$(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(e){const t=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(t)&&function(e){const t=e.previousElementSibling.previousElementSibling
t&&"none"!==t.value&&(z(e,t),m("composing","QuickCreate"))}(t)}function ee(){!function(){if(!v.enableComposingAlert)return
const e=B("composing-potion-time",document).reduce(W,[]),t=Math.min.apply(null,e)
0===t?X(!0):(X(!1),a(C,t))}(),d("input[id^=create-]:not(#create-multi)",h).forEach(Y),g(h,Z),function(){if(j("moveComposingButtons")){const e=x("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const t=N("composing-level",h)[0].parentNode
A(e,t)}}(),function(){const e=c("#pCC div.centered")
$(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const t=r({className:"centered"})
P(t,e)
const s=y({id:"fast-compose",type:"checkbox"})
P(s,e),l(s,"change",n(J,t))}()}export default function(){E()&&h&&ee()}
//# sourceMappingURL=composing-6228459d.js.map
