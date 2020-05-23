import{ah as e,N as s,aj as c,bk as t}from"./calfSystem-70c0e373.js"
import{c as r}from"./closest-9d6eeb1b.js"
import{f as a}from"./assets-444d1aec.js"
function o(e){return/(\d)$/.exec(t((s=e,r("TD",s))))[1]
var s}function n(e,s){return e[/(\d+)\.png/.exec(s.src)[1]]=Number(o(s)),e}function f(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(n,{}),c(a,t)}export default function(){e(a).then(f)}
//# sourceMappingURL=store-09d7e01d.js.map
