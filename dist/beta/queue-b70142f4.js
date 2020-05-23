import{bB as n,v as t}from"./calfSystem-2fb02284.js"
import{e as r}from"./errorDialog-b64a55ff.js"
import{d as e}from"./dialog-bdcd2acc.js"
import{e as o,u}from"./useItem-9ff3ccd8.js"
import{a as i}from"./ajaxReturnCode-b8478934.js"
import{g as c}from"./guildInventory-da2f068d.js"
function a(n){return n}function f(n,r,e){return n(r).then(t(a,e))}function s(n,t,r){return function(n,t,r){return c({subcmd2:"recall",id:n,player_id:t,mode:r})}(n,t,r)}function m(n,t,r){const e=r.items[r.items.length-1].a
return"wear"===n?f(o,e,t):"use"===n?f(u,e,t):void 0}function d(r,e){return 0===e.r&&"recall"!==r?n({cmd:"profile",subcmd:"fetchinv"}).then(t(m,r,e)):e}function l(n,e,o,u){return function(n,t,r){return s(n,t,r).then(i)}(n,e,o).then(r).then(t(d,u))}function b(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?f(o,t.b,t):"use"===n?f(u,t.b,t):void 0}(n,t):t}function h(r,o){return function(t){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:t,ajax:1}).then(e)}(r).then(t(b,o))}let p
function j(){return p||(p=Promise.resolve()),p}function g(n,r){return p=j().then(t(h,n,r)),p}function v(n,r,e,o){return p=j().then(t(l,n,r,e,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-b70142f4.js.map
