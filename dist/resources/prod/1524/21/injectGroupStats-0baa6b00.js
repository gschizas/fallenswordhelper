import{x as e,A as a}from"./calfSystem-2741d97b.js"
import{a as t}from"./addCommas-ea41e3ec.js"
import"./intValue-1a593541.js"
import{g as m}from"./groupViewStats-31925435.js"
import{g as s}from"./getMercStats-88bd6192.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-0baa6b00.js.map
