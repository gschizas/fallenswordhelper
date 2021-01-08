import{x as e,A as a}from"./calfSystem-ebf4b17d.js"
import{a as t}from"./addCommas-508f0c08.js"
import"./intValue-e8157483.js"
import{g as m}from"./groupViewStats-bff0a45d.js"
import{g as s}from"./getMercStats-2ced18e5.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function f(){e()||(n=m(document),n.attackElement&&s().then(r))}export default f
//# sourceMappingURL=injectGroupStats-c508a902.js.map
