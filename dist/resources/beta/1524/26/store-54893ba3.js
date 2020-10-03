import{D as s,G as e}from"./calfSystem-cf4d22a7.js"
import{g as t,s as o}from"./idb-4798970d.js"
import"./closest-c2515a48.js"
import{f as c}from"./assets-d1187a02.js"
import{c as r}from"./closestTd-a53fb75e.js"
function a(s,t){return s[/(\d+)\.png/.exec(t.src)[1]]=Number(function(s){return/(\d)$/.exec(e(r(s)))[1]}(t)),s}function f(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(a,{}),o(c,t)}function m(){t(c).then(f)}export default m
//# sourceMappingURL=store-54893ba3.js.map
