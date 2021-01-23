import{c as t}from"./closestTr-e70c5c37.js"
import{d as n}from"./daAjaxSendItemsToRecipient-f2c7727d.js"
import{c as e,al as o,M as s,l as i,V as r,B as c,D as a,Z as u,an as l,e as f,G as d,a as m,t as p,bq as h,aG as k,av as g,be as $,x as b,H as w,o as _,p as x}from"./calfSystem-393ab895.js"
import{e as L}from"./errorDialog-9d880b0d.js"
import{g as y}from"./getInventoryById-ed6dc7be.js"
import{d as v}from"./doStatTotal-2c67bbbb.js"
import{b as S}from"./batch-28b89a64.js"
let E,D,Q
function A(){if(!D){const t="dropitems"===e.subcmd?"removeIndex[]":"storeIndex[]"
E=document.forms[0].elements[t],D=!0}return E}function N(){}function j(t){return t()}function T(){return Object.create(null)}function C(t){t.forEach(j)}function I(t){return"function"==typeof t}function H(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function O(t,n){t.appendChild(n)}function B(t,n,e){t.insertBefore(n,e||null)}function R(t){t.parentNode.removeChild(t)}function G(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function U(t){return document.createElement(t)}function F(t){return document.createTextNode(t)}function M(){return F(" ")}function q(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function P(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function V(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function z(t,n){for(let e=0;e<t.options.length;e+=1){const o=t.options[e]
if(o.__value===n)return void(o.selected=!0)}}function Y(t){const n=t.querySelector(":checked")||t.options[0]
return n&&n.__value}function Z(t){Q=t}function J(){const t=function(){if(!Q)throw new Error("Function called outside component initialization")
return Q}()
return(n,e)=>{const o=t.$$.callbacks[n]
if(o){const s=function(t,n){const e=document.createEvent("CustomEvent")
return e.initCustomEvent(t,!1,!1,n),e}(n,e)
o.slice().forEach((n=>{n.call(t,s)}))}}}const K=[],W=[],X=[],tt=[],nt=Promise.resolve()
let et=!1
function ot(t){X.push(t)}let st=!1
const it=new Set
function rt(){if(!st){st=!0
do{for(let t=0;t<K.length;t+=1){const n=K[t]
Z(n),ct(n.$$)}for(Z(null),K.length=0;W.length;)W.pop()()
for(let t=0;t<X.length;t+=1){const n=X[t]
it.has(n)||(it.add(n),n())}X.length=0}while(K.length)
for(;tt.length;)tt.pop()()
et=!1,st=!1,it.clear()}}function ct(t){if(null!==t.fragment){t.update(),C(t.before_update)
const n=t.dirty
t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(ot)}}const at=new Set
function ut(t,n){-1===t.$$.dirty[0]&&(K.push(t),et||(et=!0,nt.then(rt)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function lt(t,n,e,o,s,i,r=[-1]){const c=Q
Z(t)
const a=n.props||{},u=t.$$={fragment:null,ctx:null,props:i,update:N,not_equal:s,bound:T(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:T(),dirty:r,skip_bound:!1}
let l=!1
if(u.ctx=e?e(t,a,((n,e,...o)=>{const i=o.length?o[0]:e
return u.ctx&&s(u.ctx[n],u.ctx[n]=i)&&(!u.skip_bound&&u.bound[n]&&u.bound[n](i),l&&ut(t,n)),e})):[],u.update(),l=!0,C(u.before_update),u.fragment=!!o&&o(u.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target)
u.fragment&&u.fragment.l(t),t.forEach(R)}else u.fragment&&u.fragment.c()
n.intro&&((f=t.$$.fragment)&&f.i&&(at.delete(f),f.i(d))),function(t,n,e){const{fragment:o,on_mount:s,on_destroy:i,after_update:r}=t.$$
o&&o.m(n,e),ot((()=>{const n=s.map(j).filter(I)
i?i.push(...n):C(n),t.$$.on_mount=[]})),r.forEach(ot)}(t,n.target,n.anchor),rt()}var f,d
Z(c)}class ft{$destroy(){!function(t,n){const e=t.$$
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
return{c(){n=F("["),e=U("button"),e.textContent="Select All Guild Locked",o=F("]"),P(e,"class","svelte-hnk7js")},m(r,c){B(r,n,c),B(r,e,c),B(r,o,c),s||(i=q(e,"click",t[5]),s=!0)},p:N,d(t){t&&R(n),t&&R(e),t&&R(o),s=!1,i()}}}(t)
return{c(){n=F("["),o=U("button"),s=F(p),i=F(" AH and UFSG Links"),r=F("] \n["),c=U("button"),a=F(h),u=F(" Quick Drop links"),l=F("] \n"),k&&k.c(),f=F(""),P(o,"class","svelte-hnk7js"),P(c,"class","svelte-hnk7js")},m(e,p){B(e,n,p),B(e,o,p),O(o,s),O(o,i),B(e,r,p),B(e,c,p),O(c,a),O(c,u),B(e,l,p),k&&k.m(e,p),B(e,f,p),d||(m=[q(o,"click",t[3]),q(c,"click",t[4])],d=!0)},p(t,[n]){1&n&&p!==(p=t[2](t[0])+"")&&V(s,p),2&n&&h!==(h=t[2](t[1])+"")&&V(a,h),"storeitems"===e.subcmd2&&k.p(t,n)},i:N,o:N,d(t){t&&R(n),t&&R(o),t&&R(r),t&&R(c),t&&R(l),k&&k.d(t),t&&R(f),d=!1,C(m)}}}function xt(t,n,e){const o=J()
let{showExtraLinks:s=!1}=n,{showQuickDropLinks:i=!1}=n
return t.$$set=t=>{"showExtraLinks"in t&&e(0,s=t.showExtraLinks),"showQuickDropLinks"in t&&e(1,i=t.showQuickDropLinks)},[s,i,t=>t?"Hide":"Show",function(){r("storeitems","toggleShowExtraLinks"),e(0,s=!s),u("showExtraLinks",s),o("showExtraLinks",s)},function(){r("storeitems","toggleShowQuickDropLinks"),e(1,i=!i),u("showQuickDropLinks",i),o("showQuickDropLinks",i)},function(){r("storeitems","selectLocked"),o("selectLocked")}]}class Lt extends ft{constructor(t){super(),lt(this,t,xt,_t,H,{showExtraLinks:0,showQuickDropLinks:1})}}let yt
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
m(3,S,[[5,3,e,0,p(Ct,n,o)]])}function Ht(t){const n=function(t){const n=document.forms[0]
return new Lt({props:{showExtraLinks:t[0],showQuickDropLinks:t[4]},target:n.parentNode.children[5].children[0]})}(t)
n.$on("showExtraLinks",(n=>{t[0]=n.detail,It(t)})),n.$on("showQuickDropLinks",(n=>{t[4]=n.detail,It(t)})),n.$on("selectLocked",(()=>{!async function(){const t=pt()
if(!t.length)return
const n=await kt()
n&&n.items&&t.map((t=>[t,n.items[t.value]])).filter((([,t])=>t)).forEach((([t,n])=>{t.checked=!t.disabled&&-1!==n.guild_tag}))}()}))}async function Ot(){if(b())return
if(!A())return
const t=Et.map((t=>w(t)))
v(),Ht(t),t.some((t=>t))&&It(t),_(x,wt)}export{ft as S,B as a,O as b,V as c,R as d,U as e,M as f,P as g,z as h,lt as i,G as j,J as k,q as l,ot as m,N as n,Y as o,mt as p,dt as q,C as r,H as s,F as t,A as u,Ot as v,kt as w,pt as x}
//# sourceMappingURL=injectStoreItems-c28afe37.js.map
