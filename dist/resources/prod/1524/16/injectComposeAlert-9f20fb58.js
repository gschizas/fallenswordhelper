import{v as n,n as o,a5 as i,x as t,bI as s,c as a,j as c,D as f,bJ as p,bK as e,a2 as m,W as u}from"./calfSystem-be09bdff.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function b(){i(t("notifications"),r)}function d(n){return n.time_remaining}function g(){b(),u(p,!0)}function h(n){n.potions.length!==n.max_potions?g():function(n){const o=Math.min.apply(null,n.map(d))
o>0?(u(p,!1),u(e,m+1e3*o)):g()}(n.potions)}function x(n){n.s&&h(n.r)}function j(){const n=f(e)
n&&m<n||l().then(x)}export default function(){"composing"!==a.cmd&&c()&&(f(p)?b():j())}
//# sourceMappingURL=injectComposeAlert-9f20fb58.js.map
