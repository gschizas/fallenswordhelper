import{x as a,A as e}from"./calfSystem-d3aab5a8.js"
import{a as t}from"./addCommas-bdfe3cd5.js"
import"./intValue-65d3c36c.js"
import{g as m}from"./groupViewStats-9ea9390c.js"
import{g as s}from"./getMercStats-a924b6d7.js"
let n
function o(a,m,s){e(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,a)}function r(a){o(n.attackElement,n.attack,a.attack),o(n.defenseElement,n.defense,a.defense),o(n.armorElement,n.armor,a.armor),o(n.damageElement,n.damage,a.damage),o(n.hpElement,n.hp,a.hp)}function c(){a()||(n=m(document),n.attackElement&&s().then(r))}export default c
//# sourceMappingURL=injectGroupStats-15ca4fe8.js.map
