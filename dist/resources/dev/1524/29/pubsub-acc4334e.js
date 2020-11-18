import{t as n,a as t}from"./calfSystem-02c48ff5.js"
const o={}
let s=-1
function c(n,o){t(3,o.func,[n])}function f(t,s){if(console.log("publish",t),o[t])return o[t].forEach(n(c,s)),!0}function r(n,t){o[n]||(o[n]=[]),s+=1
const c=s.toString()
return o[n].push({token:c,func:t}),c}function u(n,t){return o[n]?o[n][0].token:r(n,t)}export{r as a,f as p,u as s}
//# sourceMappingURL=pubsub-acc4334e.js.map
