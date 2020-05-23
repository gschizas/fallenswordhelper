import{cf as n,C as e,v as t,aI as s,aA as o,a5 as a,ch as i,S as c,$ as r,l,V as u,Q as p,a1 as m,i as d,al as f,b6 as g,N as h,h as b,o as v,p as C,B as S,e as k,ci as N,D as x,aO as E,j,G as y,A,K as I,P as L}from"./calfSystem-01eb06ed.js"
import{c as $}from"./createInput-7fd54c66.js"
import{c as q}from"./createTable-1806515f.js"
import{p as B,a as F}from"./pubsub-095d0f5c.js"
import{r as P,g as T}from"./rnd-a99d963a.js"
function Q(n,t){e("",n.children[0]),n.children[0].classList.add("fshPot"),n.children[0].style.backgroundImage=`url(${s}composing/${T(1,11)}_${T(1,51)}.png)`,e(`Creating '<span class="fshBold">${t}</span>' Potion`,n.children[2]),e("",n.children[3])}function w(n){const t=n.parentNode
t&&(e('<div class="fshScs">Success</div>',t),Q(t.previousElementSibling.previousElementSibling,n[n.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function _(n,t){const s=n.parentNode
s&&(t.error?e(`<div class="fshScs">${t.error}</div>`,s):w(n))}function D(e){var s;(s=e.value,n({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:P()}})).then(t(_,e))}function G(n,t){e("",n),n.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),D(t),B("quickcreate")}function K(n,e){n.classList.add("left-"+e.toString())}function M(n){K(n,o(".quickCreate .sendLink").length)}function O(n){const e=n.target,{templateId:t}=e.dataset
t&&function(n,e){m("composing","FastComposeButton")
const t=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(t.length<n.value))for(let s=0;s<n.value;s+=1)t[s].value=e,G(t[s].nextElementSibling.nextElementSibling,t[s])}(e,t)}function R(n,e,t,s){var o,a
return 0===s&&S(n[1],e.insertCell(-1)),b(e.insertCell(-1),(o=(s+1).toString(),a=n[0],$({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),e}function V(n,e,s,o){return n.reduce(t(R,o),s.insertRow(-1)),s}function z(n){return[n.value,n.text]}function H(n,e,s){const o=function(n,e,s){const o=q({id:"fshFastCompose"})
return K(o,s),n.reduce(t(V,e,s),o)}(h("#composing-template-multi option").map(z),e,s)
b(n,o),v(C,O),F("quickcreate",t(M,o))}function J(n){m("composing","FastCompose"),d(n,"<br>")
const e=f("composing-potion-time",document),t=e.filter(g("ETA: n/a")).length
t>0?H(n,e,t):d(n,"No open slots!")}const U=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function W(n,e){const t=U.exec(x(e))
if(t){const e=1e3*(3600*t[1]+60*t[2]+Number(t[3]))+E
return n.concat(e)}return n.concat(0)}function X(n){a(i,n)}function Y(n){r(n,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(n){const e=n.target.parentNode;(function(n){return"SPAN"===n.tagName&&"quickCreate"===n.className})(e)&&function(n){const e=n.previousElementSibling.previousElementSibling
e&&"none"!==e.value&&(G(n,e),m("composing","QuickCreate"))}(e)}function nn(){!function(){if(!k.enableComposingAlert)return
const n=f("composing-potion-time",document).reduce(W,[]),e=Math.min.apply(null,n)
0===e?X(!0):(X(!1),a(N,e))}(),h("input[id^=create-]:not(#create-multi)",C).forEach(Y),v(C,Z),function(){if(y("moveComposingButtons")){const n=A("composing-error-dialog").previousElementSibling
n.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const e=I("composing-level",C)[0].parentNode
L(n,e)}}(),function(){const n=c("#pCC div.centered")
r(n.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const e=l({className:"centered"})
u(e,n)
const s=$({id:"fast-compose",type:"checkbox"})
u(s,n),p(s,"change",t(J,e))}()}export default function(){j()&&C&&nn()}
//# sourceMappingURL=composing-48f3e87a.js.map
