import{H as t,I as n,J as r,K as s}from"./calfSystem-a5fc99d4.js"
import{i as e}from"./intValue-e4cdd281.js"
import{v as o}from"./valueText-4ea8a5e7.js"
let a
function c(){return a||(a=t(n)||e(o(r(s)))),a}function u(){const t=c()
let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}function f(){const t=c()
let n=10
return t<200&&(n=5),t+n}const i=[[t=>t>=800,()=>100],[t=>t>=752,t=>t-701],[t=>t>=351,()=>50],[t=>t>=326,t=>t-301],[()=>!0,()=>25]]
function l(){const t=c()
return t-function(t){return i.find(([n])=>n(t))[1](t)}(t)}function m(){const t=c()
let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}export{u as a,m as b,l as c,f as g}
//# sourceMappingURL=levelHighlight-5df69c95.js.map
