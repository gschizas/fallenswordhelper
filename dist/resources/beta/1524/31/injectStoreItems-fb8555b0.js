import{c as t}from"./closestTr-d8faa348.js"
import{d as n}from"./daAjaxSendItemsToRecipient-cbb1e0a6.js"
import{c as e,bn as o,M as s,l as i,U as r,B as c,D as a,Y as u,az as l,e as f,G as d,a as m,t as p,bl as h,aB as k,ap as g,b9 as $,x as b,H as w,o as _,p as x}from"./calfSystem-47fc08ae.js"
import{e as L}from"./errorDialog-9d880b0d.js"
import{g as y}from"./getInventoryById-216cdd3b.js"
import{d as v}from"./doStatTotal-f1ff3773.js"
import{b as S}from"./batch-cd69b94b.js"
let E,D,Q
function A(){if(!D){const t="dropitems"===e.subcmd?"removeIndex[]":"storeIndex[]"
E=document.forms[0].elements[t],D=!0}return E}function N(){}function j(t){return t()}function T(){return Object.create(null)}function C(t){t.forEach(j)}function I(t){return"function"==typeof t}function B(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function H(t,n){t.appendChild(n)}function O(t,n,e){t.insertBefore(n,e||null)}function R(t){t.parentNode.removeChild(t)}function U(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function G(t){return document.createElement(t)}function F(t){return document.createTextNode(t)}function M(){return F(" ")}function q(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function P(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function z(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function Y(t,n){for(let e=0;e<t.options.length;e+=1){const o=t.options[e]
if(o.__value===n)return void(o.selected=!0)}}function V(t){const n=t.querySelector(":checked")||t.options[0]
return n&&n.__value}function J(t){Q=t}function K(){const t=function(){if(!Q)throw new Error("Function called outside component initialization")
return Q}()
return(n,e)=>{const o=t.$$.callbacks[n]
if(o){const s=function(t,n){const e=document.createEvent("CustomEvent")
return e.initCustomEvent(t,!1,!1,n),e}(n,e)
o.slice().forEach((n=>{n.call(t,s)}))}}}const W=[],X=[],Z=[],tt=[],nt=Promise.resolve()
let et=!1
function ot(t){Z.push(t)}let st=!1
const it=new Set
function rt(){if(!st){st=!0
do{for(let t=0;t<W.length;t+=1){const n=W[t]
J(n),ct(n.$$)}for(J(null),W.length=0;X.length;)X.pop()()
for(let t=0;t<Z.length;t+=1){const n=Z[t]
it.has(n)||(it.add(n),n())}Z.length=0}while(W.length)
for(;tt.length;)tt.pop()()
et=!1,st=!1,it.clear()}}function ct(t){if(null!==t.fragment){t.update(),C(t.before_update)
const n=t.dirty
t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(ot)}}const at=new Set
function ut(t,n){-1===t.$$.dirty[0]&&(W.push(t),et||(et=!0,nt.then(rt)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function lt(t,n,e,o,s,i,r=[-1]){const c=Q
J(t)
const a=n.props||{},u=t.$$={fragment:null,ctx:null,props:i,update:N,not_equal:s,bound:T(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:T(),dirty:r,skip_bound:!1}
let l=!1
if(u.ctx=e?e(t,a,((n,e,...o)=>{const i=o.length?o[0]:e
return u.ctx&&s(u.ctx[n],u.ctx[n]=i)&&(!u.skip_bound&&u.bound[n]&&u.bound[n](i),l&&ut(t,n)),e})):[],u.update(),l=!0,C(u.before_update),u.fragment=!!o&&o(u.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target)
u.fragment&&u.fragment.l(t),t.forEach(R)}else u.fragment&&u.fragment.c()
n.intro&&((f=t.$$.fragment)&&f.i&&(at.delete(f),f.i(d))),function(t,n,e){const{fragment:o,on_mount:s,on_destroy:i,after_update:r}=t.$$
o&&o.m(n,e),ot((()=>{const n=s.map(j).filter(I)
i?i.push(...n):C(n),t.$$.on_mount=[]})),r.forEach(ot)}(t,n.target,n.anchor),rt()}var f,d
J(c)}class ft{$destroy(){!function(t,n){const e=t.$$
null!==e.fragment&&(C(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=N}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[])
return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n
this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function dt(t){return function(t){return o({subcmd:"dodropitems",removeIndex:t})}(t)}function mt(){const t=A()
return t?s(t instanceof RadioNodeList?t:[t]):[]}function pt(){return mt().filter((n=>!i("fshHide",t(n))))}let ht
function kt(){return ht||(ht=y()),ht}function gt(n){return t(n.target).cells[0].children[0].value}async function $t(n,e,o){!function(n){const e=t(n)
e.cells[0].children[0].disabled=!0,a(".actionButton",e).forEach((t=>{t.disabled=!0,t.textContent="",t.removeAttribute("data-tooltip"),t.classList.add("inProgress")})),n.blur(),n.classList.add("fshSpinner","fshSpinner12")}(n.target)
const s=await e([gt(n)])
s&&s.s?function(t,n){t.target.classList.remove("fshSpinner","fshSpinner12"),t.target.classList.add("fshGreen"),t.target.textContent=n}(n,o):L(s)}const bt=[["Check All",async function(t){const{items:n}=await kt()
r("storeitems","Check All of Type"),pt().filter((e=>n[e.value]&&n[e.value].item_id===n[gt(t)].item_id)).forEach((t=>{t.checked=!t.disabled&&!t.checked}))}],["Quick Send",t=>{r("storeitems","Quick Send"),$t(t,n,"Sent")}],["Quick Drop",t=>{r("storeitems","Quick Drop"),$t(t,dt,"Dropped")}]]
function wt(t){if("A"===t.target.tagName&&["AH","UFSG"].includes(t.target.textContent)&&r("storeitems",t.target.textContent),"BUTTON"!==t.target.tagName||i("custombutton",t.target))return
const n=bt.find((([n])=>n===c(t.target)))
n&&n[1](t)}function _t(t){let n,o,s,i,r,c,a,u,l,f,d,m,p=t[2](t[0])+"",h=t[2](t[1])+"",k="storeitems"===e.subcmd2&&function(t){let n,e,o,s,i
return{c(){n=F("["),e=G("button"),e.textContent="Select All Guild Locked",o=F("]"),P(e,"class","svelte-hnk7js")},m(r,c){O(r,n,c),O(r,e,c),O(r,o,c),s||(i=q(e,"click",t[5]),s=!0)},p:N,d(t){t&&R(n),t&&R(e),t&&R(o),s=!1,i()}}}(t)
return{c(){n=F("["),o=G("button"),s=F(p),i=F(" AH and UFSG Links"),r=F("] \n["),c=G("button"),a=F(h),u=F(" Quick Drop links"),l=F("] \n"),k&&k.c(),f=F(""),P(o,"class","svelte-hnk7js"),P(c,"class","svelte-hnk7js")},m(e,p){O(e,n,p),O(e,o,p),H(o,s),H(o,i),O(e,r,p),O(e,c,p),H(c,a),H(c,u),O(e,l,p),k&&k.m(e,p),O(e,f,p),d||(m=[q(o,"click",t[3]),q(c,"click",t[4])],d=!0)},p(t,[n]){1&n&&p!==(p=t[2](t[0])+"")&&z(s,p),2&n&&h!==(h=t[2](t[1])+"")&&z(a,h),"storeitems"===e.subcmd2&&k.p(t,n)},i:N,o:N,d(t){t&&R(n),t&&R(o),t&&R(r),t&&R(c),t&&R(l),k&&k.d(t),t&&R(f),d=!1,C(m)}}}function xt(t,n,e){const o=K()
let{showExtraLinks:s=!1}=n,{showQuickDropLinks:i=!1}=n
return t.$$set=t=>{"showExtraLinks"in t&&e(0,s=t.showExtraLinks),"showQuickDropLinks"in t&&e(1,i=t.showQuickDropLinks)},[s,i,t=>t?"Hide":"Show",function(){r("storeitems","toggleShowExtraLinks"),e(0,s=!s),u("showExtraLinks",s),o("showExtraLinks",s)},function(){r("storeitems","toggleShowQuickDropLinks"),e(1,i=!i),u("showQuickDropLinks",i),o("showQuickDropLinks",i)},function(){r("storeitems","selectLocked"),o("selectLocked")}]}class Lt extends ft{constructor(t){super(),lt(this,t,xt,_t,B,{showExtraLinks:0,showQuickDropLinks:1})}}let yt
function vt(t,n){if(13699!==n.item_id)return n.item_name
const e=t.find((t=>t.value===String(n.inv_id)))
return e?d(e.parentNode.parentNode.children[2]):n.item_name}async function St(t){return yt||(yt=await async function(t){const n=await kt()
return n&&n.items?l(f(n.items).map((([n,e])=>[n,{...e,item_name:vt(t,e)}]))):{}}(t)),yt}const Et=["showExtraLinks","enableItemColoring","checkAllOfType","showQuickSendLinks","showQuickDropLinks"]
function Dt(t,n){return t[n]=(t[n]||0)+1,t}const Qt=(t,n,e)=>`[<button class="fshStoreItemsButton ${t}"${n}>${e}</button>]`,At=(t,n,e)=>` ${Qt(`${t} actionButton tooltip-multiline`,(t=>` data-tooltip="INSTANTLY ${t} THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."`)(n),`Quick ${e}`)}`,Nt=(t,n,e)=>`[<a href="${t}"${n}>${e}</a>]`
function jt(t,n){return n[0]()?t+n[1]():t}function Tt(t,n,e){return[[()=>t[0],()=>`${function(t){return t.bound?'<span class="aHSpacer"></span>':Nt(`${$}${encodeURIComponent(t.item_name)}`,"","AH")}(e)} ${(t=>Nt(`${k}items${g}view&item_id=${t.item_id}`,' target="_blank"',"UFSG"))(e)}`],[()=>!0,()=>`&nbsp;${e.item_name}`],[()=>((t,n,e)=>t[2]&&n[e.item_id]>1)(t,n,e),()=>` ${Qt("fshBlack","","Check All")}`],[()=>((t,n)=>t[3]&&(!n.bound||-1!==n.guild_tag))(t,e),()=>At("fshBlue","SENDS","Send")],[()=>((t,n)=>t[4]&&-1===n.guild_tag)(t,e),()=>At("fshRed","DROP","Drop")]]}function Ct(t,n,[e,o]){const s=e
t[1]&&(s.className=h[o.rarity].clas)
const i=Tt(t,n,o).reduce(jt,"")
s.innerHTML!==i&&(s.innerHTML=i)}async function It(n){const e=await async function(){const n=mt()
if(!n.length)return[]
const e=await St(n)
return n.map((n=>[t(n).cells[2],e[n.value]])).filter((([,t])=>t))}(),o=n[2]?function(t){return{...t.map((([,t])=>t.item_id)).reduce(Dt,{}),13699:1}}(e):[]
m(3,S,[[5,3,e,0,p(Ct,n,o)]])}function Bt(t){const n=function(t){const n=document.forms[0]
return new Lt({props:{showExtraLinks:t[0],showQuickDropLinks:t[4]},target:n.parentNode.children[5].children[0]})}(t)
n.$on("showExtraLinks",(n=>{t[0]=n.detail,It(t)})),n.$on("showQuickDropLinks",(n=>{t[4]=n.detail,It(t)})),n.$on("selectLocked",(()=>{!async function(){const t=pt()
if(!t.length)return
const n=await kt()
n&&n.items&&t.map((t=>[t,n.items[t.value]])).filter((([,t])=>t)).forEach((([t,n])=>{t.checked=!t.disabled&&-1!==n.guild_tag}))}()}))}async function Ht(){if(b())return
if(!A())return
const t=Et.map((t=>w(t)))
v(),Bt(t),t.some((t=>t))&&It(t),_(x,wt)}export{ft as S,O as a,H as b,z as c,R as d,G as e,M as f,P as g,Y as h,lt as i,U as j,K as k,q as l,ot as m,N as n,V as o,mt as p,dt as q,C as r,B as s,F as t,A as u,Ht as v,kt as w,pt as x}
//# sourceMappingURL=injectStoreItems-fb8555b0.js.map
