import{x as e,A as a}from"./calfSystem-3bdf319e.js"
import{a as t}from"./addCommas-e12eda5f.js"
import"./intValue-ef353ded.js"
import{g as m}from"./groupViewStats-0d5a3c82.js"
import{g as s}from"./getMercStats-ebd901b7.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function d(){e()||(n=m(document),n.attackElement&&s().then(r))}export default d
//# sourceMappingURL=injectGroupStats-0b79d21d.js.map
