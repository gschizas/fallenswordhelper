import{D as s,G as e}from"./calfSystem-4991bf5b.js"
import{g as t,s as o}from"./idb-ee31c042.js"
import"./closest-c2515a48.js"
import{f as c}from"./assets-d1187a02.js"
import{c as r}from"./closestTd-471366fe.js"
function f(s,t){return s[/(\d+)\.png/.exec(t.src)[1]]=Number(function(s){return/(\d)$/.exec(e(r(s)))[1]}(t)),s}function m(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(f,{}),o(c,t)}function n(){t(c).then(m)}export default n
//# sourceMappingURL=store-c0303552.js.map
