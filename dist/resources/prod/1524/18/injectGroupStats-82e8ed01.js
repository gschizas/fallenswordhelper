import{w as e,z as a}from"./calfSystem-8b6534a5.js"
import{a as t}from"./addCommas-02f70763.js"
import"./intValue-bb1f2246.js"
import{g as m}from"./groupViewStats-e821bbf3.js"
import{g as s}from"./getMercStats-04068d32.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-82e8ed01.js.map
