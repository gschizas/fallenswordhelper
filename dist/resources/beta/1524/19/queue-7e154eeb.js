import{s as n}from"./calfSystem-57340987.js"
import{e as r}from"./errorDialog-b114c11e.js"
import{d as t}from"./dialog-bc1710e0.js"
import{i as e}from"./indexAjaxJson-f0b26dd6.js"
import{e as o,u}from"./useItem-45980044.js"
import{a as i}from"./ajaxReturnCode-76c0bbbd.js"
import{g as s}from"./guildInventory-fe313f99.js"
function c(n){return n}function a(r,t,e){return r(t).then(n(c,e))}function f(n,r,t){return function(n,r,t){return s({subcmd2:"recall",id:n,player_id:r,mode:t})}(n,r,t)}function m(n,r,t){const e=t.items[t.items.length-1].a
return"wear"===n?a(o,e,r):"use"===n?a(u,e,r):void 0}function d(r,t){return 0===t.r&&"recall"!==r?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,r,t)):t}function l(t,e,o,u){return function(n,r,t){return f(n,r,t).then(i)}(t,e,o).then(r).then(n(d,u))}function b(n,r){return 0===r.r&&"take"!==n?function(n,r){return"wear"===n?a(o,r.b,r):"use"===n?a(u,r.b,r):void 0}(n,r):r}function h(r,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(t)}(r).then(n(b,o))}let j
function p(){return j||(j=Promise.resolve()),j}function g(r,t){return j=p().then(n(h,r,t)),j}function v(r,t,e,o){return j=p().then(n(l,r,t,e,o)),j}export{v as a,g as q}
//# sourceMappingURL=queue-7e154eeb.js.map
