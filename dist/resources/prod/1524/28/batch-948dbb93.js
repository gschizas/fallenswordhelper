import{a as n,ah as o}from"./calfSystem-a5da5210.js"
function t(n,o,t){return t&&performance.now()<n&&o<t.length}function a([e,r,f,c,s,m]){const i=performance.now()+e
let l=c
for(;t(i,l,f);)s(f[l],l,f),l+=1
l<f.length?n(r,a,[[e,r,f,l,s,m]]):function(t,a){o(a)&&n(t,a)}(r,m)}export{a as b}
//# sourceMappingURL=batch-948dbb93.js.map
