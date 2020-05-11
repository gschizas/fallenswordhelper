import{a as n,am as o}from"./calfSystem-8dc0fa4b.js"
function t(n,o,t){return t&&performance.now()<n&&o<t.length}function e([r,a,f,c,m,s]){const i=performance.now()+r
let l=c
for(;t(i,l,f);)m(f[l],l,f),l+=1
l<f.length?n(a,e,[[r,a,f,l,m,s]]):function(t,e){o(e)&&n(t,e)}(a,s)}export{e as b}
//# sourceMappingURL=batch-5f01c08c.js.map
