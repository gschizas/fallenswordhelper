import{r as e,A as t,t as n,aH as s,ab as o,Z as a,bJ as i,C as c,l as r,O as l,V as m,i as p,a4 as u,D as d,f,o as g,p as b,z as h,c as v,bK as C,B as S,a7 as E,j,G as k,y as N,I as x}from"./calfSystem-a2862afc.js"
import{c as y}from"./createInput-457456bb.js"
import{i as A}from"./insertElementBefore-372e5ad6.js"
import{c as B}from"./createTable-6dbc7d62.js"
import{p as I,a as L}from"./pubsub-92866278.js"
import{i as q}from"./insertHtmlAfterEnd-dd2b68c5.js"
import{g as $}from"./getArrayByClassName-c1e64010.js"
import{i as F}from"./insertElementAfter-79f2aa49.js"
import{r as T,g as P}from"./rnd-1b3c6e17.js"
function w(e,n){t("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${P(1,11)}_${P(1,51)}.png)`,t(`Creating '<span class="fshBold">${n}</span>' Potion`,e.children[2]),t("",e.children[3])}function H(e){const n=e.parentNode
n&&(t('<div class="fshScs">Success</div>',n),w(n.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function Q(e,n){const s=e.parentNode
s&&(n.error?t(`<div class="fshScs">${n.error}</div>`,s):H(e))}function _(t){var s;(s=t.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:T()}})).then(n(Q,t))}function z(e,n){t("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),_(n),I("quickcreate")}function D(e,t){e.classList.add("left-"+t.toString())}function G(e){D(e,o(".quickCreate .sendLink").length)}function J(e){const t=e.target,{templateId:n}=t.dataset
n&&function(e,t){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<e.value))for(let s=0;s<e.value;s+=1)n[s].value=t,z(n[s].nextElementSibling.nextElementSibling,n[s])}(t,n)}function K(e,t,n,s){var o,a
return 0===s&&h(e[1],t.insertCell(-1)),f(t.insertCell(-1),(o=(s+1).toString(),a=e[0],y({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),t}function M(e,t,s,o){return e.reduce(n(K,o),s.insertRow(-1)),s}function O(e){return[e.value,e.text]}function R(e,t,s){const o=function(e,t,s){const o=B({id:"fshFastCompose"})
return D(o,s),e.reduce(n(M,t,s),o)}(d("#composing-template-multi option").map(O),t,s)
f(e,o),g(b,J),L("quickcreate",n(G,o))}function V(e){m("composing","FastCompose"),p(e,"<br>")
const t=$("composing-potion-time",document),n=t.filter(u("ETA: n/a")).length
n>0?R(e,t,n):p(e,"No open slots!")}const Z=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function U(e,t){const n=Z.exec(S(t))
if(n){const t=1e3*(3600*n[1]+60*n[2]+Number(n[3]))+E
return e.concat(t)}return e.concat(0)}function W(e){a(i,e)}function X(e){q(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Y(e){const t=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(t)&&function(e){const t=e.previousElementSibling.previousElementSibling
t&&"none"!==t.value&&(z(e,t),m("composing","QuickCreate"))}(t)}function ee(){!function(){if(!v.enableComposingAlert)return
const e=$("composing-potion-time",document).reduce(U,[]),t=Math.min.apply(null,e)
0===t?W(!0):(W(!1),a(C,t))}(),d("input[id^=create-]:not(#create-multi)",b).forEach(X),g(b,Y),function(){if(k("moveComposingButtons")){const e=N("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const t=x("composing-level",b)[0].parentNode
A(e,t)}}(),function(){const e=c("#pCC div.centered")
q(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const t=r({className:"centered"})
F(t,e)
const s=y({id:"fast-compose",type:"checkbox"})
F(s,e),l(s,"change",n(V,t))}()}export default function(){j()&&b&&ee()}
//# sourceMappingURL=composing-37466331.js.map
