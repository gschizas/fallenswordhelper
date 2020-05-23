import{ah as s,N as e,aj as t,bi as a}from"./calfSystem-e6a24264.js"
import{c}from"./closest-644c8871.js"
import{f as r}from"./assets-10d3888a.js"
function o(s){return/(\d)$/.exec(a((e=s,c("TD",e))))[1]
var e}function n(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(o(e)),s}function f(s){const a=s||{},c=e('#pCC img[vspace="4"]').slice(1)
a.moves=c.reduce(n,{}),t(r,a)}export default function(){s(r).then(f)}
//# sourceMappingURL=store-b49ad14e.js.map
