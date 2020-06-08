import{x as e,A as t}from"./calfSystem-03970067.js"
import{a}from"./addCommas-623b93c1.js"
import"./intValue-0d844fc4.js"
import{g as m}from"./groupViewStats-bddb9c75.js"
import{g as s}from"./getMercStats-c7ec270f.js"
let n
function o(e,m,s){t(`<span class="fshBlue">${a(m)}</span> ( ${a(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-b08d6ff6.js.map
