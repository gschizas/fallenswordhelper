import{r as e,A as t,t as n,ah as s,a9 as o,Y as a,ao as i,C as c,m as r,O as l,U as m,i as p,ap as u,D as f,h as d,o as g,p as h,z as b,c as v,aq as C,B as S,a4 as E,j,H as k,y as N,J as x}from"./calfSystem-7aee5245.js"
import{r as y,g as A}from"./rnd-e56d2178.js"
import{p as $,s as q}from"./pubsub-fbbf5a73.js"
import{c as B}from"./createInput-cd4a36ae.js"
import{c as L}from"./createTable-2f08d1b1.js"
import{g as I}from"./getArrayByClassName-b0ef8ab2.js"
import{i as F}from"./insertElementAfter-c928b354.js"
import{i as T}from"./insertHtmlAfterEnd-ac29d90e.js"
import{i as P}from"./insertElementBefore-43970b1f.js"
function w(e,n){t("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${A(1,11)}_${A(1,51)}.png)`,t(`Creating '<span class="fshBold">${n}</span>' Potion`,e.children[2]),t("",e.children[3])}function H(e){const n=e.parentNode
n&&(t('<div class="fshScs">Success</div>',n),w(n.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function Q(e,n){const s=e.parentNode
s&&(n.error?t(`<div class="fshScs">${n.error}</div>`,s):H(e))}function _(t){var s;(s=t.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:y()}})).then(n(Q,t))}function z(e,n){n.id=`proc-${n.id}`,t("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),_(n),$("quickcreate")}function D(e,t){e.classList.add(`left-${t.toString()}`)}function J(e){D(e,o(".quickCreate .sendLink").length)}function M(e){const t=e.target,{templateId:n}=t.dataset
n&&function(e,t){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<e.value))for(let s=0;s<e.value;s+=1)n[s].value=t,z(n[s].nextElementSibling.nextElementSibling,n[s])}(t,n)}function O(e,t,n,s){var o,a
return 0===s&&b(e[1],t.insertCell(-1)),d(t.insertCell(-1),(o=(s+1).toString(),a=e[0],B({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),t}function R(e,t,s,o){return e.reduce(n(O,o),s.insertRow(-1)),s}function U(e){return[e.value,e.text]}function Y(e,t,s){const o=function(e,t,s){const o=L({id:"fshFastCompose"})
return D(o,s),e.reduce(n(R,t,s),o)}(f("#composing-template-multi option").map(U),t,s)
d(e,o),g(h,M),q("quickcreate",n(J,o))}function G(e){m("composing","FastCompose"),p(e,"<br>")
const t=I("composing-potion-time",document),n=t.filter(u("ETA: n/a")).length
n>0?Y(e,t,n):p(e,"No open slots!")}const K=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function V(e){const t=K.exec(S(e))
if(t){return 1e3*(3600*t[1]+60*t[2]+Number(t[3]))+E}return 0}function W(e){a(i,e)}function X(e){T(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(e){const t=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(t)&&function(e){const t=e.previousElementSibling.previousElementSibling
t&&"none"!==t.value&&(z(e,t),m("composing","QuickCreate"))}(t)}function ee(){!function(){if(!v.enableComposingAlert)return
const e=I("composing-potion-time",document),t=Math.min(...e.map(V))
0===t?W(!0):(W(!1),a(C,t))}(),f("input[id^=create-]:not(#create-multi)",h).forEach(X),g(h,Z),function(){if(k("moveComposingButtons")){const e=N("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const t=x("composing-level",h)[0].parentNode
P(e,t)}}(),function(){const e=c("#pCC div.centered")
T(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const t=r({className:"centered"})
F(t,e)
const s=B({id:"fast-compose",type:"checkbox"})
F(s,e),l(s,"change",n(G,t))}()}function te(){j()&&h&&ee()}export default te
//# sourceMappingURL=composing-3ca1ade9.js.map
