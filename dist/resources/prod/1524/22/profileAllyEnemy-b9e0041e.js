import{D as t,a$ as e,t as n,b as s,d as a,i as o,G as l}from"./calfSystem-d04e4be4.js"
function i(t,e){const n=e.parentNode,i=s(a,n.nextElementSibling).length-1
o(n,`<span class="fshBlue">&nbsp;${i.toString()}${function(t,e){return e&&e>=t?"/"+e:""}(i,l(function(t){return t?"alliestotal":"enemiestotal"}(t)))}</span>`)}export default function(){const s=t("#profileLeftColumn strong")
s.filter(e("Allies")).forEach(n(i,!0)),s.filter(e("Enemies")).forEach(n(i,!1))}
//# sourceMappingURL=profileAllyEnemy-b9e0041e.js.map
