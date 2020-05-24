import{a as n,al as o}from"./calfSystem-d96a3efd.js"
function e(n,o,e){return e&&performance.now()<n&&o<e.length}function t([r,a,f,c,s,l]){const m=performance.now()+r
let i=c
for(;e(m,i,f);)s(f[i],i,f),i+=1
i<f.length?n(a,t,[[r,a,f,i,s,l]]):function(e,t){o(t)&&n(e,t)}(a,l)}export{t as b}
//# sourceMappingURL=batch-cdb16fc8.js.map
