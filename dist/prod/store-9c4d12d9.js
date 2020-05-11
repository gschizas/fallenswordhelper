import{ah as s,N as e,aj as t,bi as c}from"./calfSystem-72fdbe97.js"
import{c as r}from"./closest-495903f5.js"
import{f as a}from"./assets-45a33fc1.js"
function o(s){return/(\d)$/.exec(c((e=s,r("TD",e))))[1]
var e}function f(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(o(e)),s}function n(s){const c=s||{},r=e('#pCC img[vspace="4"]').slice(1)
c.moves=r.reduce(f,{}),t(a,c)}export default function(){s(a).then(n)}
//# sourceMappingURL=store-9c4d12d9.js.map
