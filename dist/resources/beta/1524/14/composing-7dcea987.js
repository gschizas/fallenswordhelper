import{ca as n,B as e,u as t,aE as s,aw as o,a3 as a,cc as c,Q as i,Z as r,k as l,T as u,P as p,$ as m,i as d,aj as f,bm as g,M as h,f as b,o as v,p as C,A as S,c as k,cd as x,C as E,aK as N,j,F as y,z as A,J as L,O as $}from"./calfSystem-371c414c.js"
import{c as q}from"./createInput-d378f9d2.js"
import{c as F}from"./createTable-ad174066.js"
import{p as I,a as T}from"./pubsub-7b968f7e.js"
import{r as B,g as P}from"./rnd-1c21bb8a.js"
function w(n,t){e("",n.children[0]),n.children[0].classList.add("fshPot"),n.children[0].style.backgroundImage=`url(${s}composing/${P(1,11)}_${P(1,51)}.png)`,e(`Creating '<span class="fshBold">${t}</span>' Potion`,n.children[2]),e("",n.children[3])}function Q(n){const t=n.parentNode
t&&(e('<div class="fshScs">Success</div>',t),w(t.previousElementSibling.previousElementSibling,n[n.selectedIndex].text),0===o('[id|="composing-template"]:not(#composing-template-multi)').length&&a(c,!1))}function M(n,t){const s=n.parentNode
s&&(t.error?e(`<div class="fshScs">${t.error}</div>`,s):Q(n))}function _(e){var s;(s=e.value,n({cache:!1,dataType:"json",data:{cmd:"composing",subcmd:"createajax",template_id:s,fshrnd:B()}})).then(t(M,e))}function z(n,t){e("",n),n.classList.add("fshSpinner","fshSpinner12","fshComposingSpinner"),_(t),I("quickcreate")}function J(n,e){n.classList.add("left-"+e.toString())}function K(n){J(n,o(".quickCreate .sendLink").length)}function O(n){const e=n.target,{templateId:t}=e.dataset
t&&function(n,e){m("composing","FastComposeButton")
const t=o('[id|="composing-template"]:not(#composing-template-multi)')
if(!(t.length<n.value))for(let s=0;s<n.value;s+=1)t[s].value=e,z(t[s].nextElementSibling.nextElementSibling,t[s])}(e,t)}function R(n,e,t,s){var o,a
return 0===s&&S(n[1],e.insertCell(-1)),b(e.insertCell(-1),(o=(s+1).toString(),a=n[0],q({className:"awesome orange",dataset:{templateId:a},type:"button",value:o}))),e}function Z(n,e,s,o){return n.reduce(t(R,o),s.insertRow(-1)),s}function D(n){return[n.value,n.text]}function G(n,e,s){const o=function(n,e,s){const o=F({id:"fshFastCompose"})
return J(o,s),n.reduce(t(Z,e,s),o)}(h("#composing-template-multi option").map(D),e,s)
b(n,o),v(C,O),T("quickcreate",t(K,o))}function H(n){m("composing","FastCompose"),d(n,"<br>")
const e=f("composing-potion-time",document),t=e.filter(g("ETA: n/a")).length
t>0?G(n,e,t):d(n,"No open slots!")}const U=/ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/
function V(n,e){const t=U.exec(E(e))
if(t){const e=1e3*(3600*t[1]+60*t[2]+Number(t[3]))+N
return n.concat(e)}return n.concat(0)}function W(n){a(c,n)}function X(n){r(n,'<span class="quickCreate">[<span class="sendLink">Quick Create</span>]</span>')}function Y(n){const e=n.target.parentNode;(function(n){return"SPAN"===n.tagName&&"quickCreate"===n.className})(e)&&function(n){const e=n.previousElementSibling.previousElementSibling
e&&"none"!==e.value&&(z(n,e),m("composing","QuickCreate"))}(e)}function nn(){!function(){if(!k.enableComposingAlert)return
const n=f("composing-potion-time",document).reduce(V,[]),e=Math.min.apply(null,n)
0===e?W(!0):(W(!1),a(x,e))}(),h("input[id^=create-]:not(#create-multi)",C).forEach(X),v(C,Y),function(){if(y("moveComposingButtons")){const n=A("composing-error-dialog").previousElementSibling
n.setAttribute("style","text-align: right; padding: 0 38px 0 0")
const e=L("composing-level",C)[0].parentNode
$(n,e)}}(),function(){const n=i("#pCC div.centered")
r(n.children[1],' | <label for="fast-compose"><span class="sendLink">Fast Compose</span></label>')
const e=l({className:"centered"})
u(e,n)
const s=q({id:"fast-compose",type:"checkbox"})
u(s,n),p(s,"change",t(H,e))}()}export default function(){j()&&C&&nn()}
//# sourceMappingURL=composing-7dcea987.js.map
