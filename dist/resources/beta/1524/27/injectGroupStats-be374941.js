import{x as e,A as a}from"./calfSystem-70c7a660.js"
import{a as t}from"./addCommas-e12eda5f.js"
import"./intValue-ef353ded.js"
import{g as m}from"./groupViewStats-05616b2c.js"
import{g as s}from"./getMercStats-d518809b.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function f(){e()||(n=m(document),n.attackElement&&s().then(r))}export default f
//# sourceMappingURL=injectGroupStats-be374941.js.map
