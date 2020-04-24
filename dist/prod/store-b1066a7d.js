import{ah as e,N as s,aj as t,bi as a}from"./calfSystem-3956a623.js"
import{c}from"./closest-2eae17cf.js"
import{f as r}from"./assets-0e690637.js"
function o(e){return/(\d)$/.exec(a((s=e,c("TD",s))))[1]
var s}function n(e,s){return e[/(\d+)\.png/.exec(s.src)[1]]=Number(o(s)),e}function f(e){const a=e||{},c=s('#pCC img[vspace="4"]').slice(1)
a.moves=c.reduce(n,{}),t(r,a)}export default function(){e(r).then(f)}
//# sourceMappingURL=store-b1066a7d.js.map
