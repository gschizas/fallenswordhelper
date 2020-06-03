import{s as n}from"./calfSystem-6fc0cc1b.js"
import{e as r}from"./errorDialog-a6db364d.js"
import{d as t}from"./dialog-2c2225f5.js"
import{i as e}from"./indexAjaxJson-608117f0.js"
import{e as o,u}from"./useItem-ec24475d.js"
import{a as i}from"./ajaxReturnCode-465058b0.js"
import{g as s}from"./guildInventory-7a40421f.js"
function c(n){return n}function a(r,t,e){return r(t).then(n(c,e))}function f(n,r,t){return function(n,r,t){return s({subcmd2:"recall",id:n,player_id:r,mode:t})}(n,r,t)}function m(n,r,t){const e=t.items[t.items.length-1].a
return"wear"===n?a(o,e,r):"use"===n?a(u,e,r):void 0}function d(r,t){return 0===t.r&&"recall"!==r?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,r,t)):t}function l(t,e,o,u){return function(n,r,t){return f(n,r,t).then(i)}(t,e,o).then(r).then(n(d,u))}function h(n,r){return 0===r.r&&"take"!==n?function(n,r){return"wear"===n?a(o,r.b,r):"use"===n?a(u,r.b,r):void 0}(n,r):r}function j(r,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(t)}(r).then(n(h,o))}let p
function b(){return p||(p=Promise.resolve()),p}function g(r,t){return p=b().then(n(j,r,t)),p}function v(r,t,e,o){return p=b().then(n(l,r,t,e,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-b28095eb.js.map
