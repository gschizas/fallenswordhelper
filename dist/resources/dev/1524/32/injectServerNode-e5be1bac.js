import{y as t,D as n,ay as e,l as a,B as s,m as i,h as r,A as c}from"./calfSystem-19a5d332.js"
import{t as o}from"./toggleForce-d3228ccb.js"
function d(t,n){const e=n.nextElementSibling.children[0]
8===e.children.length&&(!function(t,n){const e=s(n.children[7]),a=i({className:"tip-static",dataset:{tipped:"Server"},textContent:`Server: ${e}`})
r(t,a)}(t,e),function(t,n){const e=n.children[3].innerHTML,a=t.children[0]
c(`Online: ${e}`,a)}(t,e),o(n.parentNode,!0))}function l(){const s=t("topbanner-stats"),i=n("#pCR h3").find(e("Game Stats"));(function(t,n){return!(t&&a("topbanner-stats-hidden",t))&&n})(s,i)&&d(s,i)}export default l
//# sourceMappingURL=injectServerNode-e5be1bac.js.map
