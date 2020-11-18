import{D as s,G as c}from"./calfSystem-02c48ff5.js"
import{g as e,s as t}from"./idb-49c5b621.js"
import"./closest-14c30e26.js"
import{f as o}from"./assets-8c112bf6.js"
import{c as r}from"./closestTd-4c5a848a.js"
function f(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(function(s){return/(\d)$/.exec(c(r(s)))[1]}(e)),s}function m(c){const e=c||{},r=s('#pCC img[vspace="4"]').slice(1)
e.moves=r.reduce(f,{}),t(o,e)}function n(){e(o).then(m)}export default n
//# sourceMappingURL=store-eba08caf.js.map
