import{ai as s,N as e,ak as t,b7 as c}from"./calfSystem-94018cd0.js"
import{c as r}from"./closest-5434d1b1.js"
import{f as o}from"./assets-3b7e982f.js"
function a(s){return/(\d)$/.exec(c((e=s,r("TD",e))))[1]
var e}function n(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(a(e)),s}function f(s){const c=s||{},r=e('#pCC img[vspace="4"]').slice(1)
c.moves=r.reduce(n,{}),t(o,c)}export default function(){s(o).then(f)}
//# sourceMappingURL=store-0790b6b7.js.map
