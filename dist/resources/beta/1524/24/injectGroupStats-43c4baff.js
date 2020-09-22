import{x as e,A as a}from"./calfSystem-019a589c.js"
import{a as t}from"./addCommas-6d131931.js"
import"./intValue-44683b42.js"
import{g as m}from"./groupViewStats-59bf9020.js"
import{g as s}from"./getMercStats-2360823e.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function f(){e()||(n=m(document),n.attackElement&&s().then(r))}export default f
//# sourceMappingURL=injectGroupStats-43c4baff.js.map
