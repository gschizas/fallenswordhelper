import{x as e,A as a}from"./calfSystem-4991bf5b.js"
import{a as t}from"./addCommas-b567f740.js"
import"./intValue-e4cdd281.js"
import{g as m}from"./groupViewStats-20e7691a.js"
import{g as s}from"./getMercStats-362b1588.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function f(){e()||(n=m(document),n.attackElement&&s().then(r))}export default f
//# sourceMappingURL=injectGroupStats-444175d7.js.map
