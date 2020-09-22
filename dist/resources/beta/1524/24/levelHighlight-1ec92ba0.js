import{H as t,I as n,J as r,K as s}from"./calfSystem-019a589c.js"
import{i as o}from"./intValue-44683b42.js"
import{v as c}from"./valueText-5851fcdc.js"
let a
function e(){return a||(a=t(n)||o(c(r(s)))),a}function u(){const t=e()
let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}function f(){const t=e()
let n=10
return t<200&&(n=5),t+n}const i=[[t=>t>=800,()=>100],[t=>t>=752,t=>t-701],[t=>t>=351,()=>50],[t=>t>=326,t=>t-301],[()=>!0,()=>25]]
function l(){const t=e()
return t-function(t){return i.find(([n])=>n(t))[1](t)}(t)}function m(){const t=e()
let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}export{u as a,m as b,l as c,f as g}
//# sourceMappingURL=levelHighlight-1ec92ba0.js.map
