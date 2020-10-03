import{t as n}from"./calfSystem-4991bf5b.js"
import{e as t}from"./errorDialog-4ea6fda9.js"
import{i as e}from"./indexAjaxJson-b9139aa9.js"
import{d as r}from"./dialog-e2d24ff9.js"
import{a as o,e as u,u as i}from"./useItem-4f8eeca3.js"
import{g as a}from"./guildInventory-5217c01d.js"
function s(n){return n}function f(t,e,r){return t(e).then(n(s,r))}function c(n,t,e){return function(n,t,e){return a({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function m(n,t,e){const r=e.items[e.items.length-1].a
return"wear"===n?f(u,r,t):"use"===n?f(i,r,t):void 0}function d(t,r){return 0===r.r&&"recall"!==t?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,t,r)):r}function l(e,r,u,i){return function(n,t,e){return c(n,t,e).then(o)}(e,r,u).then(t).then(n(d,i))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?f(u,t.b,t):"use"===n?f(i,t.b,t):void 0}(n,t):t}function b(t,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(t).then(n(h,o))}let p
function j(){return p||(p=Promise.resolve()),p}function g(t,e){return p=j().then(n(b,t,e)),p}function v(t,e,r,o){return p=j().then(n(l,t,e,r,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-2b6791d3.js.map
