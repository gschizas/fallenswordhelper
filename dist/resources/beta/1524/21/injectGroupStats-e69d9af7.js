import{x as e,A as a}from"./calfSystem-89b939c8.js"
import{a as t}from"./addCommas-37030ade.js"
import"./intValue-cd93b930.js"
import{g as m}from"./groupViewStats-5b0d6cc7.js"
import{g as s}from"./getMercStats-d6fae700.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-e69d9af7.js.map
