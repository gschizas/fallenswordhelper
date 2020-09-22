import{x as e,A as t}from"./calfSystem-38898f3e.js"
import{a}from"./addCommas-6d131931.js"
import"./intValue-44683b42.js"
import{g as m}from"./groupViewStats-f7412e33.js"
import{g as s}from"./getMercStats-33c330c5.js"
let n
function o(e,m,s){t(`<span class="fshBlue">${a(m)}</span> ( ${a(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function f(){e()||(n=m(document),n.attackElement&&s().then(r))}export default f
//# sourceMappingURL=injectGroupStats-0874acf9.js.map
