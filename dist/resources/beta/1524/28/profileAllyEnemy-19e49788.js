import{D as t,b0 as n,t as e,b as s,d as a,i as o,H as l}from"./calfSystem-964f4fc9.js"
function f(t,n){const e=n.parentNode,f=s(a,e.nextElementSibling).length-1
o(e,`<span class="fshBlue">&nbsp;${f.toString()}${function(t,n){return n&&n>=t?"/"+n:""}(f,l(function(t){return t?"alliestotal":"enemiestotal"}(t)))}</span>`)}function i(){const s=t("#profileLeftColumn strong")
s.filter(n("Allies")).forEach(e(f,!0)),s.filter(n("Enemies")).forEach(e(f,!1))}export default i
//# sourceMappingURL=profileAllyEnemy-19e49788.js.map
