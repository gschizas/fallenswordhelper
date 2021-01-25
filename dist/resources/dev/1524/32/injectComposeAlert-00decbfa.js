import{w as n,q as o,a9 as a,y as i,av as t,c as s,j as c,H as f,ax as p,az as m,a6 as u,_ as e}from"./calfSystem-19a5d332.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${t}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){a(i("notifications"),r)}function g(n){return n.time_remaining}function h(){d(),e(p,!0)}function x(n){n.potions.length!==n.max_potions?h():function(n){const o=Math.min.apply(null,n.map(g))
o>0?(e(p,!1),e(m,u+1e3*o)):h()}(n.potions)}function y(n){n.s&&x(n.r)}function _(){const n=f(m)
n&&u<n||l().then(y)}function j(){"composing"!==s.cmd&&c()&&(f(p)?d():_())}export default j
//# sourceMappingURL=injectComposeAlert-00decbfa.js.map
