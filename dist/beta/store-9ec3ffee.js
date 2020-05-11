import{ah as s,N as e,aj as t,bk as c}from"./calfSystem-99da704d.js"
import{c as r}from"./closest-5dc907d7.js"
import{f as a}from"./assets-90437058.js"
function o(s){return/(\d)$/.exec(c((e=s,r("TD",e))))[1]
var e}function n(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(o(e)),s}function f(s){const c=s||{},r=e('#pCC img[vspace="4"]').slice(1)
c.moves=r.reduce(n,{}),t(a,c)}export default function(){s(a).then(f)}
//# sourceMappingURL=store-9ec3ffee.js.map
