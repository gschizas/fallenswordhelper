import{x as e,A as a}from"./calfSystem-9901ad27.js"
import{a as t}from"./addCommas-8cd7d96d.js"
import"./intValue-0e84cdad.js"
import{g as m}from"./groupViewStats-871935ff.js"
import{g as s}from"./getMercStats-21e593de.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-1af36e2a.js.map
