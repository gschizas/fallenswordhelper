import{w as n,q as o,a6 as i,y as t,bG as s,c as a,j as c,H as f,bH as e,bI as p,a8 as m,_ as u}from"./calfSystem-ec5e5725.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){i(t("notifications"),r)}function g(n){return n.time_remaining}function b(){d(),u(e,!0)}function h(n){n.potions.length!==n.max_potions?b():function(n){const o=Math.min.apply(null,n.map(g))
o>0?(u(e,!1),u(p,m+1e3*o)):b()}(n.potions)}function y(n){n.s&&h(n.r)}function _(){const n=f(p)
n&&m<n||l().then(y)}function j(){"composing"!==a.cmd&&c()&&(f(e)?d():_())}export default j
//# sourceMappingURL=injectComposeAlert-04cb9de9.js.map
