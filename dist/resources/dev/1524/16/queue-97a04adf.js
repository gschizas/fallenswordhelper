import{s as n}from"./calfSystem-d49dbbd3.js"
import{e as r}from"./errorDialog-b5d971ab.js"
import{d as t}from"./dialog-9b65c22f.js"
import{i as e}from"./indexAjaxJson-6ef1f9f4.js"
import{e as o,u}from"./useItem-42fd7401.js"
import{a as i}from"./ajaxReturnCode-c5920216.js"
import{g as s}from"./guildInventory-62e85e9b.js"
function f(n){return n}function a(r,t,e){return r(t).then(n(f,e))}function c(n,r,t){return function(n,r,t){return s({subcmd2:"recall",id:n,player_id:r,mode:t})}(n,r,t)}function m(n,r,t){const e=t.items[t.items.length-1].a
return"wear"===n?a(o,e,r):"use"===n?a(u,e,r):void 0}function d(r,t){return 0===t.r&&"recall"!==r?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,r,t)):t}function l(t,e,o,u){return function(n,r,t){return c(n,r,t).then(i)}(t,e,o).then(r).then(n(d,u))}function b(n,r){return 0===r.r&&"take"!==n?function(n,r){return"wear"===n?a(o,r.b,r):"use"===n?a(u,r.b,r):void 0}(n,r):r}function h(r,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(t)}(r).then(n(b,o))}let j
function p(){return j||(j=Promise.resolve()),j}function g(r,t){return j=p().then(n(h,r,t)),j}function v(r,t,e,o){return j=p().then(n(l,r,t,e,o)),j}export{v as a,g as q}
//# sourceMappingURL=queue-97a04adf.js.map
