import{s as n}from"./calfSystem-02ae8657.js"
import{e}from"./errorDialog-da114958.js"
import{d as r}from"./dialog-daafeeb1.js"
import{i as t}from"./indexAjaxJson-8dbd2034.js"
import{e as o,u}from"./useItem-4480b921.js"
import{a as i}from"./ajaxReturnCode-71b23dbe.js"
import{g as s}from"./guildInventory-5270494e.js"
function a(n){return n}function m(e,r,t){return e(r).then(n(a,t))}function c(n,e,r){return function(n,e,r){return s({subcmd2:"recall",id:n,player_id:e,mode:r})}(n,e,r)}function f(n,e,r){const t=r.items[r.items.length-1].a
return"wear"===n?m(o,t,e):"use"===n?m(u,t,e):void 0}function d(e,r){return 0===r.r&&"recall"!==e?t({cmd:"profile",subcmd:"fetchinv"}).then(n(f,e,r)):r}function l(r,t,o,u){return function(n,e,r){return c(n,e,r).then(i)}(r,t,o).then(e).then(n(d,u))}function b(n,e){return 0===e.r&&"take"!==n?function(n,e){return"wear"===n?m(o,e.b,e):"use"===n?m(u,e.b,e):void 0}(n,e):e}function h(e,o){return function(n){return t({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(e).then(n(b,o))}let j
function p(){return j||(j=Promise.resolve()),j}function g(e,r){return j=p().then(n(h,e,r)),j}function v(e,r,t,o){return j=p().then(n(l,e,r,t,o)),j}export{v as a,g as q}
//# sourceMappingURL=queue-000c4017.js.map
