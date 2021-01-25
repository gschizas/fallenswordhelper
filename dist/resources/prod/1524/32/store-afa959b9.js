import{c as s}from"./closestTd-8ae6810f.js"
import{f as e}from"./assets-3768dd31.js"
import{D as t,G as o}from"./calfSystem-45544049.js"
import{g as c,s as r}from"./idb-ca3578bc.js"
import"./closest-331833f9.js"
function f(e,t){return e[/(\d+)\.png/.exec(t.src)[1]]=Number(function(e){return/(\d)$/.exec(o(s(e)))[1]}(t)),e}function m(s){const o=s||{},c=t('#pCC img[vspace="4"]').slice(1)
o.moves=c.reduce(f,{}),r(e,o)}function n(){c(e).then(m)}export default n
//# sourceMappingURL=store-afa959b9.js.map
