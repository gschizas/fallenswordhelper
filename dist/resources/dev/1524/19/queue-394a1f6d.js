import{s as n}from"./calfSystem-f7574730.js"
import{e as r}from"./errorDialog-28d9d153.js"
import{d as t}from"./dialog-a36114b5.js"
import{i as e}from"./indexAjaxJson-66a839ba.js"
import{e as o,u}from"./useItem-c9b1ea87.js"
import{a as i}from"./ajaxReturnCode-7daad738.js"
import{g as a}from"./guildInventory-13c17546.js"
function s(n){return n}function c(r,t,e){return r(t).then(n(s,e))}function m(n,r,t){return function(n,r,t){return a({subcmd2:"recall",id:n,player_id:r,mode:t})}(n,r,t)}function f(n,r,t){const e=t.items[t.items.length-1].a
return"wear"===n?c(o,e,r):"use"===n?c(u,e,r):void 0}function d(r,t){return 0===t.r&&"recall"!==r?e({cmd:"profile",subcmd:"fetchinv"}).then(n(f,r,t)):t}function l(t,e,o,u){return function(n,r,t){return m(n,r,t).then(i)}(t,e,o).then(r).then(n(d,u))}function h(n,r){return 0===r.r&&"take"!==n?function(n,r){return"wear"===n?c(o,r.b,r):"use"===n?c(u,r.b,r):void 0}(n,r):r}function j(r,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(t)}(r).then(n(h,o))}let p
function b(){return p||(p=Promise.resolve()),p}function g(r,t){return p=b().then(n(j,r,t)),p}function v(r,t,e,o){return p=b().then(n(l,r,t,e,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-394a1f6d.js.map
