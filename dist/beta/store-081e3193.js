import{ah as s,N as e,aj as c,bk as t}from"./calfSystem-07c25a1c.js"
import{c as a}from"./closest-10a75b5d.js"
import{f as r}from"./assets-078845b6.js"
function o(s){return/(\d)$/.exec(t((e=s,a("TD",e))))[1]
var e}function n(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(o(e)),s}function f(s){const t=s||{},a=e('#pCC img[vspace="4"]').slice(1)
t.moves=a.reduce(n,{}),c(r,t)}export default function(){s(r).then(f)}
//# sourceMappingURL=store-081e3193.js.map
