import{G as t,H as n,I as r,J as e}from"./calfSystem-89b939c8.js"
import{i as s}from"./intValue-cd93b930.js"
import{v as u}from"./valueText-bfc7b590.js"
let f,i,a,o
const c=[t=>{if(t>=801)return 100},t=>{if(t>=752)return t-701},t=>{if(t>=351)return 50},t=>{if(t>=326)return t-301},()=>25]
function l(t){return t-function(t){return c.find(n=>n(t))(t)}(t)}function m(){const c=t(n)||s(u(r(e)))
f=function(t){let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}(c),i=function(t){let n=10
return t<200&&(n=5),t+n}(c),a=l(c),o=function(t){let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}(c)}export{a,f as b,m as c,o as g,i as p}
//# sourceMappingURL=levelHighlight-1fdd38e3.js.map
