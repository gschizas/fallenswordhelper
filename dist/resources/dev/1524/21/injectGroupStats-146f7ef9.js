import{x as e,A as a}from"./calfSystem-9c7241dc.js"
import{a as t}from"./addCommas-22ea816a.js"
import"./intValue-4cb61c79.js"
import{g as m}from"./groupViewStats-166072d8.js"
import{g as s}from"./getMercStats-2e4ec62b.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-146f7ef9.js.map
