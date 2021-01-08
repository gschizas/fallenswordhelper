import{D as s,G as e}from"./calfSystem-6459f18a.js"
import{g as t,s as c}from"./idb-737f325b.js"
import"./closest-3bdef2f3.js"
import{f as o}from"./assets-c6a1020c.js"
import{c as r}from"./closestTd-635bc015.js"
function f(s,t){return s[/(\d+)\.png/.exec(t.src)[1]]=Number(function(s){return/(\d)$/.exec(e(r(s)))[1]}(t)),s}function m(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(f,{}),c(o,t)}function n(){t(o).then(m)}export default n
//# sourceMappingURL=store-cedefe83.js.map
