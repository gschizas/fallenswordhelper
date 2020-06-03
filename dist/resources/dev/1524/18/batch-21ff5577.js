import{a as n,aj as o}from"./calfSystem-5545a3e6.js"
function e(n,o,e){return e&&performance.now()<n&&o<e.length}function t([r,a,f,c,s,m]){const i=performance.now()+r
let l=c
for(;e(i,l,f);)s(f[l],l,f),l+=1
l<f.length?n(a,t,[[r,a,f,l,s,m]]):function(e,t){o(t)&&n(e,t)}(a,m)}export{t as b}
//# sourceMappingURL=batch-21ff5577.js.map
