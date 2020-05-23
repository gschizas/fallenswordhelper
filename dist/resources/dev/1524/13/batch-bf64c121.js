import{a as n,am as e}from"./calfSystem-01eb06ed.js"
function o(n,e,o){return o&&performance.now()<n&&e<o.length}function t([r,a,f,c,m,s]){const i=performance.now()+r
let l=c
for(;o(i,l,f);)m(f[l],l,f),l+=1
l<f.length?n(a,t,[[r,a,f,l,m,s]]):function(o,t){e(t)&&n(o,t)}(a,s)}export{t as b}
//# sourceMappingURL=batch-bf64c121.js.map
