import{s as t,D as n,ap as s,c as e,S as o,b as f,p as a,A as u,z as c,x as r,l as i}from"./calfSystem-9554b525.js"
import{a as l}from"./roundToString-df4d21d0.js"
import{p}from"./playerName-855f1e8d.js"
import{t as d}from"./toLowerCase-5de73e6e.js"
const b=[[t=>t.fsp>0,t=>l(t.fsp,2)+" FSP"],[t=>t.fsp>0&&t.k>0,()=>" and "],[t=>t.k>0,t=>t.k+" k"],[t=>t.stam>0&&(t.fsp>0||t.k>0),()=>" and "],[t=>t.stam>0,t=>`${t.stam} Stam(${l(t.stam/25,1)}fsp)`],[t=>t.unknown>0,t=>` (${t.unknown} buff(s) with unknown cost)`]]
function m(t,n){return n[0](t)?n[1](t):""}const g=[[t=>!t.includes("{buffs}"),(t,n)=>`${t} ${n}`],[t=>!t.includes("{cost}"),(t,n)=>t.replace(/{buffs}/g,`\`~${n}~\``)],[()=>!0,(t,n,s)=>t.replace(/{buffs}/g,`\`~${n}~\``).replace(/{cost}/g,s.buffCostTotalText)]]
function h(t,n){return n[0](t)}function k(c){"-"===e.subcmd&&o("profile","formatBuffsToBuy")
const r=function(){let t=f("h1",a)
return t=0!==t.length?u(t[0]):p(),t}()
let i=n("buyBuffsGreeting").trim()
i=i.replace(/{playername}/g,r),i=function(n,e){return g.find(t(h,n))[1](n,s(e.buffs).join(", "),e)}(i,c),window.openQuickMsgDialog(r,i,"")}const $=/[^a-zA-Z0-9.,+\- ]/g,w=/([+-]{0,1}[.\d]+ *k)|([+-]{0,1}[.\d]+ *fsp)|([+-]{0,1}[.\d]+ *stam)/
function B(t){return t&&"BR"!==t.nodeName}function S(t){return d(t.replace($,"")).match(w)}function T(t){let n=function(t){let n="",s=t
for(;B(s);){const t=u(s)
s=s.nextSibling,n+=t}return S(n)}(t)
return n||(n=function(t){let n="",s=t
for(;B(s);){const t=u(s)
s=s.previousSibling,n=t+n}return S(n)}(t)),n}const C={count:0,buffs:{}}
function L(t){return`<tr><td>${t[0]}</td><td>: ${t[1][0]}${t[1][1]}</td></tr>`}function j(t,n){return t[n[1][1]]+=n[1][0],t}function x(){const n=i(C.buffs),s=(e=n.reduce(j,{k:0,fsp:0,stam:0,unknown:0}),b.map(t(m,e)).join(""))
var e
c(`<span class="tip-static" data-tipped="This is an estimated cost based on how the script finds the cost associated with buffs from viewing bio. It can be incorrect, please use with discretion.<br><hr><table border=0>${n.map(L).join("")}</table><b>Total: ${s}</b>">Estimated Cost: <b>${s}</b></span>`,r("buffCost")),C.buffCostTotalText=s}function y(t){const n=t.classList.contains("fshBlue")
t.classList.toggle("fshBlue"),t.classList.toggle("fshYellow")
const s=u(t)
n?function(t){const n=T(t)
let s,e
n?(s=function(t){return t[0].includes("k")?"k":t[0].includes("f")?"fsp":"stam"}(n),[e]=n[0].match(/([+-]?[.\d]+)/)):(s="unknown",e="1"),C.buffs[u(t)]=[parseFloat(e),s],C.count+=1}(t):(C.count-=1,delete C.buffs[s]),C.count>0?x():(c("&nbsp;",r("buffCost")),C.buffCostTotalText="")}function N(t){if("fshSendBuffMsg"===t.target.id)return void function(t){t.count>0&&k(t)}(C)
const n=function t(n){return n.tagName&&"SPAN"!==n.tagName?t(n.parentNode):n}(t.target);(function(t){return t.classList&&t.classList.contains("buffLink")})(n)&&y(n)}function v(t,n,s){return t.replace(n,`<span id="fshBuff${s}" class="buffLink fshBlue">${n.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g,"")}</span>`)}function A(t){let n=t.replace(/\{b\}/g,"`~").replace(/\{\/b\}/g,"~`")
const s=n.match(/`~([^~]|~(?!`))*~`/g)
return s?(n=s.reduce(v,n),n.indexOf("[cmd]")<0&&(n+="[cmd]"),n=n.replace("[cmd]",'<br><input id="fshSendBuffMsg" class="custombutton" type="button" value="Ask For Buffs"><br><span id="buffCost" class="fshRed">&nbsp;</span>'),n):t}export{N as b,A as r}
//# sourceMappingURL=render-33419b8e.js.map
