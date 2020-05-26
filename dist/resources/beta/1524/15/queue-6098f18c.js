import{s as n}from"./calfSystem-1262535f.js"
import{e}from"./errorDialog-dc5450a9.js"
import{d as r}from"./dialog-c7021814.js"
import{i as t}from"./indexAjaxJson-f27fbe77.js"
import{e as o,u}from"./useItem-89edb088.js"
import{a as i}from"./ajaxReturnCode-cf3ddf46.js"
import{g as s}from"./guildInventory-0a3eaee8.js"
function a(n){return n}function f(e,r,t){return e(r).then(n(a,t))}function c(n,e,r){return function(n,e,r){return s({subcmd2:"recall",id:n,player_id:e,mode:r})}(n,e,r)}function m(n,e,r){const t=r.items[r.items.length-1].a
return"wear"===n?f(o,t,e):"use"===n?f(u,t,e):void 0}function d(e,r){return 0===r.r&&"recall"!==e?t({cmd:"profile",subcmd:"fetchinv"}).then(n(m,e,r)):r}function l(r,t,o,u){return function(n,e,r){return c(n,e,r).then(i)}(r,t,o).then(e).then(n(d,u))}function h(n,e){return 0===e.r&&"take"!==n?function(n,e){return"wear"===n?f(o,e.b,e):"use"===n?f(u,e.b,e):void 0}(n,e):e}function j(e,o){return function(n){return t({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(e).then(n(h,o))}let p
function b(){return p||(p=Promise.resolve()),p}function g(e,r){return p=b().then(n(j,e,r)),p}function v(e,r,t,o){return p=b().then(n(l,e,r,t,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-6098f18c.js.map
