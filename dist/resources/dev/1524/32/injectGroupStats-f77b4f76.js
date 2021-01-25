import{a}from"./addCommas-b2b2ad82.js"
import{g as e}from"./getMercStats-4f8902b2.js"
import{g as t}from"./groupViewStats-c58b4aa0.js"
import{x as m,A as s}from"./calfSystem-19a5d332.js"
import"./intValue-da5ad0eb.js"
let n
function o(e,t,m){s(`<span class="fshBlue">${a(t)}</span> ( ${a(t-m)} )`,e)}function r(a){o(n.attackElement,n.attack,a.attack),o(n.defenseElement,n.defense,a.defense),o(n.armorElement,n.armor,a.armor),o(n.damageElement,n.damage,a.damage),o(n.hpElement,n.hp,a.hp)}function d(){m()||(n=t(document),n.attackElement&&e().then(r))}export default d
//# sourceMappingURL=injectGroupStats-f77b4f76.js.map
