import{ah as e,M as s,aj as c,b6 as t}from"./calfSystem-d96a3efd.js"
import{c as r}from"./closest-f6c323ce.js"
import{f as a}from"./assets-1567628f.js"
function o(e){return/(\d)$/.exec(t((s=e,r("TD",s))))[1]
var s}function f(e,s){return e[/(\d+)\.png/.exec(s.src)[1]]=Number(o(s)),e}function n(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(f,{}),c(a,t)}export default function(){e(a).then(n)}
//# sourceMappingURL=store-4c9c528a.js.map
