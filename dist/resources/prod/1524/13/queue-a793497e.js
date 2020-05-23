import{bz as n,v as e}from"./calfSystem-e6a24264.js"
import{e as t,a as r,u}from"./useItem-e8ecb4e4.js"
import{d as o}from"./dialog-68e3f62f.js"
import{a as i}from"./ajaxReturnCode-7e7c2091.js"
import{g as s}from"./guildInventory-f74f9e89.js"
function a(n){return n}function c(n,t,r){return n(t).then(e(a,r))}function f(n,e,t){return function(n,e,t){return s({subcmd2:"recall",id:n,player_id:e,mode:t})}(n,e,t)}function m(n,e,t){const o=t.items[t.items.length-1].a
return"wear"===n?c(r,o,e):"use"===n?c(u,o,e):void 0}function d(t,r){return 0===r.r&&"recall"!==t?n({cmd:"profile",subcmd:"fetchinv"}).then(e(m,t,r)):r}function l(n,r,u,o){return function(n,e,t){return f(n,e,t).then(i)}(n,r,u).then(t).then(e(d,o))}function h(n,e){return 0===e.r&&"take"!==n?function(n,e){return"wear"===n?c(r,e.b,e):"use"===n?c(u,e.b,e):void 0}(n,e):e}function b(t,r){return function(e){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:e,ajax:1}).then(o)}(t).then(e(h,r))}let p
function j(){return p||(p=Promise.resolve()),p}function v(n,t){return p=j().then(e(b,n,t)),p}function g(n,t,r,u){return p=j().then(e(l,n,t,r,u)),p}export{g as a,v as q}
//# sourceMappingURL=queue-a793497e.js.map
