import{ah as s,N as e,aj as t,bk as r}from"./calfSystem-fb94ddf0.js"
import{c}from"./closest-3210f804.js"
import{f}from"./assets-90b59f36.js"
function o(s){return/(\d)$/.exec(r((e=s,c("TD",e))))[1]
var e}function a(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(o(e)),s}function n(s){const r=s||{},c=e('#pCC img[vspace="4"]').slice(1)
r.moves=c.reduce(a,{}),t(f,r)}export default function(){s(f).then(n)}
//# sourceMappingURL=store-ed230b01.js.map
