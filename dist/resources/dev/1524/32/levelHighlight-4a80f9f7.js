import{H as t,I as n,J as r,K as s}from"./calfSystem-19a5d332.js"
import{i as o}from"./intValue-da5ad0eb.js"
import{v as a}from"./valueText-c9c4edc1.js"
let e
function c(){return e||(e=t(n)||o(a(r(s)))),e}function u(){const t=c()
let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}function i(){const t=c()
let n=10
return t<200&&(n=5),t+n}const f=[[t=>t>=800,()=>100],[t=>t>=752,t=>t-701],[t=>t>=351,()=>50],[t=>t>=326,t=>t-301],[()=>!0,()=>25]]
function l(){const t=c()
return t-function(t){return f.find((([n])=>n(t)))[1](t)}(t)}function m(){const t=c()
let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}export{u as a,m as b,l as c,i as g}
//# sourceMappingURL=levelHighlight-4a80f9f7.js.map
