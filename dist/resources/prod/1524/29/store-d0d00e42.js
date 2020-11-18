import{D as s,G as e}from"./calfSystem-57628ebe.js"
import{g as c,s as t}from"./idb-5c863a6f.js"
import"./closest-14c30e26.js"
import{f as o}from"./assets-8c112bf6.js"
import{c as r}from"./closestTd-ca27801b.js"
function f(s,c){return s[/(\d+)\.png/.exec(c.src)[1]]=Number(function(s){return/(\d)$/.exec(e(r(s)))[1]}(c)),s}function m(e){const c=e||{},r=s('#pCC img[vspace="4"]').slice(1)
c.moves=r.reduce(f,{}),t(o,c)}function n(){c(o).then(m)}export default n
//# sourceMappingURL=store-d0d00e42.js.map
