import{w as n,q as o,a7 as i,y as t,bC as s,c as a,j as c,G as f,bD as e,bE as p,a4 as m,Y as u}from"./calfSystem-d04e4be4.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){i(t("notifications"),r)}function b(n){return n.time_remaining}function g(){d(),u(e,!0)}function h(n){n.potions.length!==n.max_potions?g():function(n){const o=Math.min.apply(null,n.map(b))
o>0?(u(e,!1),u(p,m+1e3*o)):g()}(n.potions)}function y(n){n.s&&h(n.r)}function j(){const n=f(p)
n&&m<n||l().then(y)}export default function(){"composing"!==a.cmd&&c()&&(f(e)?d():j())}
//# sourceMappingURL=injectComposeAlert-25916883.js.map
