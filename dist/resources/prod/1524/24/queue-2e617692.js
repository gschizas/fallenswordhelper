import{t as n}from"./calfSystem-ec854151.js"
import{e as t}from"./errorDialog-8d3200e2.js"
import{i as e}from"./indexAjaxJson-7630ad10.js"
import{d as r}from"./dialog-ca00f6b8.js"
import{a as o,e as u,u as i}from"./useItem-47f87ce3.js"
import{g as s}from"./guildInventory-cf1e72bd.js"
function c(n){return n}function a(t,e,r){return t(e).then(n(c,r))}function f(n,t,e){return function(n,t,e){return s({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function m(n,t,e){const r=e.items[e.items.length-1].a
return"wear"===n?a(u,r,t):"use"===n?a(i,r,t):void 0}function d(t,r){return 0===r.r&&"recall"!==t?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,t,r)):r}function l(e,r,u,i){return function(n,t,e){return f(n,t,e).then(o)}(e,r,u).then(t).then(n(d,i))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?a(u,t.b,t):"use"===n?a(i,t.b,t):void 0}(n,t):t}function p(t,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(t).then(n(h,o))}let b
function j(){return b||(b=Promise.resolve()),b}function g(t,e){return b=j().then(n(p,t,e)),b}function v(t,e,r,o){return b=j().then(n(l,t,e,r,o)),b}export{v as a,g as q}
//# sourceMappingURL=queue-2e617692.js.map
