import{c as t,bd as n,M as e,l as o,U as s,B as i,D as r,Y as a,aS as c,e as u,G as l,a as f,t as d,bb as m,ap as p,ao as h,ba as k,x as g,H as $,o as b,p as w}from"./calfSystem-a5fc99d4.js"
import{b as _}from"./batch-69aa6624.js"
import{d as x}from"./doStatTotal-a4838f62.js"
import{c as L}from"./closestTr-a52072b1.js"
import{d as y}from"./daAjaxSendItemsToRecipient-137bc976.js"
import{e as S}from"./errorDialog-4ea6fda9.js"
import{g as v}from"./getInventoryById-79ecc1dc.js"
let E,D,Q
function A(){if(!D){const n="dropitems"===t.subcmd?"removeIndex[]":"storeIndex[]"
E=document.forms[0].elements[n],D=!0}return E}function N(){}function j(t){return t()}function T(){return Object.create(null)}function C(t){t.forEach(j)}function I(t){return"function"==typeof t}function H(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function O(t,n){t.appendChild(n)}function B(t,n,e){t.insertBefore(n,e||null)}function R(t){t.parentNode.removeChild(t)}function U(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function G(t){return document.createElement(t)}function F(t){return document.createTextNode(t)}function M(){return F(" ")}function q(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function P(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function Y(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function z(t,n){for(let e=0;e<t.options.length;e+=1){const o=t.options[e]
if(o.__value===n)return void(o.selected=!0)}}function V(t){const n=t.querySelector(":checked")||t.options[0]
return n&&n.__value}function J(t){Q=t}function K(){const t=function(){if(!Q)throw new Error("Function called outside component initialization")
return Q}()
return(n,e)=>{const o=t.$$.callbacks[n]
if(o){const s=function(t,n){const e=document.createEvent("CustomEvent")
return e.initCustomEvent(t,!1,!1,n),e}(n,e)
o.slice().forEach(n=>{n.call(t,s)})}}}const W=[],X=[],Z=[],tt=[],nt=Promise.resolve()
let et=!1
function ot(t){Z.push(t)}let st=!1
const it=new Set
function rt(){if(!st){st=!0
do{for(let t=0;t<W.length;t+=1){const n=W[t]
J(n),at(n.$$)}for(J(null),W.length=0;X.length;)X.pop()()
for(let t=0;t<Z.length;t+=1){const n=Z[t]
it.has(n)||(it.add(n),n())}Z.length=0}while(W.length)
for(;tt.length;)tt.pop()()
et=!1,st=!1,it.clear()}}function at(t){if(null!==t.fragment){t.update(),C(t.before_update)
const n=t.dirty
t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(ot)}}const ct=new Set
function ut(t,n){-1===t.$$.dirty[0]&&(W.push(t),et||(et=!0,nt.then(rt)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function lt(t,n,e,o,s,i,r=[-1]){const a=Q
J(t)
const c=n.props||{},u=t.$$={fragment:null,ctx:null,props:i,update:N,not_equal:s,bound:T(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:T(),dirty:r,skip_bound:!1}
let l=!1
if(u.ctx=e?e(t,c,(n,e,...o)=>{const i=o.length?o[0]:e
return u.ctx&&s(u.ctx[n],u.ctx[n]=i)&&(!u.skip_bound&&u.bound[n]&&u.bound[n](i),l&&ut(t,n)),e}):[],u.update(),l=!0,C(u.before_update),u.fragment=!!o&&o(u.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target)
u.fragment&&u.fragment.l(t),t.forEach(R)}else u.fragment&&u.fragment.c()
n.intro&&((f=t.$$.fragment)&&f.i&&(ct.delete(f),f.i(d))),function(t,n,e){const{fragment:o,on_mount:s,on_destroy:i,after_update:r}=t.$$
o&&o.m(n,e),ot(()=>{const n=s.map(j).filter(I)
i?i.push(...n):C(n),t.$$.on_mount=[]}),r.forEach(ot)}(t,n.target,n.anchor),rt()}var f,d
J(a)}class ft{$destroy(){!function(t,n){const e=t.$$
null!==e.fragment&&(C(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=N}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[])
return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n
this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function dt(t){return function(t){return n({subcmd:"dodropitems",removeIndex:t})}(t)}function mt(){const t=A()
return t?e(t instanceof RadioNodeList?t:[t]):[]}function pt(){return mt().filter(t=>!o("fshHide",L(t)))}let ht
function kt(){return ht||(ht=v()),ht}function gt(t){return L(t.target).cells[0].children[0].value}async function $t(t,n,e){!function(t){const n=L(t)
n.cells[0].children[0].disabled=!0,r(".actionButton",n).forEach(t=>{t.disabled=!0,t.textContent="",t.removeAttribute("data-tooltip"),t.classList.add("inProgress")}),t.blur(),t.classList.add("fshSpinner","fshSpinner12")}(t.target)
const o=await n([gt(t)])
o&&o.s?function(t,n){t.target.classList.remove("fshSpinner","fshSpinner12"),t.target.classList.add("fshGreen"),t.target.textContent=n}(t,e):S(o)}const bt=[["Check All",async function(t){const{items:n}=await kt()
s("storeitems","Check All of Type"),pt().filter(e=>n[e.value]&&n[e.value].item_id===n[gt(t)].item_id).forEach(t=>{t.checked=!t.disabled&&!t.checked})}],["Quick Send",t=>{s("storeitems","Quick Send"),$t(t,y,"Sent")}],["Quick Drop",t=>{s("storeitems","Quick Drop"),$t(t,dt,"Dropped")}]]
function wt(t){if("A"===t.target.tagName&&["AH","UFSG"].includes(t.target.textContent)&&s("storeitems",t.target.textContent),"BUTTON"!==t.target.tagName||o("custombutton",t.target))return
const n=bt.find(([n])=>n===i(t.target))
n&&n[1](t)}function _t(n){let e,o,s,i,r,a,c,u,l,f,d,m,p=n[2](n[0])+"",h=n[2](n[1])+"",k="storeitems"===t.subcmd2&&function(t){let n,e,o,s,i
return{c(){n=F("["),e=G("button"),e.textContent="Select All Guild Locked",o=F("]"),P(e,"class","svelte-hnk7js")},m(r,a){B(r,n,a),B(r,e,a),B(r,o,a),s||(i=q(e,"click",t[5]),s=!0)},p:N,d(t){t&&R(n),t&&R(e),t&&R(o),s=!1,i()}}}(n)
return{c(){e=F("["),o=G("button"),s=F(p),i=F(" AH and UFSG Links"),r=F("] \n["),a=G("button"),c=F(h),u=F(" Quick Drop links"),l=F("] \n"),k&&k.c(),f=F(""),P(o,"class","svelte-hnk7js"),P(a,"class","svelte-hnk7js")},m(t,p){B(t,e,p),B(t,o,p),O(o,s),O(o,i),B(t,r,p),B(t,a,p),O(a,c),O(a,u),B(t,l,p),k&&k.m(t,p),B(t,f,p),d||(m=[q(o,"click",n[3]),q(a,"click",n[4])],d=!0)},p(n,[e]){1&e&&p!==(p=n[2](n[0])+"")&&Y(s,p),2&e&&h!==(h=n[2](n[1])+"")&&Y(c,h),"storeitems"===t.subcmd2&&k.p(n,e)},i:N,o:N,d(t){t&&R(e),t&&R(o),t&&R(r),t&&R(a),t&&R(l),k&&k.d(t),t&&R(f),d=!1,C(m)}}}function xt(t,n,e){const o=K()
let{showExtraLinks:i=!1}=n,{showQuickDropLinks:r=!1}=n
return t.$$set=t=>{"showExtraLinks"in t&&e(0,i=t.showExtraLinks),"showQuickDropLinks"in t&&e(1,r=t.showQuickDropLinks)},[i,r,t=>t?"Hide":"Show",function(){s("storeitems","toggleShowExtraLinks"),e(0,i=!i),a("showExtraLinks",i),o("showExtraLinks",i)},function(){s("storeitems","toggleShowQuickDropLinks"),e(1,r=!r),a("showQuickDropLinks",r),o("showQuickDropLinks",r)},function(){s("storeitems","selectLocked"),o("selectLocked")}]}class Lt extends ft{constructor(t){super(),lt(this,t,xt,_t,H,{showExtraLinks:0,showQuickDropLinks:1})}}let yt
function St(t,n){if(13699!==n.item_id)return n.item_name
const e=t.find(t=>t.value===String(n.inv_id))
return e?l(e.parentNode.parentNode.children[2]):n.item_name}async function vt(t){return yt||(yt=await async function(t){const n=await kt()
return n&&n.items?c(u(n.items).map(([n,e])=>[n,{...e,item_name:St(t,e)}])):{}}(t)),yt}const Et=["showExtraLinks","enableItemColoring","checkAllOfType","showQuickSendLinks","showQuickDropLinks"]
function Dt(t,n){return t[n]=(t[n]||0)+1,t}const Qt=(t,n,e)=>`[<button class="fshStoreItemsButton ${t}"${n}>${e}</button>]`,At=(t,n,e)=>" "+Qt(t+" actionButton tooltip-multiline",(t=>` data-tooltip="INSTANTLY ${t} THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."`)(n),"Quick "+e),Nt=(t,n,e)=>`[<a href="${t}"${n}>${e}</a>]`
function jt(t,n,[e,o]){const s=e
t[1]&&(s.className=m[o.rarity].clas)
let i=""
t[0]&&(i=`${function(t){return t.bound?'<span class="aHSpacer"></span>':Nt(`${k}${encodeURIComponent(t.item_name)}`,"","AH")}(o)} ${(t=>Nt(`${p}items${h}view&item_id=${t.item_id}`,' target="_blank"',"UFSG"))(o)}`),i+="&nbsp;"+o.item_name,((t,n,e)=>t[2]&&n[e.item_id]>1)(t,n,o)&&(i+=" "+Qt("fshBlack","","Check All")),((t,n)=>t[3]&&(!n.bound||-1!==n.guild_tag))(t,o)&&(i+=At("fshBlue","SENDS","Send")),((t,n)=>t[4]&&-1===n.guild_tag)(t,o)&&(i+=At("fshRed","DROP","Drop")),s.innerHTML!==i&&(s.innerHTML=i)}async function Tt(t){const n=await async function(){const t=mt()
if(!t.length)return[]
const n=await vt(t)
return t.map(t=>[L(t).cells[2],n[t.value]]).filter(([,t])=>t)}(),e=t[2]?function(t){return{...t.map(([,t])=>t.item_id).reduce(Dt,{}),13699:1}}(n):[]
f(3,_,[[5,3,n,0,d(jt,t,e)]])}function Ct(t){const n=function(t){const n=document.forms[0]
return new Lt({props:{showExtraLinks:t[0],showQuickDropLinks:t[4]},target:n.parentNode.children[5].children[0]})}(t)
n.$on("showExtraLinks",n=>{t[0]=n.detail,Tt(t)}),n.$on("showQuickDropLinks",n=>{t[4]=n.detail,Tt(t)}),n.$on("selectLocked",()=>{!async function(){const t=pt()
if(!t.length)return
const n=await kt()
n&&n.items&&t.map(t=>[t,n.items[t.value]]).filter(([,t])=>t).forEach(([t,n])=>{t.checked=!t.disabled&&-1!==n.guild_tag})}()})}async function It(){if(g())return
if(!A())return
const t=Et.map(t=>$(t))
x(),Ct(t),t.some(t=>t)&&Tt(t),b(w,wt)}export{ft as S,B as a,O as b,Y as c,R as d,G as e,M as f,P as g,z as h,lt as i,U as j,K as k,q as l,ot as m,N as n,V as o,mt as p,dt as q,C as r,H as s,F as t,A as u,It as v,kt as w,pt as x}
//# sourceMappingURL=injectStoreItems-3844ac94.js.map
