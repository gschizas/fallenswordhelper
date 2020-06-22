import{x as e,A as a}from"./calfSystem-4cc738f8.js"
import{a as t}from"./addCommas-c5c5d2c5.js"
import"./intValue-209ea1ab.js"
import{g as m}from"./groupViewStats-7d14dd2f.js"
import{g as s}from"./getMercStats-67ec7e7c.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function c(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(c))}
//# sourceMappingURL=injectGroupStats-094392c4.js.map
