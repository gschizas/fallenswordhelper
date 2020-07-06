import{t as n}from"./calfSystem-019de1cf.js"
import{e as t}from"./errorDialog-7f431a39.js"
import{i as e}from"./indexAjaxJson-d1b1f9ac.js"
import{d as r}from"./dialog-2e17f157.js"
import{a as o,e as u,u as i}from"./useItem-b39e6dcf.js"
import{g as s}from"./guildInventory-4f822e74.js"
function f(n){return n}function c(t,e,r){return t(e).then(n(f,r))}function a(n,t,e){return function(n,t,e){return s({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function m(n,t,e){const r=e.items[e.items.length-1].a
return"wear"===n?c(u,r,t):"use"===n?c(i,r,t):void 0}function d(t,r){return 0===r.r&&"recall"!==t?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,t,r)):r}function l(e,r,u,i){return function(n,t,e){return a(n,t,e).then(o)}(e,r,u).then(t).then(n(d,i))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?c(u,t.b,t):"use"===n?c(i,t.b,t):void 0}(n,t):t}function p(t,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(t).then(n(h,o))}let b
function j(){return b||(b=Promise.resolve()),b}function g(t,e){return b=j().then(n(p,t,e)),b}function v(t,e,r,o){return b=j().then(n(l,t,e,r,o)),b}export{v as a,g as q}
//# sourceMappingURL=queue-fdbe651f.js.map
