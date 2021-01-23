import{t as n}from"./calfSystem-7aee5245.js"
import{i as t}from"./indexAjaxJson-d7e2ce82.js"
import{a as e,e as r,u as o}from"./useItem-dc858b80.js"
import{e as u}from"./errorDialog-9d880b0d.js"
import{g as i}from"./guildInventory-4bb2b47c.js"
import{d as s}from"./dialog-d161529e.js"
function c(n){return n}function a(t,e,r){return t(e).then(n(c,r))}function m(n,t,e){return function(n,t,e){return i({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function f(n,t,e){const u=e.items[e.items.length-1].a
return"wear"===n?a(r,u,t):"use"===n?a(o,u,t):void 0}function d(e,r){return 0===r.r&&"recall"!==e?t({cmd:"profile",subcmd:"fetchinv"}).then(n(f,e,r)):r}function l(t,r,o,i){return function(n,t,r){return m(n,t,r).then(e)}(t,r,o).then(u).then(n(d,i))}function b(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?a(r,t.b,t):"use"===n?a(o,t.b,t):void 0}(n,t):t}function h(e,r){return function(n){return t({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(s)}(e).then(n(b,r))}let p
function j(){return p||(p=Promise.resolve()),p}function g(t,e){return p=j().then(n(h,t,e)),p}function v(t,e,r,o){return p=j().then(n(l,t,e,r,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-40dfe1ac.js.map
