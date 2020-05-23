import{cf as e,C as n,v as t,aI as s,aA as o,a5 as a,ch as i,S as c,$ as r,l,V as u,Q as p,a1 as m,i as d,al as f,b6 as g,N as h,h as b,o as v,p as C,B as S,e as k,ci as N,D as x,aO as E,j,G as y,A,K as I,P as L}from"./calfSystem-fd021443.js"
import{c as $}from"./createInput-309e97c5.js"
import{c as q}from"./createTable-c0a20196.js"
import{p as B,a as F}from"./pubsub-febdce28.js"
import{r as P,g as T}from"./rnd-1854748e.js"
function Q(e,t){n("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${T(1,11)}_${T(1,51)}.png)`,n(`Creating '<span class="fshBold">${t}</span>' Potion`,e.children[2]),n("",e.children[3])}function w(e){const t=e.parentNode
t&&(n('<div class="fshScs">Success</div>',t),Q(t.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function _(e,t){const s=e.parentNode
s&&(t.error?n(`<div class="fshScs">${t.error}</div>`,s):w(e))}function D(n){var s;(s=n.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:P()}})).then(t(_,n))}function G(e,t){n("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),D(t),B("quickcreate")}function K(e,n){e.classList.add("left-"+n.toString())}function M(e){K(e,o(".quickCreate .sendLink").length)}function O(e){const n=e.target,{templateId:t}=n.dataset
t&&function(e,n){m("composing","FastComposeButton")
const t=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(t.length<e.value))for(let s=0;s<e.value;s+=1)t[s].value=n,G(t[s].nextElementSibling.nextElementSibling,t[s])}(n,t)}function R(e,n,t,s){var o,a
return 0===s&&S(e[1],n.insertCell(-1)),b(n.insertCell(-1),(o=(s+1).toString(),a=e[0],$({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),n}function V(e,n,s,o){return e.reduce(t(R,o),s.insertRow(-1)),s}function z(e){return[e.value,e.text]}function H(e,n,s){const o=function(e,n,s){const o=q({id:"fshFastCompose"})
return K(o,s),e.reduce(t(V,n,s),o)}(h("#composing-template-multi option").map(z),n,s)
b(e,o),v(C,O),F("quickcreate",t(M,o))}function J(e){m("composing","FastCompose"),d(e,"<br>")
const n=f("composing-potion-time",document),t=n.filter(g("ETA: n/a")).length
t>0?H(e,n,t):d(e,"No open slots!")}const U=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function W(e,n){const t=U.exec(x(n))
if(t){const n=1e3*(3600*t[1]+60*t[2]+Number(t[3]))+E
return e.concat(n)}return e.concat(0)}function X(e){a(i,e)}function Y(e){r(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(e){const n=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(n)&&function(e){const n=e.previousElementSibling.previousElementSibling
n&&"none"!==n.value&&(G(e,n),m("composing","QuickCreate"))}(n)}function ee(){!function(){if(!k.enableComposingAlert)return
const e=f("composing-potion-time",document).reduce(W,[]),n=Math.min.apply(null,e)
0===n?X(!0):(X(!1),a(N,n))}(),h("input[id^=create-]:not(#create-multi)",C).forEach(Y),v(C,Z),function(){if(y("moveComposingButtons")){const e=A("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const n=I("composing-level",C)[0].parentNode
L(e,n)}}(),function(){const e=c("#pCC div.centered")
r(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const n=l({className:"centered"})
u(n,e)
const s=$({id:"fast-compose",type:"checkbox"})
u(s,e),p(s,"change",t(J,n))}()}export default function(){j()&&C&&ee()}
//# sourceMappingURL=composing-25f4600d.js.map
