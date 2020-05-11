import{ai as e,N as s,ak as c,b7 as t}from"./calfSystem-8dc0fa4b.js"
import{c as r}from"./closest-9cd85ce4.js"
import{f as a}from"./assets-ee86d4ec.js"
function o(e){return/(\d)$/.exec(t((s=e,r("TD",s))))[1]
var s}function n(e,s){return e[/(\d+)\.png/.exec(s.src)[1]]=Number(o(s)),e}function f(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(n,{}),c(a,t)}export default function(){e(a).then(f)}
//# sourceMappingURL=store-d2e37a73.js.map
