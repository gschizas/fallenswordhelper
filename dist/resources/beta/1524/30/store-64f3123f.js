import{D as s,G as e}from"./calfSystem-ebf4b17d.js"
import{g as t,s as o}from"./idb-b7d9067e.js"
import"./closest-3bdef2f3.js"
import{f as c}from"./assets-c6a1020c.js"
import{c as r}from"./closestTd-51e0957b.js"
function f(s,t){return s[/(\d+)\.png/.exec(t.src)[1]]=Number(function(s){return/(\d)$/.exec(e(r(s)))[1]}(t)),s}function m(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(f,{}),o(c,t)}function n(){t(c).then(m)}export default n
//# sourceMappingURL=store-64f3123f.js.map
