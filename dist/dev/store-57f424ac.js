import{ai as e,N as s,ak as t,b7 as c}from"./calfSystem-70b0df7f.js"
import{c as r}from"./closest-e3995be7.js"
import{f as o}from"./assets-50822cf1.js"
function a(e){return/(\d)$/.exec(c((s=e,r("TD",s))))[1]
var s}function f(e,s){return e[/(\d+)\.png/.exec(s.src)[1]]=Number(a(s)),e}function n(e){const c=e||{},r=s('#pCC img[vspace="4"]').slice(1)
c.moves=r.reduce(f,{}),t(o,c)}export default function(){e(o).then(n)}
//# sourceMappingURL=store-57f424ac.js.map
