import{w as e,z as a}from"./calfSystem-ee582533.js"
import{a as t}from"./addCommas-f872a1dc.js"
import"./intValue-a842cf8a.js"
import{g as m}from"./groupViewStats-839ced79.js"
import{g as s}from"./getMercStats-770f16e8.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-79a050be.js.map
