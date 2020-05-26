import{s as e}from"./calfSystem-ee582533.js"
import{e as n}from"./errorDialog-647ae9d2.js"
import{d as r}from"./dialog-b2af5043.js"
import{i as t}from"./indexAjaxJson-e486d467.js"
import{e as o,u}from"./useItem-bfe3ee6a.js"
import{a as i}from"./ajaxReturnCode-c49dbedc.js"
import{g as s}from"./guildInventory-51e0780d.js"
function a(e){return e}function c(n,r,t){return n(r).then(e(a,t))}function f(e,n,r){return function(e,n,r){return s({subcmd2:"recall",id:e,player_id:n,mode:r})}(e,n,r)}function m(e,n,r){const t=r.items[r.items.length-1].a
return"wear"===e?c(o,t,n):"use"===e?c(u,t,n):void 0}function d(n,r){return 0===r.r&&"recall"!==n?t({cmd:"profile",subcmd:"fetchinv"}).then(e(m,n,r)):r}function l(r,t,o,u){return function(e,n,r){return f(e,n,r).then(i)}(r,t,o).then(n).then(e(d,u))}function h(e,n){return 0===n.r&&"take"!==e?function(e,n){return"wear"===e?c(o,n.b,n):"use"===e?c(u,n.b,n):void 0}(e,n):n}function j(n,o){return function(e){return t({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:e,ajax:1}).then(r)}(n).then(e(h,o))}let p
function b(){return p||(p=Promise.resolve()),p}function g(n,r){return p=b().then(e(j,n,r)),p}function v(n,r,t,o){return p=b().then(e(l,n,r,t,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-da3e83af.js.map
