import{t as n}from"./calfSystem-a2862afc.js"
import{a as t}from"./ajaxReturnCode-f0b1c41c.js"
import{d as r}from"./dialog-65e58e09.js"
import{i as e}from"./indexAjaxJson-afc1ac85.js"
import{e as o}from"./errorDialog-a4de6042.js"
import{e as u,u as i}from"./useItem-8cd86b52.js"
import{g as a}from"./guildInventory-c6d707d4.js"
function c(n){return n}function s(t,r,e){return t(r).then(n(c,e))}function f(n,t,r){return function(n,t,r){return a({subcmd2:"recall",id:n,player_id:t,mode:r})}(n,t,r)}function m(n,t,r){const e=r.items[r.items.length-1].a
return"wear"===n?s(u,e,t):"use"===n?s(i,e,t):void 0}function d(t,r){return 0===r.r&&"recall"!==t?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,t,r)):r}function l(r,e,u,i){return function(n,r,e){return f(n,r,e).then(t)}(r,e,u).then(o).then(n(d,i))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?s(u,t.b,t):"use"===n?s(i,t.b,t):void 0}(n,t):t}function j(t,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(t).then(n(h,o))}let p
function b(){return p||(p=Promise.resolve()),p}function g(t,r){return p=b().then(n(j,t,r)),p}function v(t,r,e,o){return p=b().then(n(l,t,r,e,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-6b6e8b79.js.map
