import{w as n,q as o,a7 as i,y as t,bC as s,c as a,j as c,G as f,bD as p,bE as e,a4 as m,Y as u}from"./calfSystem-019de1cf.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){i(t("notifications"),r)}function g(n){return n.time_remaining}function b(){d(),u(p,!0)}function h(n){n.potions.length!==n.max_potions?b():function(n){const o=Math.min.apply(null,n.map(g))
o>0?(u(p,!1),u(e,m+1e3*o)):b()}(n.potions)}function y(n){n.s&&h(n.r)}function j(){const n=f(e)
n&&m<n||l().then(y)}export default function(){"composing"!==a.cmd&&c()&&(f(p)?d():j())}
//# sourceMappingURL=injectComposeAlert-4b2d7ea7.js.map
