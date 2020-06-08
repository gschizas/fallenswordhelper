import{x as a,A as e}from"./calfSystem-a2862afc.js"
import{a as t}from"./addCommas-f02ec3aa.js"
import"./intValue-8b673ab3.js"
import{g as m}from"./groupViewStats-496448bb.js"
import{g as s}from"./getMercStats-da7df095.js"
let n
function o(a,m,s){e(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,a)}function r(a){o(n.attackElement,n.attack,a.attack),o(n.defenseElement,n.defense,a.defense),o(n.armorElement,n.armor,a.armor),o(n.damageElement,n.damage,a.damage),o(n.hpElement,n.hp,a.hp)}export default function(){a()||(n=m(document),n.attackElement&&s().then(r))}
//# sourceMappingURL=injectGroupStats-809abb2a.js.map
