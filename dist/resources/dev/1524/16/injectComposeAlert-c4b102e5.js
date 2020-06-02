import{v as n,n as o,a5 as i,x as t,bO as s,c as a,j as c,D as f,bP as p,bQ as m,a7 as u,X as e}from"./calfSystem-d49dbbd3.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){i(t("notifications"),r)}function b(n){return n.time_remaining}function g(){d(),e(p,!0)}function h(n){n.potions.length!==n.max_potions?g():function(n){const o=Math.min.apply(null,n.map(b))
o>0?(e(p,!1),e(m,u+1e3*o)):g()}(n.potions)}function x(n){n.s&&h(n.r)}function j(){const n=f(m)
n&&u<n||l().then(x)}export default function(){"composing"!==a.cmd&&c()&&(f(p)?d():j())}
//# sourceMappingURL=injectComposeAlert-c4b102e5.js.map
