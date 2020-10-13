import{D as s,G as e}from"./calfSystem-964f4fc9.js"
import{g as t,s as c}from"./idb-be8b4ca8.js"
import"./closest-9ef1a6fc.js"
import{f as o}from"./assets-48002450.js"
import{c as r}from"./closestTd-1f065d42.js"
function f(s,t){return s[/(\d+)\.png/.exec(t.src)[1]]=Number(function(s){return/(\d)$/.exec(e(r(s)))[1]}(t)),s}function m(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(f,{}),c(o,t)}function n(){t(o).then(m)}export default n
//# sourceMappingURL=store-bc8db1d2.js.map
