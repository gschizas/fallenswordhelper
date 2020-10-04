import{x as e,A as a}from"./calfSystem-ec5e5725.js"
import{a as t}from"./addCommas-e12eda5f.js"
import"./intValue-ef353ded.js"
import{g as m}from"./groupViewStats-8aca1ce7.js"
import{g as s}from"./getMercStats-574c2228.js"
let n
function o(e,m,s){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,e)}function r(e){o(n.attackElement,n.attack,e.attack),o(n.defenseElement,n.defense,e.defense),o(n.armorElement,n.armor,e.armor),o(n.damageElement,n.damage,e.damage),o(n.hpElement,n.hp,e.hp)}function c(){e()||(n=m(document),n.attackElement&&s().then(r))}export default c
//# sourceMappingURL=injectGroupStats-863885c3.js.map
