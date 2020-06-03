import{w as e,z as a}from"./calfSystem-5545a3e6.js"
import{a as t}from"./addCommas-757dfba4.js"
import"./intValue-02f9213d.js"
import{g as m}from"./groupViewStats-6c958ecc.js"
import{g as s}from"./getMercStats-778dd896.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-b5a4fd1d.js.map
