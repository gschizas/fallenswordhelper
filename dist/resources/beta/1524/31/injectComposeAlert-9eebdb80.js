import{w as n,q as o,a7 as a,y as i,ao as t,c as s,j as c,H as f,aq as p,as as e,a4 as m,Y as u}from"./calfSystem-47fc08ae.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${t}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){a(i("notifications"),r)}function g(n){return n.time_remaining}function h(){d(),u(p,!0)}function y(n){n.potions.length!==n.max_potions?h():function(n){const o=Math.min.apply(null,n.map(g))
o>0?(u(p,!1),u(e,m+1e3*o)):h()}(n.potions)}function j(n){n.s&&y(n.r)}function q(){const n=f(e)
n&&m<n||l().then(j)}function w(){"composing"!==s.cmd&&c()&&(f(p)?d():q())}export default w
//# sourceMappingURL=injectComposeAlert-9eebdb80.js.map
