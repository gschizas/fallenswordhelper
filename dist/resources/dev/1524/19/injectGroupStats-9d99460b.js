import{w as a,z as e}from"./calfSystem-f7574730.js"
import{a as t}from"./addCommas-1a19f537.js"
import"./intValue-0280032d.js"
import{g as m}from"./groupViewStats-51acd02b.js"
import{g as s}from"./getMercStats-52f6fa69.js"
let n
function o(a,m,s){e(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,a)}function r(a){o(n.attackElement,n.attack,a.attack),o(n.defenseElement,n.defense,a.defense),o(n.armorElement,n.armor,a.armor),o(n.damageElement,n.damage,a.damage),o(n.hpElement,n.hp,a.hp)}export default function(){a()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-9d99460b.js.map
