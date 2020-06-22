import{c as t,b0 as n,M as e,l as o,V as s,B as r,D as i,Z as c,a,t as u,bk as l,at as f,as as d,bj as m,x as p,G as h,o as k,p as g}from"./calfSystem-4cc738f8.js"
import{b}from"./batch-b1efab68.js"
import{d as $}from"./doStatTotal-1b23cdfd.js"
import{c as w}from"./closestTr-13a40903.js"
import{d as L}from"./daAjaxSendItemsToRecipient-33f16d9c.js"
import{e as x}from"./errorDialog-18ea8eb8.js"
import{g as y}from"./getInventoryById-068bca44.js"
let E,S,_
function v(){if(!S){const n="dropitems"===t.subcmd?"removeIndex[]":"storeIndex[]"
E=document.forms[0].elements[n],S=!0}return E}function D(){}function Q(t){return t()}function A(){return Object.create(null)}function j(t){t.forEach(Q)}function C(t){return"function"==typeof t}function T(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function N(t,n){t.appendChild(n)}function I(t,n,e){t.insertBefore(n,e||null)}function H(t){t.parentNode.removeChild(t)}function O(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function B(t){return document.createElement(t)}function R(t){return document.createTextNode(t)}function U(){return R(" ")}function G(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function F(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function M(t,n){n=""+n,t.data!==n&&(t.data=n)}function q(t,n){for(let e=0;e<t.options.length;e+=1){const o=t.options[e]
if(o.__value===n)return void(o.selected=!0)}}function P(t){const n=t.querySelector(":checked")||t.options[0]
return n&&n.__value}function V(t){_=t}function z(){const t=function(){if(!_)throw new Error("Function called outside component initialization")
return _}()
return(n,e)=>{const o=t.$$.callbacks[n]
if(o){const s=function(t,n){const e=document.createEvent("CustomEvent")
return e.initCustomEvent(t,!1,!1,n),e}(n,e)
o.slice().forEach(n=>{n.call(t,s)})}}}const Y=[],Z=[],J=[],K=[],W=Promise.resolve()
let X=!1
function tt(t){J.push(t)}let nt=!1
const et=new Set
function ot(){if(!nt){nt=!0
do{for(let t=0;t<Y.length;t+=1){const n=Y[t]
V(n),st(n.$$)}for(Y.length=0;Z.length;)Z.pop()()
for(let t=0;t<J.length;t+=1){const n=J[t]
et.has(n)||(et.add(n),n())}J.length=0}while(Y.length)
for(;K.length;)K.pop()()
X=!1,nt=!1,et.clear()}}function st(t){if(null!==t.fragment){t.update(),j(t.before_update)
const n=t.dirty
t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(tt)}}const rt=new Set
function it(t,n){-1===t.$$.dirty[0]&&(Y.push(t),X||(X=!0,W.then(ot)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function ct(t,n,e,o,s,r,i=[-1]){const c=_
V(t)
const a=n.props||{},u=t.$$={fragment:null,ctx:null,props:r,update:D,not_equal:s,bound:A(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:A(),dirty:i}
let l=!1
if(u.ctx=e?e(t,a,(n,e,...o)=>{const r=o.length?o[0]:e
return u.ctx&&s(u.ctx[n],u.ctx[n]=r)&&(u.bound[n]&&u.bound[n](r),l&&it(t,n)),e}):[],u.update(),l=!0,j(u.before_update),u.fragment=!!o&&o(u.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target)
u.fragment&&u.fragment.l(t),t.forEach(H)}else u.fragment&&u.fragment.c()
n.intro&&((f=t.$$.fragment)&&f.i&&(rt.delete(f),f.i(d))),function(t,n,e){const{fragment:o,on_mount:s,on_destroy:r,after_update:i}=t.$$
o&&o.m(n,e),tt(()=>{const n=s.map(Q).filter(C)
r?r.push(...n):j(n),t.$$.on_mount=[]}),i.forEach(tt)}(t,n.target,n.anchor),ot()}var f,d
V(c)}class at{$destroy(){!function(t,n){const e=t.$$
null!==e.fragment&&(j(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=D}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[])
return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}function ut(t){return function(t){return n({subcmd:"dodropitems",removeIndex:t})}(t)}let lt
function ft(){return lt||(lt=y()),lt}function dt(){return e(v()).filter(t=>!o("fshHide",w(t)))}function mt(t){return w(t.target).cells[0].children[0].value}async function pt(t,n,e){!function(t){const n=w(t)
n.cells[0].children[0].disabled=!0,i(".actionButton",n).forEach(t=>{t.disabled=!0,t.textContent="",t.removeAttribute("data-tooltip"),t.classList.add("inProgress")}),t.blur(),t.classList.add("fshSpinner","fshSpinner12")}(t.target)
const o=await n([mt(t)])
o&&o.s?function(t,n){t.target.classList.remove("fshSpinner","fshSpinner12"),t.target.classList.add("fshGreen"),t.target.textContent=n}(t,e):x(o)}const ht=[["Check All",async function(t){const{items:n}=await ft()
s("storeitems","Check All of Type"),dt().filter(e=>n[e.value]&&n[e.value].item_id===n[mt(t)].item_id).forEach(t=>{t.checked=!t.disabled&&!t.checked})}],["Quick Send",t=>{s("storeitems","Quick Send"),pt(t,L,"Sent")}],["Quick Drop",t=>{s("storeitems","Quick Drop"),pt(t,ut,"Dropped")}]]
function kt(t){if("A"===t.target.tagName&&["AH","UFSG"].includes(t.target.textContent)&&s("storeitems",t.target.textContent),"BUTTON"!==t.target.tagName||o("custombutton",t.target))return
const n=ht.find(([n])=>n===r(t.target))
n&&n[1](t)}function gt(n){let e,o,s,r,i,c,a,u,l,f,d,m,p=n[2](n[0])+"",h=n[2](n[1])+"",k="storeitems"===t.subcmd2&&function(t){let n,e,o,s,r
return{c(){n=R("["),e=B("button"),e.textContent="Select All Guild Locked",o=R("]"),F(e,"class","svelte-hnk7js")},m(i,c){I(i,n,c),I(i,e,c),I(i,o,c),s||(r=G(e,"click",t[5]),s=!0)},p:D,d(t){t&&H(n),t&&H(e),t&&H(o),s=!1,r()}}}(n)
return{c(){e=R("["),o=B("button"),s=R(p),r=R(" AH and UFSG Links"),i=R("] \n["),c=B("button"),a=R(h),u=R(" Quick Drop links"),l=R("] \n"),k&&k.c(),f=R(""),F(o,"class","svelte-hnk7js"),F(c,"class","svelte-hnk7js")},m(t,p){I(t,e,p),I(t,o,p),N(o,s),N(o,r),I(t,i,p),I(t,c,p),N(c,a),N(c,u),I(t,l,p),k&&k.m(t,p),I(t,f,p),d||(m=[G(o,"click",n[3]),G(c,"click",n[4])],d=!0)},p(n,[e]){1&e&&p!==(p=n[2](n[0])+"")&&M(s,p),2&e&&h!==(h=n[2](n[1])+"")&&M(a,h),"storeitems"===t.subcmd2&&k.p(n,e)},i:D,o:D,d(t){t&&H(e),t&&H(o),t&&H(i),t&&H(c),t&&H(l),k&&k.d(t),t&&H(f),d=!1,j(m)}}}function bt(t,n,e){const o=z()
let{showExtraLinks:r=!1}=n,{showQuickDropLinks:i=!1}=n
return t.$set=t=>{"showExtraLinks"in t&&e(0,r=t.showExtraLinks),"showQuickDropLinks"in t&&e(1,i=t.showQuickDropLinks)},[r,i,t=>t?"Hide":"Show",function(){s("storeitems","toggleShowExtraLinks"),e(0,r=!r),c("showExtraLinks",r),o("showExtraLinks",r)},function(){s("storeitems","toggleShowQuickDropLinks"),e(1,i=!i),c("showQuickDropLinks",i),o("showQuickDropLinks",i)},function(){s("storeitems","selectLocked"),o("selectLocked")}]}class $t extends at{constructor(t){super(),ct(this,t,bt,gt,T,{showExtraLinks:0,showQuickDropLinks:1})}}const wt=["showExtraLinks","enableItemColoring","checkAllOfType","showQuickSendLinks","showQuickDropLinks"]
function Lt(t,n){return t[n]=(t[n]||0)+1,t}function xt(t,n,e){return`[<button class="bob ${t}"${n}>${e}</button>]`}function yt(t,n,e){return" "+xt(t+" actionButton tooltip-multiline",function(t){return` data-tooltip="INSTANTLY ${t} THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."`}(n),"Quick "+e)}function Et(t,n,e){return`[<a href="${t}"${n}>${e}</a>]`}function St(t,n,[e,o]){const s=e
t[1]&&(s.className=l[o.rarity].clas)
let r=""
t[0]&&(r=`${function(t){return t.bound?'<span class="aHSpacer"></span>':Et(`${m}${encodeURIComponent(t.item_name)}`,"","AH")}(o)} ${function(t){return Et(`${f}items${d}view&item_id=${t.item_id}`,' target="_blank"',"UFSG")}(o)}`),r+="&nbsp;"+o.item_name,t[2]&&n[o.item_id]>1&&(r+=" "+xt("fshBlack","","Check All")),t[3]&&!o.bound&&(r+=yt("fshBlue","SENDS","Send")),t[4]&&-1===o.guild_tag&&(r+=yt("fshRed","DROP","Drop")),s.innerHTML!==r&&(s.innerHTML=r)}function _t(){return 0}async function vt(t){const n=await async function(){const t=v()
if(!t)return[]
const n=await ft()
return n&&n.items?e(t).map(t=>[w(t).cells[2],n.items[t.value]]).filter(([,t])=>t):[]}(),o=t[2]?function(t){return{...t.map(([,t])=>t.item_id).reduce(Lt,{}),13699:1}}(n):[]
a(3,b,[[5,3,n,0,u(St,t,o),_t]])}function Dt(t){const n=function(t){const n=document.forms[0]
return new $t({props:{showExtraLinks:t[0],showQuickDropLinks:t[4]},target:n.parentNode.children[5].children[0]})}(t)
n.$on("showExtraLinks",n=>{t[0]=n.detail,vt(t)}),n.$on("showQuickDropLinks",n=>{t[4]=n.detail,vt(t)}),n.$on("selectLocked",()=>{!async function(){const t=dt()
if(!t)return
const n=await ft()
n&&n.items&&t.map(t=>[t,n.items[t.value]]).filter(([,t])=>t).forEach(([t,n])=>{t.checked=!t.disabled&&-1!==n.guild_tag})}()})}async function Qt(){if(p())return
if(!v())return
const t=wt.map(t=>h(t))
$(),Dt(t),t.some(t=>t)&&vt(t),k(g,kt)}export{at as S,I as a,N as b,M as c,H as d,B as e,U as f,F as g,q as h,ct as i,O as j,z as k,G as l,tt as m,D as n,P as o,v as p,ut as q,j as r,T as s,R as t,Qt as u,ft as v,dt as w}
//# sourceMappingURL=injectStoreItems-991d7f42.js.map
