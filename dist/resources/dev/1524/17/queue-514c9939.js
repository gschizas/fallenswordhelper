import{s as n}from"./calfSystem-1c103624.js"
import{e}from"./errorDialog-3ded88bf.js"
import{d as r}from"./dialog-5bdfcc8e.js"
import{i as t}from"./indexAjaxJson-ed231bc3.js"
import{e as o,u}from"./useItem-c7484c7e.js"
import{a as i}from"./ajaxReturnCode-9f3bc5f9.js"
import{g as c}from"./guildInventory-296e3b43.js"
function s(n){return n}function f(e,r,t){return e(r).then(n(s,t))}function a(n,e,r){return function(n,e,r){return c({subcmd2:"recall",id:n,player_id:e,mode:r})}(n,e,r)}function m(n,e,r){const t=r.items[r.items.length-1].a
return"wear"===n?f(o,t,e):"use"===n?f(u,t,e):void 0}function d(e,r){return 0===r.r&&"recall"!==e?t({cmd:"profile",subcmd:"fetchinv"}).then(n(m,e,r)):r}function l(r,t,o,u){return function(n,e,r){return a(n,e,r).then(i)}(r,t,o).then(e).then(n(d,u))}function b(n,e){return 0===e.r&&"take"!==n?function(n,e){return"wear"===n?f(o,e.b,e):"use"===n?f(u,e.b,e):void 0}(n,e):e}function h(e,o){return function(n){return t({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(e).then(n(b,o))}let j
function p(){return j||(j=Promise.resolve()),j}function g(e,r){return j=p().then(n(h,e,r)),j}function v(e,r,t,o){return j=p().then(n(l,e,r,t,o)),j}export{v as a,g as q}
//# sourceMappingURL=queue-514c9939.js.map
