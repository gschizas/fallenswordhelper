import{v as n,n as o,a5 as i,x as t,bH as s,c as a,j as c,D as f,bI as e,bJ as p,a2 as m,W as u}from"./calfSystem-dec5e071.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){i(t("notifications"),r)}function g(n){return n.time_remaining}function b(){d(),u(e,!0)}function h(n){n.potions.length!==n.max_potions?b():function(n){const o=Math.min.apply(null,n.map(g))
o>0?(u(e,!1),u(p,m+1e3*o)):b()}(n.potions)}function x(n){n.s&&h(n.r)}function j(){const n=f(p)
n&&m<n||l().then(x)}export default function(){"composing"!==a.cmd&&c()&&(f(e)?d():j())}
//# sourceMappingURL=injectComposeAlert-326d36d2.js.map
