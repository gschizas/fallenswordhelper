import{ah as e,N as s,aj as c,bk as t}from"./calfSystem-c91e004c.js"
import{c as r}from"./closest-fde5373b.js"
import{f as o}from"./assets-16c3fce3.js"
function a(e){return/(\d)$/.exec(t((s=e,r("TD",s))))[1]
var s}function n(e,s){return e[/(\d+)\.png/.exec(s.src)[1]]=Number(a(s)),e}function f(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(n,{}),c(o,t)}export default function(){e(o).then(f)}
//# sourceMappingURL=store-bebd3b38.js.map
