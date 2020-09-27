import{D as s,G as e}from"./calfSystem-69dd5601.js"
import{g as t,s as o}from"./idb-874fe815.js"
import"./closest-8d8d60b3.js"
import{f as r}from"./assets-73a041e8.js"
import{c}from"./closestTd-9fa8339a.js"
function a(s,t){return s[/(\d+)\.png/.exec(t.src)[1]]=Number(function(s){return/(\d)$/.exec(e(c(s)))[1]}(t)),s}function f(e){const t=e||{},c=s('#pCC img[vspace="4"]').slice(1)
t.moves=c.reduce(a,{}),o(r,t)}function m(){t(r).then(f)}export default m
//# sourceMappingURL=store-e1ea3316.js.map
