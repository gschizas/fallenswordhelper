import{w as n,q as o,a7 as i,y as t,by as s,c as a,j as c,H as f,bz as e,bA as p,a4 as m,Y as u}from"./calfSystem-57628ebe.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function b(){i(t("notifications"),r)}function d(n){return n.time_remaining}function g(){b(),u(e,!0)}function h(n){n.potions.length!==n.max_potions?g():function(n){const o=Math.min.apply(null,n.map(d))
o>0?(u(e,!1),u(p,m+1e3*o)):g()}(n.potions)}function y(n){n.s&&h(n.r)}function j(){const n=f(p)
n&&m<n||l().then(y)}function w(){"composing"!==a.cmd&&c()&&(f(e)?b():j())}export default w
//# sourceMappingURL=injectComposeAlert-f960986f.js.map
