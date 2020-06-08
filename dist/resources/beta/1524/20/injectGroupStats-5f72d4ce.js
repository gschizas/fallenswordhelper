import{x as e,A as a}from"./calfSystem-05554bae.js"
import{a as t}from"./addCommas-1723dd41.js"
import"./intValue-f723fc88.js"
import{g as m}from"./groupViewStats-839c0051.js"
import{g as s}from"./getMercStats-61d96330.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-5f72d4ce.js.map
