import{D as s,G as e}from"./calfSystem-b136673a.js"
import{g as t,s as c}from"./idb-c31665cb.js"
import"./closest-9ef1a6fc.js"
import{f as o}from"./assets-48002450.js"
import{c as r}from"./closestTd-0714b6f6.js"
function f(s,t){return s[/(\d+)\.png/.exec(t.src)[1]]=Number(function(s){return/(\d)$/.exec(e(r(s)))[1]}(t)),s}function m(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(f,{}),c(o,t)}function n(){t(o).then(m)}export default n
//# sourceMappingURL=store-f9654ed0.js.map
