import{ag as s,M as e,ai as t,bh as c}from"./calfSystem-d587d232.js"
import{c as r}from"./closest-2b33b59d.js"
import{f as o}from"./assets-80dc2218.js"
function a(s){return/(\d)$/.exec(c((e=s,r("TD",e))))[1]
var e}function n(s,e){return s[/(\d+)\.png/.exec(e.src)[1]]=Number(a(e)),s}function f(s){const c=s||{},r=e('#pCC img[vspace="4"]').slice(1)
c.moves=r.reduce(n,{}),t(o,c)}export default function(){s(o).then(f)}
//# sourceMappingURL=store-0a615a4e.js.map
