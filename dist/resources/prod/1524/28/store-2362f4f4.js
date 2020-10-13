import{D as s,G as e}from"./calfSystem-a5da5210.js"
import{g as c,s as t}from"./idb-2c141566.js"
import"./closest-9ef1a6fc.js"
import{f as o}from"./assets-48002450.js"
import{c as r}from"./closestTd-cf722fdc.js"
function f(s,c){return s[/(\d+)\.png/.exec(c.src)[1]]=Number(function(s){return/(\d)$/.exec(e(r(s)))[1]}(c)),s}function a(e){const c=e||{},r=s('#pCC img[vspace="4"]').slice(1)
c.moves=r.reduce(f,{}),t(o,c)}function m(){c(o).then(a)}export default m
//# sourceMappingURL=store-2362f4f4.js.map
