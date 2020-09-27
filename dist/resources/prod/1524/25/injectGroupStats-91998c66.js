import{x as e,A as a}from"./calfSystem-71b9378d.js"
import{a as t}from"./addCommas-bdfe3cd5.js"
import"./intValue-65d3c36c.js"
import{g as m}from"./groupViewStats-10253c5a.js"
import{g as s}from"./getMercStats-b84ae399.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function c(){e()||(n=m(document),n.attackElement&&s().then(r))}export default c
//# sourceMappingURL=injectGroupStats-91998c66.js.map
