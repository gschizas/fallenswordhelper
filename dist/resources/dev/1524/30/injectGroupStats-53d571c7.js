import{x as e,A as a}from"./calfSystem-54df10e3.js"
import{a as t}from"./addCommas-508f0c08.js"
import"./intValue-e8157483.js"
import{g as m}from"./groupViewStats-41b449bf.js"
import{g as s}from"./getMercStats-bad761d4.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function f(){e()||(n=m(document),n.attackElement&&s().then(r))}export default f
//# sourceMappingURL=injectGroupStats-53d571c7.js.map
