import{a as n,al as o}from"./calfSystem-70c0e373.js"
function e(n,o,e){return e&&performance.now()<n&&o<e.length}function t([r,a,c,f,s,l]){const m=performance.now()+r
let i=f
for(;e(m,i,c);)s(c[i],i,c),i+=1
i<c.length?n(a,t,[[r,a,c,i,s,l]]):function(e,t){o(t)&&n(e,t)}(a,l)}export{t as b}
//# sourceMappingURL=batch-5d2b5520.js.map
