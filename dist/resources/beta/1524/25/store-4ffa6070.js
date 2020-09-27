import{D as s,G as e}from"./calfSystem-d3aab5a8.js"
import{g as t,s as o}from"./idb-f33380fa.js"
import"./closest-8d8d60b3.js"
import{f as r}from"./assets-73a041e8.js"
import{c as a}from"./closestTd-5e92d9d7.js"
function c(s,t){return s[/(\d+)\.png/.exec(t.src)[1]]=Number(function(s){return/(\d)$/.exec(e(a(s)))[1]}(t)),s}function f(e){const t=e||{},a=s('#pCC img[vspace="4"]').slice(1)
t.moves=a.reduce(c,{}),o(r,t)}function m(){t(r).then(f)}export default m
//# sourceMappingURL=store-4ffa6070.js.map
