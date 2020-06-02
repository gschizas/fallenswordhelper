import{w as e,z as a}from"./calfSystem-be09bdff.js"
import{a as t}from"./addCommas-f6a1bc8a.js"
import"./intValue-b1f59eab.js"
import{g as m}from"./groupViewStats-1f55ee17.js"
import{g as s}from"./getMercStats-0c994c76.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function f(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(f))}
//# sourceMappingURL=injectGroupStats-fe6ce76e.js.map
