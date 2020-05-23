import{a as n,al as o}from"./calfSystem-fb94ddf0.js"
function t(n,o,t){return t&&performance.now()<n&&o<t.length}function e([f,r,a,c,s,l]){const m=performance.now()+f
let i=c
for(;t(m,i,a);)s(a[i],i,a),i+=1
i<a.length?n(r,e,[[f,r,a,i,s,l]]):function(t,e){o(e)&&n(t,e)}(r,l)}export{e as b}
//# sourceMappingURL=batch-48a2259e.js.map
