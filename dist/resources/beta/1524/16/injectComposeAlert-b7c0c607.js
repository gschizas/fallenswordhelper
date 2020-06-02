import{v as n,n as o,a5 as i,x as t,bM as s,c as a,j as c,D as f,bN as p,bO as m,a2 as u,W as e}from"./calfSystem-9554b525.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function b(){i(t("notifications"),r)}function d(n){return n.time_remaining}function g(){b(),e(p,!0)}function h(n){n.potions.length!==n.max_potions?g():function(n){const o=Math.min.apply(null,n.map(d))
o>0?(e(p,!1),e(m,u+1e3*o)):g()}(n.potions)}function x(n){n.s&&h(n.r)}function j(){const n=f(m)
n&&u<n||l().then(x)}export default function(){"composing"!==a.cmd&&c()&&(f(p)?b():j())}
//# sourceMappingURL=injectComposeAlert-b7c0c607.js.map
