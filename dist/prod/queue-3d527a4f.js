import{bz as n,v as t}from"./calfSystem-d06402b1.js"
import{e,a as r,u}from"./useItem-bfa65beb.js"
import{d as o}from"./dialog-b58c95c9.js"
import{a as i}from"./ajaxReturnCode-ea0d33ed.js"
import{g as a}from"./guildInventory-bba6a471.js"
function s(n){return n}function c(n,e,r){return n(e).then(t(s,r))}function f(n,t,e){return function(n,t,e){return a({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function m(n,t,e){const o=e.items[e.items.length-1].a
return"wear"===n?c(r,o,t):"use"===n?c(u,o,t):void 0}function d(e,r){return 0===r.r&&"recall"!==e?n({cmd:"profile",subcmd:"fetchinv"}).then(t(m,e,r)):r}function b(n,r,u,o){return function(n,t,e){return f(n,t,e).then(i)}(n,r,u).then(e).then(t(d,o))}function l(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?c(r,t.b,t):"use"===n?c(u,t.b,t):void 0}(n,t):t}function h(e,r){return function(t){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:t,ajax:1}).then(o)}(e).then(t(l,r))}let p
function j(){return p||(p=Promise.resolve()),p}function v(n,e){return p=j().then(t(h,n,e)),p}function g(n,e,r,u){return p=j().then(t(b,n,e,r,u)),p}export{g as a,v as q}
//# sourceMappingURL=queue-3d527a4f.js.map
