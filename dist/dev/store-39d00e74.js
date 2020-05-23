import{ai as s,N as e,ak as t,b7 as r}from"./calfSystem-fd021443.js"
import{c as a}from"./closest-23d4903f.js"
import{f as c}from"./assets-5a143407.js"
function o(s){return/(\d)$/.exec(r((e=s,a("TD",e))))[1]
var e}function n(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(o(e)),s}function f(s){const r=s||{},a=e('#pCC img[vspace="4"]').slice(1)
r.moves=a.reduce(n,{}),t(c,r)}export default function(){s(c).then(f)}
//# sourceMappingURL=store-39d00e74.js.map
