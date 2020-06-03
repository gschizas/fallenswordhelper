import{s as n}from"./calfSystem-5545a3e6.js"
import{e as r}from"./errorDialog-506fd27f.js"
import{d as t}from"./dialog-30daca30.js"
import{i as e}from"./indexAjaxJson-06c0d970.js"
import{e as o,u}from"./useItem-d1797c01.js"
import{a as i}from"./ajaxReturnCode-d5cc1480.js"
import{g as s}from"./guildInventory-4fe876ae.js"
function a(n){return n}function c(r,t,e){return r(t).then(n(a,e))}function f(n,r,t){return function(n,r,t){return s({subcmd2:"recall",id:n,player_id:r,mode:t})}(n,r,t)}function m(n,r,t){const e=t.items[t.items.length-1].a
return"wear"===n?c(o,e,r):"use"===n?c(u,e,r):void 0}function d(r,t){return 0===t.r&&"recall"!==r?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,r,t)):t}function l(t,e,o,u){return function(n,r,t){return f(n,r,t).then(i)}(t,e,o).then(r).then(n(d,u))}function h(n,r){return 0===r.r&&"take"!==n?function(n,r){return"wear"===n?c(o,r.b,r):"use"===n?c(u,r.b,r):void 0}(n,r):r}function j(r,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(t)}(r).then(n(h,o))}let p
function g(){return p||(p=Promise.resolve()),p}function b(r,t){return p=g().then(n(j,r,t)),p}function v(r,t,e,o){return p=g().then(n(l,r,t,e,o)),p}export{v as a,b as q}
//# sourceMappingURL=queue-cda85592.js.map
