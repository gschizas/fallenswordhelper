import{q as e,z as t,s as n,aw as s,ak as o,W as a,c0 as i,M as c,k as r,K as l,S as m,i as p,aP as u,I as f,f as d,o as g,p as h,y as b,c as v,c1 as C,A as S,aB as k,j as E,D as j,x,F as N}from"./calfSystem-ee582533.js"
import{c as y}from"./createInput-2410e798.js"
import{i as A}from"./insertElementBefore-7ed837be.js"
import{c as q}from"./createTable-cbb3667c.js"
import{p as B,a as I}from"./pubsub-c72fe5ed.js"
import{g as L}from"./getArrayByClassName-981a136a.js"
import{r as F,g as $}from"./rnd-2334d68f.js"
import{i as P}from"./insertHtmlAfterEnd-4dbaaf09.js"
import{i as T}from"./insertElementAfter-0f11924a.js"
function w(e,n){t("",e.children[0]),e.children[0].classList.add("fshPot"),e.children[0].style.backgroundImage=`url(${s}composing/${$(1,11)}_${$(1,51)}.png)`,t(`Creating '<span class="fshBold">${n}</span>' Potion`,e.children[2]),t("",e.children[3])}function M(e){const n=e.parentNode
n&&(t('<div class="fshScs">Success</div>',n),w(n.previousElementSibling.previousElementSibling,e[e.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(i,!1))}function Q(e,n){const s=e.parentNode
s&&(n.error?t(`<div class="fshScs">${n.error}</div>`,s):M(e))}function _(t){var s;(s=t.value,e({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:F()}})).then(n(Q,t))}function z(e,n){t("",e),e.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),_(n),B("quickcreate")}function D(e,t){e.classList.add("left-"+t.toString())}function H(e){D(e,o(".quickCreate .sendLink").length)}function K(e){const t=e.target,{templateId:n}=t.dataset
n&&function(e,t){m("composing","FastComposeButton")
const n=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(n.length<e.value))for(let s=0;s<e.value;s+=1)n[s].value=t,z(n[s].nextElementSibling.nextElementSibling,n[s])}(t,n)}function R(e,t,n,s){var o,a
return 0===s&&b(e[1],t.insertCell(-1)),d(t.insertCell(-1),(o=(s+1).toString(),a=e[0],y({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),t}function W(e,t,s,o){return e.reduce(n(R,o),s.insertRow(-1)),s}function G(e){return[e.value,e.text]}function J(e,t,s){const o=function(e,t,s){const o=q({id:"fshFastCompose"})
return D(o,s),e.reduce(n(W,t,s),o)}(f("#composing-template-multi option").map(G),t,s)
d(e,o),g(h,K),I("quickcreate",n(H,o))}function O(e){m("composing","FastCompose"),p(e,"<br>")
const t=L("composing-potion-time",document),n=t.filter(u("ETA: n/a")).length
n>0?J(e,t,n):p(e,"No open slots!")}const U=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function V(e,t){const n=U.exec(S(t))
if(n){const t=1e3*(3600*n[1]+60*n[2]+Number(n[3]))+k
return e.concat(t)}return e.concat(0)}function X(e){a(i,e)}function Y(e){P(e,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Z(e){const t=e.target.parentNode;(function(e){return"SPAN"===e.tagName&&"quickCreate"===e.className})(t)&&function(e){const t=e.previousElementSibling.previousElementSibling
t&&"none"!==t.value&&(z(e,t),m("composing","QuickCreate"))}(t)}function ee(){!function(){if(!v.enableComposingAlert)return
const e=L("composing-potion-time",document).reduce(V,[]),t=Math.min.apply(null,e)
0===t?X(!0):(X(!1),a(C,t))}(),f("input[id^=create-]:not(#create-multi)",h).forEach(Y),g(h,Z),function(){if(j("moveComposingButtons")){const e=x("composing-error-dialog").previousElementSibling
e.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const t=N("composing-level",h)[0].parentNode
A(e,t)}}(),function(){const e=c("#pCC div.centered")
P(e.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const t=r({className:"centered"})
T(t,e)
const s=y({id:"fast-compose",type:"checkbox"})
T(s,e),l(s,"change",n(O,t))}()}export default function(){E()&&h&&ee()}
//# sourceMappingURL=composing-2e401903.js.map
