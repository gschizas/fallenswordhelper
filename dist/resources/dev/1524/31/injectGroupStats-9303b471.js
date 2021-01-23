import{a as e}from"./addCommas-02eed580.js"
import{g as a}from"./getMercStats-a0f05a9a.js"
import{g as t}from"./groupViewStats-7e6214e3.js"
import{x as m,A as s}from"./calfSystem-393ab895.js"
import"./intValue-e7ef611d.js"
let n
function o(a,t,m){s(`<span class="fshBlue">${e(t)}</span> ( ${e(t-m)} )`,a)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function f(){m()||(n=t(document),n.attackElement&&a().then(r))}export default f
//# sourceMappingURL=injectGroupStats-9303b471.js.map
