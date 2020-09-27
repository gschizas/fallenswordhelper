import{r as t,A as e,t as n,aD as s,a9 as o,Y as a,bI as i,C as c,m as r,O as l,U as m,i as p,b1 as u,D as f,h as d,o as g,p as h,z as b,c as v,bJ as C,B as S,a4 as E,j,H as k,y as N,J as x}from"./calfSystem-d3aab5a8.js"
import{c as y}from"./createInput-09f522aa.js"
import{i as A}from"./insertElementBefore-286ff14c.js"
import{c as B}from"./createTable-17944d8c.js"
import{p as I,a as L}from"./pubsub-18c250c5.js"
import{g as q}from"./getArrayByClassName-c7a1058a.js"
import{i as $}from"./insertHtmlAfterEnd-d031a1ae.js"
import{i as F}from"./insertElementAfter-29971575.js"
import{r as T,g as P}from"./rnd-2c0c9a67.js"
function w(t,n){e("",t.children[0]),t.children[0].classList.add("fshPot"),t.children[0].style.backgroundImage=`url(${s}composing/${P(1,11)}_${P(1,51)}.png)`,e(`Creating '<span class="fshBold">${n}</span>' Potion`,t.children[2]),e("",t.children[3])}function D(t){const n=t.parentNode
n&&(e('<div class="fshScs">Success</div>',n),w(n.previousElementSibling.previousElementSibling,t[t.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function H(t,n){const s=t.parentNode
s&&(n.error?e(`<div class="fshScs">${n.error}</div>`,s):D(t))}function J(e){var s;(s=e.value,t({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:T()}})).then(n(H,e))}function Q(t,n){e("",t),t.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),J(n),I("quickcreate")}function _(t,e){t.classList.add("left-"+e.toString())}function z(t){_(t,o(".quickCreate .sendLink").length)}function M(t){const e=t.target,{templateId:n}=e.dataset
n&&function(t,e){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<t.value))for(let s=0;s<t.value;s+=1)n[s].value=e,Q(n[s].nextElementSibling.nextElementSibling,n[s])}(e,n)}function O(t,e,n,s){var o,a
return 0===s&&b(t[1],e.insertCell(-1)),d(e.insertCell(-1),(o=(s+1).toString(),a=t[0],y({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),e}function R(t,e,s,o){return t.reduce(n(O,o),s.insertRow(-1)),s}function U(t){return[t.value,t.text]}function Y(t,e,s){const o=function(t,e,s){const o=B({id:"fshFastCompose"})
return _(o,s),t.reduce(n(R,e,s),o)}(f("#composing-template-multi option").map(U),e,s)
d(t,o),g(h,M),L("quickcreate",n(z,o))}function G(t){m("composing","FastCompose"),p(t,"<br>")
const e=q("composing-potion-time",document),n=e.filter(u("ETA: n/a")).length
n>0?Y(t,e,n):p(t,"No open slots!")}const K=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function V(t,e){const n=K.exec(S(e))
if(n){const e=1e3*(3600*n[1]+60*n[2]+Number(n[3]))+E
return t.concat(e)}return t.concat(0)}function W(t){a(i,t)}function X(t){$(t,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(t){const e=t.target.parentNode;(function(t){return"SPAN"===t.tagName&&"quickCreate"===t.className})(e)&&function(t){const e=t.previousElementSibling.previousElementSibling
e&&"none"!==e.value&&(Q(t,e),m("composing","QuickCreate"))}(e)}function tt(){!function(){if(!v.enableComposingAlert)return
const t=q("composing-potion-time",document).reduce(V,[]),e=Math.min.apply(null,t)
0===e?W(!0):(W(!1),a(C,e))}(),f("input[id^=create-]:not(#create-multi)",h).forEach(X),g(h,Z),function(){if(k("moveComposingButtons")){const t=N("composing-error-dialog").previousElementSibling
t.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const e=x("composing-level",h)[0].parentNode
A(t,e)}}(),function(){const t=c("#pCC div.centered")
$(t.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const e=r({className:"centered"})
F(e,t)
const s=y({id:"fast-compose",type:"checkbox"})
F(s,t),l(s,"change",n(G,e))}()}function et(){j()&&h&&tt()}export default et
//# sourceMappingURL=composing-b984bfc7.js.map
