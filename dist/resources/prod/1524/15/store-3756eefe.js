import{a4 as e,I as s,a6 as t,aS as a}from"./calfSystem-740ec4d2.js"
import{c}from"./closest-a3325de8.js"
import{f as r}from"./assets-6e314512.js"
function o(e){return/(\d)$/.exec(a((s=e,c("TD",s))))[1]
var s}function n(e,s){return e[/(\d+)\.png/.exec(s.src)[1]]=Number(o(s)),e}function f(e){const a=e||{},c=s('#pCC img[vspace="4"]').slice(1)
a.moves=c.reduce(n,{}),t(r,a)}export default function(){e(r).then(f)}
//# sourceMappingURL=store-3756eefe.js.map
