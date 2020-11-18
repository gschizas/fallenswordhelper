import{r as e,A as t,t as n,aD as s,a9 as o,Y as a,bE as i,C as c,m as r,O as l,U as m,i as p,b0 as u,D as d,h as f,o as g,p as h,z as b,c as v,bF as C,B as S,a4 as E,j,H as k,y as N,J as x}from"./calfSystem-f9a27018.js"
import{c as y}from"./createInput-491c2556.js"
import{i as A}from"./insertElementBefore-7e0a7ce8.js"
import{c as B}from"./createTable-1203d2c6.js"
import{p as L,a as q}from"./pubsub-95bdcd2f.js"
import{g as F}from"./getArrayByClassName-b5f38e7c.js"
import{i as I}from"./insertHtmlAfterEnd-18e893ae.js"
import{i as $}from"./insertElementAfter-f68bd993.js"
import{r as T,g as P}from"./rnd-0568e06a.js"
function w(e,n){t("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${P(1,11)}_${P(1,51)}.png)`,t(`Creating '<span class="fshBold">${n}</span>' Potion`,e.children[2]),t("",e.children[3])}function D(e){const n=e.parentNode
n&&(t('<div class="fshScs">Success</div>',n),w(n.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function H(e,n){const s=e.parentNode
s&&(n.error?t(`<div class="fshScs">${n.error}</div>`,s):D(e))}function Q(t){var s;(s=t.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:T()}})).then(n(H,t))}function _(e,n){n.id="proc-"+n.id,t("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),Q(n),L("quickcreate")}function z(e,t){e.classList.add("left-"+t.toString())}function J(e){z(e,o(".quickCreate .sendLink").length)}function M(e){const t=e.target,{templateId:n}=t.dataset
n&&function(e,t){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<e.value))for(let s=0;s<e.value;s+=1)n[s].value=t,_(n[s].nextElementSibling.nextElementSibling,n[s])}(t,n)}function O(e,t,n,s){var o,a
return 0===s&&b(e[1],t.insertCell(-1)),f(t.insertCell(-1),(o=(s+1).toString(),a=e[0],y({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),t}function R(e,t,s,o){return e.reduce(n(O,o),s.insertRow(-1)),s}function U(e){return[e.value,e.text]}function Y(e,t,s){const o=function(e,t,s){const o=B({id:"fshFastCompose"})
return z(o,s),e.reduce(n(R,t,s),o)}(d("#composing-template-multi option").map(U),t,s)
f(e,o),g(h,M),q("quickcreate",n(J,o))}function G(e){m("composing","FastCompose"),p(e,"<br>")
const t=F("composing-potion-time",document),n=t.filter(u("ETA: n/a")).length
n>0?Y(e,t,n):p(e,"No open slots!")}const K=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function V(e){const t=K.exec(S(e))
if(t){return 1e3*(3600*t[1]+60*t[2]+Number(t[3]))+E}return 0}function W(e){a(i,e)}function X(e){I(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(e){const t=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(t)&&function(e){const t=e.previousElementSibling.previousElementSibling
t&&"none"!==t.value&&(_(e,t),m("composing","QuickCreate"))}(t)}function ee(){!function(){if(!v.enableComposingAlert)return
const e=F("composing-potion-time",document),t=Math.min(...e.map(V))
0===t?W(!0):(W(!1),a(C,t))}(),d("input[id^=create-]:not(#create-multi)",h).forEach(X),g(h,Z),function(){if(k("moveComposingButtons")){const e=N("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const t=x("composing-level",h)[0].parentNode
A(e,t)}}(),function(){const e=c("#pCC div.centered")
I(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const t=r({className:"centered"})
$(t,e)
const s=y({id:"fast-compose",type:"checkbox"})
$(s,e),l(s,"change",n(G,t))}()}function te(){j()&&h&&ee()}export default te
//# sourceMappingURL=composing-a7e62f76.js.map
