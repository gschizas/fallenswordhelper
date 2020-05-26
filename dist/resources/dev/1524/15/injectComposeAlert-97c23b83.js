import{v as n,n as o,aR as i,x as t,b$ as s,c as a,j as c,D as f,c0 as e,c1 as p,aB as m,W as u}from"./calfSystem-ee582533.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){i(t("notifications"),r)}function g(n){return n.time_remaining}function h(){d(),u(e,!0)}function x(n){n.potions.length!==n.max_potions?h():function(n){const o=Math.min.apply(null,n.map(g))
o>0?(u(e,!1),u(p,m+1e3*o)):h()}(n.potions)}function b(n){n.s&&x(n.r)}function j(){const n=f(p)
n&&m<n||l().then(b)}export default function(){"composing"!==a.cmd&&c()&&(f(e)?d():j())}
//# sourceMappingURL=injectComposeAlert-97c23b83.js.map
