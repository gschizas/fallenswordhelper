import{cb as n,C as e,v as t,aF as s,ax as o,a4 as a,cd as i,R as c,_ as r,l,U as u,Q as p,a0 as m,i as d,ak as f,bn as g,N as h,h as b,o as v,p as C,B as S,e as k,ce as x,D as N,aL as E,j,G as y,A as L,K as A,P as $}from"./calfSystem-99da704d.js"
import{c as q}from"./createInput-bb469b2f.js"
import{c as F}from"./createTable-a4026ce1.js"
import{p as I,a as B}from"./pubsub-36258063.js"
import{r as P,g as T}from"./rnd-984cedcd.js"
function Q(n,t){e("",n.children[0]),n.children[0].classList.add("fshPot"),n.children[0].style.backgroundImage=`url(${s}composing/${T(1,11)}_${T(1,51)}.png)`,e(`Creating '<span class="fshBold">${t}</span>' Potion`,n.children[2]),e("",n.children[3])}function _(n){const t=n.parentNode
t&&(e('<div class="fshScs">Success</div>',t),Q(t.previousElementSibling.previousElementSibling,n[n.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function w(n,t){const s=n.parentNode
s&&(t.error?e(`<div class="fshScs">${t.error}</div>`,s):_(n))}function R(e){var s;(s=e.value,n({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:P()}})).then(t(w,e))}function D(n,t){e("",n),n.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),R(t),I("quickcreate")}function G(n,e){n.classList.add(`left-${e.toString()}`)}function K(n){G(n,o(".quickCreate .sendLink").length)}function M(n){const e=n.target,{templateId:t}=e.dataset
t&&function(n,e){m("composing","FastComposeButton")
const t=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(t.length<n.value))for(let s=0;s<n.value;s+=1)t[s].value=e,D(t[s].nextElementSibling.nextElementSibling,t[s])}(e,t)}function U(n,e,t,s){var o,a
return 0===s&&S(n[1],e.insertCell(-1)),b(e.insertCell(-1),(o=(s+1).toString(),a=n[0],q({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),e}function z(n,e,s,o){return n.reduce(t(U,o),s.insertRow(-1)),s}function H(n){return[n.value,n.text]}function J(n,e,s){const o=function(n,e,s){const o=F({id:"fshFastCompose"})
return G(o,s),n.reduce(t(z,e,s),o)}(h("#composing-template-multi option").map(H),e,s)
b(n,o),v(C,M),B("quickcreate",t(K,o))}function O(n){m("composing","FastCompose"),d(n,"<br>")
const e=f("composing-potion-time",document),t=e.filter(g("ETA: n/a")).length
t>0?J(n,e,t):d(n,"No open slots!")}const V=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function W(n,e){const t=V.exec(N(e))
if(t){const e=1e3*(3600*t[1]+60*t[2]+Number(t[3]))+E
return n.concat(e)}return n.concat(0)}function X(n){a(i,n)}function Y(n){r(n,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(n){const e=n.target.parentNode;(function(n){return"SPAN"===n.tagName&&"quickCreate"===n.className})(e)&&function(n){const e=n.previousElementSibling.previousElementSibling
e&&"none"!==e.value&&(D(n,e),m("composing","QuickCreate"))}(e)}function nn(){!function(){if(!k.enableComposingAlert)return
const n=f("composing-potion-time",document).reduce(W,[]),e=Math.min.apply(null,n)
0===e?X(!0):(X(!1),a(x,e))}(),h("input[id^=create-]:not(#create-multi)",C).forEach(Y),v(C,Z),function(){if(y("moveComposingButtons")){const n=L("composing-error-dialog").previousElementSibling
n.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const e=A("composing-level",C)[0].parentNode
$(n,e)}}(),function(){const n=c("#pCC div.centered")
r(n.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const e=l({className:"centered"})
u(e,n)
const s=q({id:"fast-compose",type:"checkbox"})
u(s,n),p(s,"change",t(O,e))}()}export default function(){j()&&C&&nn()}
//# sourceMappingURL=composing-ac259521.js.map
