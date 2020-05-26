import{v as n,n as o,aQ as i,x as t,bS as s,c as a,j as c,D as f,bT as p,bU as e,ay as m,V as u}from"./calfSystem-740ec4d2.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){i(t("notifications"),r)}function g(n){return n.time_remaining}function b(){d(),u(p,!0)}function h(n){n.potions.length!==n.max_potions?b():function(n){const o=Math.min.apply(null,n.map(g))
o>0?(u(p,!1),u(e,m+1e3*o)):b()}(n.potions)}function x(n){n.s&&h(n.r)}function y(){const n=f(e)
n&&m<n||l().then(x)}export default function(){"composing"!==a.cmd&&c()&&(f(p)?d():y())}
//# sourceMappingURL=injectComposeAlert-7e16c939.js.map
