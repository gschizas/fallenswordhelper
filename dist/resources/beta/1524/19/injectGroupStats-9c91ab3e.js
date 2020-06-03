import{w as e,z as a}from"./calfSystem-57340987.js"
import{a as t}from"./addCommas-8127b6a1.js"
import"./intValue-e99f58ac.js"
import{g as m}from"./groupViewStats-41cecc06.js"
import{g as s}from"./getMercStats-d532f895.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-9c91ab3e.js.map
