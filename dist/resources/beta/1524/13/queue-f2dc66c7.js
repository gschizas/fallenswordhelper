import{bB as e,v as n}from"./calfSystem-1e164202.js"
import{e as t}from"./errorDialog-efbe6eeb.js"
import{d as r}from"./dialog-938d7c32.js"
import{e as o,u}from"./useItem-ff489a19.js"
import{a as i}from"./ajaxReturnCode-01f0dc88.js"
import{g as s}from"./guildInventory-97c89b2e.js"
function c(e){return e}function a(e,t,r){return e(t).then(n(c,r))}function f(e,n,t){return function(e,n,t){return s({subcmd2:"recall",id:e,player_id:n,mode:t})}(e,n,t)}function m(e,n,t){const r=t.items[t.items.length-1].a
return"wear"===e?a(o,r,n):"use"===e?a(u,r,n):void 0}function d(t,r){return 0===r.r&&"recall"!==t?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,t,r)):r}function l(e,r,o,u){return function(e,n,t){return f(e,n,t).then(i)}(e,r,o).then(t).then(n(d,u))}function h(e,n){return 0===n.r&&"take"!==e?function(e,n){return"wear"===e?a(o,n.b,n):"use"===e?a(u,n.b,n):void 0}(e,n):n}function b(t,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(t).then(n(h,o))}let p
function j(){return p||(p=Promise.resolve()),p}function g(e,t){return p=j().then(n(b,e,t)),p}function v(e,t,r,o){return p=j().then(n(l,e,t,r,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-f2dc66c7.js.map
