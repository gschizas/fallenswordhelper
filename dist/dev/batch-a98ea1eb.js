import{a as n,am as o}from"./calfSystem-70b0df7f.js"
function t(n,o,t){return t&&performance.now()<n&&o<t.length}function e([f,r,a,c,m,s]){const i=performance.now()+f
let l=c
for(;t(i,l,a);)m(a[l],l,a),l+=1
l<a.length?n(r,e,[[f,r,a,l,m,s]]):function(t,e){o(e)&&n(t,e)}(r,s)}export{e as b}
//# sourceMappingURL=batch-a98ea1eb.js.map
