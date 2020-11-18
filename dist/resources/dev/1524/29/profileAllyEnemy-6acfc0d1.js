import{D as t,a4 as n,t as e,b as s,d as a,i as o,H as l}from"./calfSystem-02c48ff5.js"
function f(t,n){const e=n.parentNode,f=s(a,e.nextElementSibling).length-1
o(e,`<span class="fshBlue">&nbsp;${f.toString()}${function(t,n){return n&&n>=t?"/"+n:""}(f,l(function(t){return t?"alliestotal":"enemiestotal"}(t)))}</span>`)}function i(){const s=t("#profileLeftColumn strong")
s.filter(n("Allies")).forEach(e(f,!0)),s.filter(n("Enemies")).forEach(e(f,!1))}export default i
//# sourceMappingURL=profileAllyEnemy-6acfc0d1.js.map
