import{w as e,z as a}from"./calfSystem-1262535f.js"
import{a as t}from"./addCommas-feda1131.js"
import"./intValue-c4584407.js"
import{g as m}from"./groupViewStats-a19cc2a0.js"
import{g as s}from"./getMercStats-fc6de540.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-ecde695d.js.map
