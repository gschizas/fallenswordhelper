import{x as a,A as e}from"./calfSystem-a5da5210.js"
import{a as t}from"./addCommas-8259c1a9.js"
import"./intValue-f4d85578.js"
import{g as m}from"./groupViewStats-339bbdd1.js"
import{g as s}from"./getMercStats-28b8e8cc.js"
let n
function o(a,m,s){e(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,a)}function r(a){o(n.attackElement,n.attack,a.attack),o(n.defenseElement,n.defense,a.defense),o(n.armorElement,n.armor,a.armor),o(n.damageElement,n.damage,a.damage),o(n.hpElement,n.hp,a.hp)}function c(){a()||(n=m(document),n.attackElement&&s().then(r))}export default c
//# sourceMappingURL=injectGroupStats-d134a14b.js.map
