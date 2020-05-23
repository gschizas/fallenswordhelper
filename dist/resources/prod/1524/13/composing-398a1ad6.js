import{c6 as e,C as n,v as t,aF as s,ax as o,a4 as a,c8 as i,R as c,_ as r,l,U as u,Q as p,a0 as m,i as d,ak as f,bl as g,N as h,h as b,o as v,p as C,B as S,e as k,c9 as x,D as N,aL as E,j,G as y,A as L,K as A,P as q}from"./calfSystem-e6a24264.js"
import{c as F}from"./createInput-0d3b3ee8.js"
import{c as I}from"./createTable-f54d2e50.js"
import{p as $,a as B}from"./pubsub-3adb7749.js"
import{r as P,g as T}from"./rnd-fd7e09de.js"
function Q(e,t){n("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${T(1,11)}_${T(1,51)}.png)`,n(`Creating '<span class="fshBold">${t}</span>' Potion`,e.children[2]),n("",e.children[3])}function _(e){const t=e.parentNode
t&&(n('<div class="fshScs">Success</div>',t),Q(t.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function w(e,t){const s=e.parentNode
s&&(t.error?n(`<div class="fshScs">${t.error}</div>`,s):_(e))}function R(n){var s;(s=n.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:P()}})).then(t(w,n))}function D(e,t){n("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),R(t),$("quickcreate")}function G(e,n){e.classList.add("left-"+n.toString())}function K(e){G(e,o(".quickCreate .sendLink").length)}function M(e){const n=e.target,{templateId:t}=n.dataset
t&&function(e,n){m("composing","FastComposeButton")
const t=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(t.length<e.value))for(let s=0;s<e.value;s+=1)t[s].value=n,D(t[s].nextElementSibling.nextElementSibling,t[s])}(n,t)}function U(e,n,t,s){var o,a
return 0===s&&S(e[1],n.insertCell(-1)),b(n.insertCell(-1),(o=(s+1).toString(),a=e[0],F({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),n}function z(e,n,s,o){return e.reduce(t(U,o),s.insertRow(-1)),s}function H(e){return[e.value,e.text]}function J(e,n,s){const o=function(e,n,s){const o=I({id:"fshFastCompose"})
return G(o,s),e.reduce(t(z,n,s),o)}(h("#composing-template-multi option").map(H),n,s)
b(e,o),v(C,M),B("quickcreate",t(K,o))}function O(e){m("composing","FastCompose"),d(e,"<br>")
const n=f("composing-potion-time",document),t=n.filter(g("ETA: n/a")).length
t>0?J(e,n,t):d(e,"No open slots!")}const V=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function W(e,n){const t=V.exec(N(n))
if(t){const n=1e3*(3600*t[1]+60*t[2]+Number(t[3]))+E
return e.concat(n)}return e.concat(0)}function X(e){a(i,e)}function Y(e){r(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(e){const n=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(n)&&function(e){const n=e.previousElementSibling.previousElementSibling
n&&"none"!==n.value&&(D(e,n),m("composing","QuickCreate"))}(n)}function ee(){!function(){if(!k.enableComposingAlert)return
const e=f("composing-potion-time",document).reduce(W,[]),n=Math.min.apply(null,e)
0===n?X(!0):(X(!1),a(x,n))}(),h("input[id^=create-]:not(#create-multi)",C).forEach(Y),v(C,Z),function(){if(y("moveComposingButtons")){const e=L("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const n=A("composing-level",C)[0].parentNode
q(e,n)}}(),function(){const e=c("#pCC div.centered")
r(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const n=l({className:"centered"})
u(n,e)
const s=F({id:"fast-compose",type:"checkbox"})
u(s,e),p(s,"change",t(O,n))}()}export default function(){j()&&C&&ee()}
//# sourceMappingURL=composing-398a1ad6.js.map
