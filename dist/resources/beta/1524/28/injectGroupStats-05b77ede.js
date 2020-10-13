import{x as e,A as a}from"./calfSystem-964f4fc9.js"
import{a as t}from"./addCommas-8259c1a9.js"
import"./intValue-f4d85578.js"
import{g as m}from"./groupViewStats-c14e9448.js"
import{g as s}from"./getMercStats-e1db4b8f.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function f(){e()||(n=m(document),n.attackElement&&s().then(r))}export default f
//# sourceMappingURL=injectGroupStats-05b77ede.js.map
