import{H as t,I as n,J as e,K as r}from"./calfSystem-ec5e5725.js"
import{i as s}from"./intValue-ef353ded.js"
import{v as o}from"./valueText-f1c6f878.js"
let c
function a(){return c||(c=t(n)||s(o(e(r)))),c}function f(){const t=a()
let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}function u(){const t=a()
let n=10
return t<200&&(n=5),t+n}const i=[[t=>t>=800,()=>100],[t=>t>=752,t=>t-701],[t=>t>=351,()=>50],[t=>t>=326,t=>t-301],[()=>!0,()=>25]]
function l(){const t=a()
return t-function(t){return i.find(([n])=>n(t))[1](t)}(t)}function m(){const t=a()
let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}export{f as a,m as b,l as c,u as g}
//# sourceMappingURL=levelHighlight-ec2201dc.js.map
