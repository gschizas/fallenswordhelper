import{x as a,A as e}from"./calfSystem-b136673a.js"
import{a as t}from"./addCommas-8259c1a9.js"
import"./intValue-f4d85578.js"
import{g as m}from"./groupViewStats-f032a99d.js"
import{g as s}from"./getMercStats-940e2bae.js"
let n
function o(a,m,s){e(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,a)}function r(a){o(n.attackElement,n.attack,a.attack),o(n.defenseElement,n.defense,a.defense),o(n.armorElement,n.armor,a.armor),o(n.damageElement,n.damage,a.damage),o(n.hpElement,n.hp,a.hp)}function f(){a()||(n=m(document),n.attackElement&&s().then(r))}export default f
//# sourceMappingURL=injectGroupStats-14173d68.js.map
