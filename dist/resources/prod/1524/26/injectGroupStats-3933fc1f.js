import{x as e,A as a}from"./calfSystem-a5fc99d4.js"
import{a as t}from"./addCommas-b567f740.js"
import"./intValue-e4cdd281.js"
import{g as m}from"./groupViewStats-e7f47cf7.js"
import{g as s}from"./getMercStats-9ff25f61.js"
let f
function n(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function o(e){n(f.attackElement,f.attack,e.attack),n(f.defenseElement,f.defense,e.defense),n(f.armorElement,f.armor,e.armor),n(f.damageElement,f.damage,e.damage),n(f.hpElement,f.hp,e.hp)}function r(){e()||(f=m(document),f.attackElement&&s().then(o))}export default r
//# sourceMappingURL=injectGroupStats-3933fc1f.js.map
