import{x as a,A as e}from"./calfSystem-1b876afa.js"
import{a as t}from"./addCommas-97b5462a.js"
import"./intValue-4dd66c70.js"
import{g as m}from"./groupViewStats-6d33ecea.js"
import{g as s}from"./getMercStats-1d912419.js"
let n
function o(a,m,s){e(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,a)}function r(a){o(n.attackElement,n.attack,a.attack),o(n.defenseElement,n.defense,a.defense),o(n.armorElement,n.armor,a.armor),o(n.damageElement,n.damage,a.damage),o(n.hpElement,n.hp,a.hp)}export default function(){a()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-cd5680e1.js.map
