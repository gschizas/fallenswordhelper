import{D as s,G as e}from"./calfSystem-f9a27018.js"
import{g as c,s as t}from"./idb-5c501cd3.js"
import"./closest-14c30e26.js"
import{f as o}from"./assets-8c112bf6.js"
import{c as r}from"./closestTd-f9925bf4.js"
function f(s,c){return s[/(\d+)\.png/.exec(c.src)[1]]=Number(function(s){return/(\d)$/.exec(e(r(s)))[1]}(c)),s}function m(e){const c=e||{},r=s('#pCC img[vspace="4"]').slice(1)
c.moves=r.reduce(f,{}),t(o,c)}function n(){c(o).then(m)}export default n
//# sourceMappingURL=store-0da3c903.js.map
