import{D as s,G as e}from"./calfSystem-54df10e3.js"
import{g as t,s as c}from"./idb-7f0d2b39.js"
import"./closest-3bdef2f3.js"
import{f as o}from"./assets-c6a1020c.js"
import{c as f}from"./closestTd-fbfc87d2.js"
function r(s,t){return s[/(\d+)\.png/.exec(t.src)[1]]=Number(function(s){return/(\d)$/.exec(e(f(s)))[1]}(t)),s}function m(e){const t=e||{},f=s('#pCC img[vspace="4"]').slice(1)
t.moves=f.reduce(r,{}),c(o,t)}function n(){t(o).then(m)}export default n
//# sourceMappingURL=store-3bfd7de6.js.map
