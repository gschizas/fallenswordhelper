import{c as s}from"./closestTd-c6a3fcb1.js"
import{f as e}from"./assets-3768dd31.js"
import{D as t,G as o}from"./calfSystem-19a5d332.js"
import{g as c,s as r}from"./idb-faef0351.js"
import"./closest-331833f9.js"
function f(e,t){return e[/(\d+)\.png/.exec(t.src)[1]]=Number(function(e){return/(\d)$/.exec(o(s(e)))[1]}(t)),e}function a(s){const o=s||{},c=t('#pCC img[vspace="4"]').slice(1)
o.moves=c.reduce(f,{}),r(e,o)}function m(){c(e).then(a)}export default m
//# sourceMappingURL=store-6da93586.js.map
