import{D as s,G as e}from"./calfSystem-70c7a660.js"
import{g as t,s as o}from"./idb-d93da5f0.js"
import"./closest-79b9364e.js"
import{f as r}from"./assets-9f475ea8.js"
import{c}from"./closestTd-d9b33e54.js"
function a(s,t){return s[/(\d+)\.png/.exec(t.src)[1]]=Number(function(s){return/(\d)$/.exec(e(c(s)))[1]}(t)),s}function f(e){const t=e||{},c=s('#pCC img[vspace="4"]').slice(1)
t.moves=c.reduce(a,{}),o(r,t)}function m(){t(r).then(f)}export default m
//# sourceMappingURL=store-58187bf0.js.map
