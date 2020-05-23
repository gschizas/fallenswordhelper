import{a as n,am as o}from"./calfSystem-fd021443.js"
function t(n,o,t){return t&&performance.now()<n&&o<t.length}function e([r,f,a,c,m,s]){const i=performance.now()+r
let l=c
for(;t(i,l,a);)m(a[l],l,a),l+=1
l<a.length?n(f,e,[[r,f,a,l,m,s]]):function(t,e){o(e)&&n(t,e)}(f,s)}export{e as b}
//# sourceMappingURL=batch-111227ce.js.map
