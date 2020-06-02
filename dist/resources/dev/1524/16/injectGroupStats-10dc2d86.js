import{w as e,z as a}from"./calfSystem-d49dbbd3.js"
import{a as t}from"./addCommas-ab251bb7.js"
import"./intValue-2ed328c8.js"
import{g as m}from"./groupViewStats-e8ea5aa4.js"
import{g as s}from"./getMercStats-19667885.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-10dc2d86.js.map
