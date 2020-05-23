import{ah as s,N as e,aj as t,bi as r}from"./calfSystem-d06402b1.js"
import{c}from"./closest-0e7d337b.js"
import{f as o}from"./assets-2dfb5462.js"
function a(s){return/(\d)$/.exec(r((e=s,c("TD",e))))[1]
var e}function n(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(a(e)),s}function f(s){const r=s||{},c=e('#pCC img[vspace="4"]').slice(1)
r.moves=c.reduce(n,{}),t(o,r)}export default function(){s(o).then(f)}
//# sourceMappingURL=store-21edfeab.js.map
