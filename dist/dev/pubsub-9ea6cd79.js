import{v as n,a as t}from"./calfSystem-9b1fa4ca.js"
const o={}
let s=-1
function c(n,o){t(3,o.func,[n])}function a(t,s){if(console.log("publish",t),o[t])return o[t].forEach(n(c,s)),!0}function f(n,t){o[n]||(o[n]=[]),s+=1
const c=s.toString()
return o[n].push({token:c,func:t}),c}function r(n,t){return o[n]?o[n][0].token:f(n,t)}export{f as a,a as p,r as s}
//# sourceMappingURL=pubsub-9ea6cd79.js.map
