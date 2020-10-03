import{x as e,A as a}from"./calfSystem-cf4d22a7.js"
import{a as t}from"./addCommas-b567f740.js"
import"./intValue-e4cdd281.js"
import{g as m}from"./groupViewStats-bc1654c0.js"
import{g as s}from"./getMercStats-e4813015.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function c(){e()||(n=m(document),n.attackElement&&s().then(r))}export default c
//# sourceMappingURL=injectGroupStats-27fe43a3.js.map
