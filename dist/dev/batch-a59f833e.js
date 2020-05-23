import{a as n,am as o}from"./calfSystem-0e5d6faf.js"
function e(n,o,e){return e&&performance.now()<n&&o<e.length}function t([f,r,a,c,m,s]){const i=performance.now()+f
let l=c
for(;e(i,l,a);)m(a[l],l,a),l+=1
l<a.length?n(r,t,[[f,r,a,l,m,s]]):function(e,t){o(t)&&n(e,t)}(r,s)}export{t as b}
//# sourceMappingURL=batch-a59f833e.js.map
