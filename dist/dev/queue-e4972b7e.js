import{bF as n,v as e}from"./calfSystem-fd021443.js"
import{e as t}from"./errorDialog-c89dc139.js"
import{d as r}from"./dialog-a08a4c3c.js"
import{e as o,u}from"./useItem-518ed308.js"
import{a as i}from"./ajaxReturnCode-ee8e978d.js"
import{g as c}from"./guildInventory-9be72936.js"
function s(n){return n}function a(n,t,r){return n(t).then(e(s,r))}function f(n,e,t){return function(n,e,t){return c({subcmd2:"recall",id:n,player_id:e,mode:t})}(n,e,t)}function m(n,e,t){const r=t.items[t.items.length-1].a
return"wear"===n?a(o,r,e):"use"===n?a(u,r,e):void 0}function d(t,r){return 0===r.r&&"recall"!==t?n({cmd:"profile",subcmd:"fetchinv"}).then(e(m,t,r)):r}function l(n,r,o,u){return function(n,e,t){return f(n,e,t).then(i)}(n,r,o).then(t).then(e(d,u))}function h(n,e){return 0===e.r&&"take"!==n?function(n,e){return"wear"===n?a(o,e.b,e):"use"===n?a(u,e.b,e):void 0}(n,e):e}function p(t,o){return function(e){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:e,ajax:1}).then(r)}(t).then(e(h,o))}let b
function j(){return b||(b=Promise.resolve()),b}function g(n,t){return b=j().then(e(p,n,t)),b}function v(n,t,r,o){return b=j().then(e(l,n,t,r,o)),b}export{v as a,g as q}
//# sourceMappingURL=queue-e4972b7e.js.map
