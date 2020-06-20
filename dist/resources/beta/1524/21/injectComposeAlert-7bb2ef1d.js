import{w as n,q as o,a7 as i,y as t,bH as s,c as a,j as c,G as f,bI as p,bJ as m,a4 as u,Y as e}from"./calfSystem-89b939c8.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function b(){i(t("notifications"),r)}function d(n){return n.time_remaining}function g(){b(),e(p,!0)}function h(n){n.potions.length!==n.max_potions?g():function(n){const o=Math.min.apply(null,n.map(d))
o>0?(e(p,!1),e(m,u+1e3*o)):g()}(n.potions)}function y(n){n.s&&h(n.r)}function j(){const n=f(m)
n&&u<n||l().then(y)}export default function(){"composing"!==a.cmd&&c()&&(f(p)?b():j())}
//# sourceMappingURL=injectComposeAlert-7bb2ef1d.js.map
