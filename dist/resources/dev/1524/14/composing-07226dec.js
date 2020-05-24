import{ce as n,B as e,u as t,aH as s,az as o,a4 as a,cg as i,R as c,_ as r,k as l,U as u,P as p,a0 as m,i as d,ak as f,b5 as g,M as h,f as b,o as v,p as C,A as S,c as k,ch as N,C as x,aN as E,j,F as y,z as A,J as L,O as q}from"./calfSystem-d96a3efd.js"
import{c as F}from"./createInput-2717f905.js"
import{c as I}from"./createTable-13920811.js"
import{p as $,a as B}from"./pubsub-dcfa18d6.js"
import{r as P,g as T}from"./rnd-7b78c248.js"
function _(n,t){e("",n.children[0]),n.children[0].classList.add("fshPot"),n.children[0].style.backgroundImage=`url(${s}composing/${T(1,11)}_${T(1,51)}.png)`,e(`Creating '<span class="fshBold">${t}</span>' Potion`,n.children[2]),e("",n.children[3])}function w(n){const t=n.parentNode
t&&(e('<div class="fshScs">Success</div>',t),_(t.previousElementSibling.previousElementSibling,n[n.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function z(n,t){const s=n.parentNode
s&&(t.error?e(`<div class="fshScs">${t.error}</div>`,s):w(n))}function M(e){var s;(s=e.value,n({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:P()}})).then(t(z,e))}function Q(n,t){e("",n),n.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),M(t),$("quickcreate")}function R(n,e){n.classList.add("left-"+e.toString())}function H(n){R(n,o(".quickCreate .sendLink").length)}function J(n){const e=n.target,{templateId:t}=e.dataset
t&&function(n,e){m("composing","FastComposeButton")
const t=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(t.length<n.value))for(let s=0;s<n.value;s+=1)t[s].value=e,Q(t[s].nextElementSibling.nextElementSibling,t[s])}(e,t)}function O(n,e,t,s){var o,a
return 0===s&&S(n[1],e.insertCell(-1)),b(e.insertCell(-1),(o=(s+1).toString(),a=n[0],F({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),e}function U(n,e,s,o){return n.reduce(t(O,o),s.insertRow(-1)),s}function D(n){return[n.value,n.text]}function G(n,e,s){const o=function(n,e,s){const o=I({id:"fshFastCompose"})
return R(o,s),n.reduce(t(U,e,s),o)}(h("#composing-template-multi option").map(D),e,s)
b(n,o),v(C,J),B("quickcreate",t(H,o))}function K(n){m("composing","FastCompose"),d(n,"<br>")
const e=f("composing-potion-time",document),t=e.filter(g("ETA: n/a")).length
t>0?G(n,e,t):d(n,"No open slots!")}const V=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function W(n,e){const t=V.exec(x(e))
if(t){const e=1e3*(3600*t[1]+60*t[2]+Number(t[3]))+E
return n.concat(e)}return n.concat(0)}function X(n){a(i,n)}function Y(n){r(n,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(n){const e=n.target.parentNode;(function(n){return"SPAN"===n.tagName&&"quickCreate"===n.className})(e)&&function(n){const e=n.previousElementSibling.previousElementSibling
e&&"none"!==e.value&&(Q(n,e),m("composing","QuickCreate"))}(e)}function nn(){!function(){if(!k.enableComposingAlert)return
const n=f("composing-potion-time",document).reduce(W,[]),e=Math.min.apply(null,n)
0===e?X(!0):(X(!1),a(N,e))}(),h("input[id^=create-]:not(#create-multi)",C).forEach(Y),v(C,Z),function(){if(y("moveComposingButtons")){const n=A("composing-error-dialog").previousElementSibling
n.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const e=L("composing-level",C)[0].parentNode
q(n,e)}}(),function(){const n=c("#pCC div.centered")
r(n.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const e=l({className:"centered"})
u(e,n)
const s=F({id:"fast-compose",type:"checkbox"})
u(s,n),p(s,"change",t(K,e))}()}export default function(){j()&&C&&nn()}
//# sourceMappingURL=composing-07226dec.js.map
