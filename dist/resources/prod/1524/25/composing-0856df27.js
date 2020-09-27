import{r as e,A as t,t as n,aD as s,a9 as o,Y as a,bD as i,C as c,m as r,O as l,U as m,i as p,a$ as u,D as d,h as f,o as g,p as h,z as b,c as v,bE as C,B as S,a4 as E,j,H as k,y as N,J as x}from"./calfSystem-71b9378d.js"
import{c as y}from"./createInput-1eba672c.js"
import{i as A}from"./insertElementBefore-286ff14c.js"
import{c as B}from"./createTable-0f37c9d5.js"
import{p as L,a as $}from"./pubsub-dce6ac73.js"
import{g as q}from"./getArrayByClassName-0b903c97.js"
import{i as I}from"./insertHtmlAfterEnd-8f485add.js"
import{i as F}from"./insertElementAfter-45345c01.js"
import{r as T,g as D}from"./rnd-2c0c9a67.js"
function P(e,n){t("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${D(1,11)}_${D(1,51)}.png)`,t(`Creating '<span class="fshBold">${n}</span>' Potion`,e.children[2]),t("",e.children[3])}function w(e){const n=e.parentNode
n&&(t('<div class="fshScs">Success</div>',n),P(n.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function H(e,n){const s=e.parentNode
s&&(n.error?t(`<div class="fshScs">${n.error}</div>`,s):w(e))}function Q(t){var s;(s=t.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:T()}})).then(n(H,t))}function _(e,n){t("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),Q(n),L("quickcreate")}function z(e,t){e.classList.add("left-"+t.toString())}function J(e){z(e,o(".quickCreate .sendLink").length)}function M(e){const t=e.target,{templateId:n}=t.dataset
n&&function(e,t){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<e.value))for(let s=0;s<e.value;s+=1)n[s].value=t,_(n[s].nextElementSibling.nextElementSibling,n[s])}(t,n)}function O(e,t,n,s){var o,a
return 0===s&&b(e[1],t.insertCell(-1)),f(t.insertCell(-1),(o=(s+1).toString(),a=e[0],y({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),t}function R(e,t,s,o){return e.reduce(n(O,o),s.insertRow(-1)),s}function U(e){return[e.value,e.text]}function Y(e,t,s){const o=function(e,t,s){const o=B({id:"fshFastCompose"})
return z(o,s),e.reduce(n(R,t,s),o)}(d("#composing-template-multi option").map(U),t,s)
f(e,o),g(h,M),$("quickcreate",n(J,o))}function G(e){m("composing","FastCompose"),p(e,"<br>")
const t=q("composing-potion-time",document),n=t.filter(u("ETA: n/a")).length
n>0?Y(e,t,n):p(e,"No open slots!")}const K=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function V(e,t){const n=K.exec(S(t))
if(n){const t=1e3*(3600*n[1]+60*n[2]+Number(n[3]))+E
return e.concat(t)}return e.concat(0)}function W(e){a(i,e)}function X(e){I(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(e){const t=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(t)&&function(e){const t=e.previousElementSibling.previousElementSibling
t&&"none"!==t.value&&(_(e,t),m("composing","QuickCreate"))}(t)}function ee(){!function(){if(!v.enableComposingAlert)return
const e=q("composing-potion-time",document).reduce(V,[]),t=Math.min.apply(null,e)
0===t?W(!0):(W(!1),a(C,t))}(),d("input[id^=create-]:not(#create-multi)",h).forEach(X),g(h,Z),function(){if(k("moveComposingButtons")){const e=N("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const t=x("composing-level",h)[0].parentNode
A(e,t)}}(),function(){const e=c("#pCC div.centered")
I(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const t=r({className:"centered"})
F(t,e)
const s=y({id:"fast-compose",type:"checkbox"})
F(s,e),l(s,"change",n(G,t))}()}function te(){j()&&h&&ee()}export default te
//# sourceMappingURL=composing-0856df27.js.map
