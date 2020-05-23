import{ah as e,N as s,aj as c,bi as t}from"./calfSystem-4b4fbec4.js"
import{c as r}from"./closest-c674dae6.js"
import{f as a}from"./assets-4f6559fb.js"
function o(e){return/(\d)$/.exec(t((s=e,r("TD",s))))[1]
var s}function f(e,s){return e[/(\d+)\.png/.exec(s.src)[1]]=Number(o(s)),e}function n(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(f,{}),c(a,t)}export default function(){e(a).then(n)}
//# sourceMappingURL=store-53a3a220.js.map
