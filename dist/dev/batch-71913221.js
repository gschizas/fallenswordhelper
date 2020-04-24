import{a as n,am as o}from"./calfSystem-9b1fa4ca.js"
function t(n,o,t){return t&&performance.now()<n&&o<t.length}function a([e,r,f,c,m,s]){const i=performance.now()+e
let l=c
for(;t(i,l,f);)m(f[l],l,f),l+=1
l<f.length?n(r,a,[[e,r,f,l,m,s]]):function(t,a){o(a)&&n(t,a)}(r,s)}export{a as b}
//# sourceMappingURL=batch-71913221.js.map
