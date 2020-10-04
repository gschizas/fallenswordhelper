import{w as n,q as o,a8 as i,y as t,bz as s,c as a,j as c,H as f,bA as p,bB as e,a5 as m,Z as u}from"./calfSystem-3bdf319e.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){i(t("notifications"),r)}function b(n){return n.time_remaining}function g(){d(),u(p,!0)}function h(n){n.potions.length!==n.max_potions?g():function(n){const o=Math.min.apply(null,n.map(b))
o>0?(u(p,!1),u(e,m+1e3*o)):g()}(n.potions)}function y(n){n.s&&h(n.r)}function j(){const n=f(e)
n&&m<n||l().then(y)}function w(){"composing"!==a.cmd&&c()&&(f(p)?d():j())}export default w
//# sourceMappingURL=injectComposeAlert-a1dab432.js.map
