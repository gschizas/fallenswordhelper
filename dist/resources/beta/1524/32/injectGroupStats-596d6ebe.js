import{a}from"./addCommas-b2b2ad82.js"
import{g as e}from"./getMercStats-b1c865b1.js"
import{g as t}from"./groupViewStats-6aabf859.js"
import{x as m,A as s}from"./calfSystem-26bcf570.js"
import"./intValue-da5ad0eb.js"
let n
function o(e,t,m){s(`<span class="fshBlue">${a(t)}</span> ( ${a(t-m)} )`,e)}function r(a){o(n.attackElement,n.attack,a.attack),o(n.defenseElement,n.defense,a.defense),o(n.armorElement,n.armor,a.armor),o(n.damageElement,n.damage,a.damage),o(n.hpElement,n.hp,a.hp)}function f(){m()||(n=t(document),n.attackElement&&e().then(r))}export default f
//# sourceMappingURL=injectGroupStats-596d6ebe.js.map
