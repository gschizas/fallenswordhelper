import{t as n}from"./calfSystem-47fc08ae.js"
import{i as e}from"./indexAjaxJson-be24760c.js"
import{a as t,e as r,u as o}from"./useItem-cee16f1c.js"
import{e as u}from"./errorDialog-9d880b0d.js"
import{g as i}from"./guildInventory-599ef5b2.js"
import{d as s}from"./dialog-d161529e.js"
function c(n){return n}function a(e,t,r){return e(t).then(n(c,r))}function f(n,e,t){return function(n,e,t){return i({subcmd2:"recall",id:n,player_id:e,mode:t})}(n,e,t)}function m(n,e,t){const u=t.items[t.items.length-1].a
return"wear"===n?a(r,u,e):"use"===n?a(o,u,e):void 0}function d(t,r){return 0===r.r&&"recall"!==t?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,t,r)):r}function l(e,r,o,i){return function(n,e,r){return f(n,e,r).then(t)}(e,r,o).then(u).then(n(d,i))}function h(n,e){return 0===e.r&&"take"!==n?function(n,e){return"wear"===n?a(r,e.b,e):"use"===n?a(o,e.b,e):void 0}(n,e):e}function b(t,r){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(s)}(t).then(n(h,r))}let p
function j(){return p||(p=Promise.resolve()),p}function g(e,t){return p=j().then(n(b,e,t)),p}function v(e,t,r,o){return p=j().then(n(l,e,t,r,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-3da49e7a.js.map
