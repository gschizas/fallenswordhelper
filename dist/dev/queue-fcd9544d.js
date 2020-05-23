import{bF as n,v as e}from"./calfSystem-0e5d6faf.js"
import{e as t}from"./errorDialog-c126b119.js"
import{d as r}from"./dialog-69a0353c.js"
import{e as o,u}from"./useItem-e6753e4d.js"
import{a as i}from"./ajaxReturnCode-217b092b.js"
import{g as a}from"./guildInventory-eea2d835.js"
function s(n){return n}function c(n,t,r){return n(t).then(e(s,r))}function f(n,e,t){return function(n,e,t){return a({subcmd2:"recall",id:n,player_id:e,mode:t})}(n,e,t)}function m(n,e,t){const r=t.items[t.items.length-1].a
return"wear"===n?c(o,r,e):"use"===n?c(u,r,e):void 0}function d(t,r){return 0===r.r&&"recall"!==t?n({cmd:"profile",subcmd:"fetchinv"}).then(e(m,t,r)):r}function l(n,r,o,u){return function(n,e,t){return f(n,e,t).then(i)}(n,r,o).then(t).then(e(d,u))}function h(n,e){return 0===e.r&&"take"!==n?function(n,e){return"wear"===n?c(o,e.b,e):"use"===n?c(u,e.b,e):void 0}(n,e):e}function b(t,o){return function(e){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:e,ajax:1}).then(r)}(t).then(e(h,o))}let p
function j(){return p||(p=Promise.resolve()),p}function g(n,t){return p=j().then(e(b,n,t)),p}function v(n,t,r,o){return p=j().then(e(l,n,t,r,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-fcd9544d.js.map
