import{w as n,q as o,a7 as a,y as i,am as t,c as s,j as c,H as f,ao as e,aq as m,a4 as p,Y as u}from"./calfSystem-7aee5245.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${t}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){a(i("notifications"),r)}function g(n){return n.time_remaining}function h(){d(),u(e,!0)}function y(n){n.potions.length!==n.max_potions?h():function(n){const o=Math.min.apply(null,n.map(g))
o>0?(u(e,!1),u(m,p+1e3*o)):h()}(n.potions)}function j(n){n.s&&y(n.r)}function q(){const n=f(m)
n&&p<n||l().then(j)}function w(){"composing"!==s.cmd&&c()&&(f(e)?d():q())}export default w
//# sourceMappingURL=injectComposeAlert-c511600e.js.map
