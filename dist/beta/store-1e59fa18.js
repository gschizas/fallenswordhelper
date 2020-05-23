import{ah as s,N as e,aj as c,bk as t}from"./calfSystem-2fb02284.js"
import{c as r}from"./closest-435e5cd2.js"
import{f as a}from"./assets-fad649bc.js"
function o(s){return/(\d)$/.exec(t((e=s,r("TD",e))))[1]
var e}function n(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(o(e)),s}function f(s){const t=s||{},r=e('#pCC img[vspace="4"]').slice(1)
t.moves=r.reduce(n,{}),c(a,t)}export default function(){s(a).then(f)}
//# sourceMappingURL=store-1e59fa18.js.map
