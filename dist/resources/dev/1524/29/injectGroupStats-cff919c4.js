import{x as a,A as e}from"./calfSystem-02c48ff5.js"
import{a as t}from"./addCommas-0aacc5f1.js"
import"./intValue-f94761c7.js"
import{g as m}from"./groupViewStats-bd6e1a8d.js"
import{g as s}from"./getMercStats-4d987bad.js"
let n
function o(a,m,s){e(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,a)}function r(a){o(n.attackElement,n.attack,a.attack),o(n.defenseElement,n.defense,a.defense),o(n.armorElement,n.armor,a.armor),o(n.damageElement,n.damage,a.damage),o(n.hpElement,n.hp,a.hp)}function f(){a()||(n=m(document),n.attackElement&&s().then(r))}export default f
//# sourceMappingURL=injectGroupStats-cff919c4.js.map
