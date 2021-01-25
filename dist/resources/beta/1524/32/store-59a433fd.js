import{c as s}from"./closestTd-57ca2677.js"
import{f as e}from"./assets-3768dd31.js"
import{D as t,G as o}from"./calfSystem-26bcf570.js"
import{g as c,s as r}from"./idb-47b3fdf8.js"
import"./closest-331833f9.js"
function f(e,t){return e[/(\d+)\.png/.exec(t.src)[1]]=Number(function(e){return/(\d)$/.exec(o(s(e)))[1]}(t)),e}function m(s){const o=s||{},c=t('#pCC img[vspace="4"]').slice(1)
o.moves=c.reduce(f,{}),r(e,o)}function n(){c(e).then(m)}export default n
//# sourceMappingURL=store-59a433fd.js.map
