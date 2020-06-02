import{w as a,z as e}from"./calfSystem-9554b525.js"
import{a as t}from"./addCommas-f0a6ae56.js"
import"./intValue-bb872327.js"
import{g as m}from"./groupViewStats-f33f19af.js"
import{g as s}from"./getMercStats-22b2c3f8.js"
let n
function o(a,m,s){e(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,a)}function f(a){o(n.attackElement,n.attack,a.attack),o(n.defenseElement,n.defense,a.defense),o(n.armorElement,n.armor,a.armor),o(n.damageElement,n.damage,a.damage),o(n.hpElement,n.hp,a.hp)}export default function(){a()||(n=m(document),n.attackElement&&s().then(f))}
//# sourceMappingURL=injectGroupStats-184e3d74.js.map
