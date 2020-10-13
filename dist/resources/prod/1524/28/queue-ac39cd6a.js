import{t as n}from"./calfSystem-a5da5210.js"
import{e as t}from"./errorDialog-326900ed.js"
import{i as e}from"./indexAjaxJson-e64296df.js"
import{d as r}from"./dialog-a12ad7bf.js"
import{a as o,e as u,u as i}from"./useItem-5b31e85e.js"
import{g as s}from"./guildInventory-b2209490.js"
function a(n){return n}function c(t,e,r){return t(e).then(n(a,r))}function f(n,t,e){return function(n,t,e){return s({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function m(n,t,e){const r=e.items[e.items.length-1].a
return"wear"===n?c(u,r,t):"use"===n?c(i,r,t):void 0}function d(t,r){return 0===r.r&&"recall"!==t?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,t,r)):r}function l(e,r,u,i){return function(n,t,e){return f(n,t,e).then(o)}(e,r,u).then(t).then(n(d,i))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?c(u,t.b,t):"use"===n?c(i,t.b,t):void 0}(n,t):t}function b(t,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(t).then(n(h,o))}let p
function j(){return p||(p=Promise.resolve()),p}function g(t,e){return p=j().then(n(b,t,e)),p}function v(t,e,r,o){return p=j().then(n(l,t,e,r,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-ac39cd6a.js.map
