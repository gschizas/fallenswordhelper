import{y as t,D as n,aq as e,l as s,B as a,m as i,h as r,A as c}from"./calfSystem-45544049.js"
import{t as o}from"./toggleForce-d3228ccb.js"
function l(t,n){const e=n.nextElementSibling.children[0]
8===e.children.length&&(!function(t,n){const e=a(n.children[7]),s=i({className:"tip-static",dataset:{tipped:"Server"},textContent:`Server: ${e}`})
r(t,s)}(t,e),function(t,n){const e=n.children[3].innerHTML,s=t.children[0]
c(`Online: ${e}`,s)}(t,e),o(n.parentNode,!0))}function d(){const a=t("topbanner-stats"),i=n("#pCR h3").find(e("Game Stats"));(function(t,n){return!(t&&s("topbanner-stats-hidden",t))&&n})(a,i)&&l(a,i)}export default d
//# sourceMappingURL=injectServerNode-12358a05.js.map
