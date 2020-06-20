import{r as e,A as t,t as n,aD as s,a9 as o,Y as a,bI as i,C as c,m as r,O as l,U as m,i as p,b1 as u,D as d,h as f,o as g,p as b,z as h,c as v,bJ as C,B as S,a4 as E,j,G as k,y as N,I as x}from"./calfSystem-89b939c8.js"
import{c as y}from"./createInput-efc68c10.js"
import{i as A}from"./insertElementBefore-08d48547.js"
import{c as I}from"./createTable-fd00f6db.js"
import{p as B,a as L}from"./pubsub-a5bc92df.js"
import{g as q}from"./getArrayByClassName-ed630846.js"
import{i as $}from"./insertHtmlAfterEnd-c6efbdf8.js"
import{i as F}from"./insertElementAfter-4bc604b8.js"
import{r as T,g as P}from"./rnd-1e3da925.js"
function w(e,n){t("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${P(1,11)}_${P(1,51)}.png)`,t(`Creating '<span class="fshBold">${n}</span>' Potion`,e.children[2]),t("",e.children[3])}function D(e){const n=e.parentNode
n&&(t('<div class="fshScs">Success</div>',n),w(n.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function Q(e,n){const s=e.parentNode
s&&(n.error?t(`<div class="fshScs">${n.error}</div>`,s):D(e))}function _(t){var s;(s=t.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:T()}})).then(n(Q,t))}function z(e,n){t("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),_(n),B("quickcreate")}function G(e,t){e.classList.add("left-"+t.toString())}function H(e){G(e,o(".quickCreate .sendLink").length)}function J(e){const t=e.target,{templateId:n}=t.dataset
n&&function(e,t){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<e.value))for(let s=0;s<e.value;s+=1)n[s].value=t,z(n[s].nextElementSibling.nextElementSibling,n[s])}(t,n)}function M(e,t,n,s){var o,a
return 0===s&&h(e[1],t.insertCell(-1)),f(t.insertCell(-1),(o=(s+1).toString(),a=e[0],y({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),t}function O(e,t,s,o){return e.reduce(n(M,o),s.insertRow(-1)),s}function R(e){return[e.value,e.text]}function U(e,t,s){const o=function(e,t,s){const o=I({id:"fshFastCompose"})
return G(o,s),e.reduce(n(O,t,s),o)}(d("#composing-template-multi option").map(R),t,s)
f(e,o),g(b,J),L("quickcreate",n(H,o))}function Y(e){m("composing","FastCompose"),p(e,"<br>")
const t=q("composing-potion-time",document),n=t.filter(u("ETA: n/a")).length
n>0?U(e,t,n):p(e,"No open slots!")}const K=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function V(e,t){const n=K.exec(S(t))
if(n){const t=1e3*(3600*n[1]+60*n[2]+Number(n[3]))+E
return e.concat(t)}return e.concat(0)}function W(e){a(i,e)}function X(e){$(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(e){const t=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(t)&&function(e){const t=e.previousElementSibling.previousElementSibling
t&&"none"!==t.value&&(z(e,t),m("composing","QuickCreate"))}(t)}function ee(){!function(){if(!v.enableComposingAlert)return
const e=q("composing-potion-time",document).reduce(V,[]),t=Math.min.apply(null,e)
0===t?W(!0):(W(!1),a(C,t))}(),d("input[id^=create-]:not(#create-multi)",b).forEach(X),g(b,Z),function(){if(k("moveComposingButtons")){const e=N("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const t=x("composing-level",b)[0].parentNode
A(e,t)}}(),function(){const e=c("#pCC div.centered")
$(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const t=r({className:"centered"})
F(t,e)
const s=y({id:"fast-compose",type:"checkbox"})
F(s,e),l(s,"change",n(Y,t))}()}export default function(){j()&&b&&ee()}
//# sourceMappingURL=composing-2fda9b88.js.map
