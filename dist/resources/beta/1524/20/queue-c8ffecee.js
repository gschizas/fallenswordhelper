import{t as n}from"./calfSystem-05554bae.js"
import{a as t}from"./ajaxReturnCode-b35db638.js"
import{d as r}from"./dialog-dbf38e71.js"
import{i as e}from"./indexAjaxJson-c1c386d4.js"
import{e as o}from"./errorDialog-c3ecbb54.js"
import{e as u,u as i}from"./useItem-a504c922.js"
import{g as s}from"./guildInventory-447137be.js"
function c(n){return n}function a(t,r,e){return t(r).then(n(c,e))}function m(n,t,r){return function(n,t,r){return s({subcmd2:"recall",id:n,player_id:t,mode:r})}(n,t,r)}function f(n,t,r){const e=r.items[r.items.length-1].a
return"wear"===n?a(u,e,t):"use"===n?a(i,e,t):void 0}function d(t,r){return 0===r.r&&"recall"!==t?e({cmd:"profile",subcmd:"fetchinv"}).then(n(f,t,r)):r}function l(r,e,u,i){return function(n,r,e){return m(n,r,e).then(t)}(r,e,u).then(o).then(n(d,i))}function b(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?a(u,t.b,t):"use"===n?a(i,t.b,t):void 0}(n,t):t}function h(t,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(t).then(n(b,o))}let j
function p(){return j||(j=Promise.resolve()),j}function g(t,r){return j=p().then(n(h,t,r)),j}function v(t,r,e,o){return j=p().then(n(l,t,r,e,o)),j}export{v as a,g as q}
//# sourceMappingURL=queue-c8ffecee.js.map
