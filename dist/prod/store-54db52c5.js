import{ah as s,N as e,aj as c,bi as t}from"./calfSystem-4f7c0235.js"
import{c as r}from"./closest-c4802fbd.js"
import{f as o}from"./assets-3bbd1f11.js"
function a(s){return/(\d)$/.exec(t((e=s,r("TD",e))))[1]
var e}function f(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(a(e)),s}function n(s){const t=s||{},r=e('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(f,{}),c(o,t)}export default function(){s(o).then(n)}
//# sourceMappingURL=store-54db52c5.js.map
