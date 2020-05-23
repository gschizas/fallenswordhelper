import{bF as n,v as e}from"./calfSystem-01eb06ed.js"
import{e as t}from"./errorDialog-3344f8b2.js"
import{d as r}from"./dialog-e8202133.js"
import{e as o,u}from"./useItem-e62d6147.js"
import{a as i}from"./ajaxReturnCode-13dfe8bc.js"
import{g as s}from"./guildInventory-6cb38a95.js"
function a(n){return n}function c(n,t,r){return n(t).then(e(a,r))}function f(n,e,t){return function(n,e,t){return s({subcmd2:"recall",id:n,player_id:e,mode:t})}(n,e,t)}function m(n,e,t){const r=t.items[t.items.length-1].a
return"wear"===n?c(o,r,e):"use"===n?c(u,r,e):void 0}function d(t,r){return 0===r.r&&"recall"!==t?n({cmd:"profile",subcmd:"fetchinv"}).then(e(m,t,r)):r}function l(n,r,o,u){return function(n,e,t){return f(n,e,t).then(i)}(n,r,o).then(t).then(e(d,u))}function b(n,e){return 0===e.r&&"take"!==n?function(n,e){return"wear"===n?c(o,e.b,e):"use"===n?c(u,e.b,e):void 0}(n,e):e}function h(t,o){return function(e){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:e,ajax:1}).then(r)}(t).then(e(b,o))}let p
function j(){return p||(p=Promise.resolve()),p}function g(n,t){return p=j().then(e(h,n,t)),p}function v(n,t,r,o){return p=j().then(e(l,n,t,r,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-ae9aa4c6.js.map
