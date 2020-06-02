import{v as n,n as o,a5 as i,x as t,bL as s,c as a,j as c,D as f,bM as p,bN as e,a2 as m,W as u}from"./calfSystem-02ae8657.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){i(t("notifications"),r)}function g(n){return n.time_remaining}function b(){d(),u(p,!0)}function h(n){n.potions.length!==n.max_potions?b():function(n){const o=Math.min.apply(null,n.map(g))
o>0?(u(p,!1),u(e,m+1e3*o)):b()}(n.potions)}function x(n){n.s&&h(n.r)}function j(){const n=f(e)
n&&m<n||l().then(x)}export default function(){"composing"!==a.cmd&&c()&&(f(p)?d():j())}
//# sourceMappingURL=injectComposeAlert-e3340678.js.map
