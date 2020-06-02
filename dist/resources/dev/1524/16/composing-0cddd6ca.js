import{q as e,z as t,s as n,aG as s,ab as o,X as a,bP as i,N as c,k as r,L as l,T as m,i as p,a2 as u,I as d,f,o as g,p as b,y as h,c as v,bQ as C,A as S,a7 as k,j as E,D as N,x as j,F as x}from"./calfSystem-d49dbbd3.js"
import{c as y}from"./createInput-1699d448.js"
import{i as A}from"./insertElementBefore-5eb6d41d.js"
import{c as L}from"./createTable-86f16c48.js"
import{p as q,a as I}from"./pubsub-f687e3fa.js"
import{g as B}from"./getArrayByClassName-511145a8.js"
import{r as F,g as T}from"./rnd-9fb6149a.js"
import{i as $}from"./insertHtmlAfterEnd-43b283e0.js"
import{i as P}from"./insertElementAfter-e7cdbe3b.js"
function Q(e,n){t("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${T(1,11)}_${T(1,51)}.png)`,t(`Creating '<span class="fshBold">${n}</span>' Potion`,e.children[2]),t("",e.children[3])}function w(e){const n=e.parentNode
n&&(t('<div class="fshScs">Success</div>',n),Q(n.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function _(e,n){const s=e.parentNode
s&&(n.error?t(`<div class="fshScs">${n.error}</div>`,s):w(e))}function z(t){var s;(s=t.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:F()}})).then(n(_,t))}function D(e,n){t("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),z(n),q("quickcreate")}function G(e,t){e.classList.add("left-"+t.toString())}function H(e){G(e,o(".quickCreate .sendLink").length)}function M(e){const t=e.target,{templateId:n}=t.dataset
n&&function(e,t){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<e.value))for(let s=0;s<e.value;s+=1)n[s].value=t,D(n[s].nextElementSibling.nextElementSibling,n[s])}(t,n)}function R(e,t,n,s){var o,a
return 0===s&&h(e[1],t.insertCell(-1)),f(t.insertCell(-1),(o=(s+1).toString(),a=e[0],y({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),t}function X(e,t,s,o){return e.reduce(n(R,o),s.insertRow(-1)),s}function J(e){return[e.value,e.text]}function K(e,t,s){const o=function(e,t,s){const o=L({id:"fshFastCompose"})
return G(o,s),e.reduce(n(X,t,s),o)}(d("#composing-template-multi option").map(J),t,s)
f(e,o),g(b,M),I("quickcreate",n(H,o))}function O(e){m("composing","FastCompose"),p(e,"<br>")
const t=B("composing-potion-time",document),n=t.filter(u("ETA: n/a")).length
n>0?K(e,t,n):p(e,"No open slots!")}const U=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function V(e,t){const n=U.exec(S(t))
if(n){const t=1e3*(3600*n[1]+60*n[2]+Number(n[3]))+k
return e.concat(t)}return e.concat(0)}function W(e){a(i,e)}function Y(e){$(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(e){const t=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(t)&&function(e){const t=e.previousElementSibling.previousElementSibling
t&&"none"!==t.value&&(D(e,t),m("composing","QuickCreate"))}(t)}function ee(){!function(){if(!v.enableComposingAlert)return
const e=B("composing-potion-time",document).reduce(V,[]),t=Math.min.apply(null,e)
0===t?W(!0):(W(!1),a(C,t))}(),d("input[id^=create-]:not(#create-multi)",b).forEach(Y),g(b,Z),function(){if(N("moveComposingButtons")){const e=j("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const t=x("composing-level",b)[0].parentNode
A(e,t)}}(),function(){const e=c("#pCC div.centered")
$(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const t=r({className:"centered"})
P(t,e)
const s=y({id:"fast-compose",type:"checkbox"})
P(s,e),l(s,"change",n(O,t))}()}export default function(){E()&&b&&ee()}
//# sourceMappingURL=composing-0cddd6ca.js.map
