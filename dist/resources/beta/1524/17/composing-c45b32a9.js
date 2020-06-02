import{q as e,z as t,s as n,aB as s,a7 as o,W as a,bM as i,M as c,k as r,L as l,S as m,i as p,b2 as u,I as f,f as d,o as g,p as b,y as h,c as v,bN as C,A as S,a2 as k,j as E,D as N,x as j,F as x}from"./calfSystem-02ae8657.js"
import{c as y}from"./createInput-cbb1c2cb.js"
import{i as A}from"./insertElementBefore-35d3b41e.js"
import{c as L}from"./createTable-c905097e.js"
import{p as q,a as B}from"./pubsub-99b08a26.js"
import{g as I}from"./getArrayByClassName-d2e73c64.js"
import{r as F,g as $}from"./rnd-e5b94ee5.js"
import{i as T}from"./insertHtmlAfterEnd-23545b48.js"
import{i as M}from"./insertElementAfter-17facfb9.js"
function P(e,n){t("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${$(1,11)}_${$(1,51)}.png)`,t(`Creating '<span class="fshBold">${n}</span>' Potion`,e.children[2]),t("",e.children[3])}function w(e){const n=e.parentNode
n&&(t('<div class="fshScs">Success</div>',n),P(n.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function Q(e,n){const s=e.parentNode
s&&(n.error?t(`<div class="fshScs">${n.error}</div>`,s):w(e))}function _(t){var s;(s=t.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:F()}})).then(n(Q,t))}function z(e,n){t("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),_(n),q("quickcreate")}function D(e,t){e.classList.add("left-"+t.toString())}function H(e){D(e,o(".quickCreate .sendLink").length)}function R(e){const t=e.target,{templateId:n}=t.dataset
n&&function(e,t){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<e.value))for(let s=0;s<e.value;s+=1)n[s].value=t,z(n[s].nextElementSibling.nextElementSibling,n[s])}(t,n)}function W(e,t,n,s){var o,a
return 0===s&&h(e[1],t.insertCell(-1)),d(t.insertCell(-1),(o=(s+1).toString(),a=e[0],y({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),t}function G(e,t,s,o){return e.reduce(n(W,o),s.insertRow(-1)),s}function J(e){return[e.value,e.text]}function K(e,t,s){const o=function(e,t,s){const o=L({id:"fshFastCompose"})
return D(o,s),e.reduce(n(G,t,s),o)}(f("#composing-template-multi option").map(J),t,s)
d(e,o),g(b,R),B("quickcreate",n(H,o))}function O(e){m("composing","FastCompose"),p(e,"<br>")
const t=I("composing-potion-time",document),n=t.filter(u("ETA: n/a")).length
n>0?K(e,t,n):p(e,"No open slots!")}const U=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function V(e,t){const n=U.exec(S(t))
if(n){const t=1e3*(3600*n[1]+60*n[2]+Number(n[3]))+k
return e.concat(t)}return e.concat(0)}function X(e){a(i,e)}function Y(e){T(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(e){const t=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(t)&&function(e){const t=e.previousElementSibling.previousElementSibling
t&&"none"!==t.value&&(z(e,t),m("composing","QuickCreate"))}(t)}function ee(){!function(){if(!v.enableComposingAlert)return
const e=I("composing-potion-time",document).reduce(V,[]),t=Math.min.apply(null,e)
0===t?X(!0):(X(!1),a(C,t))}(),f("input[id^=create-]:not(#create-multi)",b).forEach(Y),g(b,Z),function(){if(N("moveComposingButtons")){const e=j("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const t=x("composing-level",b)[0].parentNode
A(e,t)}}(),function(){const e=c("#pCC div.centered")
T(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const t=r({className:"centered"})
M(t,e)
const s=y({id:"fast-compose",type:"checkbox"})
M(s,e),l(s,"change",n(O,t))}()}export default function(){E()&&b&&ee()}
//# sourceMappingURL=composing-c45b32a9.js.map
