import{bB as n,v as t}from"./calfSystem-fb94ddf0.js"
import{e,a as r,u}from"./useItem-bde7a141.js"
import{d as o}from"./dialog-df4a277b.js"
import{a as i}from"./ajaxReturnCode-560160ca.js"
import{g as a}from"./guildInventory-31db2c38.js"
function s(n){return n}function c(n,e,r){return n(e).then(t(s,r))}function f(n,t,e){return function(n,t,e){return a({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function d(n,t,e){const o=e.items[e.items.length-1].a
return"wear"===n?c(r,o,t):"use"===n?c(u,o,t):void 0}function m(e,r){return 0===r.r&&"recall"!==e?n({cmd:"profile",subcmd:"fetchinv"}).then(t(d,e,r)):r}function l(n,r,u,o){return function(n,t,e){return f(n,t,e).then(i)}(n,r,u).then(e).then(t(m,o))}function b(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?c(r,t.b,t):"use"===n?c(u,t.b,t):void 0}(n,t):t}function h(e,r){return function(t){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:t,ajax:1}).then(o)}(e).then(t(b,r))}let p
function j(){return p||(p=Promise.resolve()),p}function v(n,e){return p=j().then(t(h,n,e)),p}function g(n,e,r,u){return p=j().then(t(l,n,e,r,u)),p}export{g as a,v as q}
//# sourceMappingURL=queue-ebaacb82.js.map
