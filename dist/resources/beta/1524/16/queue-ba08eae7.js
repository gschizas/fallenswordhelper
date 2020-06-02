import{s as n}from"./calfSystem-9554b525.js"
import{e as r}from"./errorDialog-48754a90.js"
import{d as t}from"./dialog-7b85f47c.js"
import{i as e}from"./indexAjaxJson-24e555fb.js"
import{e as o,u}from"./useItem-51b555c1.js"
import{a as i}from"./ajaxReturnCode-2460176f.js"
import{g as s}from"./guildInventory-a207acdc.js"
function a(n){return n}function c(r,t,e){return r(t).then(n(a,e))}function f(n,r,t){return function(n,r,t){return s({subcmd2:"recall",id:n,player_id:r,mode:t})}(n,r,t)}function m(n,r,t){const e=t.items[t.items.length-1].a
return"wear"===n?c(o,e,r):"use"===n?c(u,e,r):void 0}function d(r,t){return 0===t.r&&"recall"!==r?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,r,t)):t}function l(t,e,o,u){return function(n,r,t){return f(n,r,t).then(i)}(t,e,o).then(r).then(n(d,u))}function h(n,r){return 0===r.r&&"take"!==n?function(n,r){return"wear"===n?c(o,r.b,r):"use"===n?c(u,r.b,r):void 0}(n,r):r}function b(r,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(t)}(r).then(n(h,o))}let j
function p(){return j||(j=Promise.resolve()),j}function g(r,t){return j=p().then(n(b,r,t)),j}function v(r,t,e,o){return j=p().then(n(l,r,t,e,o)),j}export{v as a,g as q}
//# sourceMappingURL=queue-ba08eae7.js.map
