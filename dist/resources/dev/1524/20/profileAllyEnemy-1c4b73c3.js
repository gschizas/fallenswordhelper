import{D as t,a4 as n,t as e,b as s,d as a,i as o,G as l}from"./calfSystem-a2862afc.js"
function i(t,n){const e=n.parentNode,i=s(a,e.nextElementSibling).length-1
o(e,`<span class="fshBlue">&nbsp;${i.toString()}${function(t,n){return n&&n>=t?"/"+n:""}(i,l(function(t){return t?"alliestotal":"enemiestotal"}(t)))}</span>`)}export default function(){const s=t("#profileLeftColumn strong")
s.filter(n("Allies")).forEach(e(i,!0)),s.filter(n("Enemies")).forEach(e(i,!1))}
//# sourceMappingURL=profileAllyEnemy-1c4b73c3.js.map
