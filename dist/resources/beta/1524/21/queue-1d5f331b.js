import{t as n}from"./calfSystem-89b939c8.js"
import{e}from"./errorDialog-28ee21dd.js"
import{i as t}from"./indexAjaxJson-dab169e3.js"
import{d as r}from"./dialog-7eea8a00.js"
import{a as o,e as u,u as i}from"./useItem-e911a362.js"
import{g as s}from"./guildInventory-8b9578c9.js"
function a(n){return n}function c(e,t,r){return e(t).then(n(a,r))}function m(n,e,t){return function(n,e,t){return s({subcmd2:"recall",id:n,player_id:e,mode:t})}(n,e,t)}function f(n,e,t){const r=t.items[t.items.length-1].a
return"wear"===n?c(u,r,e):"use"===n?c(i,r,e):void 0}function d(e,r){return 0===r.r&&"recall"!==e?t({cmd:"profile",subcmd:"fetchinv"}).then(n(f,e,r)):r}function l(t,r,u,i){return function(n,e,t){return m(n,e,t).then(o)}(t,r,u).then(e).then(n(d,i))}function h(n,e){return 0===e.r&&"take"!==n?function(n,e){return"wear"===n?c(u,e.b,e):"use"===n?c(i,e.b,e):void 0}(n,e):e}function b(e,o){return function(n){return t({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(e).then(n(h,o))}let p
function j(){return p||(p=Promise.resolve()),p}function g(e,t){return p=j().then(n(b,e,t)),p}function v(e,t,r,o){return p=j().then(n(l,e,t,r,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-1d5f331b.js.map
