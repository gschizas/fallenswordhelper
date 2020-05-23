import{ai as e,N as s,ak as t,b7 as r}from"./calfSystem-0e5d6faf.js"
import{c as a}from"./closest-8e8851e4.js"
import{f as c}from"./assets-e88e9d09.js"
function o(e){return/(\d)$/.exec(r((s=e,a("TD",s))))[1]
var s}function n(e,s){return e[/(\d+)\.png/.exec(s.src)[1]]=Number(o(s)),e}function f(e){const r=e||{},a=s('#pCC img[vspace="4"]').slice(1)
r.moves=a.reduce(n,{}),t(c,r)}export default function(){e(c).then(f)}
//# sourceMappingURL=store-0591b30b.js.map
