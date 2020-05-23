import{G as n,H as t,I as r,J as e,K as s,L as u}from"./calfSystem-2fb02284.js"
let f,a,i,o
const c=[n=>{if(n>=801)return 100},n=>{if(n>=752)return n-701},n=>{if(n>=351)return 50},n=>{if(n>=326)return n-301},()=>25]
function l(n){return n-function(n){return c.find(t=>t(n))(n)}(n)}function m(){const c=n(t)||r(e(s(u)))
f=function(n){let t=10
return n<=209&&(t=n-200),n<=205&&(t=5),n-t}(c),a=function(n){let t=10
return n<200&&(t=5),n+t}(c),i=l(c),o=function(n){let t=100
return n<=700&&(t=50),n<=300&&(t=25),n+t}(c)}export{i as a,f as b,m as c,o as g,a as p}
//# sourceMappingURL=levelHighlight-ed38ee66.js.map
