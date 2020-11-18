import{H as t,I as n,J as r,K as s}from"./calfSystem-02c48ff5.js"
import{i as o}from"./intValue-f94761c7.js"
import{v as c}from"./valueText-65f55d5b.js"
let e
function f(){return e||(e=t(n)||o(c(r(s)))),e}function a(){const t=f()
let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}function u(){const t=f()
let n=10
return t<200&&(n=5),t+n}const i=[[t=>t>=800,()=>100],[t=>t>=752,t=>t-701],[t=>t>=351,()=>50],[t=>t>=326,t=>t-301],[()=>!0,()=>25]]
function l(){const t=f()
return t-function(t){return i.find(([n])=>n(t))[1](t)}(t)}function m(){const t=f()
let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}export{a,m as b,l as c,u as g}
//# sourceMappingURL=levelHighlight-99d5b481.js.map
