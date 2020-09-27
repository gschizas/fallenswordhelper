import{r as t,A as e,t as n,aH as s,ab as o,Z as a,bK as i,C as c,m as r,O as l,V as m,i as p,a4 as u,D as f,h as d,o as g,p as h,z as b,c as v,bL as C,B as S,a7 as E,j,H as k,y as N,J as x}from"./calfSystem-69dd5601.js"
import{c as y}from"./createInput-31301338.js"
import{i as A}from"./insertElementBefore-286ff14c.js"
import{c as L}from"./createTable-ba9c0bc4.js"
import{p as B,a as q}from"./pubsub-95975414.js"
import{g as I}from"./getArrayByClassName-0f29c742.js"
import{i as $}from"./insertHtmlAfterEnd-df8843e7.js"
import{i as F}from"./insertElementAfter-85b48585.js"
import{r as T,g as H}from"./rnd-2c0c9a67.js"
function P(t,n){e("",t.children[0]),t.children[0].classList.add("fshPot"),t.children[0].style.backgroundImage=`url(${s}composing/${H(1,11)}_${H(1,51)}.png)`,e(`Creating '<span class="fshBold">${n}</span>' Potion`,t.children[2]),e("",t.children[3])}function w(t){const n=t.parentNode
n&&(e('<div class="fshScs">Success</div>',n),P(n.previousElementSibling.previousElementSibling,t[t.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function Q(t,n){const s=t.parentNode
s&&(n.error?e(`<div class="fshScs">${n.error}</div>`,s):w(t))}function _(e){var s;(s=e.value,t({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:T()}})).then(n(Q,e))}function z(t,n){e("",t),t.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),_(n),B("quickcreate")}function D(t,e){t.classList.add("left-"+e.toString())}function J(t){D(t,o(".quickCreate .sendLink").length)}function K(t){const e=t.target,{templateId:n}=e.dataset
n&&function(t,e){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<t.value))for(let s=0;s<t.value;s+=1)n[s].value=e,z(n[s].nextElementSibling.nextElementSibling,n[s])}(e,n)}function M(t,e,n,s){var o,a
return 0===s&&b(t[1],e.insertCell(-1)),d(e.insertCell(-1),(o=(s+1).toString(),a=t[0],y({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),e}function O(t,e,s,o){return t.reduce(n(M,o),s.insertRow(-1)),s}function R(t){return[t.value,t.text]}function V(t,e,s){const o=function(t,e,s){const o=L({id:"fshFastCompose"})
return D(o,s),t.reduce(n(O,e,s),o)}(f("#composing-template-multi option").map(R),e,s)
d(t,o),g(h,K),q("quickcreate",n(J,o))}function Z(t){m("composing","FastCompose"),p(t,"<br>")
const e=I("composing-potion-time",document),n=e.filter(u("ETA: n/a")).length
n>0?V(t,e,n):p(t,"No open slots!")}const G=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function U(t,e){const n=G.exec(S(e))
if(n){const e=1e3*(3600*n[1]+60*n[2]+Number(n[3]))+E
return t.concat(e)}return t.concat(0)}function W(t){a(i,t)}function X(t){$(t,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Y(t){const e=t.target.parentNode;(function(t){return"SPAN"===t.tagName&&"quickCreate"===t.className})(e)&&function(t){const e=t.previousElementSibling.previousElementSibling
e&&"none"!==e.value&&(z(t,e),m("composing","QuickCreate"))}(e)}function tt(){!function(){if(!v.enableComposingAlert)return
const t=I("composing-potion-time",document).reduce(U,[]),e=Math.min.apply(null,t)
0===e?W(!0):(W(!1),a(C,e))}(),f("input[id^=create-]:not(#create-multi)",h).forEach(X),g(h,Y),function(){if(k("moveComposingButtons")){const t=N("composing-error-dialog").previousElementSibling
t.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const e=x("composing-level",h)[0].parentNode
A(t,e)}}(),function(){const t=c("#pCC div.centered")
$(t.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const e=r({className:"centered"})
F(e,t)
const s=y({id:"fast-compose",type:"checkbox"})
F(s,t),l(s,"change",n(Z,e))}()}function et(){j()&&h&&tt()}export default et
//# sourceMappingURL=composing-9878ecdb.js.map
