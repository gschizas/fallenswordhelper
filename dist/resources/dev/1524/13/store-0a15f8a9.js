import{ai as e,N as s,ak as c,b7 as t}from"./calfSystem-01eb06ed.js"
import{c as r}from"./closest-6fcf191a.js"
import{f as a}from"./assets-9c2cb0ff.js"
function f(e){return/(\d)$/.exec(t((s=e,r("TD",s))))[1]
var s}function o(e,s){return e[/(\d+)\.png/.exec(s.src)[1]]=Number(f(s)),e}function n(e){const t=e||{},r=s('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(o,{}),c(a,t)}export default function(){e(a).then(n)}
//# sourceMappingURL=store-0a15f8a9.js.map
