import{t as n}from"./calfSystem-45544049.js"
import{i as t}from"./indexAjaxJson-e79ad7ee.js"
import{a as r,e,u as o}from"./useItem-131d8a6a.js"
import{e as u}from"./errorDialog-56c5d78c.js"
import{g as i}from"./guildInventory-caf8055a.js"
import{d as a}from"./dialog-2c5b535b.js"
function s(n){return n}function c(t,r,e){return t(r).then(n(s,e))}function f(n,t,r){return function(n,t,r){return i({subcmd2:"recall",id:n,player_id:t,mode:r})}(n,t,r)}function m(n,t,r){const u=r.items[r.items.length-1].a
return"wear"===n?c(e,u,t):"use"===n?c(o,u,t):void 0}function d(r,e){return 0===e.r&&"recall"!==r?t({cmd:"profile",subcmd:"fetchinv"}).then(n(m,r,e)):e}function l(t,e,o,i){return function(n,t,e){return f(n,t,e).then(r)}(t,e,o).then(u).then(n(d,i))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?c(e,t.b,t):"use"===n?c(o,t.b,t):void 0}(n,t):t}function p(r,e){return function(n){return t({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(a)}(r).then(n(h,e))}let b
function j(){return b||(b=Promise.resolve()),b}function g(t,r){return b=j().then(n(p,t,r)),b}function v(t,r,e,o){return b=j().then(n(l,t,r,e,o)),b}export{v as a,g as q}
//# sourceMappingURL=queue-c5465ce1.js.map
