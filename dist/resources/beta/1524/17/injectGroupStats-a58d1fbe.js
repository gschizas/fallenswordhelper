import{w as e,z as a}from"./calfSystem-02ae8657.js"
import{a as t}from"./addCommas-b37f5163.js"
import"./intValue-514fe585.js"
import{g as m}from"./groupViewStats-fcebd8a2.js"
import{g as s}from"./getMercStats-aecb1afe.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-a58d1fbe.js.map
