import{a as n,al as o}from"./calfSystem-d06402b1.js"
function t(n,o,t){return t&&performance.now()<n&&o<t.length}function e([r,a,f,c,s,l]){const m=performance.now()+r
let i=c
for(;t(m,i,f);)s(f[i],i,f),i+=1
i<f.length?n(a,e,[[r,a,f,i,s,l]]):function(t,e){o(e)&&n(t,e)}(a,l)}export{e as b}
//# sourceMappingURL=batch-ae75c711.js.map
