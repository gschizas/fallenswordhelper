import{x as e,A as a}from"./calfSystem-34fcd691.js"
import{a as t}from"./addCommas-8cd7d96d.js"
import"./intValue-0e84cdad.js"
import{g as m}from"./groupViewStats-cea0556a.js"
import{g as s}from"./getMercStats-edfd8770.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function d(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(d))}
//# sourceMappingURL=injectGroupStats-85ba4273.js.map
