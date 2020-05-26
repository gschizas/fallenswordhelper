import{w as e,z as t}from"./calfSystem-740ec4d2.js"
import{a}from"./addCommas-49286cf6.js"
import"./intValue-576c2dec.js"
import{g as m}from"./groupViewStats-f71b0e85.js"
import{g as s}from"./getMercStats-9171defd.js"
let n
function o(e,m,s){t(`<span class="fshBlue">${a(m)}</span> ( ${a(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}export default function(){e()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-1edcab48.js.map
