import{H as t,I as n,J as r,K as s}from"./calfSystem-964f4fc9.js"
import{i as o}from"./intValue-f4d85578.js"
import{v as a}from"./valueText-9fa15adc.js"
let c
function e(){return c||(c=t(n)||o(a(r(s)))),c}function f(){const t=e()
let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}function u(){const t=e()
let n=10
return t<200&&(n=5),t+n}const i=[[t=>t>=800,()=>100],[t=>t>=752,t=>t-701],[t=>t>=351,()=>50],[t=>t>=326,t=>t-301],[()=>!0,()=>25]]
function l(){const t=e()
return t-function(t){return i.find(([n])=>n(t))[1](t)}(t)}function m(){const t=e()
let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}export{f as a,m as b,l as c,u as g}
//# sourceMappingURL=levelHighlight-1826a720.js.map
