import{w as e,z as a}from"./calfSystem-dec5e071.js"
import{a as t}from"./addCommas-25733728.js"
import"./intValue-8ad0a3ce.js"
import{g as m}from"./groupViewStats-4d6edfc1.js"
import{g as s}from"./getMercStats-31cec261.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-c6545acc.js.map
