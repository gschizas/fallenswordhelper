import{D as s,G as e}from"./calfSystem-71b9378d.js"
import{g as t,s as o}from"./idb-97e2a44e.js"
import"./closest-8d8d60b3.js"
import{f as r}from"./assets-73a041e8.js"
import{c}from"./closestTd-78a2af7d.js"
function a(s,t){return s[/(\d+)\.png/.exec(t.src)[1]]=Number(function(s){return/(\d)$/.exec(e(c(s)))[1]}(t)),s}function m(e){const t=e||{},c=s('#pCC img[vspace="4"]').slice(1)
t.moves=c.reduce(a,{}),o(r,t)}function n(){t(r).then(m)}export default n
//# sourceMappingURL=store-d8415d99.js.map
