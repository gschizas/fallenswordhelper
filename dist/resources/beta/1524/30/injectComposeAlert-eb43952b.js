import{w as n,q as o,a7 as i,y as t,bD as s,c as a,j as c,H as f,bE as p,bF as e,a4 as m,Y as u}from"./calfSystem-ebf4b17d.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function b(){i(t("notifications"),r)}function d(n){return n.time_remaining}function g(){b(),u(p,!0)}function h(n){n.potions.length!==n.max_potions?g():function(n){const o=Math.min.apply(null,n.map(d))
o>0?(u(p,!1),u(e,m+1e3*o)):g()}(n.potions)}function y(n){n.s&&h(n.r)}function j(){const n=f(e)
n&&m<n||l().then(y)}function w(){"composing"!==a.cmd&&c()&&(f(p)?b():j())}export default w
//# sourceMappingURL=injectComposeAlert-eb43952b.js.map
