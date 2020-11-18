import{x as e,A as a}from"./calfSystem-57628ebe.js"
import{a as t}from"./addCommas-0aacc5f1.js"
import"./intValue-f94761c7.js"
import{g as m}from"./groupViewStats-136c7484.js"
import{g as s}from"./getMercStats-ed77a50f.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function f(){e()||(n=m(document),n.attackElement&&s().then(r))}export default f
//# sourceMappingURL=injectGroupStats-6bd35ac7.js.map
