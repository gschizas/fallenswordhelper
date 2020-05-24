import{bE as n,u as t}from"./calfSystem-d96a3efd.js"
import{e as r}from"./errorDialog-70b04a3c.js"
import{d as e}from"./dialog-62f3abd8.js"
import{e as u,u as o}from"./useItem-d0013989.js"
import{a as i}from"./ajaxReturnCode-2df80530.js"
import{g as a}from"./guildInventory-2b763753.js"
function s(n){return n}function c(n,r,e){return n(r).then(t(s,e))}function f(n,t,r){return function(n,t,r){return a({subcmd2:"recall",id:n,player_id:t,mode:r})}(n,t,r)}function m(n,t,r){const e=r.items[r.items.length-1].a
return"wear"===n?c(u,e,t):"use"===n?c(o,e,t):void 0}function d(r,e){return 0===e.r&&"recall"!==r?n({cmd:"profile",subcmd:"fetchinv"}).then(t(m,r,e)):e}function l(n,e,u,o){return function(n,t,r){return f(n,t,r).then(i)}(n,e,u).then(r).then(t(d,o))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?c(u,t.b,t):"use"===n?c(o,t.b,t):void 0}(n,t):t}function b(r,u){return function(t){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:t,ajax:1}).then(e)}(r).then(t(h,u))}let p
function j(){return p||(p=Promise.resolve()),p}function g(n,r){return p=j().then(t(b,n,r)),p}function v(n,r,e,u){return p=j().then(t(l,n,r,e,u)),p}export{v as a,g as q}
//# sourceMappingURL=queue-5bf1259c.js.map
