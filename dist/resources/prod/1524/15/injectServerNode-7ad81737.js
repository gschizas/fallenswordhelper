import{x as t,I as n,b8 as e,au as s,A as a,k as i,f as r,z as o}from"./calfSystem-740ec4d2.js"
import{t as c}from"./toggleForce-d0f18056.js"
function d(t,n){const e=n.nextElementSibling.children[0]
8===e.children.length&&(!function(t,n){const e=a(n.children[7]),s=i({className:"tip-static",dataset:{tipped:"Server"},textContent:"Server: "+e})
r(t,s)}(t,e),function(t,n){const e=n.children[3].innerHTML,s=t.children[0]
o("Online: "+e,s)}(t,e),c(n.parentNode,!0))}export default function(){const a=t("topbanner-stats"),i=n("#pCR h3").find(e("Game Stats"));(function(t,n){return!(t&&s("topbanner-stats-hidden",t))&&n})(a,i)&&d(a,i)}
//# sourceMappingURL=injectServerNode-7ad81737.js.map
