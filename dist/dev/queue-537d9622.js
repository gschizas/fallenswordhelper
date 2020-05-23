import{bF as e,v as n}from"./calfSystem-70b0df7f.js"
import{e as t}from"./errorDialog-d60de5ef.js"
import{d as r}from"./dialog-e74653d6.js"
import{e as o,u}from"./useItem-5f15dee3.js"
import{a as i}from"./ajaxReturnCode-a4018309.js"
import{g as s}from"./guildInventory-d8e8ef53.js"
function f(e){return e}function a(e,t,r){return e(t).then(n(f,r))}function c(e,n,t){return function(e,n,t){return s({subcmd2:"recall",id:e,player_id:n,mode:t})}(e,n,t)}function m(e,n,t){const r=t.items[t.items.length-1].a
return"wear"===e?a(o,r,n):"use"===e?a(u,r,n):void 0}function d(t,r){return 0===r.r&&"recall"!==t?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,t,r)):r}function l(e,r,o,u){return function(e,n,t){return c(e,n,t).then(i)}(e,r,o).then(t).then(n(d,u))}function h(e,n){return 0===n.r&&"take"!==e?function(e,n){return"wear"===e?a(o,n.b,n):"use"===e?a(u,n.b,n):void 0}(e,n):n}function p(t,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(t).then(n(h,o))}let b
function j(){return b||(b=Promise.resolve()),b}function g(e,t){return b=j().then(n(p,e,t)),b}function v(e,t,r,o){return b=j().then(n(l,e,t,r,o)),b}export{v as a,g as q}
//# sourceMappingURL=queue-537d9622.js.map
