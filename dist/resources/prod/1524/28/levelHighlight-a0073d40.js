import{H as t,I as n,J as r,K as s}from"./calfSystem-a5da5210.js"
import{i as o}from"./intValue-f4d85578.js"
import{v as a}from"./valueText-92f43a8d.js"
let e
function u(){return e||(e=t(n)||o(a(r(s)))),e}function c(){const t=u()
let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}function f(){const t=u()
let n=10
return t<200&&(n=5),t+n}const i=[[t=>t>=800,()=>100],[t=>t>=752,t=>t-701],[t=>t>=351,()=>50],[t=>t>=326,t=>t-301],[()=>!0,()=>25]]
function l(){const t=u()
return t-function(t){return i.find(([n])=>n(t))[1](t)}(t)}function m(){const t=u()
let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}export{c as a,m as b,l as c,f as g}
//# sourceMappingURL=levelHighlight-a0073d40.js.map
