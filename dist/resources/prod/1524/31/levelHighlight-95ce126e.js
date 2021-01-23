import{H as t,I as n,J as e,K as r}from"./calfSystem-7aee5245.js"
import{i as s}from"./intValue-e7ef611d.js"
import{v as o}from"./valueText-281cbf4b.js"
let a
function c(){return a||(a=t(n)||s(o(e(r)))),a}function u(){const t=c()
let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}function f(){const t=c()
let n=10
return t<200&&(n=5),t+n}const i=[[t=>t>=800,()=>100],[t=>t>=752,t=>t-701],[t=>t>=351,()=>50],[t=>t>=326,t=>t-301],[()=>!0,()=>25]]
function l(){const t=c()
return t-function(t){return i.find((([n])=>n(t)))[1](t)}(t)}function m(){const t=c()
let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}export{u as a,m as b,l as c,f as g}
//# sourceMappingURL=levelHighlight-95ce126e.js.map
