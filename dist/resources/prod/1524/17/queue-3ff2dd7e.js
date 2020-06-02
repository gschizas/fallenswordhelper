import{s as n}from"./calfSystem-dec5e071.js"
import{e as r}from"./errorDialog-5d76ff73.js"
import{d as t}from"./dialog-b7388abb.js"
import{i as e}from"./indexAjaxJson-ecf8d1f5.js"
import{e as o,u}from"./useItem-fcbdc3fc.js"
import{a as i}from"./ajaxReturnCode-361085b2.js"
import{g as s}from"./guildInventory-4312cd62.js"
function c(n){return n}function f(r,t,e){return r(t).then(n(c,e))}function a(n,r,t){return function(n,r,t){return s({subcmd2:"recall",id:n,player_id:r,mode:t})}(n,r,t)}function m(n,r,t){const e=t.items[t.items.length-1].a
return"wear"===n?f(o,e,r):"use"===n?f(u,e,r):void 0}function d(r,t){return 0===t.r&&"recall"!==r?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,r,t)):t}function l(t,e,o,u){return function(n,r,t){return a(n,r,t).then(i)}(t,e,o).then(r).then(n(d,u))}function b(n,r){return 0===r.r&&"take"!==n?function(n,r){return"wear"===n?f(o,r.b,r):"use"===n?f(u,r.b,r):void 0}(n,r):r}function h(r,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(t)}(r).then(n(b,o))}let j
function p(){return j||(j=Promise.resolve()),j}function g(r,t){return j=p().then(n(h,r,t)),j}function v(r,t,e,o){return j=p().then(n(l,r,t,e,o)),j}export{v as a,g as q}
//# sourceMappingURL=queue-3ff2dd7e.js.map
