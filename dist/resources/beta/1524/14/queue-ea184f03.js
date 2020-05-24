import{bA as n,u as e}from"./calfSystem-371c414c.js"
import{e as t}from"./errorDialog-c2f7094e.js"
import{d as r}from"./dialog-3e1a0a78.js"
import{e as u,u as o}from"./useItem-45a468ee.js"
import{a as i}from"./ajaxReturnCode-946f7e47.js"
import{g as a}from"./guildInventory-7d78580c.js"
function c(n){return n}function s(n,t,r){return n(t).then(e(c,r))}function f(n,e,t){return function(n,e,t){return a({subcmd2:"recall",id:n,player_id:e,mode:t})}(n,e,t)}function m(n,e,t){const r=t.items[t.items.length-1].a
return"wear"===n?s(u,r,e):"use"===n?s(o,r,e):void 0}function d(t,r){return 0===r.r&&"recall"!==t?n({cmd:"profile",subcmd:"fetchinv"}).then(e(m,t,r)):r}function l(n,r,u,o){return function(n,e,t){return f(n,e,t).then(i)}(n,r,u).then(t).then(e(d,o))}function h(n,e){return 0===e.r&&"take"!==n?function(n,e){return"wear"===n?s(u,e.b,e):"use"===n?s(o,e.b,e):void 0}(n,e):e}function p(t,u){return function(e){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:e,ajax:1}).then(r)}(t).then(e(h,u))}let j
function b(){return j||(j=Promise.resolve()),j}function g(n,t){return j=b().then(e(p,n,t)),j}function v(n,t,r,u){return j=b().then(e(l,n,t,r,u)),j}export{v as a,g as q}
//# sourceMappingURL=queue-ea184f03.js.map
