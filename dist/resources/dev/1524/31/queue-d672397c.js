import{t as n}from"./calfSystem-393ab895.js"
import{i as t}from"./indexAjaxJson-f78a3fe6.js"
import{a as r,e,u as o}from"./useItem-7ed14570.js"
import{e as u}from"./errorDialog-9d880b0d.js"
import{g as i}from"./guildInventory-0f776cc2.js"
import{d as s}from"./dialog-d161529e.js"
function a(n){return n}function c(t,r,e){return t(r).then(n(a,e))}function f(n,t,r){return function(n,t,r){return i({subcmd2:"recall",id:n,player_id:t,mode:r})}(n,t,r)}function m(n,t,r){const u=r.items[r.items.length-1].a
return"wear"===n?c(e,u,t):"use"===n?c(o,u,t):void 0}function d(r,e){return 0===e.r&&"recall"!==r?t({cmd:"profile",subcmd:"fetchinv"}).then(n(m,r,e)):e}function l(t,e,o,i){return function(n,t,e){return f(n,t,e).then(r)}(t,e,o).then(u).then(n(d,i))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?c(e,t.b,t):"use"===n?c(o,t.b,t):void 0}(n,t):t}function p(r,e){return function(n){return t({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(s)}(r).then(n(h,e))}let b
function j(){return b||(b=Promise.resolve()),b}function g(t,r){return b=j().then(n(p,t,r)),b}function v(t,r,e,o){return b=j().then(n(l,t,r,e,o)),b}export{v as a,g as q}
//# sourceMappingURL=queue-d672397c.js.map
