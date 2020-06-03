import{w as e,z as t}from"./calfSystem-4197cc22.js"
import{a}from"./addCommas-519d90bf.js"
import"./intValue-202eff7d.js"
import{g as m}from"./groupViewStats-54e7c379.js"
import{g as s}from"./getMercStats-780c6ce2.js"
let n
function o(e,m,s){t(`<span class="fshBlue">${a(m)}</span> ( ${a(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-c5af0c5b.js.map
