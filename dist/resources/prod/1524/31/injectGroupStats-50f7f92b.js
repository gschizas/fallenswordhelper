import{a as e}from"./addCommas-02eed580.js"
import{g as a}from"./getMercStats-d3eb942f.js"
import{g as t}from"./groupViewStats-a14d046b.js"
import{x as m,A as s}from"./calfSystem-7aee5245.js"
import"./intValue-e7ef611d.js"
let n
function o(a,t,m){s(`<span class="fshBlue">${e(t)}</span> ( ${e(t-m)} )`,a)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function f(){m()||(n=t(document),n.attackElement&&a().then(r))}export default f
//# sourceMappingURL=injectGroupStats-50f7f92b.js.map
