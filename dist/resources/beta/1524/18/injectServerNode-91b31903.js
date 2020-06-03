import{x as t,I as n,b2 as e,aC as a,A as s,k as c,f as i,z as r}from"./calfSystem-4197cc22.js"
import{t as o}from"./toggleForce-de86eac9.js"
function d(t,n){const e=n.nextElementSibling.children[0]
8===e.children.length&&(!function(t,n){const e=s(n.children[7]),a=c({className:"tip-static",dataset:{tipped:"Server"},textContent:"Server: "+e})
i(t,a)}(t,e),function(t,n){const e=n.children[3].innerHTML,a=t.children[0]
r("Online: "+e,a)}(t,e),o(n.parentNode,!0))}export default function(){const s=t("topbanner-stats"),c=n("#pCR h3").find(e("Game Stats"));(function(t,n){return!(t&&a("topbanner-stats-hidden",t))&&n})(s,c)&&d(s,c)}
//# sourceMappingURL=injectServerNode-91b31903.js.map
