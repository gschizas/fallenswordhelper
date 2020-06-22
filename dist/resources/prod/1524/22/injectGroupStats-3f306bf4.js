import{x as e,A as a}from"./calfSystem-d04e4be4.js"
import{a as t}from"./addCommas-d05e6f0b.js"
import"./intValue-ec94378e.js"
import{g as m}from"./groupViewStats-f367d3e1.js"
import{g as s}from"./getMercStats-cf14e6a5.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-3f306bf4.js.map
