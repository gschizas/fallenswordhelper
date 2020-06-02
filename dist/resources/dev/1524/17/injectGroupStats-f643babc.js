import{w as e,z as a}from"./calfSystem-1c103624.js"
import{a as t}from"./addCommas-708246cb.js"
import"./intValue-f5e62e5b.js"
import{g as m}from"./groupViewStats-21979267.js"
import{g as s}from"./getMercStats-51898a55.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-f643babc.js.map
