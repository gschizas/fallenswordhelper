import{w as n,q as o,a8 as a,y as i,au as t,c as s,j as c,H as f,aw as p,ay as u,a5 as m,Z as e}from"./calfSystem-393ab895.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${t}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){a(i("notifications"),r)}function g(n){return n.time_remaining}function h(){d(),e(p,!0)}function y(n){n.potions.length!==n.max_potions?h():function(n){const o=Math.min.apply(null,n.map(g))
o>0?(e(p,!1),e(u,m+1e3*o)):h()}(n.potions)}function w(n){n.s&&y(n.r)}function b(){const n=f(u)
n&&m<n||l().then(w)}function j(){"composing"!==s.cmd&&c()&&(f(p)?d():b())}export default j
//# sourceMappingURL=injectComposeAlert-585b27fd.js.map
