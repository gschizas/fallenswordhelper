import{q as e,z as t,s as n,at as s,ah as o,V as a,bX as i,L as c,k as r,K as l,R as m,i as p,b8 as u,I as d,f,o as g,p as b,y as h,c as v,bY as C,A as S,ay as k,j as E,D as j,x,F as N}from"./calfSystem-1262535f.js"
import{c as y}from"./createInput-62cab8cf.js"
import{i as A}from"./insertElementBefore-dcdbe7ae.js"
import{c as L}from"./createTable-34bb0f34.js"
import{p as q,a as I}from"./pubsub-10b9364e.js"
import{g as B}from"./getArrayByClassName-486c0115.js"
import{r as F,g as $}from"./rnd-ca0d044e.js"
import{i as T}from"./insertHtmlAfterEnd-2dcd57ed.js"
import{i as P}from"./insertElementAfter-b1db9c91.js"
function w(e,n){t("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${$(1,11)}_${$(1,51)}.png)`,t(`Creating '<span class="fshBold">${n}</span>' Potion`,e.children[2]),t("",e.children[3])}function Q(e){const n=e.parentNode
n&&(t('<div class="fshScs">Success</div>',n),w(n.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function R(e,n){const s=e.parentNode
s&&(n.error?t(`<div class="fshScs">${n.error}</div>`,s):Q(e))}function _(t){var s;(s=t.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:F()}})).then(n(R,t))}function z(e,n){t("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),_(n),q("quickcreate")}function D(e,t){e.classList.add("left-"+t.toString())}function H(e){D(e,o(".quickCreate .sendLink").length)}function K(e){const t=e.target,{templateId:n}=t.dataset
n&&function(e,t){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<e.value))for(let s=0;s<e.value;s+=1)n[s].value=t,z(n[s].nextElementSibling.nextElementSibling,n[s])}(t,n)}function M(e,t,n,s){var o,a
return 0===s&&h(e[1],t.insertCell(-1)),f(t.insertCell(-1),(o=(s+1).toString(),a=e[0],y({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),t}function V(e,t,s,o){return e.reduce(n(M,o),s.insertRow(-1)),s}function X(e){return[e.value,e.text]}function Y(e,t,s){const o=function(e,t,s){const o=L({id:"fshFastCompose"})
return D(o,s),e.reduce(n(V,t,s),o)}(d("#composing-template-multi option").map(X),t,s)
f(e,o),g(b,K),I("quickcreate",n(H,o))}function G(e){m("composing","FastCompose"),p(e,"<br>")
const t=B("composing-potion-time",document),n=t.filter(u("ETA: n/a")).length
n>0?Y(e,t,n):p(e,"No open slots!")}const J=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function O(e,t){const n=J.exec(S(t))
if(n){const t=1e3*(3600*n[1]+60*n[2]+Number(n[3]))+k
return e.concat(t)}return e.concat(0)}function U(e){a(i,e)}function W(e){T(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(e){const t=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(t)&&function(e){const t=e.previousElementSibling.previousElementSibling
t&&"none"!==t.value&&(z(e,t),m("composing","QuickCreate"))}(t)}function ee(){!function(){if(!v.enableComposingAlert)return
const e=B("composing-potion-time",document).reduce(O,[]),t=Math.min.apply(null,e)
0===t?U(!0):(U(!1),a(C,t))}(),d("input[id^=create-]:not(#create-multi)",b).forEach(W),g(b,Z),function(){if(j("moveComposingButtons")){const e=x("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const t=N("composing-level",b)[0].parentNode
A(e,t)}}(),function(){const e=c("#pCC div.centered")
T(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const t=r({className:"centered"})
P(t,e)
const s=y({id:"fast-compose",type:"checkbox"})
P(s,e),l(s,"change",n(G,t))}()}export default function(){E()&&b&&ee()}
//# sourceMappingURL=composing-30ca5112.js.map
